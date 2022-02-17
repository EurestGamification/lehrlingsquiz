import { quizStore } from "@lehrlingsquiz/stores";
import { inject, observer } from "mobx-react";
import React from "react";
import "./introduction.scss";
import claim from "@lehrlingsquiz/assets/img/claim.png";

const Introduction: React.FC = inject(quizStore.storeKey)(
  observer(() => {
    return (
      <div className="introduction">
        <h2>Willkommen!</h2>
        <img
          className="introduction__claim"
          src={claim}
          alt="Eurest Claim"
        />
        <p>some intro text...</p>
        <button onClick={() => quizStore.startQuiz()}>
          Quiz starten
        </button>
      </div>
    );
  })
);

export default Introduction;
