import { PrismaClient } from "@prisma/client";
import { generateUsername } from "../lib/generateUsername.js";

const prisma = new PrismaClient();

async function main() {
  console.log("🔍 Looking for users without username...\n");

  const usersWithoutUsername = await prisma.user.findMany({
    where: {
      username: null,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  if (usersWithoutUsername.length === 0) {
    console.log("✅ All users already have usernames!");
    return;
  }

  console.log(
    `📝 Found ${usersWithoutUsername.length} users without username:\n`,
  );

  for (const user of usersWithoutUsername) {
    console.log(`   • ${user.name || user.email} (${user.email})`);
  }

  console.log("\n🚀 Generating usernames...\n");

  for (const user of usersWithoutUsername) {
    const baseText = user.name || user.email.split("@")[0];
    const username = await generateUsername(baseText);

    await prisma.user.update({
      where: { id: user.id },
      data: { username },
    });

    console.log(`   ✅ ${user.name || user.email} → @${username}`);
  }

  console.log(
    `\n🎉 Successfully generated ${usersWithoutUsername.length} usernames!`,
  );
}

main()
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
