export const formatOpeningHours = (
  openingHours: string | undefined | null,
  t: (key: string) => string,
  dayTranslations: { [key: string]: string }
) => {
  if (!openingHours) return t("noOpeningHours");

  const days = openingHours.split(";");

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
