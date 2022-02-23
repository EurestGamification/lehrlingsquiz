import { quizStore } from "@lehrlingsquiz/stores";
import { inject, observer } from "mobx-react";
import React from "react";
import "./introduction.scss";
import claim from "@lehrlingsquiz/assets/img/claim.png";

const Introduction: React.FC = inject(quizStore.storeKey)(
  observer(() => {
    return (
      <div className="introduction">
        <img
          className="introduction__claim"
          src={claim}
          alt="Eurest Claim"
        />
        <p>some intro text...</p>
        <div className="introduction__action-wrapper">
          <button onClick={() => quizStore.startQuiz()}>
            Quiz starten
          </button>
        </div>
      </div>
    );
  })
);

export default Introduction;
