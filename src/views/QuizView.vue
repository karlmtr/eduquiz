<script setup lang="ts">
import router from "../router/index";
import AppBar from "@/components/AppBar.vue";
import { quizStateStore } from "@/stores/quizStore";
import { onBeforeMount, ref } from "vue";
import QuestionComp from "@/components/QuestionComp.vue";

const quizStore = quizStateStore();

onBeforeMount(async () => {
  if (!quizStore.started) {
    router.replace({ name: "newGame" });
  }
});

const setNextQuestion = () => {
  quizStore.questionAnswered = false;
  quizStore.indexQuestion++;
};

const processEnding = () => {
  quizStore.finished = true;
  router.replace({ name: "resultsQuiz" });
};

const questions = ref(quizStore.getRandomOrderQuestions);
</script>

<template>
  <div v-show="quizStore.questions[quizStore.indexQuestion]">
    <AppBar
      :arrow="true"
      title=""
      @pressedArrow="router.replace('newGame')"
    ></AppBar>
    <main class="main-container">
      <div class="flex flex-col justify-center gap-3">
        <div class="m-3 bg-slate-300 text-center">
          Question {{ quizStore.indexQuestion + 1 }} /
          {{ questions.length }}
        </div>
      </div>
      <QuestionComp :question="questions[quizStore.indexQuestion]" />
      <div v-show="quizStore.questionAnswered" class="flex justify-end">
        <button
          v-if="quizStore.indexQuestion < quizStore.questions.length - 1"
          class="px-2 py-3 mt-4 bg-blue-300 rounded-md"
          @click="setNextQuestion"
        >
          Suivant
        </button>
        <button
          v-else
          class="px-2 py-3 mt-4 bg-yellow-300 rounded-md"
          @click="processEnding"
        >
          Voir les résultats
        </button>
      </div>
    </main>
  </div>
</template>
