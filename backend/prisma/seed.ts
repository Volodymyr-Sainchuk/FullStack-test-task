import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const defaultCategories = ['Work', 'Personal', 'Shopping', 'Health'];

  console.log('🌱 Seeding default categories...');

  for (const name of defaultCategories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log('✅ Seeding completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
