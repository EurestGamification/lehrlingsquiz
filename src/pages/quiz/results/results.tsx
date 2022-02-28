import { quizStore } from "@lehrlingsquiz/stores";
import { inject, observer } from "mobx-react";
import React from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import apprentice from "@lehrlingsquiz/assets/img/results_apprentice.jpeg";
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
          <img src={apprentice} alt="Eurest apprentice" />
          <h4 className="results__content__score">
            {quizStore.score}/16 Punkte
          </h4>
          {quizStore.score >= 12 ? (
            <p>
              Herzlichen Glückwunsch! Du bist perfekt für eine
              Koch-Lehre bei der Eurest geeignet! Bewirb dich gleich
              hier: *Link
            </p>
          ) : quizStore.score >= 7 ? (
            <p>
              Du hast dich schon gut geschlagen!
              <br />
              Das Interesse am Lehrberuf Koch:Köchin ist auf jeden
              Fall vorhanden, an einigen Stellen jedoch noch
              ausbaufähig.
              <br />
              Diese Fertigkeiten können wir dir in einer Lehre bei uns
              auf alle Fälle beibringen – bewirb dich doch deshalb
              direkt bei uns: *Link*
            </p>
          ) : (
            <p>
              Zum jetzigen Zeitpunkt fehlt dir das nötige Interesse an
              Lebensmitteln wohl noch etwas.
              <br />
              Das kann aber auf jeden Fall noch verbessert werden.
              Versuche es doch einfach noch einmal mit unserem
              Interessenstest!
            </p>
          )}
          <button
            onClick={() => quizStore.resetQuiz()}
            className="results__content__restart"
          >
            Nochmal spielen
          </button>
        </div>
      </div>
    );
  })
);

export default Results;
