<script setup lang="ts">
import { quizStateStore } from "@/stores/quizStore";
import { ref, watch, computed } from "vue";
import { VRow, VCol, VCard } from "vuetify/components";
import type { Question } from "@/types/Question";
import type { Answer } from "@/types/Answer";

const quizStore = quizStateStore();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  question: Question;
}>();

const statusMessage = ref("");
const selectedAnswer = ref<Answer>();

const checkAnswer = (a: Answer) => {
  quizStore.questionAnswered = true;
  selectedAnswer.value = a;
  if (a.isCorrect) {
    quizStore.nbGoodAnswers++;
    statusMessage.value = "Bonne réponse !";
  } else {
    statusMessage.value = "C'est pas juste ... ";
  }
};

const styleAnswer = (a: Answer) => {
  if (a == selectedAnswer.value && a.isCorrect) {
    return "success";
  } else if (a == selectedAnswer.value && !a.isCorrect) {
    return "error";
  }
};

const resetQuestionState = () => {
  selectedAnswer.value = undefined;
  statusMessage.value = "";
};

watch(
  () => props.question.ID,
  () => {
    resetQuestionState();
  }
);

const shuffledAnswers = computed(() => {
  return [...props.question.answerOptions].sort(() => Math.random() - 0.5);
});
</script>

<template>
  <v-row>
    <v-col cols="12" class="justify-center d-flex">
      <div class="my-10 text-center text-h6">
        {{ question.question }}
      </div></v-col
    >
  </v-row>
  <v-row align="end">
    <v-col cols="12" class="justify-end d-flex">
      <slot></slot>
    </v-col>
  </v-row>
  <v-row>
    <v-col
      v-for="answ in shuffledAnswers"
      :key="answ.answer"
      class="justify-center d-flex"
      cols="12"
      sm="6"
    >
      <v-card
        height="70"
        @click="checkAnswer(answ)"
        :color="selectedAnswer ? styleAnswer(answ) : 'light-blue lighten-4'"
        class="mx-auto text-center d-flex align-center w-100"
        :disabled="quizStore.questionAnswered"
      >
        <div class="text-center w-100">
          {{ answ.answer }}
        </div>
      </v-card>
    </v-col>
  </v-row>
  <!-- <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
    <div
      class="h-32 col-span-1 row-span-4 mt-6 text-2xl text-center sm:col-span-2 sm:gap-4 text-slate-300"
    >
      {{ question.question }}
    </div>
    <div
      class="flex items-center justify-center h-20 text-2xl text-center sm:col-span-2"
    >
      {{ statusMessage }}
    </div>
    <button
      v-for="answ in shuffledAnswers"
      :key="answ"
      class="answer"
      :disabled="quizStore.questionAnswered"
      :class="quizStore.questionAnswered ? styleAnswered(answ) : ''"
      @click="checkAnswer(answ)"
    >
      {{ answ.answer }}
    </button>
  </div> -->
</template>
<style scoped></style>
