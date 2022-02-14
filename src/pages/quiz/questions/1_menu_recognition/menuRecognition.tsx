import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { quizStore } from "@lehrlingsquiz/stores";
import { inject, observer } from "mobx-react";
import React, { useState } from "react";
import "./menuRecognition.scss";

export const SortableItem: React.FC = (props: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      test
      {/* ... */}
    </div>
  );
};

export const MenuRecognition: React.FC = inject(quizStore.storeKey)(
  observer(() => {
    const [items, setItems] = useState(["1", "2", "3"]);
    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates
      })
    );

    const handleDragEnd = (event: any) => {
      const { active, over } = event;

      if (active.id !== over.id) {
        setItems(items => {
          const oldIndex = items.indexOf(active.id);
          const newIndex = items.indexOf(over.id);

          return arrayMove(items, oldIndex, newIndex);
        });
      }
    };

    return (
      <div className="menu-recognition">
        <h3>{quizStore.quizSteps[1]}</h3>
        <div className="menu-recognition__content">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
              {items.map(id => (
                <SortableItem key={id} />
              ))}
            </SortableContext>
          </DndContext>
          <button
            onClick={() =>
              quizStore.setCurrentQuizStep(
                quizStore.currentQuizStep + 1
              )
            }
          >
            Weiter
          </button>
        </div>
      </div>
    );
  })
);
