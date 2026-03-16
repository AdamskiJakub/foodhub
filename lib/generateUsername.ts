import prisma from "./prisma";

/**
 * Generates a unique username from a full name
 * Example: "Jakub Adamski" -> "jakub-adamski"
 * If duplicate, appends number: "jakub-adamski-2"
 */
export async function generateUsername(name: string): Promise<string> {
  let baseUsername = name
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

  // If doesn't exist, we're good!
  if (!existingUser) {
    return baseUsername;
  }

  // If exists, try with numbers: username-2, username-3, etc.
  let counter = 2;
  let candidateUsername = `${baseUsername}-${counter}`;

  while (
    await prisma.user.findUnique({ where: { username: candidateUsername } })
  ) {
    counter++;
    candidateUsername = `${baseUsername}-${counter}`;

    // Safety limit to prevent infinite loop
    if (counter > 1000) {
      throw new Error("Unable to generate unique username");
    }
  }

  return candidateUsername;
}
