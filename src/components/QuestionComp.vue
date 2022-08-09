<script setup lang="ts">
import { quizStateStore } from "@/stores/quizStore";
import type { DocumentData } from "@firebase/firestore";
import { ref } from "vue";

const quizStore = quizStateStore();

interface answer {
  answer: string;
  isCorrect?: boolean;
}

interface Question {
  question: string;
  answerOptions: answer[];
  theme: string;
  year: "Préparatoire" | "1" | "2" | "3";
  collection: string;
  ID: string;
}

const statusMessage = ref("");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  question: Question | DocumentData;
}>();

const checkAnswer = (a: answer) => {
  quizStore.questionAnswered = true;
  if ("isCorrect" in a) {
    statusMessage.value = "Bonne réponse !";
  } else {
    statusMessage.value = "C'est pas juste ... ";
  }
};

const styleAnswered = (answ: answer) => {
  const temp = "border-solid border-4 ";
  if (answ.isCorrect) {
    quizStore.nbGoodAnswers++;
    return temp + "border-green-400";
  } else {
    return temp + "border-red-400";
  }
};
</script>

<template>
  <div class="grid grid-cols-1 gap-2">
    <div
      class="text-center col-span-1 row-span-4 h-40 mt-12 text-2xl text-slate-300"
    >
      {{ question.question }}
    </div>
    <div class="flex justify-center items-center text-center text-2xl h-20">
      {{ statusMessage }}
    </div>
    <button
      v-for="answ in question.answerOptions"
      :key="answ"
      class="answer"
      :disabled="quizStore.questionAnswered"
      :class="quizStore.questionAnswered ? styleAnswered(answ) : ''"
      @click="checkAnswer(answ)"
    >
      {{ answ.answer }}
    </button>
  </div>
</template>
<style scoped>
.answer {
  @apply text-center p-5 bg-slate-300 rounded-2xl shadow-md hover:bg-slate-400 hover:shadow-none;
}
</style>
