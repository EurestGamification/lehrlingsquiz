import { quizStore } from "@lehrlingsquiz/stores";
import { inject, observer } from "mobx-react";
import React from "react";
import "./introduction.scss";
import claim from "@lehrlingsquiz/assets/img/claim.png";
import apprentice from "@lehrlingsquiz/assets/img/intro_apprentice.jpeg";

const Introduction: React.FC = inject(quizStore.storeKey)(
  observer(() => {
    return (
      <div className="introduction">
        <div className="introduction__images">
          <img
            className="introduction__images__claim"
            src={claim}
            alt="Eurest Claim"
          />
          <img
            className="introduction__images__apprentice"
            src={apprentice}
            alt="Eurest apprentice"
          />
        </div>
        <p className="introduction__instruction">
          some intro text...
        </p>
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
