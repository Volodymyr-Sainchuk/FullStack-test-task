# Full-Stack Todo Management Console

A full-stack application built for the UITOP assessment framework using Next.js, NestJS/Express, Prisma, and PostgreSQL/SQLite.

## Deployed Links

- **Live Frontend (Vercel):** https://full-stack-test-task.vercel.app
- **Live Backend API (Render):** https://fullstack-test-task-1-xvql.onrender.com

## Features Implemented

- Dynamic Task Creation & State management via React Hook Form
- Optimistic UI updates with a 5-second transient "Undo" lifecycle for deletions and completions
- Under-the-hood business logic enforcing a strict maximum threshold of 5 tasks per category (returns a 400 Bad Request error if exceeded)
- **Bonus Feature:** Multi-checkbox selection framework allowing bulk task resolution lifecycle execution

## How to Run Locally

### Backend Setup

1. Navigate to `/backend`
2. Run `npm install`
3. Run `npm run start:dev` (Starts on port 5000)

### Frontend Setup

1. Navigate to `/frontend`
2. Run `npm install`
3. Run `npm run dev` (Starts on port 3000)

### How to start Docker


1. Build and Start the Containers
   Run the orchestration command with the --build flag. This forces Docker to install fresh node_modules inside the containers and compile the TypeScript environments:

   docker-compose up --build

2. Database & Network Sync (Automatic)
   Once execution begins, Docker will orchestrate the environment in the following sequence:

Launch the todo-backend container.

Execute npx prisma db push inside the backend container to provision the SQLite database structure (dev.db).

Start the NestJS engine on port 5000.

Launch the todo-frontend container (Next.js) on port 3000, injecting NEXT_PUBLIC_API_BASE=http://localhost:5000/api.

3. Access the Application
   Once the terminal logs stabilize, open your browser and navigate to:

🌐 Frontend Layout: http://localhost:3000

⚙️ Backend API Specs: http://localhost:5000/api
