import { quizStore } from "@lehrlingsquiz/stores";
import { inject, observer } from "mobx-react";
import React from "react";
import "./menuRecognition.scss";

export const MenuRecognition: React.FC = inject(quizStore.storeKey)(
  observer(() => {
    return (
      <div className="menu-recognition">
        <h3>Zubereitungsarten & Menüerkennung</h3>
        <div className="menu-recognition__content"></div>
      </div>
    );
  })
);
