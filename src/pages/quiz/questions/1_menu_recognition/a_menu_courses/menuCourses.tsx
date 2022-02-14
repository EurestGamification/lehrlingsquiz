import { quizStore } from "@lehrlingsquiz/stores";
import React, { useState } from "react";
import {
  arrayMove,
  SortableContainer,
  SortableElement
} from "react-sortable-hoc";
import { IMenuRecognitionProps } from "../interfaces";
import "./menuCourses.scss";

export type MenuItem = { id: number; name: string };
export type MenuItems = MenuItem[];

const SortableItem = SortableElement(({ value }: any) => (
  <div className="menu-courses__items__item">{value}</div>
));

const SortableList = SortableContainer(({ items }: any) => {
  return (
    <div className="menu-courses__items">
      {items.map((value: any, index: number) => (
        <SortableItem
          key={`item-${value}`}
          index={index}
          value={value}
        />
      ))}
    </div>
  );
});

interface MenuCoursesProps extends IMenuRecognitionProps {}

const MenuCourses: React.FC<MenuCoursesProps> = ({
  onStepFinished
}: MenuCoursesProps) => {
  const [items, setItems] = useState<MenuItems>([
    { id: 1, name: "Suppe" },
    { id: 3, name: "Dessert" },
    { id: 2, name: "Hauptspeise" },
    { id: 0, name: "Kalte Vorspeise" }
  ]);

  const onSortEnd = ({ oldIndex, newIndex }: any) => {
    setItems(arrayMove(items, oldIndex, newIndex));
  };

  const checkAnswers = () => {
    const isAscending = (a: number[]) =>
      a
        .slice(1)
        .map((e, i) => e > a[i])
        .every(x => x);

    if (isAscending(items.map(e => e.id)))
      quizStore.setScore(quizStore.score + 1);
  };

  return (
    <div className="menu-courses">
      <div className="menu-courses__content">
        <p className="menu-courses__content__instruction">
          Als Koch:Köchin ist es natürlich auch wichtig, die richtige
          Abfolge eines Menüs zu kennen, damit du weißt, wann welches
          Gericht an der Reihe ist. Ziehe die einzelnen
          Menübestandteile in die richtige Reihenfolge.
        </p>
        <SortableList
          items={items.map(e => e.name)}
          onSortEnd={onSortEnd}
        />
        <button
          onClick={() => {
            checkAnswers();
            onStepFinished();
          }}
        >
          Weiter
        </button>
      </div>
    </div>
  );
};

export default MenuCourses;