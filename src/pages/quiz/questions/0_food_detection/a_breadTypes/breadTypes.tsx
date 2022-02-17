import React, { useState } from "react";
import { quizStore } from "@lehrlingsquiz/stores";
import { IFoodDetectionProps } from "../foodDetection";
import "./breadTypes.scss";
// import basket from "@lehrlingsquiz/assets/img/Basket.jpg";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  SensorDescriptor,
  SensorOptions,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Droppable } from "../dnd/droppable";
import { Draggable } from "../dnd/draggable";

interface BreadTypesProps extends IFoodDetectionProps {}

interface DnDs {
  [key: string]: Array<string>;
}

const BreadTypes: React.FC<BreadTypesProps> = ({
  onStepFinished,
}: BreadTypesProps) => {
  const sensors: SensorDescriptor<SensorOptions>[] = useSensors(
    useSensor(TouchSensor),
    useSensor(MouseSensor)
  );

  const DnDsSolution: DnDs = {
    Start: [],
    Weißbrot: ["Semmel", "Toastbrot", "Vollkornbrot"],
    Gebäck: ["Laugenstangerl"],
    Schwarzbrot: ["Roggenbrot"],
  };

  const [currentDnDs, setCurrentDnDs] = useState<DnDs>({
    Start: [
      "Laugenstangerl",
      "Toastbrot",
      "Semmel",
      "Vollkornbrot",
      "Roggenbrot",
    ],
    Weißbrot: [],
    Gebäck: [],
    Schwarzbrot: [],
  });

  return (
    <div className="breadTypes">
      <p className="breadTypes__heading">
        Sortiere die verschiedenen Brote zu den richtigen Brotsorten.
        <br />
        Du kannst die Brote einfach anklicken und in den passenden
        Brotkorb fallen lassen.
      </p>
      <div className="breadTypes__content">
        {/* // ! DnD out of position when scrolling */}
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          {/* // TODO Design droppables side by side e.g. css grid */}
          {/* // TODO make droppables to sortables */}
          {Object.keys(currentDnDs).map((breadType, bTi) => (
            <Droppable
              id={breadType}
              key={bTi}
              className={
                "breadTypes__content__droppable breadTypes__content__droppable__" +
                (breadType === "Start" ? "start" : "basket")
              }
            >
              {currentDnDs[breadType].map((bread, bi) => (
                <Draggable
                  id={bread}
                  key={bi}
                  className="breadTypes__content__draggable"
                >
                  {bread}
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
        const index = currentDnDs[breadType].indexOf(event.active.id);
        if (index > -1) {
          if (breadType === event.over.id) return;

          const tempDnDs: DnDs = { ...currentDnDs };
          tempDnDs[breadType].splice(index, 1);
          tempDnDs[event.over.id].push(event.active.id);
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
        if (currentDnDs[breadType].indexOf(bread) > -1) correct++;
      }
    }

    // TODO color draggables border green if correct and red if wrong

    const DnDsCount: number = Object.keys(DnDsSolution).reduce(
      (sum, k) => sum + DnDsSolution[k].length,
      0
    );
    const points: number = correct === DnDsCount ? 1 : 0;

    points && quizStore.setScore(quizStore.score + 1);
    // alert(`Points: ${points}\nCorrect: ${correct}/${DnDsCount}`);
    onStepFinished();
  }
};

export default BreadTypes;
