import { quizStore } from "@lehrlingsquiz/stores";
import { inject, observer } from "mobx-react";
import React from "react";
import "./introduction.scss";

const Introduction: React.FC = inject(quizStore.storeKey)(
  observer(() => {
    return (
      <div className="introduction">
        <div>Introduction</div>
        <p>some intro text...</p>
        <button onClick={() => quizStore.startQuiz()}>
          Quiz starten
        </button>
      </div>
    );
  })
);

export default Introduction;
