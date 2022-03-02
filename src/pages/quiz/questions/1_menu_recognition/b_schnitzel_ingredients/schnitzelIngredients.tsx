import React, { useState } from "react";
import "./schnitzelIngredients.scss";
import { countMatches } from "@lehrlingsquiz/util";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  SensorDescriptor,
  SensorOptions,
  TouchSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { quizStore } from "@lehrlingsquiz/stores";
import { IMenuRecognitionProps } from "../menuRecognition";
import _ from "lodash";
import { Droppable } from "@lehrlingsquiz/components";

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

const droppablePanId = "pan" as const;
const droppableStartId = "start" as const;

interface PanProps {
  ingredients: string[];
}

const Pan: React.FC<PanProps> = ({ ingredients }: PanProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "pan"
  });
  const style = {
    opacity: isOver ? 0.5 : undefined
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="schnitzel-ingredients__content__pan"
    >
      {ingredients.map((e: string, i: number) => (
        <DraggableIngredient
          title={e}
          key={`chosenIngredients-${e}`}
        ></DraggableIngredient>
      ))}
    </div>
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
      id: title
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
      className="draggable"
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
    _.shuffle<string>(availaleIngredients)
  );
  const [chosenIngredients, setChosenIngregients] = useState<
    string[]
  >([]);

  const sensors: SensorDescriptor<SensorOptions>[] = useSensors(
    useSensor(TouchSensor),
    useSensor(MouseSensor)
  );

  const resetIngredients: () => void = () => {
    setIngredients(_.shuffle<string>(availaleIngredients));
    setChosenIngregients([]);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const ingredient = event.active.id;
    const target = event.over?.id;

    if (
      target === droppablePanId &&
      chosenIngredients.length < 8 &&
      !chosenIngredients.includes(ingredient)
    ) {
      setIngredients(ingredients.filter((e) => e !== ingredient));
      setChosenIngregients([ingredient, ...chosenIngredients]);
    } else if (
      target === droppableStartId &&
      !ingredients.includes(ingredient)
    ) {
      setIngredients((prev) => [...prev, ingredient]);
      setChosenIngregients(
        chosenIngredients.filter((e) => e !== ingredient)
      );
    }
  };

  const checkAnswers: () => void = () => {
    quizStore.setScore(
      quizStore.score +
        countMatches(chosenIngredients, correctIngredients)
    );
  };

  return (
    <div className="schnitzel-ingredients">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="schnitzel-ingredients__content">
          <p className="schnitzel-ingredients__content__instruction">
            Super, und jetzt bereiten wir unsere Hauptspeise zu –
            heute gibt es ein Wiener Schnitzel!
            <br />
            Kennst du die typischen Zutaten für ein traditionelles
            Wiener Schnitzel mit klassischer Beilage? Gib alle acht
            richtigen Zutaten in die Pfanne!
            <br />
            <br />
            Achtung! Lies dir ganz genau durch, welches Gericht heute
            zubereitet wird!
          </p>
          <h4>Verfügbare Zutaten</h4>
          <Droppable
            className="schnitzel-ingredients__content__start"
            id={droppableStartId}
          >
            {ingredients.map((ingredient: string, i: number) => (
              <span key={ingredient}>
                <DraggableIngredient title={ingredient} />
                {i !== ingredients.length - 1 && " "}
              </span>
            ))}
          </Droppable>

          <div className="schnitzel-ingredients__content__actions">
            <p className="schnitzel-ingredients__content__actions__ingredient-counter">
              {chosenIngredients.length} von{" "}
              {correctIngredients.length} Zutaten
            </p>
            <button onClick={() => resetIngredients()}>
              Zutaten zurücksetzen
            </button>
          </div>

          <Pan ingredients={chosenIngredients} />

          <button
            onClick={() => {
              checkAnswers();
              onStepFinished();
            }}
            className="next"
          >
            Weiter
          </button>
        </div>
      </DndContext>
    </div>
  );
};

export default SchnitzelIngredients;
