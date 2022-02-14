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
import React, { useState } from "react";
import bowl from "@lehrlingsquiz/assets/img/bowl.png";
import "./breadSchnitzel.scss";
import { IMenuRecognitionProps } from "../menuRecognition";

const bowlNamePrefix = "bowl" as const;

interface BowlProps {
  name: string;
}

const Bowl: React.FC<BowlProps> = ({ name }: BowlProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: name
  });
  const style = {
    backgroundColor: isOver ? "#dfdfdf" : undefined
  };

  return (
    <img
      ref={setNodeRef}
      style={style}
      src={bowl}
      alt="Schnitzel Panierzutaten Schüssel"
      className="bread-schnitzel__content__bowl-wrapper__bowl"
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
    >
      {title}
    </button>
  );
};

interface BreadSchnitzelProps extends IMenuRecognitionProps {}

const BreadSchnitzel: React.FC<BreadSchnitzelProps> = ({
  onStepFinished
}: BreadSchnitzelProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ingredients, setIngredients] = useState<string[]>([
    "Eier",
    "Semmelbrösel",
    "Mehl"
  ]);
  const sensors: SensorDescriptor<SensorOptions>[] = useSensors(
    useSensor(TouchSensor),
    useSensor(MouseSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ingredient = event.active.id;
  };

  const checkAnswers: () => void = () => {};

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
            {ingredients.map((ingredient: string, i: number) => (
              <DraggableIngredient title={ingredient} />
            ))}
          </div>
          <div className="bread-schnitzel__content__bowl-wrapper">
            {new Array(3).fill(null).map((_, i: number) => (
              <Bowl name={`${bowlNamePrefix}-${i}`} />
            ))}
          </div>

          <button
            onClick={() => {
              checkAnswers();
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

export default BreadSchnitzel;
