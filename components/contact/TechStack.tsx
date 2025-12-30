"use client";

import { useTranslations } from "next-intl";
import { Code2, Database, Settings } from "lucide-react";

const TechStack = () => {
  const t = useTranslations("ContactPage");

  const techCategories = [
    {
      icon: <Code2 className="w-6 h-6" />,
      label: "Frontend",
      tech: t("techStack.frontend"),
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Database className="w-6 h-6" />,
      label: "Backend",
      tech: t("techStack.backend"),
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Settings className="w-6 h-6" />,
      label: "Other",
      tech: t("techStack.other"),
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="rounded-2xl bg-white p-8 shadow-xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {t("techStackTitle")}
      </h2>

      <div className="space-y-6">
        {techCategories.map((category) => (
          <div
            key={category.label}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`p-2 rounded-lg bg-gradient-to-br ${category.color} text-white`}
                >
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {category.label}
                </h3>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed pl-1">
                {category.tech}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500 text-center italic">
          FoodHub - {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default TechStack;
