import React from "react";
import { ICustomerOrientationProps } from "../customerOrientation";
import "./customerInstruction.scss";

interface CustomerInstructionProps
  extends ICustomerOrientationProps {}

const CustomerInstruction: React.FC<CustomerInstructionProps> = ({
  onStepFinished
}: CustomerInstructionProps) => {
  return (
    <div className="customer-instruction">
      <div className="customer-instruction__content">
        <p className="customer-instruction__content__instruction">
          Bei uns in der Lehre zum Koch/zur Köchin bist du auch in der
          Essensausgabe eingeteilt.
          <br />
          Ein Kunde hat einen besonderen Wunsch – wie reagierst du?
        </p>
        <button
          onClick={() => {
            onStepFinished();
          }}
          className="next"
        >
          Weiter
        </button>
      </div>
    </div>
  );
};

export default CustomerInstruction;
