<script setup lang="ts">
import AppBar from "@/components/AppBar.vue";
import { quizStateStore } from "@/stores/quizStore";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";

const quizStore = quizStateStore();
const router = useRouter();

onBeforeMount(async () => {
  if (!quizStore.finished) {
    router.replace({ name: "newGame" });
  }
});

const finishQuiz = () => {
  // push user and statistiques pour question

  //
  quizStore.$reset();
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
        <div class="text-center py-32 text-3xl">Résultat du quiz :</div>
      </div>
      <div class="text-center py-16 text-3xl">
        Score: {{ quizStore.nbGoodAnswers }} / {{ quizStore.questions.length }}
      </div>
      <button
        @click="finishQuiz"
        class="bg-yellow-300 py-3 px-2 rounded-lg mx-auto my-32"
      >
        Revenir au menu principal
      </button>
    </main>
  </div>
</template>
