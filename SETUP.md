# Neos Tech - Setup & Deployment Guide

A full-stack web application built with React, Vite, TypeScript, and Vercel serverless functions.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Local Development Setup](#local-development-setup)
4. [Environment Variables](#environment-variables)
5. [MongoDB Setup](#mongodb-setup)
6. [Stripe Setup](#stripe-setup)
7. [Vercel Deployment](#vercel-deployment)
8. [Post-Deployment Configuration](#post-deployment-configuration)
9. [Demo Credentials](#demo-credentials)
10. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **bun** package manager
- **Git** - [Download](https://git-scm.com/)
- **MongoDB Atlas** account (free) - [Sign up](https://www.mongodb.com/atlas)
- **Stripe** account (free) - [Sign up](https://stripe.com/)
- **Vercel** account (free) - [Sign up](https://vercel.com/)

---

## Project Structure

```
├── api/                    # Vercel serverless functions
│   ├── lib/
│   │   ├── cors.ts        # CORS configuration
│   │   └── mongodb.ts     # MongoDB connection
│   ├── admin.ts           # Admin API endpoints
│   ├── admin-employees.ts # Employee management
│   ├── admin-notes.ts     # Notes API
│   ├── admin-payments.ts  # Stripe payments API
│   ├── auth.ts            # Authentication
│   ├── create-checkout.ts # Stripe checkout
│   ├── orders.ts          # Orders API
│   └── stripe-webhook.ts  # Stripe webhooks
├── src/                    # Frontend React application
│   ├── components/        # Reusable components
│   ├── pages/             # Page components
│   ├── hooks/             # Custom React hooks
│   └── lib/               # Utilities and API client
├── .env.example           # Environment variables template
├── vercel.json            # Vercel configuration
└── package.json           # Dependencies
```

---

## Local Development Setup

### Step 1: Clone the Repository

```bash
git clone <your-repo-url>
cd <project-folder>
```

### Step 2: Install Dependencies

```bash
npm install
# or
bun install
```

### Step 3: Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Edit .env with your actual values
nano .env  # or use any text editor
```

### Step 4: Start Development Server

```bash
npm run dev
# or
bun dev
```

The app will be available at `http://localhost:5173`

> **Note:** API routes won't work locally without additional setup. Use Vercel CLI for full local testing:
> ```bash
> npm i -g vercel
> vercel dev
> ```

---

## Environment Variables

Create a `.env` file with the following variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-super-secret-key-min-32-chars` |
| `STRIPE_SECRET_KEY` | Stripe secret key | `sk_test_...` or `sk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | `whsec_...` |
| `ADMIN_EMAILS` | Comma-separated admin emails | `admin@company.com,ceo@company.com` |
| `VITE_APP_URL` | Application URL | `http://localhost:5173` (local) or `https://yourapp.vercel.app` (prod) |

### Generate a Secure JWT Secret

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL
openssl rand -hex 32
```

---

## MongoDB Setup

### Step 1: Create MongoDB Atlas Account

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new project

### Step 2: Create a Cluster

1. Click "Build a Database"
2. Choose "M0 FREE" tier
3. Select your preferred region
4. Click "Create Cluster"

### Step 3: Configure Database Access

1. Go to "Database Access" in the sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter a username and secure password
5. Set privileges to "Read and write to any database"
6. Click "Add User"

### Step 4: Configure Network Access

1. Go to "Network Access" in the sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for Vercel compatibility)
   - Or add `0.0.0.0/0` to the access list
4. Click "Confirm"

### Step 5: Get Connection String

1. Go to "Database" in the sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with your preferred database name (e.g., `neos_tech`)

Example:
```
mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/neos_tech?retryWrites=true&w=majority
```

---

## Stripe Setup

### Step 1: Create Stripe Account

1. Go to [stripe.com](https://stripe.com)
2. Sign up for an account
3. Complete the onboarding process

### Step 2: Get API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Make sure "Test mode" is enabled (toggle in top-right)
3. Go to "Developers" → "API keys"
4. Copy your **Secret key** (starts with `sk_test_`)

### Step 3: Set Up Webhooks (After Deployment)

1. Go to "Developers" → "Webhooks"
2. Click "Add endpoint"
3. Enter your endpoint URL: `https://your-app.vercel.app/api/stripe-webhook`
4. Select events to listen to:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`
5. Click "Add endpoint"
6. Click on the endpoint to reveal the signing secret
7. Copy the **Signing secret** (starts with `whsec_`)

---

## Vercel Deployment

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Select the repository

### Step 3: Configure Build Settings

Vercel should auto-detect settings, but verify:
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

### Step 4: Add Environment Variables

In the "Environment Variables" section, add all variables from your `.env` file:

```
MONGODB_URI = your-mongodb-connection-string
JWT_SECRET = your-jwt-secret
STRIPE_SECRET_KEY = sk_test_...
STRIPE_WEBHOOK_SECRET = whsec_...
ADMIN_EMAILS = admin@yourcompany.com
VITE_APP_URL = https://your-project.vercel.app
```

> **Important:** Update `VITE_APP_URL` with your actual Vercel domain after the first deployment.

### Step 5: Deploy

1. Click "Deploy"
2. Wait for the build to complete
3. Your app will be live at `https://your-project.vercel.app`

---

## Post-Deployment Configuration

### 1. Update VITE_APP_URL

After your first deployment, go to Vercel Dashboard → Settings → Environment Variables and update `VITE_APP_URL` with your actual domain.

### 2. Configure Stripe Webhook

Follow the [Stripe Setup](#step-3-set-up-webhooks-after-deployment) section to add the webhook endpoint.

### 3. Test the Deployment

1. Visit your app URL
2. Try the demo login credentials
3. Test the admin dashboard features
4. Test a Stripe payment (use test cards)

### Stripe Test Cards

| Card Number | Description |
|-------------|-------------|
| `4242 4242 4242 4242` | Successful payment |
| `4000 0000 0000 9995` | Declined payment |
| `4000 0025 0000 3155` | Requires authentication |

Use any future expiry date and any 3-digit CVC.

---

## Demo Credentials

The application includes demo mode for testing:

### Admin Login
- **Email:** `admin@demo.com`
- **Password:** `demo123`
- **URL:** `/login` (select Admin tab) or `/admin/login`

### Employee Login
- **Email:** `employee@demo.com`
- **Password:** `demo123`
- **URL:** `/login` (select Employee tab) or `/employee/login`

---

## Troubleshooting

### API Routes Not Working Locally

API routes require Vercel's serverless environment. Use Vercel CLI:

```bash
npm i -g vercel
vercel dev
```

### MongoDB Connection Failed

1. Check your connection string format
2. Ensure IP whitelist includes `0.0.0.0/0`
3. Verify username and password are correct
4. Check that the database name is specified

### Stripe Webhooks Not Receiving Events

1. Verify the webhook URL is correct
2. Check the signing secret matches
3. Ensure the endpoint is publicly accessible
4. Check Vercel function logs for errors

### Build Fails on Vercel

1. Check for TypeScript errors: `npm run build` locally
2. Ensure all dependencies are in `package.json`
3. Check Vercel build logs for specific errors

### Authentication Issues

1. Verify `JWT_SECRET` is set correctly
2. Check `ADMIN_EMAILS` includes your admin email
3. Clear browser localStorage and try again

---

## Custom Domain (Optional)

To add a custom domain:

1. Go to Vercel Dashboard → Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. Update `VITE_APP_URL` environment variable to your custom domain

---

## Support

For additional help:
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://www.mongodb.com/docs/atlas/)
- [Stripe Documentation](https://stripe.com/docs)
- [Vite Documentation](https://vitejs.dev/)

---

## License

This project is private and proprietary. All rights reserved.
