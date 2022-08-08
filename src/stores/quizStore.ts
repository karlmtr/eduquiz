import { defineStore } from "pinia";
import type { DocumentData } from "firebase/firestore";
export const quizStateStore = defineStore({
  id: "quiz",
  state: () => ({
    questions: [] as DocumentData[],
    started: false,
  }),
  getters: {
    getRandomOrderQuestions: (state) => {
      return [...state.questions].sort(() => Math.random() - 0.5);
    },
    isEmpty: (state) => {
      return state.questions.length === 0 ? true : false;
    },
  },
  actions: {
    addQuestion(question: DocumentData) {
      this.questions.push(question);
    },
    setStarted() {
      this.started = true;
    },
    shuffle(a: DocumentData[]) {
      return a;
    },
  },
});
