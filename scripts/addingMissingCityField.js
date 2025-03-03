import fs from "fs";
import path from "path";

function addMissingCityField(filePath) {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const updatedFeatures = data.features.map((feature) => {
      const properties = feature.properties;

      if (!properties["addr:city"]) {
        properties["addr:city"] = "Warszawa";
        console.log(
          `Dodano "addr:city" dla restauracji: ${
            properties.name || "bez nazwy"
          }`
        );
      }

      return feature;
    });

    data.features = updatedFeatures;

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    console.log("Zaktualizowano plik restaurantsWarsaw.json");
  } catch (error) {
    console.error("Błąd podczas aktualizacji pliku:", error);
  }
}

const filePath = path.join(process.cwd(), "public", "restaurantsWarsaw.json");

addMissingCityField(filePath);
