import { quizStore } from "@lehrlingsquiz/stores";
import { inject, observer } from "mobx-react";
import React from "react";
import { IMenuRecognitionProps } from "../interfaces";

interface SchnitzelDoneProps extends IMenuRecognitionProps {}

const SchnitzelDone: React.FC<SchnitzelDoneProps> = inject(
  quizStore.storeKey
)(
  observer(() => {
    return (
      <div className="schnitzel-done">
        <div className="schnitzel-done__content">
          SchnitzelDone
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
