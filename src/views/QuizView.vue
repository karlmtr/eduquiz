<script setup lang="ts">
import router from "../router/index";
import AppBar from "@/components/AppBar.vue";
import { quizStateStore } from "@/stores/quizStore";
const quizStore = quizStateStore();
</script>

<template>
  <div>
    <AppBar
      :arrow="true"
      title="Quizzzzzz"
      @pressedArrow="router.replace('newGame')"
    ></AppBar>
    <main class="main-container px-0">
      <div class="flex flex-col justify-center gap-3">
        <div class="m-3 bg-slate-300 text-center">C'est le quiz !</div>
      </div>
      <div
        v-for="question in quizStore.getRandomOrderQuestions"
        :key="question.ID"
      >
        {{ question.question }}
      </div>
    </main>
  </div>
</template>
