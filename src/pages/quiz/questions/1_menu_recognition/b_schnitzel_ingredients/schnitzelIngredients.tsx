import React, { useState } from "react";
import { IMenuRecognitionProps } from "../interfaces";
import "./schnitzelIngredients.scss";
import pan from "@lehrlingsquiz/assets/img/pan.png";
import { shuffle } from "@lehrlingsquiz/util";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors
} from "@dnd-kit/core";

const correctIngredients: string[] = [
  "Eier",
  "Mehl",
  "Semmelbrösel",
  "Kartoffeln",
  "Zitrone",
  "Kalbsfleisch",
  "Petersilie",
  "Butterschmalz"
];

const fakeIngredients: string[] = [
  "Milch",
  "Tomaten",
  "Rosmarin",
  "Champignons",
  "Nudeln",
  "Schweinefleisch",
  "Schnittlauch"
];

const availaleIngredients: string[] = [
  ...correctIngredients,
  ...fakeIngredients
];

const Pan: React.FC = (props: any) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable"
  });
  const style = {
    backgroundColor: isOver ? "green" : undefined
  };

  return (
    <img
      ref={setNodeRef}
      style={style}
      src={pan}
      alt="Schnitzel Pfanne"
      className="schnitzel-ingredients__content__pan"
    />
  );
};

interface DraggableIngredientProps {
  title: string;
}

const DraggableIngredient: React.FC<DraggableIngredientProps> = ({
  title
}: DraggableIngredientProps) => {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: "draggable"
    });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
      }
    : undefined;

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {title}
    </button>
  );
};

interface SchnitzelIngredientsProps extends IMenuRecognitionProps {}

const SchnitzelIngredients: React.FC<SchnitzelIngredientsProps> = ({
  onStepFinished
}: SchnitzelIngredientsProps) => {
  const [ingredients, setIngredients] = useState<string[]>(
    shuffle<string>(availaleIngredients)
  );
  const sensors = useSensors(
    useSensor(TouchSensor),
    useSensor(MouseSensor)
  );

  return (
    <div className="schnitzel-ingredients">
      <DndContext sensors={sensors}>
        <div className="schnitzel-ingredients__content">
          <p className="schnitzel-ingredients__content__instruction">
            Super, und jetzt bereiten wir unsere Hauptspeise zu –
            heute gibt es ein Wiener Schnitzel!
            <br />
            <br />
            Kennst du die typischen Zutaten für ein traditionelles
            Wiener Schnitzel mit klassischer Beilage? Gib alle
            richtigen Zutaten in die Pfanne!
          </p>
          <h4>Verfügbare Zutaten</h4>
          <p>
            {ingredients.map((ingredient: string) => (
              <span key={ingredient}>{` ${ingredient} `}</span>
            ))}
            <DraggableIngredient title="test ingredient" />
          </p>
          <Pan />
          <button
            onClick={() => {
              onStepFinished();
            }}
          >
            Weiter
          </button>
        </div>
      </DndContext>
    </div>
  );
};

export default SchnitzelIngredients;
