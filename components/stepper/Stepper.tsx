import React from "react";

interface StepperProps {
  currentStep: number;
}

export const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
  const steps = ["Restaurant Details", "Preview", "Payment"];

  return (
    <div className="flex mb-8">
      <ol className="flex md:flex-row flex-col gap-2 md:gap-0 md:space-x-4">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <li key={index} className="flex items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center text-md rounded-full 
                  ${
                    isActive
                      ? "bg-[#5647FF] text-white"
                      : isCompleted
                      ? "bg-[#000000] text-white"
                      : "bg-[#D1D5DB] text-[#374151]"
                  }`}
              >
                {index + 1}
              </div>
              <span
                className={`ml-2 text-md ${
                  isActive ? "text-[#5647FF]" : "text-[#374151]"
                }`}
              >
                {step}
              </span>
              {index < steps.length - 1 && (
                <div className="hidden md:block w-8 h-px bg-gray-300 mx-2"></div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};
