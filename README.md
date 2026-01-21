# Welcome to your  project

## Project info

**URL**: https://.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use **

Simply visit the [ Project](https://.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via  will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in .

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## AI Configuration (ChatGPT)

This app can use OpenAI ChatGPT for policy analysis via the Supabase Edge Function `extract-policy`.

Configure one of the following credential sets (OpenAI preferred):

- OpenAI (recommended)
	- `OPENAI_API_KEY`: Your OpenAI API key
	- `OPENAI_MODEL` (optional): Defaults to `gpt-4o-mini`

- Legacy Gateway (fallback)
	- `_API_KEY`: Existing gateway key used by the current setup

Using Supabase CLI, set secrets for the Edge Function:

```sh
supabase secrets set OPENAI_API_KEY=sk-... OPENAI_MODEL=gpt-4o-mini
# If you prefer to continue using the gateway instead of OpenAI:
# supabase secrets set _API_KEY=your_gateway_key
```

Then deploy functions:

```sh
supabase functions deploy extract-policy
```

Locally, the function prefers OpenAI when `OPENAI_API_KEY` is present; otherwise, it falls back to the gateway key if configured.

### Use a local `.env` file

For local development, you can keep your keys in a `.env` file that the Supabase CLI injects when serving functions:

1) Copy the example file and add your keys:

```sh
cp supabase/.env.example supabase/.env
```

2) Serve the function with your local env:

```sh
supabase functions serve extract-policy --env-file supabase/.env
```

Notes:
- Deployed environments should use `supabase secrets set` (not committed `.env` files).
- The Edge Function reads `OPENAI_API_KEY` and `OPENAI_MODEL`; if absent, it falls back to `_API_KEY`.

## How can I deploy this project?

Simply open [](https://.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my  project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs..dev/features/custom-domain#custom-domain)
