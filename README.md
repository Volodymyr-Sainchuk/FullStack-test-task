# Full-Stack Todo Management Console

A full-stack todo app built for the UITOP assessment using **Next.js**, **NestJS**, **Prisma**, and **SQLite**.

## Deployed Links

- **Frontend (Vercel):** https://full-stack-test-task.vercel.app
- **Backend API (Render):** https://fullstack-test-task-1-xvql.onrender.com

## Tech Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Frontend | Next.js 14, React, Tailwind CSS     |
| Backend  | NestJS, Prisma ORM                  |
| Database | SQLite                              |
| DevOps   | Docker Compose                      |

## Features

- Create tasks with category selection
- Filter tasks by category
- Optimistic UI with a 5-second undo window for complete/delete actions
- Max **5 active tasks per category** (returns `400 Bad Request` when exceeded)
- Bulk select and complete multiple tasks
- Task creation timestamp shown on each item

## API Endpoints

Base URL (local): `http://localhost:4000/api`

| Method | Endpoint           | Description                    |
| ------ | ------------------ | ------------------------------ |
| GET    | `/categories`      | List all categories            |
| GET    | `/todos`           | List active todos              |
| GET    | `/todos?category=` | Filter todos by category       |
| POST   | `/todos`           | Create a todo                  |
| PATCH  | `/todos/:id`       | Update todo (e.g. `{ completed: true }`) |
| DELETE | `/todos/:id`       | Delete a todo                  |

## Run with Docker (recommended)

From the project root:

```bash
docker compose up --build
```

This starts:

- **Backend** on http://localhost:4000
- **Frontend** on http://localhost:3000
- **SQLite database** in a persistent Docker volume (`sqlite_data`)

On startup, the backend automatically runs `prisma migrate deploy`.

### Seed the database (optional)

```bash
docker compose exec backend npm run seed
```

### Stop containers

```bash
docker compose down
```

## Run locally (without Docker)

### Prerequisites

- Node.js 20+
- npm

### Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
DATABASE_URL="file:./dev.db"
PORT=4000
```

Then run migrations, seed, and start the server:

```bash
npx prisma migrate dev
npm run seed
npm run start:dev
```

Backend runs at http://localhost:4000/api

### Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_BASE=http://localhost:4000/api
```

Start the dev server:

```bash
npm run dev
```

Frontend runs at http://localhost:3000

## Project Structure

```text
├── backend/          NestJS API + Prisma schema/migrations
├── frontend/         Next.js app
├── docker-compose.yml
└── README.md
```

## Scripts

### Backend

| Command              | Description              |
| -------------------- | ------------------------ |
| `npm run start:dev`  | Start in watch mode      |
| `npm run build`      | Build for production     |
| `npm run seed`       | Seed default categories  |

### Frontend

| Command         | Description           |
| --------------- | --------------------- |
| `npm run dev`   | Start dev server      |
| `npm run build` | Production build      |
| `npm run start` | Start production app  |

## Notes

- The backend uses port **4000** (not 5000) to avoid conflicts with macOS AirPlay Receiver on port 5000.
- Frontend API calls go through a shared Axios client (`frontend/src/lib/api.ts`) with JSON headers configured by default.
