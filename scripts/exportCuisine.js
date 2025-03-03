import fs from "fs";

const rawData = fs.readFileSync("public/restaurantsWarsaw.json", "utf-8");
const jsonData = JSON.parse(rawData);

const cuisines = jsonData.features
  .map((feature) => feature.properties.cuisine)
  .filter((cuisine) => cuisine)
  .map((cuisine) => cuisine.split(";"))
  .flat()
  .map((cuisine) => cuisine.trim())
  .filter((cuisine, index, self) => self.indexOf(cuisine) === index)
  .sort();

fs.writeFileSync("cuisines.json", JSON.stringify(cuisines, null, 2), "utf-8");

console.log("Zapisano cuisines.json");
