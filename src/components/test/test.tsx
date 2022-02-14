import { DndContext, DragEndEvent } from "@dnd-kit/core";
import React, { useState } from "react";
import { Draggable, Droppable } from "../../components";

interface TestProps {}

const Test: React.FC<TestProps> = (props: TestProps) => {
  const [isDropped, setIsDropped] = useState(false);
  const draggableMarkup = <Draggable>Drag me</Draggable>;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!isDropped ? draggableMarkup : null}
      <Droppable>
        {isDropped ? draggableMarkup : "Drop here"}
      </Droppable>
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    if (event.over && event.over.id === "droppable") {
      setIsDropped(true);
    }
  }
};

export { Test };
