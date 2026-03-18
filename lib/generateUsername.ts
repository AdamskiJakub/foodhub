import prisma from "./prisma";

export async function generateUsername(name: string): Promise<string> {
  const polishChars: { [key: string]: string } = {
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

  let baseUsername = name
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

  if (baseUsername.length === 0) {
    baseUsername = `user-${Math.random().toString(36).slice(2, 8)}`;
  }

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
