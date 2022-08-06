<script setup lang="ts">
import router from "../router/index";
import AppBar from "@/components/AppBar.vue";
import { reactive } from "vue";

const prefs = reactive({
  number_questions: 10,
});
</script>

<template>
  <AppBar
    :arrow="true"
    title="Nouvelle partie"
    @pressedArrow="router.go(-1)"
  ></AppBar>
  <main class="main-container">
    <div class="flex flex-col justify-center gap-3">
      <form>
        <label> Nombre de questions</label>
        <input type="number" min="10" :value="prefs.number_questions" />
      </form>
      <div class="bg-red-900 text-center" @click="router.push('quiz')">
        Commencer le quiz
      </div>
    </div>
  </main>
</template>
