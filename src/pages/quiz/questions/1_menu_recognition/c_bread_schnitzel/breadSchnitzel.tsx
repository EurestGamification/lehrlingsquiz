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
import React, { useReducer } from "react";
import "./breadSchnitzel.scss";
import { IMenuRecognitionProps } from "../menuRecognition";
import { quizStore } from "@lehrlingsquiz/stores";
import _ from "lodash";
import { Label } from "@lehrlingsquiz/components";

const bowlNamePrefix = "bowl" as const;

interface BowlProps {
  text: string;
  id: string;
  enabled?: boolean;
}

const Bowl: React.FC<BowlProps> = ({
  text,
  id,
  enabled = true
}: BowlProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
    disabled: !enabled
  });
  const style = {
    opacity: isOver ? 0.5 : undefined
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bread-schnitzel__content__bowl-wrapper__bowl ${
        !enabled ? "bowl-disabled" : ""
      }`}
    >
      <Label text={text} />
    </div>
  );
};

interface DraggableIngredientProps {
  name: string;
}

const DraggableIngredient: React.FC<DraggableIngredientProps> = ({
  name
}: DraggableIngredientProps) => {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: name
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
      {name}
    </button>
  );
};

type CombinedIngredients = {
  ingredients: string[];
  sortedIngredients: string[];
};

interface BreadSchnitzelProps extends IMenuRecognitionProps {}

const BreadSchnitzel: React.FC<BreadSchnitzelProps> = ({
  onStepFinished
}: BreadSchnitzelProps) => {
  const sensors: SensorDescriptor<SensorOptions>[] = useSensors(
    useSensor(TouchSensor),
    useSensor(MouseSensor)
  );
  const sortedIngredientsBuffer = ["", "", ""];
  const availableIngredients = ["Eier", "Semmelbrösel", "Mehl"];
  const correctlySortedIngredients = [
    availableIngredients[2],
    availableIngredients[0],
    availableIngredients[1]
  ];

  const [ingredients, setIngredients] = useReducer(
    (state: CombinedIngredients, newState: CombinedIngredients) => ({
      ...state,
      ...newState
    }),
    {
      ingredients: availableIngredients,
      sortedIngredients: sortedIngredientsBuffer
    }
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const ingredient = event.active.id;
    const bowl = event.over?.id;

    if (!bowl || !ingredient) return;

    const tempSortedIngredients = ingredients.sortedIngredients;
    tempSortedIngredients[bowl.slice(-1) as unknown as number] =
      ingredient;

    setIngredients({
      ingredients: ingredients.ingredients.filter(
        (e: string) => e !== ingredient
      ),
      sortedIngredients: tempSortedIngredients
    });
  };

  const checkAnswers: () => void = () => {
    if (
      _.isEqual(
        ingredients.sortedIngredients,
        correctlySortedIngredients
      )
    )
      quizStore.setScore(quizStore.score + 1);
  };

  const resetIngredients: () => void = () => {
    setIngredients({
      ingredients: availableIngredients,
      sortedIngredients: sortedIngredientsBuffer
    });
  };

  return (
    <div className="bread-schnitzel">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="bread-schnitzel__content">
          <p className="bread-schnitzel__content__instruction">
            Was darf bei der Zubereitung eines leckeren Schnitzels
            nicht fehlen? Richtig! Natürlich das Panieren unseres
            Schnitzels!
            <br />
            <br />
            Doch wie war nochmal die richtige Reihenfolge beim
            Panieren?
          </p>
          <div className="bread-schnitzel__content__ingredients">
            {ingredients.ingredients.map(
              (ingredient: string, i: number) => (
                <DraggableIngredient
                  key={ingredient}
                  name={ingredient}
                />
              )
            )}
          </div>
          <button onClick={() => resetIngredients()}>
            Zutaten zurücksetzen
          </button>
          <div className="bread-schnitzel__content__bowl-wrapper">
            {ingredients.sortedIngredients.map(
              (s: string, i: number) => (
                <Bowl
                  key={`${bowlNamePrefix}-${i}`}
                  id={`${bowlNamePrefix}-${i}`}
                  text={`${i + 1}. Zutat  `}
                  enabled={!s}
                />
              )
            )}
          </div>
          <ul className="bread-schnitzel__content__choice">
            {ingredients.sortedIngredients.map(
              (s: string, i: number) =>
                s && (
                  <li key={i}>
                    {i + 1}. {s}
                  </li>
                )
            )}
          </ul>

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

export default BreadSchnitzel;
