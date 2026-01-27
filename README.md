# Neos Techs

Full-stack web application built with React, Vite, TypeScript, and Vercel serverless functions.

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn-ui

## Local Development

```sh
npm install
npm run dev
```

## Environment Variables

See `SETUP.md` for the full setup guide. At minimum, you'll need:

- `MONGODB_URI`
- `JWT_SECRET`
- `ADMIN_EMAILS`

Optional (if you enable the features):

- `RESEND_API_KEY`, `APP_URL`
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `VITE_APP_URL`
- `HUGGINGFACE_API_KEY`

## Deployment

Use Vercel with build command `npm run build` and output directory `dist`.
For full steps, follow `SETUP.md`.
