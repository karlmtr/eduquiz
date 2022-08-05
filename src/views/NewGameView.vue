<script setup lang="ts">
import router from "../router/index";
import AppBar from "@/components/AppBar.vue";
</script>

<template>
  <AppBar
    :arrow="true"
    title="Nouvelle partie"
    @pressedArrow="router.go(-1)"
  ></AppBar>
  <main>
    <div class="flex flex-col justify-center gap-3">
      <div class="bg-red-900 text-center" @click="router.push('quiz')">
        Commencer le quiz
      </div>
    </div>
  </main>
</template>
