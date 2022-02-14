import React from "react";
import { ICustomerOrientationProps } from "../customerOrientation";
import "./customerInteraction.scss";
import customerOrdering from "@lehrlingsquiz/assets/img/customer_ordering.jpg";

interface CustomerInteractionProps
  extends ICustomerOrientationProps {}

const CustomerInteraction: React.FC<CustomerInteractionProps> = ({
  onStepFinished
}: CustomerInteractionProps) => {
  return (
    <div className="customer-interaction">
      <div className="customer-interaction__content">
        <img src={customerOrdering} alt="Gast bestellt" />
        <button
          onClick={() => {
            onStepFinished();
          }}
        >
          Weiter
        </button>
      </div>
    </div>
  );
};

export default CustomerInteraction;
