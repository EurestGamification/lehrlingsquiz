import { quizStore } from "@lehrlingsquiz/stores";
import { inject, observer } from "mobx-react";
import React from "react";
import "./companyEstimate.scss";

export const CompanyEstimate: React.FC = inject(quizStore.storeKey)(
  observer(() => {
    return (
      <div className="company-estimate">
        <h3>Quiz zum Unternehmen Eurest</h3>
        <div className="company-estimate__content"></div>
      </div>
    );
  })
);
