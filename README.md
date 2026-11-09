# InLocFix

### Connecting you with trusted local workers

InLocFix is a hyperlocal service platform that helps customers discover local professionals—such as plumbers, electricians, carpenters, and painters—while giving skilled workers a place to build their digital presence and grow their opportunities.

> **Our goal:** Make every skilled local worker visible, accessible, and trusted.

## The problem

Finding a reliable local service provider often depends on word of mouth or personal contacts. Meanwhile, many skilled neighborhood workers lack an online identity and have limited ways to build credibility or reach new customers.

InLocFix aims to bridge this gap with a simple platform for discovering local services and connecting customers with workers in their neighborhoods.

## What InLocFix aims to provide

- Discover local service providers by service and location.
- Give workers a digital profile and greater visibility.
- Help customers make informed choices through worker information and reviews.
- Make neighborhood services easier to find and access.
- Support the digital inclusion and growth of informal workers.

## Who it serves

**Customers** can find nearby workers, explore services, and make more informed decisions.

**Local service workers** can build an online identity, reach more customers, and grow their work opportunities.

## Project structure

```text
InLocFix/
├── client/                 # React + Vite web app
├── server/                 # Express API
└── supabase_setup.sql      # Supabase RLS policies and booking-table setup
```

## Technology

- **Client:** React, Vite, React Router, Axios, Capacitor
- **API:** Node.js, Express
- **Data and authentication:** Supabase
- **Maps:** Mappls (optional API key)

## Getting started

### Prerequisites

- Node.js and npm
- A Supabase project

### 1. Configure the client

In a terminal, go to the `client` directory and install dependencies:

```powershell
cd client
npm install
```

Create `client/.env` with your project configuration:

```dotenv
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
VITE_API_URL=http://localhost:3001
VITE_MAPPLS_API_KEY=YOUR_MAPPLS_API_KEY
```

`VITE_API_URL` and `VITE_MAPPLS_API_KEY` can be omitted if you do not need to override the API URL or enable Mappls features. Vite exposes `VITE_` variables to the client; **never put a Supabase service-role key or other secret in this file.**

Start the web app:

```powershell
npm run dev
```

### 2. Configure and start the API

Open another terminal and install the server dependencies:

```powershell
cd server
npm install
```

Create `server/.env`:

```dotenv
PORT=3001
SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
SUPABASE_SERVICE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
JWT_SECRET=YOUR_LONG_RANDOM_SECRET
FAST2SMS_API_KEY=YOUR_FAST2SMS_API_KEY
```

Keep this file private and out of version control. The Fast2SMS key is only needed for SMS/OTP functionality. If `JWT_SECRET` is not set, the current server code falls back to the Supabase service key.

Start the API in development mode:

```powershell
npm run dev
```

The API listens on `http://localhost:3001` by default. Its root health check is `http://localhost:3001/`.

### 3. Set up Supabase

Configure the required Supabase tables and authentication for your project. Then review and run [`supabase_setup.sql`](./supabase_setup.sql) in the Supabase SQL Editor to apply the included row-level security policies and booking-table setup.

The SQL script expects the `profiles` and `worker_profiles` tables to exist. Review the policies and adapt them to your schema and security requirements before applying them.

## Useful commands

Run these commands from their respective directories:

| Directory | Command | Purpose |
|---|---|---|
| `client` | `npm run dev` | Start the Vite development server |
| `client` | `npm run build` | Create a production web build |
| `client` | `npm run lint` | Run ESLint |
| `client` | `npm run build:mobile` | Build the client and sync Capacitor |
| `server` | `npm run dev` | Start the API with Nodemon |
| `server` | `npm start` | Start the API |

## Vision and impact

InLocFix envisions a more connected neighborhood service economy—one where customers can access local help more easily and skilled workers can build trust, visibility, and opportunity.

**InLocFix — Bringing local services closer to you.**

*Developed by Team InLocFix.*
