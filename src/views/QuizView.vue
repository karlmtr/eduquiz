<script setup lang="ts">
import router from "../router/index";
import AppBar from "@/components/AppBar.vue";
</script>

<template>
  <AppBar
    :arrow="true"
    title="Quizzzzzz"
    @pressedArrow="router.replace('/')"
  ></AppBar>
  <main>
    <div class="flex flex-col justify-center gap-3">
      <div class="m-3 bg-slate-300 text-center">C'est le quizzzzzz</div>
    </div>
  </main>
</template>
