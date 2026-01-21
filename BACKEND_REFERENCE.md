# Backend Reference - InsureDocs

This document provides the backend code structure and snippets for deploying separately.

## Folder Structure

```
server/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── index.ts
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── clients.ts
│   │   └── policies.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── clientController.ts
│   │   └── policyController.ts
│   ├── middleware/
│   │   └── auth.ts
│   ├── services/
│   │   ├── pdfService.ts
│   │   ├── aiService.ts
│   │   └── storageService.ts
│   └── utils/
│       └── validation.ts
├── package.json
├── tsconfig.json
└── .env.example
```

## Prisma Schema

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String   @id @default(cuid())
  email         String   @unique
  password_hash String
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Client {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String
  notes     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  policies  Policy[]
}

model Policy {
  id            String             @id @default(cuid())
  clientId      String
  policyNumber  String
  carrier       String
  effectiveDate DateTime
  expiryDate    DateTime
  pdfUrl        String?
  createdAt     DateTime           @default(now())
  updatedAt     DateTime           @updatedAt
  client        Client             @relation(fields: [clientId], references: [id])
  extractions   PolicyExtraction[]
}

model PolicyExtraction {
  id          String   @id @default(cuid())
  policyId    String
  rawText     String   @db.Text
  summaryJson Json?
  createdAt   DateTime @default(now())
  policy      Policy   @relation(fields: [policyId], references: [id])
}
```

## Environment Variables

```env
# .env.example
DATABASE_URL="postgresql://user:password@localhost:5432/insuredocs"
JWT_SECRET="your-super-secret-jwt-key"
OPENAI_API_KEY="sk-..."
S3_BUCKET="your-bucket-name"
S3_REGION="us-east-1"
S3_ACCESS_KEY="..."
S3_SECRET_KEY="..."
PORT=3001
```

## Main Server Entry

```typescript
// src/index.ts
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth';
import clientRoutes from './routes/clients';
import policyRoutes from './routes/policies';

const app = express();
const prisma = new PrismaClient();

app.use(cors({ 
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/policies', policyRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Auth Routes

```typescript
// src/routes/auth.ts
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
  
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
  
  res.json({ user: { id: user.id, email: user.email } });
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true });
});

export default router;
```

## Auth Middleware

```typescript
// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    (req as any).userId = decoded.userId;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
```

## PDF Service (Text Extraction)

```typescript
// src/services/pdfService.ts
import pdf from 'pdf-parse';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_KEY!
  }
});

export async function extractTextFromPdf(pdfUrl: string): Promise<string> {
  // Get PDF from S3
  const key = pdfUrl.split('/').pop()!;
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key
  });
  
  const response = await s3.send(command);
  const buffer = await response.Body?.transformToByteArray();
  
  if (!buffer) throw new Error('Failed to read PDF');
  
  const data = await pdf(Buffer.from(buffer));
  return data.text;
}
```

## AI Service (Summary Generation)

```typescript
// src/services/aiService.ts
import OpenAI from 'openai';
import { z } from 'zod';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SummarySchema = z.object({
  policy_overview: z.string(),
  key_coverages: z.array(z.string()),
  deductibles: z.array(z.string()),
  limits: z.array(z.string()),
  exclusions: z.array(z.string()),
  notes_for_client: z.string()
});

export async function generateSummary(rawText: string) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are an insurance policy analyst. Extract key information from policy documents and return a structured summary in the exact JSON format specified.`
      },
      {
        role: 'user',
        content: `Analyze this insurance policy and return a JSON object with these exact fields:
        - policy_overview: A brief summary of the policy
        - key_coverages: Array of main coverage items
        - deductibles: Array of deductible amounts and conditions
        - limits: Array of coverage limits
        - exclusions: Array of what's not covered
        - notes_for_client: Recommendations or important notes
        
        Policy text:
        ${rawText}`
      }
    ],
    response_format: { type: 'json_object' }
  });
  
  const content = response.choices[0].message.content;
  if (!content) throw new Error('No response from AI');
  
  const parsed = JSON.parse(content);
  return SummarySchema.parse(parsed);
}
```

## Storage Service (S3 Upload)

```typescript
// src/services/storageService.ts
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

const s3 = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_KEY!
  }
});

export async function uploadPdf(file: Buffer, originalName: string): Promise<string> {
  const key = `policies/${uuidv4()}-${originalName}`;
  
  await s3.send(new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Body: file,
    ContentType: 'application/pdf'
  }));
  
  return `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${key}`;
}
```

## Package.json Dependencies

```json
{
  "name": "insuredocs-server",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "db:push": "prisma db push",
    "db:generate": "prisma generate"
  },
  "dependencies": {
    "@aws-sdk/client-s3": "^3.x",
    "@prisma/client": "^5.x",
    "bcryptjs": "^2.4.3",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5-lts.1",
    "openai": "^4.x",
    "pdf-lib": "^1.17.1",
    "pdf-parse": "^1.1.1",
    "uuid": "^9.0.0",
    "zod": "^3.x"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.6",
    "@types/cookie-parser": "^1.4.6",
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/jsonwebtoken": "^9.0.5",
    "@types/multer": "^1.4.11",
    "@types/node": "^20.x",
    "@types/uuid": "^9.0.7",
    "prisma": "^5.x",
    "tsx": "^4.x",
    "typescript": "^5.x"
  }
}
```

## Deployment Notes

### Frontend (Vercel/Netlify)
1. Set `VITE_API_URL` environment variable to your backend URL
2. Build command: `npm run build`
3. Output directory: `dist`

### Backend (Render/Railway)
1. Set all environment variables from `.env.example`
2. Run `npx prisma generate && npx prisma db push` before starting
3. Start command: `npm start`

### Database (Neon/Supabase Postgres)
1. Create a PostgreSQL database
2. Copy the connection string to `DATABASE_URL`

### Storage (S3/Supabase Storage)
1. Create a bucket with public read access for uploaded PDFs
2. Configure CORS if needed
