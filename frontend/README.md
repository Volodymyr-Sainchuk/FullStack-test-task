# Frontend

Next.js client for the Todo Management Console.

For the full project overview, Docker setup, and deployed links, see the [root README](../README.md).

## Local Setup

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_BASE=http://localhost:4000/api
```

Start the development server:

```bash
npm run dev
```

App URL: http://localhost:3000

Make sure the backend is running on port **4000** before using the app locally.

## Scripts

| Command         | Description           |
| --------------- | --------------------- |
| `npm run dev`   | Start dev server      |
| `npm run build` | Production build      |
| `npm run start` | Start production app  |

## Key Files

| Path | Purpose |
| ---- | ------- |
| `src/app/(todos)/page.tsx` | Server-side initial data fetch |
| `src/app/(todos)/TodoPageClient.tsx` | Main todo UI and client state |
| `src/lib/api.ts` | Shared Axios client with JSON headers |
| `src/app/components/` | UI components (TaskForm, TaskItem, etc.) |

## Docker

The frontend is started from the project root:

```bash
docker compose up --build
```

Inside Docker:

- Port: `3000`
- `NEXT_PUBLIC_API_BASE=http://localhost:4000/api` (browser → backend)
- `API_URL=http://backend:4000/api` (server-side fetch inside Docker network)

## Notes

- Requires Node.js **20.x** (see `package.json` engines).
- API requests use the shared Axios instance in `src/lib/api.ts` with `Content-Type` and `Accept` JSON headers.
