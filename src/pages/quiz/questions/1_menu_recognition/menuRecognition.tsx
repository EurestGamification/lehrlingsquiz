import { quizStore } from "@lehrlingsquiz/stores";
import { inject, observer } from "mobx-react";
import React, { useState } from "react";
import MenuCourses from "./a_menu_courses/menuCourses";
import SchnitzelIngredients from "./b_schnitzel_ingredients/schnitzelIngredients";
import BreadSchnitzel from "./c_bread_schnitzel/breadSchnitzel";
import SchnitzelDone from "./d_schnitzel_done/schnitzelDone";
import { IMenuRecognitionProps } from "./interfaces";
import "./menuRecognition.scss";

const menuRecognitionSteps = {
  0: MenuCourses,
  1: SchnitzelIngredients,
  2: BreadSchnitzel,
  3: SchnitzelDone
} as const;

export const MenuRecognition: React.FC = inject(quizStore.storeKey)(
  observer(() => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const CurrentPage: React.FC<IMenuRecognitionProps> =
      menuRecognitionSteps[
        currentStep as keyof typeof menuRecognitionSteps
      ];

    return (
      <div className="menu-recognition">
        <h3>{quizStore.quizSteps[1]}</h3>
        <div className="menu-recognition__content">
          <CurrentPage
            onStepFinished={() => setCurrentStep(currentStep + 1)}
          />
        </div>
      </div>
    );
  })
);
