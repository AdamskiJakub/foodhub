import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function normalizeUsername(input) {
  const polishChars = {
    ą: "a",
    ć: "c",
    ę: "e",
    ł: "l",
    ń: "n",
    ó: "o",
    ś: "s",
    ź: "z",
    ż: "z",
    Ą: "a",
    Ć: "c",
    Ę: "e",
    Ł: "l",
    Ń: "n",
    Ó: "o",
    Ś: "s",
    Ź: "z",
    Ż: "z",
  };

  let normalized = String(input)
    .split("")
    .map((char) => polishChars[char] || char)
    .join("")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  if (normalized.length === 0) {
    normalized = `user-${Math.random().toString(36).slice(2, 8)}`;
  }

  return normalized;
}

async function generateUsernameForScript(baseText) {
  const baseUsername = normalizeUsername(baseText);

  const existingUser = await prisma.user.findUnique({
    where: { username: baseUsername },
  });

  if (!existingUser) {
    return baseUsername;
  }

  let counter = 2;
  let candidateUsername = `${baseUsername}-${counter}`;

  while (
    await prisma.user.findUnique({ where: { username: candidateUsername } })
  ) {
    counter++;
    candidateUsername = `${baseUsername}-${counter}`;

    if (counter > 1000) {
      throw new Error("Unable to generate unique username");
    }
  }

  return candidateUsername;
}

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
    const username = await generateUsernameForScript(baseText);

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
