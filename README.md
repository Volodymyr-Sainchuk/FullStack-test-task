# Full-Stack Todo Application (UITOP Task Submission)

A modern full-stack task management application featuring category-based task grouping, smart business logic limits, and a smooth user experience with transient notifications and undo capabilities.

---

## 🚀 Features Implemented

### Frontend (Next.js & TypeScript)

- **Task Management Dashboard:** Displays text, category tags, and completion status.
- **React Hook Form Validation:** Implements strict client-side validation on task creation inputs and dropdowns.
- **Transient Undo Notification:** Marking a task complete or deleting it triggers a snackbar notification with an **"Undo"** option. Completed tasks remain visible for 5 seconds allowing a full restoration before committing changes.
- **Category Filtering:** Live dropdown filter above the list to filter tasks by their specific categories or show "All".
- **State Management Handling:** Robust UI loading spinners, custom empty states with icons, and contextual server-error alerts.

### Backend (NestJS, Prisma & SQLite)

- **Relational Persistence:** Clean SQLite architecture mapping Tasks and Categories.
- **Business Logic Rule Enforcement:** A database aggregate checkpoint limits categories to a **maximum of 5 active tasks**. Exceeding this triggers a strict `400 Bad Request` exception thrown down to the client layout.
- **Unit Testing Suites (Bonus):** Complete Jest architecture with custom mock configurations testing both `TodosController` and `TodosService` in isolated mock memory.

---

## 🛠️ Installation & Setup

Ensure you have [Node.js](https://nodejs.org/) installed on your machine before proceeding.

### 1. Backend Service Setup

Open your terminal, navigate to the backend folder, install your core dependencies, run database migrations to build your local SQLite file, seed default categories, and launch the development environment:

```bash
cd backend
npm install
npx prisma migrate dev --name init
npx prisma db seed
npm run start:dev
```
