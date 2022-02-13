import { quizStore } from "@lehrlingsquiz/stores";
import { inject, observer } from "mobx-react";
import React from "react";
import "./customerOrientation.scss";

export const CustomerOrientation: React.FC = inject(
  quizStore.storeKey
)(
  observer(() => {
    return (
      <div className="customer-orientation">
        <h3>Zubereitungsarten & Menüerkennung</h3>
        <div className="customer-orientation__content"></div>
      </div>
    );
  })
);
