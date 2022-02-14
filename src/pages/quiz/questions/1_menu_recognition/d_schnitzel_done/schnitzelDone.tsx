import { quizStore } from "@lehrlingsquiz/stores";
import { inject, observer } from "mobx-react";
import React from "react";
import { IMenuRecognitionProps } from "../interfaces";
import wienerSchnitzel from "@lehrlingsquiz/assets/img/wiener_schnitzel.jpg";
import "./schnitzelDone.scss";

interface SchnitzelDoneProps extends IMenuRecognitionProps {}

const SchnitzelDone: React.FC<SchnitzelDoneProps> = inject(
  quizStore.storeKey
)(
  observer(() => {
    return (
      <div className="schnitzel-done">
        <div className="schnitzel-done__content">
          <img src={wienerSchnitzel} alt="Wiener Schnitzel" />
          <p className="schnitzel-done__content__info">
            Geschafft! Das hast du dir jetzt redlich verdient!
          </p>

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

export default SchnitzelDone;
