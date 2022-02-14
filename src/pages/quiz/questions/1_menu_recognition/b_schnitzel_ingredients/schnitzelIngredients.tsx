import React, { useState } from "react";
import { IMenuRecognitionProps } from "../interfaces";
import "./schnitzelIngredients.scss";
import pan from "@lehrlingsquiz/assets/img/pan.png";
import { shuffle } from "@lehrlingsquiz/util";
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

const Pan: React.FC = (props: any) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "pan"
  });
  const style = {
    backgroundColor: isOver ? "#dfdfdf" : undefined
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

interface SchnitzelIngredientsProps extends IMenuRecognitionProps {}

const SchnitzelIngredients: React.FC<SchnitzelIngredientsProps> = ({
  onStepFinished
}: SchnitzelIngredientsProps) => {
  const [ingredients, setIngredients] = useState<string[]>(
    shuffle<string>(availaleIngredients)
  );
  const [chosenIngredients, setChosenIngregients] = useState<
    string[]
  >([]);

  const sensors: SensorDescriptor<SensorOptions>[] = useSensors(
    useSensor(TouchSensor),
    useSensor(MouseSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const ingredient = event.active.id;
    console.log(ingredient);

    if (event.over && event.over.id === droppablePanId) {
      setIngredients(ingredients.filter(e => e !== ingredient));
      setChosenIngregients([...chosenIngredients, ingredient]);
    }
  };

  const checkAnswers: () => void = () => {
    let additionalPoints = 0;
  };

  return (
    <div className="schnitzel-ingredients">
      <DndContext
        sensors={sensors}
        onDragEnd={(e: DragEndEvent) => handleDragEnd(e)}
      >
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
            {ingredients.map((ingredient: string, i: number) => (
              <>
                <DraggableIngredient
                  key={ingredient}
                  title={ingredient}
                />
                {i !== ingredients.length - 1 && " "}
              </>
            ))}
          </p>
          <Pan />
          <div className="schnitzel-ingredients__content__chosen-ingredients">
            {chosenIngredients.map((e: string, i: number) => (
              <>
                <span key={`chosenIngredients-${e}`}>{e}</span>
                {i !== chosenIngredients.length - 1 && ", "}
              </>
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

export default SchnitzelIngredients;
