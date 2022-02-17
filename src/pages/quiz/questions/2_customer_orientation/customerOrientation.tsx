import { quizStore } from "@lehrlingsquiz/stores";
import { inject, observer } from "mobx-react";
import React, { useState } from "react";
import CustomerInstruction from "./a_customer_instruction/customerInstruction";
import CustomerInteraction from "./b_customer_interaction/customerInteraction";
import "./customerOrientation.scss";

const customerOrientationSteps = {
  0: CustomerInstruction,
  1: CustomerInteraction
} as const;

export interface ICustomerOrientationProps {
  onStepFinished: () => any;
}

export const CustomerOrientation: React.FC = inject(
  quizStore.storeKey
)(
  observer(() => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const CurrentPage: React.FC<ICustomerOrientationProps> =
      customerOrientationSteps[
        currentStep as keyof typeof customerOrientationSteps
      ];

    return (
      <div className="customer-orientation">
        <h2>{quizStore.quizSteps[2]}</h2>
        <div className="customer-orientation__content">
          <CurrentPage
            onStepFinished={() => setCurrentStep(currentStep + 1)}
          />
        </div>
      </div>
    );
  })
);
