# Backend

NestJS REST API for the Todo Management Console, using Prisma with SQLite.

For the full project overview, Docker setup, and deployed links, see the [root README](../README.md).

## Local Setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
DATABASE_URL="file:./dev.db"
PORT=4000
```

Run migrations, seed default categories, and start the dev server:

```bash
npx prisma migrate dev
npm run seed
npm run start:dev
```

API base URL: http://localhost:4000/api

## Scripts

| Command             | Description                    |
| ------------------- | ------------------------------ |
| `npm run start:dev` | Start NestJS in watch mode     |
| `npm run start:prod`| Start compiled production app  |
| `npm run build`     | Compile TypeScript             |
| `npm run seed`      | Seed categories via Prisma     |
| `npm run test`      | Run unit tests                 |
| `npm run test:e2e`  | Run end-to-end tests           |

## API Endpoints

| Method | Endpoint           | Description              |
| ------ | ------------------ | ------------------------ |
| GET    | `/api/categories`  | List all categories      |
| GET    | `/api/todos`       | List active todos        |
| GET    | `/api/todos?category=` | Filter by category   |
| POST   | `/api/todos`       | Create a todo            |
| PATCH  | `/api/todos/:id`   | Update todo status       |
| DELETE | `/api/todos/:id`   | Delete a todo            |

## Database

- Provider: SQLite via Prisma
- Schema: `prisma/schema.prisma`
- Migrations: `prisma/migrations/`
- Seed script: `prisma/seed.ts` (seeds Work, Personal, Shopping, Health)

## Docker

The backend is started from the project root:

```bash
docker compose up --build
```

Inside Docker:

- Port: `4000`
- Database file: `/data/dev.db` (persisted in the `sqlite_data` volume)
- Migrations run automatically on container start

To seed inside Docker:

```bash
docker compose exec backend npm run seed
```

## Notes

- Default port is **4000** to avoid macOS AirPlay conflicts on port 5000.
- Business rule: max **5 active tasks per category**; exceeding this returns `400 Bad Request`.
