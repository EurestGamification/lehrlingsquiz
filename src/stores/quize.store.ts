import { observable } from "mobx";
import { IStore, StoreKey } from "./interfaces/store";

export class QuizStore implements IStore {
  storeKey: StoreKey = "quizStore" as const;

  @observable score: number = 0;
}

export const quizStore = new QuizStore();
