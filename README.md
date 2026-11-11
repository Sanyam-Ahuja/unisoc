# UniSOC · University Security Operations

A distinct full-stack SOC product built from the portfolio blueprint in the parent `prompt.md`. It uses a React + TypeScript + Vite frontend and a Node.js + TypeScript + Express API backed by PostgreSQL.

## Run locally

Start the full stack with `docker compose up --build` from the repository root. To run the API separately, start PostgreSQL with `docker compose up -d db`, then:

```sh
cd backend
pnpm install
pnpm dev
```

In a second terminal, start the frontend:

```sh
cd frontend
pnpm install
pnpm dev
```

The API defaults to `http://localhost:8000`. The interface labels seeded event records as synthetic.

## Test

```sh
cd backend
pnpm test
```

## Deploy

- **Railway API:** create a service from this repository using `railway.toml`; attach Railway PostgreSQL and set `DATABASE_URL` plus `FRONTEND_ORIGINS`.
- **Vercel frontend:** import this repository with the repository root as the project root. Set `VITE_API_URL` to the Railway public URL. The included `vercel.json` builds `frontend` and serves the SPA.
- Copy values from `.env.example`; never commit live credentials.

## Scope

This is a demonstrable MVP, not an institutional deployment. Its seeded identities and event records are synthetic. Production authentication/authorization and university integrations must be configured before using real campus data.
