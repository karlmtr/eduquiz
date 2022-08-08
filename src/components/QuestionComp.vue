<script setup lang="ts">
import type { DocumentData } from "@firebase/firestore";

interface Question {
  question: string;
  answerOptions: { answer: string; isCorrect?: boolean }[];
  theme: string;
  year: "Préparatoire" | "1" | "2" | "3";
  collection: string;
  ID: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  question: Question | DocumentData;
}>();
</script>

<template>
  <div class="grid grid-cols-1 gap-2">
    <div
      class="text-center col-span-1 row-span-4 h-40 mb-16 mt-20 text-2xl text-slate-300"
    >
      {{ question.question }}
    </div>
    <div class="answer">{{ question.answerOptions[0].answer }}</div>
    <div class="answer">{{ question.answerOptions[1].answer }}</div>
    <div class="answer">{{ question.answerOptions[2].answer }}</div>
    <div class="answer">{{ question.answerOptions[3].answer }}</div>
  </div>
</template>
<style scoped>
.answer {
  @apply text-center p-5 bg-slate-300 rounded-2xl;
}
</style>
