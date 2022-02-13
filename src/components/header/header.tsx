import { inject, observer } from "mobx-react";
import React from "react";
import { quizStore } from "src/stores";
import logo from "@lehrlingsquiz/assets/img/logo.png";
import "./header.scss";

export const Header: React.FC = inject(quizStore.storeKey)(
  observer(() => {
    return (
      <div className="header">
        <img src={logo} alt="Eurest Logo" className="header__logo" />
        <h1 className="header__title">Lehrlingsquiz</h1>
        <h2 className="header__score">Punkte: {quizStore.score}</h2>
      </div>
    );
  })
);
