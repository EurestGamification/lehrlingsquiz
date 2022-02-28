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
        <h2>
          Zukünftige:r Spitzenkoch:köchin in Sicht? Finde es heraus!
        </h2>
        <p className="introduction__instruction">
          Liebst du das Kochen und wolltest schon lange rausfinden, ob
          du dich für eine Lehre in der Gastronomie eignest?
          <br />
          Mit unserem Tool erfährst du ganz schnell und einfach, ob du
          das notwendige Interesse am Lehrberuf Koch:Köchin
          mitbringst.
          <br />
          Klicke dich einfach durch die einzelnen Bereiche, sammle so
          viele Punkte als möglich und im Nu erhältst du eine
          Rückmeldung!
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
