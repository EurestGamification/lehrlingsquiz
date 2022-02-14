import React from "react";
import { IMenuRecognitionProps } from "../interfaces";
import "./schnitzelIngredients.scss";

interface SchnitzelIngredientsProps extends IMenuRecognitionProps {}

const SchnitzelIngredients: React.FC<SchnitzelIngredientsProps> = ({
  onStepFinished
}: SchnitzelIngredientsProps) => {
  return (
    <div className="schnitzel-ingredients">
      <div className="schnitzel-ingredients__content">
        <p className="schnitzel-ingredients__content__instruction">
          Super, und jetzt bereiten wir unsere Hauptspeise zu – heute
          gibt es ein Wiener Schnitzel!
        </p>
      </div>
    </div>
  );
};

export default SchnitzelIngredients;
