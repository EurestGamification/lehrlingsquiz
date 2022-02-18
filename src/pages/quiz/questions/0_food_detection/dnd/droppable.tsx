import { useDroppable } from "@dnd-kit/core";

export function Droppable(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id ?? "droppable"
  });

  return (
    <div
      ref={setNodeRef}
      className={
        (props.className ? props.className + " " : "") +
        (isOver ? "isOver" : "")
      }
    >
      {props.children}
    </div>
  );
}
