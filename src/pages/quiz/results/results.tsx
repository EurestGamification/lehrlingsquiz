import { quizStore } from "@lehrlingsquiz/stores";
import { inject, observer } from "mobx-react";
import React from "react";
import "./results.scss";

const Results: React.FC = inject(quizStore.storeKey)(
  observer(() => {
    return (
      <div className="results">
        <h3>Resultat</h3>
        <div className="results__content">
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
        <button onClick={() => quizStore.resetQuiz()}>
          Nochmal spielen
        </button>
      </div>
    );
  })
);

export default Results;
