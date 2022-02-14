import { quizStore } from "@lehrlingsquiz/stores";
import { inject, observer } from "mobx-react";
import React from "react";
import "./customerOrientation.scss";

export const CustomerOrientation: React.FC = inject(
  quizStore.storeKey
)(
  observer(() => {
    return (
      <div className="customer-orientation">
        <h3>{quizStore.quizSteps[2]}</h3>
        <div className="customer-orientation__content">
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
