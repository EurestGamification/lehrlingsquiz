import React, { ChangeEvent, useState } from "react";
import { ICustomerOrientationProps } from "../customerOrientation";
import "./customerInteraction.scss";
import { quizStore } from "@lehrlingsquiz/stores";
import { inject, observer } from "mobx-react";

interface CustomerInteractionProps
  extends ICustomerOrientationProps {}

const CustomerInteraction: React.FC<CustomerInteractionProps> =
  inject(quizStore.storeKey)(
    observer(() => {
      const answerChoices = [
        "Nein, das ist nicht möglich.",
        "Ja, selbstverständlich können Sie auch Reis bekommen.",
        "Moment, ich stimme das noch kurz mit unserer Küchenleitung ab."
      ] as const;
      const inputIdPrefix = "answer-option" as const;
      const [selectedAnswer, setSelectedAnswer] = useState<number>();

      const checkAnswer: () => void = () => {
        if (
          answerChoices[
            selectedAnswer as keyof typeof answerChoices
          ] === answerChoices[1]
        ) {
          quizStore.setScore(quizStore.score + 1);
        }
      };

      return (
        <div className="customer-interaction">
          <div className="customer-interaction__content">
            <div className="customer-interaction__content__question">
              <p>
                Gast: "Oh lecker, heute gibt es Schnitzel! Ich mag
                aber keine Kartoffeln, könnte ich stattdessen auch
                Reis haben?"
              </p>
            </div>
            <div className="customer-interaction__content__answer">
              {answerChoices.map((a: string, i: number) => (
                <p key={`${a}-${i}`}>
                  <input
                    id={`${inputIdPrefix}-${i}`}
                    type="radio"
                    name="answerOption"
                    value={i}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setSelectedAnswer(+e.target.value)
                    }
                  />
                  <label htmlFor={`${inputIdPrefix}-${i}`}>{a}</label>
                </p>
              ))}
            </div>
            <button
              onClick={() => {
                checkAnswer();
                quizStore.setCurrentQuizStep(
                  quizStore.currentQuizStep + 1
                );
              }}
            >
              Weiter
            </button>
          </div>
        </div>
      );
    })
  );

export default CustomerInteraction;
