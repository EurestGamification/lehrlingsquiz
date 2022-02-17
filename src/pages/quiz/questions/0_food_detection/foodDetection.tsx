import { quizStore } from "@lehrlingsquiz/stores";
import { inject, observer } from "mobx-react";
import React, { useState } from "react";
import "./foodDetection.scss";
import BreadTypes from "./a_breadTypes/breadTypes";
import VegetableTypes from "./b_vegetableTypes/vegetableTypes";

const foodDetectionSteps = {
  0: BreadTypes,
  1: VegetableTypes
} as const;

export interface IFoodDetectionProps {
  onStepFinished: () => any
}

export const FoodDetection: React.FC = inject(quizStore.storeKey)(
  observer(() => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const CurrentPage: React.FC<IFoodDetectionProps> = foodDetectionSteps[
      currentStep as keyof typeof foodDetectionSteps
    ];

    return (
      <div className="foodDetection">
        <h2>{quizStore.quizSteps[0]}</h2>
        <div className="foodDetection__content">
          <CurrentPage onStepFinished={() => setCurrentStep(currentStep + 1)} />
        </div>
      </div>
    );
  })
);
