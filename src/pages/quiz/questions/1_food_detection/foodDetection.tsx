import React from "react";
import "./foodDetection.scss";

export const FoodDetection: React.FC = () => {
  return (
    <div className="food-detection">
      <h3>Erkennen von Lebensmitteln</h3>
      <div className="food-detection__content"></div>
    </div>
  );
};
