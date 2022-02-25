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
import lodash from "lodash";

// vegetables
import frühlingszwiebel from "@lehrlingsquiz/assets/img/ingredients/vegetable/frühlingszwiebel.png";
import karotte from "@lehrlingsquiz/assets/img/ingredients/vegetable/karotte.png";
import kohlrabi from "@lehrlingsquiz/assets/img/ingredients/vegetable/kohlrabi.png";
import lauch from "@lehrlingsquiz/assets/img/ingredients/vegetable/lauch.png";
import radieschen from "@lehrlingsquiz/assets/img/ingredients/vegetable/radieschen.png";
import zucchini from "@lehrlingsquiz/assets/img/ingredients/vegetable/zucchini.png";

// ! DnD out of position when scrolling
// TODO make droppables to sortables
// TODO make drag overlay with modifier for 'restrictWindowEdge'
// TODO color draggables border green if correct and red if wrong

interface VegetableTypesProps extends IFoodDetectionProps {}

const VegetableTypes: React.FC<VegetableTypesProps> = () => {
  const sensors: SensorDescriptor<SensorOptions>[] = useSensors(
    useSensor(TouchSensor),
    useSensor(MouseSensor)
  );

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

  const vegetableSources: string[] = [
    karotte,
    zucchini,
    kohlrabi,
    radieschen,
    lauch,
    frühlingszwiebel
  ];

  const [currentStart, setCurrentStart] = useState<
    Array<string | null>
  >(lodash.shuffle<string>(["0", "1", "2", "3", "4", "5"]));

  const [currentDnDs, setCurrentDnDs] = useState<(string | null)[]>(
    new Array(6).fill(null)
  );

  return (
    <div className="vegetableTypes">
      <p className="vegetableTypes__heading">
        Als Koch:Köchin arbeitet man täglich mit frischem Gemüse.
        Erkennst du die verschiedenen Gemüsesorten? Ziehe die
        Bezeichnung zu dem richtigen Gemüse.
      </p>
      <div className="vegetableTypes__content">
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <Droppable
            id="Start"
            className="vegetableTypes__content__droppable vegetableTypes__content__droppable__start"
          >
            {currentStart.map((vegetable) => (
              <Draggable
                id={vegetable}
                key={vegetable}
                className="vegetableTypes__content__draggable"
              >
                {Vegetable[vegetable as keyof typeof Vegetable]}
              </Draggable>
            ))}
          </Droppable>

          {currentDnDs.map((vegetable, vTi) => (
            <Droppable
              id={vTi}
              key={vTi}
              className="vegetableTypes__content__droppable vegetableTypes__content__droppable__vegetable"
            >
              <img
                src={vegetableSources[vTi]}
                className="vegetableTypes__content__droppable__vegetable__img"
                alt={`Vegetable ${
                  Vegetable[vegetable as keyof typeof Vegetable]
                }`}
              />
              {vegetable !== null && (
                <Draggable
                  id={vegetable}
                  className="vegetableTypes__content__draggable"
                >
                  {Vegetable[vegetable as keyof typeof Vegetable]}
                </Draggable>
              )}
            </Droppable>
          ))}
        </DndContext>
      </div>

      <button className="next" onClick={() => checkAnswers()}>
        Weiter
      </button>
    </div>
  );

  function handleDragEnd(event: DragEndEvent) {
    if (event.over) {
      const newStart = [...currentStart];
      const newCurrent = [...currentDnDs];

      const StartI = newStart.indexOf(event.active.id);
      const currentI = newCurrent.indexOf(event.active.id);

      if (StartI > -1) {
        if (event.over.id === "Start") return;
        newStart.splice(StartI, 1);
        newCurrent[+event.over.id] !== null &&
          newStart.push(newCurrent[+event.over.id]);
        newCurrent[+event.over.id] = event.active.id;
      } else {
        if (event.over.id === "" + currentI) return;
        newCurrent[currentI] = null;
        if (event.over.id === "Start") {
          newStart.push(event.active.id);
        } else {
          newCurrent[+event.over.id] !== null &&
            (newCurrent[currentI] = newCurrent[+event.over.id]);
          newCurrent[+event.over.id] = event.active.id;
        }
      }

      setCurrentStart(newStart);
      setCurrentDnDs(newCurrent);
    }
  }

  function checkAnswers() {
    let correct: number = 0;
    for (const vegetable in currentDnDs) {
      vegetable === currentDnDs[vegetable] && correct++;
    }

    const VegetableCount: number = Object.keys(Vegetable).length / 2;
    const points: number = correct === VegetableCount ? 1 : 0;

    points && quizStore.setScore(quizStore.score + 1);
    // * dev alert(`Points: ${points}\nCorrect: ${correct}/${VegetableCount}`);
    quizStore.setCurrentQuizStep(quizStore.currentQuizStep + 1);
  }
};

export default VegetableTypes;
