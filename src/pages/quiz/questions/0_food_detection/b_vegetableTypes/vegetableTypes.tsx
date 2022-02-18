import React from "react";
import { IFoodDetectionProps } from "../foodDetection";
import "./vegetableTypes.scss";
import { quizStore } from "@lehrlingsquiz/stores";
import { inject, observer } from "mobx-react";

interface VegetableTypesProps extends IFoodDetectionProps {}

const VegetableTypes: React.FC<VegetableTypesProps> = inject(
  quizStore.storeKey
)(
  observer(() => {
    return (
      <div className="vegetableTypes">
        <p className="vegetableTypes__heading">
          Als Koch:Köchin arbeitet man täglich mit frischem Gemüse.
          Erkennst du die verschiedenen Gemüsesorten?
          <br />
          Ziehe das Gemüse zu seiner richtigen Bezeichnung.
        </p>
        <button
          onClick={() =>
            quizStore.setCurrentQuizStep(
              quizStore.currentQuizStep + 1
            )
          }
        >
          Weiter
        </button>
      </div>
    );
  })
);

export default VegetableTypes;
