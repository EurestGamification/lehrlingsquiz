import { action, makeAutoObservable, observable } from "mobx";
import { IStore, StoreKey } from "./interfaces/store";

export class QuizStore implements IStore {
  storeKey: StoreKey = "quizStore" as const;

  @observable score: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  @action setScore(value: number): void {
    this.score = value;
  }
}

export const quizStore = new QuizStore();
