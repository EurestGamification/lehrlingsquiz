import { inject, observer } from "mobx-react";
import React from "react";
import { quizStore } from "src/stores/quize.store";

const Quiz: React.FC = inject(quizStore.storeKey)(
  observer(() => {
    return <div className="quiz">quiz</div>;
  })
);

export default Quiz;
