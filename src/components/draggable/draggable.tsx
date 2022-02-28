import React from "react";
import { useDraggable } from "@dnd-kit/core";

export interface DraggableProps {
  id?: any;
  className?: string;
  // eslint-disable-next-line no-undef
  cildren?: any;
}

export const Draggable: React.FC<DraggableProps> = ({
  children,
  id,
  className
}: any) => {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: id ?? "draggable"
    });
  const style: React.CSSProperties = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
      }
    : {};

  return (
    <button
      ref={setNodeRef}
      className={`${className ?? ""} draggable`}
      style={style}
      {...listeners}
      {...attributes}
    >
      {children ?? ""}
    </button>
  );
};
