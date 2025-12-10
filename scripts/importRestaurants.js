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

async function processFile(fileName) {
  const filePath = path.join(process.cwd(), "public", fileName);
  console.log("File path: ", filePath);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File ${fileName} does not exist. Skipping.\n`);
    return 0;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  if (!fileContent || fileContent.trim() === "") {
    console.log(`⚠️  File ${fileName} is empty. Skipping.\n`);
    return 0;
  }

  const data = JSON.parse(fileContent);
  const restaurants = data.features;
  let added = 0;

  for (const restaurant of restaurants) {
    const properties = restaurant.properties;
    const geometry = restaurant.geometry;

    if (
      !properties.name ||
      !properties["addr:city"] ||
      !properties["addr:street"]
    ) {
      console.log(`Not enough data to add restaurant: ${properties.name}`);
      continue;
    }

    const existingRestaurant = await prisma.restaurant.findUnique({
      where: { osmId: properties["@id"] },
    });

    if (existingRestaurant) {
      console.log(
        `Restaurant with osmId: ${properties["@id"]} already exist. Skip.`
      );
      continue;
    }

    let slug = normalizeSlug(properties.name);

    const existingSlug = await prisma.restaurant.findUnique({
      where: { slug },
    });

    if (existingSlug) {
      slug = `${slug}-${
        properties["addr:city"]?.substring(0, 3).toLowerCase() || "pl"
      }-${Date.now()}`;
      console.log(`⚠️  Slug collision, using: ${slug}`);
    }

    try {
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
      console.log(`✅ Added restaurant: ${properties.name} with slug: ${slug}`);
      added++;
    } catch (error) {
      console.error(`❌ Error adding ${properties.name}:`, error.message);
    }
  }

  return added;
}

async function main() {
  const files = [
    "restaurants.json",
    "restaurantsWarsaw.json",
    "restaurantsCracow.json",
  ];
  let totalAdded = 0;

  for (const file of files) {
    console.log(`\n=== Importing file: ${file} ===\n`);
    const added = await processFile(file);
    totalAdded += added;
    console.log(`\n📊 From file ${file} added: ${added} restaurants\n`);
  }

  const count = await prisma.restaurant.count();
  console.log(`\n✅ Import completed!`);
  console.log(`📊 Newly added: ${totalAdded}`);
  console.log(`📊 Total in database: ${count} restaurants\n`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
