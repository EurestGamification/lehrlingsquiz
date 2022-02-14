import { quizStore } from "@lehrlingsquiz/stores";
import { inject, observer } from "mobx-react";
import React from "react";
import "./foodDetection.scss";

export const FoodDetection: React.FC = inject(quizStore.storeKey)(
  observer(() => {
    return (
      <div className="food-detection">
        <h3>{quizStore.quizSteps[0]}</h3>
        <div className="food-detection__content">
          <button
            onClick={() =>
              quizStore.setCurrentQuizStep(
                quizStore.currentQuizStep + 1
              )
            }
          >
            Weiter
          </button>
        </div>
      </div>
    );
  })
);
