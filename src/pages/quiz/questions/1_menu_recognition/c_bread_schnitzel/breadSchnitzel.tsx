import React from "react";
import { IMenuRecognitionProps } from "../interfaces";
import "./breadSchnitzel.scss";

interface BreadSchnitzelProps extends IMenuRecognitionProps {}

const BreadSchnitzel: React.FC<BreadSchnitzelProps> = ({
  onStepFinished
}: BreadSchnitzelProps) => {
  const checkAnswers: () => void = () => {};

  return (
    <div className="bread-schnitzel">
      <div className="bread-schnitzel__content">
        <p className="bread-schnitzel__content__instruction">
          Was darf bei der Zubereitung eines leckeren Schnitzels nicht
          fehlen? Richtig! Natürlich das Panieren unseres Schnitzels!
          <br />
          <br />
          Doch wie war nochmal die richtige Reihenfolge beim Panieren?
        </p>

        <button
          onClick={() => {
            checkAnswers();
            onStepFinished();
          }}
        >
          Weiter
        </button>
      </div>
    </div>
  );
};

export default BreadSchnitzel;
