import { defineStore } from "pinia";
import type { Question } from "@/types/Question";
export const quizStateStore = defineStore({
  id: "quiz",
  state: () => ({
    questions: [] as Question[],
    started: false,
    questionAnswered: false,
    nbGoodAnswers: 0,
    indexQuestion: 0,
    finished: false,
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
    addQuestion(question: Question) {
      this.questions.push(question);
    },
    setStarted() {
      this.started = true;
    },
  },
});
