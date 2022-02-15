import { quizStore } from "@lehrlingsquiz/stores";
import { inject, observer } from "mobx-react";
import React from "react";
import apprentice from "@lehrlingsquiz/assets/img/results_apprentice.jpg";
import "./results.scss";

const Results: React.FC = inject(quizStore.storeKey)(
  observer(() => {
    return (
      <div className="results">
        <h3>Resultat</h3>
        <div className="results__content">
          <img
            className="results__content__apprentice"
            src={apprentice}
            alt="Eurest Lehrling"
          />
          <h4 className="results__content__score">
            {quizStore.score}/16 Punkte
          </h4>
          <button onClick={() => quizStore.resetQuiz()}>
            Nochmal spielen
          </button>
          {quizStore.score >= 12 ? (
            <div>
              Herzlichen Glückwunsch! Du bist perfekt für eine
              Koch-Lehre bei der Eurest geeignet! Bewirb dich gleich
              hier: *Link
            </div>
          ) : (
            <div>
              Du hast dich gut geschlagen! Dein Interesse an diesem
              Lehrberuf ist auf alle Fälle da, nur bei ein paar
              kleinen Punkten gibt es noch etwas Nachholbedarf. Das
              macht aber gar nichts – genau diese Fertigkeiten
              bekommst du dann bei uns vermittelt! Bewerbe dich doch
              gleich hier: *Link* oder lies dir noch ein paar weitere
              Informationen hier *Link* durch!
            </div>
          )}
        </div>
      </div>
    );
  })
);

export default Results;
