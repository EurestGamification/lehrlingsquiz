import { quizStore } from "@lehrlingsquiz/stores";
import { inject, observer } from "mobx-react";
import React from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import "./results.scss";

const Results: React.FC = inject(quizStore.storeKey)(
  observer(() => {
    const { width, height } = useWindowSize();

    return (
      <div className="results">
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={300}
        />
        <h2>Resultat</h2>
        <div className="results__content">
          <h4 className="results__content__score">
            {quizStore.score}/16 Punkte
          </h4>
          <button onClick={() => quizStore.resetQuiz()}>
            Nochmal spielen
          </button>
          {quizStore.score >= 12 ? (
            <p>
              Herzlichen Glückwunsch! Du bist perfekt für eine
              Koch-Lehre bei der Eurest geeignet! Bewirb dich gleich
              hier: *Link
            </p>
          ) : (
            <p>
              Du hast dich gut geschlagen! Dein Interesse an diesem
              Lehrberuf ist auf alle Fälle da, nur bei ein paar
              kleinen Punkten gibt es noch etwas Nachholbedarf. Das
              macht aber gar nichts – genau diese Fertigkeiten
              bekommst du dann bei uns vermittelt! Bewerbe dich doch
              gleich hier: *Link* oder lies dir noch ein paar weitere
              Informationen hier *Link* durch!
            </p>
          )}
        </div>
      </div>
    );
  })
);

export default Results;
