import React from "react";
import { useDroppable } from "@dnd-kit/core";

export interface DroppableProps {
  id?: any;
  className?: string;
  // eslint-disable-next-line no-undef
  children?: any;
}

export const Droppable: React.FC<DroppableProps> = ({
  id,
  className,
  children
}: DroppableProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id ?? "droppable"
  });
  const style = {
    opacity: isOver ? 0.5 : undefined
  };

  return (
    <div
      ref={setNodeRef}
      className={
        (className ? className + " " : "") + (isOver ? "isOver" : "")
      }
      style={style}
    >
      {children ?? ""}
    </div>
  );
};
