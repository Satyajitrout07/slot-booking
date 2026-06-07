import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Seeding 100 users...");

  const users = [];

  for (let i = 1; i <= 100; i++) {
    const hashedPassword = await bcrypt.hash("123456", 10);

    users.push({
      name: `User ${i}`,
      email: `user${i}@test.com`,
      password: hashedPassword,
      role: Role.CANDIDATE, // ✅ FIXED
      companyName: null,
      hrPhone: null,
    });
  }

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  console.log("✅ 100 users created successfully");
}

main()
  .catch((error) => {
    console.error("❌ Error:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });