<script setup lang="ts">
import AppBar from "@/components/AppBar.vue";
import { quizStateStore } from "@/stores/quizStore";
import { useRouter } from "vue-router";

const quizStore = quizStateStore();
const router = useRouter();

const finishQuiz = () => {
  // push user and statistiques pour question
  router.replace({ name: "home" });
};
</script>

<template>
  <div>
    <AppBar
      :arrow="false"
      title=""
      @pressedArrow="router.replace('home')"
    ></AppBar>
    <main class="main-container">
      <div class="flex flex-col">
        <div class="py-32 text-3xl text-center">Résultat du quiz :</div>
      </div>
      <div class="py-16 text-3xl text-center">
        Score: {{ quizStore.nbGoodAnswers }} / {{ quizStore.questions.length }}
      </div>
      <button
        @click="finishQuiz"
        class="px-2 py-3 mx-auto my-32 bg-yellow-300 rounded-lg"
      >
        Revenir au menu principal
      </button>
    </main>
  </div>
</template>
