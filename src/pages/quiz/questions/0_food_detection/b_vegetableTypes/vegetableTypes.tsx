import React, { useState } from "react";
import { IFoodDetectionProps } from "../foodDetection";
import "./vegetableTypes.scss";
import { quizStore } from "@lehrlingsquiz/stores";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  SensorDescriptor,
  SensorOptions,
  TouchSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { Droppable } from "../dnd/droppable";
import { Draggable } from "../dnd/draggable";

// ! DnD out of position when scrolling
// TODO make droppables to sortables
// TODO make drag overlay with modifier for 'restrictWindowEdge'
// TODO color draggables border green if correct and red if wrong

interface VegetableTypesProps extends IFoodDetectionProps {}

interface DnDs {
  [key: string]: Vegetable | null;
}

// eslint-disable-next-line no-unused-vars
enum Vegetable {
  // eslint-disable-next-line no-unused-vars
  Karotte,
  // eslint-disable-next-line no-unused-vars
  Zucchini,
  // eslint-disable-next-line no-unused-vars
  Kohlrabi,
  // eslint-disable-next-line no-unused-vars
  Radieschen,
  // eslint-disable-next-line no-unused-vars
  Lauch,
  // eslint-disable-next-line no-unused-vars
  Jungzwiebel
}

// eslint-disable-next-line no-unused-vars
const vegetableSources: { [key in Vegetable]: string } = {
  [Vegetable.Karotte]:
    "@lehrlingsquiz/assets/img/wiener_schnitzel.jpg",
  [Vegetable.Zucchini]:
    "@lehrlingsquiz/assets/img/wiener_schnitzel.jpg",
  [Vegetable.Kohlrabi]:
    "@lehrlingsquiz/assets/img/wiener_schnitzel.jpg",
  [Vegetable.Radieschen]:
    "@lehrlingsquiz/assets/img/wiener_schnitzel.jpg",
  [Vegetable.Lauch]: "@lehrlingsquiz/assets/img/wiener_schnitzel.jpg",
  [Vegetable.Jungzwiebel]:
    "@lehrlingsquiz/assets/img/wiener_schnitzel.jpg"
};

const VegetableTypes: React.FC<VegetableTypesProps> = () => {
  const sensors: SensorDescriptor<SensorOptions>[] = useSensors(
    useSensor(TouchSensor),
    useSensor(MouseSensor)
  );

  const [currentStart, setCurrentStart] = useState<Array<Vegetable>>([
    Vegetable.Karotte,
    Vegetable.Zucchini,
    Vegetable.Kohlrabi,
    Vegetable.Radieschen,
    Vegetable.Lauch,
    Vegetable.Jungzwiebel
  ]);

  const [currentDnDs, setCurrentDnDs] = useState<DnDs>({
    [Vegetable.Karotte]: null,
    [Vegetable.Zucchini]: null,
    [Vegetable.Kohlrabi]: null,
    [Vegetable.Radieschen]: null,
    [Vegetable.Lauch]: null,
    [Vegetable.Jungzwiebel]: null
  });

  return (
    <div className="vegetables">
      <p className="vegetables__heading">
        Als Koch:Köchin arbeitet man täglich mit frischem Gemüse.
        Erkennst du die verschiedenen Gemüsesorten? Ziehe die
        Bezeichnung zu dem richtigen Gemüse.
      </p>
      <div className="vegetables__content">
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <Droppable
            id="Start"
            className="vegetables__content__droppable vegetables__content__droppable__start"
          >
            {currentStart.map((vegetable) => (
              <Draggable
                id={Vegetable[vegetable]}
                key={vegetable}
                className="vegetables__content__draggable"
              >
                {Vegetable[vegetable]}
              </Draggable>
            ))}
          </Droppable>

          {Object.keys(currentDnDs).map((vegetableType, vTi) => (
            <Droppable
              id={Vegetable[vegetableType as keyof typeof Vegetable]}
              key={vTi}
              className="vegetables__content__droppable vegetables__content__droppable__vegetable"
            >
              <img
                src={
                  vegetableSources[
                    vegetableType as unknown as keyof typeof vegetableSources
                  ]
                }
                className="vegetables__content__droppable__vegetable__img"
                alt="Vegetable - Droppable"
              />
              {currentDnDs[vegetableType] != null && (
                <Draggable
                  id={
                    Vegetable[vegetableType as keyof typeof Vegetable]
                  }
                  className="vegetables__content__draggable"
                >
                  {Vegetable[currentDnDs[vegetableType] ?? 0]}
                </Draggable>
              )}
            </Droppable>
          ))}
        </DndContext>
      </div>

      <button onClick={() => checkAnswers()}>Weiter</button>
    </div>
  );

  function handleDragEnd(event: DragEndEvent) {
    if (event.over) {
      const index = currentStart.indexOf(
        Vegetable[event.active.id as keyof typeof Vegetable]
      );
      if (index > -1) {
        if (event.active.id === event.over.id) return;
        currentStart.splice(index, 1);
        setCurrentStart(currentStart);
      } else {
        for (const vegetable in currentDnDs) {
          if (
            currentDnDs[vegetable] ===
            Vegetable[event.active.id as keyof typeof Vegetable]
          ) {
            if (
              Vegetable[vegetable as keyof typeof Vegetable] ===
              Vegetable[event.over.id as keyof typeof Vegetable]
            ) {
              return;
            }
            currentDnDs[vegetable] = null;
            setCurrentDnDs(currentDnDs);
          }
        }
      }

      if (event.over.id === "Start") {
        currentStart.push(
          Vegetable[event.over.id as keyof typeof Vegetable]
        );
        setCurrentStart(currentStart);
      } else {
        currentDnDs[
          Vegetable[event.over.id as keyof typeof Vegetable]
        ] = Vegetable[event.active.id as keyof typeof Vegetable];
      }
      setCurrentDnDs(currentDnDs);
    }
  }

  function checkAnswers() {
    let correct: number = 0;
    for (const vegetable in currentDnDs) {
      Vegetable[vegetable as keyof typeof Vegetable] ===
        currentDnDs[vegetable] && correct++;
    }

    const VegetableCount: number = Object.keys(Vegetable).length / 2;
    const points: number = correct === VegetableCount ? 1 : 0;

    points && quizStore.setScore(quizStore.score + 1);
    // * dev alert(`Points: ${points}\nCorrect: ${correct}/${VegetableCount}`);
    quizStore.setCurrentQuizStep(quizStore.currentQuizStep + 1);
  }
};

export default VegetableTypes;
