import React from "react";
import "./label.scss";

interface LabelProps {
  text: string;
  className?: string;
}

export const Label: React.FC<LabelProps> = ({
  text,
  className = ""
}: LabelProps) => {
  return <span className={`label ${className}`}>{text}</span>;
};
