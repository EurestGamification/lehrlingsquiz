import { quizStore } from "@lehrlingsquiz/stores";
import { inject, observer } from "mobx-react";
import React, { useState } from "react";
import "./companyEstimate.scss";

const questions = [
  {
    questionText:
      "Was denkst du, wie viele Mitarbeiter:innen beschäftigt Eurest in ganz Österreich?",
    answerOptions: [
      { answerText: "Ca. 700 Mitarbeiter:innen", isCorrect: false },
      { answerText: "Ca. 1.100 Mitarbeiter:innen", isCorrect: true },
      { answerText: "Ca. 1.600 Mitarbeiter:innen", isCorrect: false },
    ],
  },
  {
    questionText:
      "Schätze mal - wie biele Lehrlinge bildet Eurest jedes Jahr im Durchschnitt insgesamt aus?",
    answerOptions: [
      {
        answerText: "Durchschnittlich 8 Lehrlinge",
        isCorrect: false,
      },
      {
        answerText: "Durchschnittlich 30 Lehrlinge",
        isCorrect: true,
      },
      {
        answerText: "Durchschnittlich 65 Lehrlinge",
        isCorrect: false,
      },
    ],
  },
  {
    questionText:
      "Wie viele Restaurants betreiben wir deiner Einschätzung nach in ganz Österreich?",
    answerOptions: [
      { answerText: "Ca. 10 Restaurants", isCorrect: false },
      { answerText: "Ca. 60 Restaurants", isCorrect: true },
      { answerText: "Ca. 100 Restaurants", isCorrect: false },
    ],
  },
];



export const CompanyEstimate: React.FC = inject(quizStore.storeKey)(
  observer(() => {
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [isActive, setActive] = useState<boolean>(false);

    const checkAnswer = (isCorrect: boolean) => {
      if (isCorrect) {
        quizStore.setScore(quizStore.score + 1);
      }
      setActive(!isActive);
    };

    return (
      <div className="company-estimate">
        <h3>{quizStore.quizSteps[3]}</h3>
        <div className="company-estimate__content">
          <p className="company-estimate__content__instruction">
            {questions[currentQuestion].questionText}
          </p>
          <div className="company-estimate__content__answer-section">
            {questions[currentQuestion].answerOptions.map(
              (answerOption) => (
                <button
                  onClick={() => checkAnswer(answerOption.isCorrect)}
                  className="company-estimate__content__answer-item"
                >
                  {answerOption.answerText}
                </button>
              )
            )}
          </div>
          <button
            className={!isActive ? "inaktiv" : ""} 
            onClick={() => {
              const nextQuestion = currentQuestion + 1;
              if (nextQuestion < questions.length) {
                setCurrentQuestion(nextQuestion);
              } else {
                quizStore.setCurrentQuizStep(
                  quizStore.currentQuizStep + 1
                );
                quizStore.endQuiz();
              }
              setActive(!isActive);
            }}
          >
            Weiter
          </button> 
        </div>
      </div>
    );
  })
);
