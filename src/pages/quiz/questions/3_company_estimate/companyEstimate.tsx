import { quizStore } from "@lehrlingsquiz/stores";
import { inject, observer } from "mobx-react";
import React from "react";
import "./companyEstimate.scss";

export const CompanyEstimate: React.FC = inject(quizStore.storeKey)(
  observer(() => {
    return (
      <div className="company-estimate">
        <h3>{quizStore.quizSteps[3]}</h3>
        <div className="company-estimate__content">
          <button
            onClick={() => {
              quizStore.setCurrentQuizStep(
                quizStore.currentQuizStep + 1
              );
              quizStore.endQuiz();
            }}
          >
            Weiter
          </button>
        </div>
      </div>
    );
  })
);
