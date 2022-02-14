import { action, makeAutoObservable, observable } from "mobx";

import { IStore, StoreKey } from "./interfaces/store";

export class QuizStore implements IStore {
  storeKey: StoreKey = "quizStore" as const;

  quizSteps = [
    "Erkennen von Lebensmitteln",
    "Zubereitungsarten & Menüerkennung",
    "Kundenorientierung",
    "Quiz zum Unternehmen Eurest"
  ] as const;

  @observable score: number = 0;
  @observable currentQuizStep: number = 0;
  @observable isQuizStarted: boolean = false;
  @observable isQuizEnded: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  @action setScore(value: number): void {
    this.score = value;
  }

  @action setCurrentQuizStep(value: number): number {
    if (value < 0) return (this.currentQuizStep = 0);
    if (value > this.quizSteps.length - 1)
      return (this.currentQuizStep = this.quizSteps.length - 1);

    return (this.currentQuizStep = value);
  }

  @action startQuiz(): void {
    this.isQuizStarted = true;
  }

  @action endQuiz(): void {
    this.isQuizStarted = false;
    this.isQuizEnded = true;
  }
}

export const quizStore = new QuizStore();
