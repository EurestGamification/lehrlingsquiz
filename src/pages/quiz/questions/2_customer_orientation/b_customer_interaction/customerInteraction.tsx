import React from "react";
import { ICustomerOrientationProps } from "../customerOrientation";
import "./customerInteraction.scss";
import customerOrdering from "@lehrlingsquiz/assets/img/customer_ordering.jpg";
import { quizStore } from "@lehrlingsquiz/stores";
import { inject, observer } from "mobx-react";

interface CustomerInteractionProps
  extends ICustomerOrientationProps {}

const CustomerInteraction: React.FC<CustomerInteractionProps> =
  inject(quizStore.storeKey)(
    observer(() => {
      return (
        <div className="customer-interaction">
          <div className="customer-interaction__content">
            <img src={customerOrdering} alt="Gast bestellt" />
            <button
              onClick={() => {
                quizStore.setCurrentQuizStep(
                  quizStore.currentQuizStep + 1
                );
              }}
            >
              Weiter
            </button>
          </div>
        </div>
      );
    })
  );

export default CustomerInteraction;
