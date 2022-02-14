import { quizStore } from "@lehrlingsquiz/stores";
import { inject, observer } from "mobx-react";
import React from "react";
import "./results.scss";

const Results: React.FC = inject(quizStore.storeKey)(
  observer(() => {
    return (
      <div className="results">
        <div>Results</div>
        <button onClick={() => quizStore.resetQuiz()}>Reset</button>
      </div>
    );
  })
);

export default Results;
