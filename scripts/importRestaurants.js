import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

const normalizeSlug = (slug) => {
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
  const filePath = path.join(process.cwd(), "public", "restaurantsWarsaw.json");
  console.log("Ścieżka do pliku: ", filePath);
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const restaurants = data.features;

  for (const restaurant of restaurants) {
    const properties = restaurant.properties;
    const geometry = restaurant.geometry;

    if (
      !properties.name ||
      !properties["addr:city"] ||
      !properties["addr:street"]
    ) {
      console.log(`Brak wymaganych danych dla restauracji: ${properties.name}`);
      continue;
    }

    const existingRestaurant = await prisma.restaurant.findUnique({
      where: { osmId: properties["@id"] },
    });

    if (existingRestaurant) {
      console.log(
        `Restauracja o osmId: ${properties["@id"]} już istnieje. Pomijam.`
      );
      continue;
    }

    const slug = normalizeSlug(properties.name);

    await prisma.restaurant.create({
      data: {
        osmId: properties["@id"],
        name: properties.name,
        city: properties["addr:city"],
        country: properties["addr:country"] || "PL",
        street: properties["addr:street"],
        housenumber: properties["addr:housenumber"],
        postcode: properties["addr:postcode"],
        cuisine: properties.cuisine,
        email: properties.email,
        phone: properties.phone,
        website: properties.website,
        operator: properties.operator,
        openingHours: properties["opening_hours"],
        coordinates: geometry,
        building: properties.building,
        buildingLevels: properties["building:levels"],
        buildingMaterial: properties["building:material"],
        checkDate: properties["check_date:opening_hours"],
        outdoorSeating: properties["outdoor_seating"] === "yes",
        smoking: properties.smoking,
        takeaway: properties.takeaway === "yes",
        delivery: properties.delivery === "yes",
        wheelchair: properties.wheelchair,
        reservation: properties.reservation === "yes",
        paymentMethods: {
          americanExpress: properties["payment:american_express"] === "yes",
          cash: properties["payment:cash"] === "yes",
          contactless: properties["payment:contactless"] === "yes",
          mastercard: properties["payment:mastercard"] === "yes",
          visa: properties["payment:visa"] === "yes",
        },
        contactEmail: properties["contact:email"],
        contactFacebook: properties["contact:facebook"],
        contactInstagram: properties["contact:instagram"],
        contactMobile: properties["contact:mobile"],
        contactWebsite: properties["contact:website"],
        officialName: properties["official_name"],
        dietVegetarian: properties["diet:vegetarian"] === "yes",
        slug: slug,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    console.log(`Dodano restaurację: ${properties.name} z slugiem: ${slug}`);
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
