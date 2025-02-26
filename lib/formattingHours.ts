export const formatOpeningHours = (
  openingHours: string | undefined | null,
  t: (key: string) => string
) => {
  if (!openingHours) return t("noOpeningHours");

  const dayTranslations: { [key: string]: string } = {
    Mo: "Pon",
    Tu: "Wt",
    We: "Śr",
    Th: "Czw",
    Fr: "Pt",
    Sa: "Sob",
    Su: "Nd",
  };

  const days = openingHours.split(";");
  console.log(days);

  return days
    .map((day) => {
      const [dayPart, hours] = day.trim().split(" ");

      const dayParts = dayPart.split(",");

      const translatedDays = dayParts.map((part) => {
        if (part.includes("-")) {
          const [startDay, endDay] = part.split("-");
          return `${dayTranslations[startDay] || startDay}-${
            dayTranslations[endDay] || endDay
          }`;
        } else {
          return dayTranslations[part] || part;
        }
      });

      return `${translatedDays.join(", ")} ${hours}`;
    })
    .join(", ");
};
