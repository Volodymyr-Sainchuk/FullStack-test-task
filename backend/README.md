1 Open Terminal #1 and navigate into the backend folder:

cd backend

2 Install all required dependencies listed in package.json:

npm install

3 Initialize the local database structure. This command reads the Prisma schema file, creates a local SQLite database engine (dev.db), and generates the native client configurations:

npx prisma db push

4 Launch the backend compiler in live-reload development mode:

npm run start:dev
