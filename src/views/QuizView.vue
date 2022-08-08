<script setup lang="ts">
import router from "../router/index";
import AppBar from "@/components/AppBar.vue";
import { quizStateStore } from "@/stores/quizStore";
import { onMounted } from "vue";
import QuestionComp from "@/components/QuestionComp.vue";

const quizStore = quizStateStore();

onMounted(async () => {
  if (!quizStore.started) {
    console.log("Quiz vide !");
    router.push({ name: "newGame" });
  }
});
</script>

<template>
  <div>
    <AppBar
      :arrow="true"
      title="Quizz"
      @pressedArrow="router.replace('newGame')"
    ></AppBar>
    <main class="main-container">
      <div class="flex flex-col justify-center gap-3">
        <div class="m-3 bg-slate-300 text-center">Question 1 / 4</div>
      </div>
      <QuestionComp :question="quizStore.getRandomOrderQuestions[0]" />

      <!-- <div
        v-for="question in quizStore.getRandomOrderQuestions"
        :key="question.ID"
      >
        {{ question.question }}
      </div> -->
    </main>
  </div>
</template>
