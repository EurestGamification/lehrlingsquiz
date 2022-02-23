import { Header } from "@lehrlingsquiz/components";
import {
  Step,
  StepIconProps,
  StepLabel,
  Stepper,
  styled
} from "@mui/material";
import { inject, observer } from "mobx-react";
import React, { useState } from "react";
import { quizStore } from "src/stores/quize.store";
import Introduction from "./introduction/introduction";
import {
  CompanyEstimate,
  CustomerOrientation,
  FoodDetection,
  MenuRecognition
} from "./questions";
import "./quiz.scss";
import Results from "./results/results";

export const questionPages = {
  0: FoodDetection,
  1: MenuRecognition,
  2: CustomerOrientation,
  3: CompanyEstimate
} as const;

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    ownerState.active || ownerState.completed
      ? theme.palette.primary.main
      : theme.palette.primary[
          "100" as keyof typeof theme.palette.primary
        ],
  color: "#fff",
  height: 25,
  width: 25,
  paddingTop: "2px",
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "flex-start"
}));

const ColorlibStepIcon = (props: StepIconProps) => {
  const { active, completed, className } = props;

  const icons: { [index: string]: string } = {
    1: "1",
    2: "2",
    3: "3",
    4: "4"
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
};

interface QuizProps {}

const Quiz: React.FC<QuizProps> = inject(quizStore.storeKey)(
  observer((props: QuizProps) => {
    const ActiveQuizPage: React.FC =
      questionPages[
        quizStore.currentQuizStep as keyof typeof questionPages
      ];

    const [activatedCancel, setActivatedCancel] =
      useState<boolean>(false);

    return (
      <div className="quiz">
        <Header />
        {!quizStore.isQuizStarted ? (
          <Introduction />
        ) : quizStore.isQuizEnded ? (
          <Results />
        ) : (
          <>
            <div className="quiz__stepper">
              <Stepper
                alternativeLabel
                activeStep={quizStore.currentQuizStep}
                onEnded={() => quizStore.endQuiz()}
              >
                {quizStore.quizSteps.map((label: string) => (
                  <Step key={label}>
                    <StepLabel
                      StepIconComponent={ColorlibStepIcon}
                    ></StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
            <div className="quiz__content">
              <ActiveQuizPage />
            </div>

            <div className="quiz__actions">
              {activatedCancel ? (
                <div className="quiz__actions__cancel-confirm">
                  <button
                    className="quiz__actions__cancel-confirm__y"
                    onClick={() => {
                      setActivatedCancel((prev) => !prev);
                      quizStore.resetQuiz();
                    }}
                  >
                    Ja
                  </button>
                  <button
                    className="quiz__actions__cancel-confirm__n"
                    onClick={() =>
                      setActivatedCancel((prev) => !prev)
                    }
                  >
                    Nein
                  </button>
                  <span>Wirklich abbrechen?</span>
                </div>
              ) : (
                <button
                  onClick={() => setActivatedCancel((prev) => !prev)}
                  className="quiz__actions__cancel"
                >
                  Quiz abbrechen
                </button>
              )}
            </div>
          </>
        )}
      </div>
    );
  })
);

export default Quiz;
