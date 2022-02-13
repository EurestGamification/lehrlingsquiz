import { Header } from "@lehrlingsquiz/components";
import { Step, StepLabel, Stepper } from "@mui/material";
import { inject, observer } from "mobx-react";
import React from "react";
import { quizStore } from "src/stores/quize.store";
import "./quiz.scss";

interface QuizProps {}

const Quiz: React.FC = inject(quizStore.storeKey)(
  observer(({}: QuizProps) => {
    const steps: any[] = [
      "Erkennen von Lebensmitteln",
      "Zubereitungsarten & Menüerkennung",
      "Kundenorientierung",
      "Quiz zum Unternehmen Eurest (Schätzfragen)"
    ];

    return (
      <div className="quiz">
        <Header />
        <div className="quiz__content">
          <Stepper
            alternativeLabel
            activeStep={quizStore.currentQuizStep}
          >
            {steps.map((label: string) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <button
            onClick={() =>
              quizStore.setCurrentQuizStep(
                quizStore.currentQuizStep - 1
              )
            }
          >
            Zurück
          </button>
          <button
            onClick={() =>
              quizStore.setCurrentQuizStep(
                quizStore.currentQuizStep + 1
              )
            }
          >
            Weiter
          </button>

          <button
            onClick={() => quizStore.setScore(quizStore.score + 1)}
          >
            increase score
          </button>
        </div>
      </div>
    );
  })
);

export default Quiz;
