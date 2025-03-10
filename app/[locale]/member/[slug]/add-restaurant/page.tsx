"use client";

import React, { useState } from "react";
import { Stepper } from "@/components/stepper/Stepper";
import RestaurantForm from "@/components/add-restaurant/RestaurantFrom";
import { RestaurantFormValues } from "@/lib/validation/restaurantSchema";
import PreviewStep from "@/components/add-restaurant/PreviewStep";

export default function AddRestaurantPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<RestaurantFormValues | null>(null);

  const handleStep1Next = (data: RestaurantFormValues) => {
    setFormData(data);
    setCurrentStep(1);
  };

  const handleStep2Next = () => {
    setCurrentStep(2);
  };

  //   const handlePaymentSuccess = () => {
  //     console.log("Payment successful! Restaurant added.");
  //   };

  return (
    <div>
      <Stepper currentStep={currentStep} />

      {currentStep === 0 && <RestaurantForm onNextStep={handleStep1Next} />}
      {currentStep === 1 && formData && (
        <PreviewStep
          formData={formData}
          onPreviousStep={() => setCurrentStep(0)}
          onNextStep={handleStep2Next}
        />
      )}
      {/* {currentStep === 2 && (
        <Step3Payment
          onPaymentSuccess={handlePaymentSuccess}
          onPreviousStep={() => setCurrentStep(1)}
        />
      )}  */}
    </div>
  );
}
