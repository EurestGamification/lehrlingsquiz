import React from "react";
import { useDraggable } from "@dnd-kit/core";

export function Draggable(props: any) {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: props.id ?? "draggable"
    });
  const style: React.CSSProperties = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
      }
    : {};

  return (
    <button
      ref={setNodeRef}
      className={`${props.className ?? ""} draggable`}
      style={style}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </button>
  );
}
