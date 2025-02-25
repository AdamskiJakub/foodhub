import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const normalizeSlug = (slug) => {
  console.log("Original slug:", slug);

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
    Ą: "A",
    Ć: "C",
    Ę: "E",
    Ł: "L",
    Ń: "N",
    Ó: "O",
    Ś: "S",
    Ź: "Z",
    Ż: "Z",
  };

  const normalized = slug
    .split("")
    .map((char) => polishChars[char] || char)
    .join("")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();

  console.log("Normalized slug:", normalized);
  return normalized;
};

async function main() {
  const restaurants = await prisma.restaurant.findMany();

  for (const restaurant of restaurants) {
    const normalizedSlug = normalizeSlug(restaurant.slug);
    await prisma.restaurant.update({
      where: { id: restaurant.id },
      data: { slug: normalizedSlug },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
