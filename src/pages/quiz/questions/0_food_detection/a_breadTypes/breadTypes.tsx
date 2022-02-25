import React, { useState } from "react";
import { quizStore } from "@lehrlingsquiz/stores";
import { IFoodDetectionProps } from "../foodDetection";
import "./breadTypes.scss";
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

// ! DnD out of position when scrolling
// TODO make droppables to sortables
// TODO make drag overlay with modifier for 'restrictWindowEdge'
// TODO color draggables border green if correct and red if wrong

interface BreadTypesProps extends IFoodDetectionProps {}

interface DnDs {
  [key: string]: Array<Bread>;
}

// eslint-disable-next-line no-unused-vars
enum Bread {
  // eslint-disable-next-line no-unused-vars
  Toastbrot,
  // eslint-disable-next-line no-unused-vars
  Baguette,
  // eslint-disable-next-line no-unused-vars
  Laugenstangerl,
  // eslint-disable-next-line no-unused-vars
  Semmel,
  // eslint-disable-next-line no-unused-vars
  Roggenbrot,
  // eslint-disable-next-line no-unused-vars
  Vollkornbrot
}

// eslint-disable-next-line no-unused-vars
const breadSources: { [key in Bread]: string } = {
  [Bread.Toastbrot]: "@lehrlingsquiz/assets/img/wiener_schnitzel.jpg",
  [Bread.Baguette]: "@lehrlingsquiz/assets/img/wiener_schnitzel.jpg",
  [Bread.Laugenstangerl]:
    "@lehrlingsquiz/assets/img/wiener_schnitzel.jpg",
  [Bread.Semmel]: "@lehrlingsquiz/assets/img/wiener_schnitzel.jpg",
  [Bread.Roggenbrot]:
    "@lehrlingsquiz/assets/img/wiener_schnitzel.jpg",
  [Bread.Vollkornbrot]:
    "@lehrlingsquiz/assets/img/wiener_schnitzel.jpg"
};

const BreadTypes: React.FC<BreadTypesProps> = ({
  onStepFinished
}: BreadTypesProps) => {
  const sensors: SensorDescriptor<SensorOptions>[] = useSensors(
    useSensor(TouchSensor),
    useSensor(MouseSensor)
  );

  const DnDsSolution: DnDs = {
    Start: [],
    Weißbrot: [Bread.Baguette, Bread.Toastbrot],
    Gebäck: [Bread.Laugenstangerl, Bread.Semmel],
    Schwarzbrot: [Bread.Roggenbrot, Bread.Vollkornbrot]
  };

  const [currentDnDs, setCurrentDnDs] = useState<DnDs>({
    Start: lodash.shuffle<Bread>([
      Bread.Laugenstangerl,
      Bread.Baguette,
      Bread.Toastbrot,
      Bread.Semmel,
      Bread.Vollkornbrot,
      Bread.Roggenbrot
    ]),
    Weißbrot: [],
    Gebäck: [],
    Schwarzbrot: []
  });

  return (
    <div className="breadTypes">
      <p className="breadTypes__heading">
        Sortiere die verschiedenen Brote zu den richtigen Brotsorten.
        Du kannst die Brote einfach anklicken und in den passenden
        Brotkorb fallen lassen.
      </p>
      <div className="breadTypes__content">
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          {Object.keys(currentDnDs).map((breadType, bTi) => (
            <Droppable
              id={breadType}
              key={bTi}
              className={
                "breadTypes__content__droppable breadTypes__content__droppable__" +
                (breadType === "Start" ? "start" : "basket")
              }
            >
              {breadType !== "Start" && (
                <span className="breadTypes__content__droppable__basket__title">
                  {breadType}
                </span>
              )}
              {currentDnDs[breadType].map((bread) => (
                <Draggable
                  id={Bread[bread]}
                  key={bread}
                  className="breadTypes__content__draggable"
                >
                  <img
                    src={breadSources[bread]}
                    alt="Brot - Draggable"
                  />
                </Draggable>
              ))}
            </Droppable>
          ))}
        </DndContext>
      </div>
      <button onClick={() => checkAnswers()}>Weiter</button>
    </div>
  );

  function handleDragEnd(event: DragEndEvent) {
    if (event.over) {
      for (const breadType in currentDnDs) {
        const eventBread: Bread =
          Bread[event.active.id as keyof typeof Bread];
        const index = currentDnDs[breadType].indexOf(eventBread);

        if (index > -1) {
          if (breadType === event.over.id) return;

          const tempDnDs: DnDs = { ...currentDnDs };
          tempDnDs[breadType].splice(index, 1);
          tempDnDs[event.over.id].push(eventBread);
          setCurrentDnDs(tempDnDs);
          return;
        }
      }
    }
  }

  function checkAnswers() {
    let correct: number = 0;
    for (const breadType in DnDsSolution) {
      for (const bread of DnDsSolution[breadType]) {
        currentDnDs[breadType].indexOf(bread) > -1 && correct++;
      }
    }

    const BreadCount: number = Object.keys(Bread).length / 2;
    const points: number = correct === BreadCount ? 1 : 0;

    points && quizStore.setScore(quizStore.score + 1);
    // * dev alert(`Points: ${points}\nCorrect: ${correct}/${BreadCount}`);
    onStepFinished();
  }
};

export default BreadTypes;
