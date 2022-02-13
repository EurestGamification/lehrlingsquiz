import { Header } from "@lehrlingsquiz/components";
import { inject, observer } from "mobx-react";
import React from "react";
import { quizStore } from "src/stores/quize.store";
import "./quiz.scss";

interface QuizProps {}

const Quiz: React.FC = inject(quizStore.storeKey)(
  observer(({}: QuizProps) => {
    return (
      <div className="quiz">
        <Header />
        <div className="quiz__content">
          <div>{quizStore.score}</div>
          <button
            onClick={() => quizStore.setScore(quizStore.score + 1)}
          >
            increase
          </button>
        </div>
      </div>
    );
  })
);

export default Quiz;
