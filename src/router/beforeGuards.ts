import { quizStateStore } from "@/stores/quizStore";

async function quizFinished() {
  const quizStore = quizStateStore();
  if (!quizStore.finished) {
    return { name: "newGame" };
  } else {
    return true;
  }
}

async function quizStarted() {
  const quizStore = quizStateStore();
  if (!quizStore.started) {
    return { name: "newGame" };
  } else {
    return true;
  }
}

export { quizFinished, quizStarted };
