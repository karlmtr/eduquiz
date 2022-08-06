<script setup lang="ts">
import router from "../router/index";
import AppBar from "@/components/AppBar.vue";
</script>

<template>
  <AppBar title="Home" :profile="{}"></AppBar>

  <main class="main-container">
    <div class="home-button" @click="router.push('newGame')">
      Nouvelle partie
    </div>
    <div class="home-button" @click="router.push('statistics')">
      Statistiques
    </div>
    <div class="home-button" @click="router.push('qList')">
      Voir/éditer les questions
    </div>
    <div class="home-button" @click="router.push('addQuestion')">
      Ajouter une nouvelle question
    </div>
  </main>
</template>
<style scoped>
.home-button {
  @apply bg-blue-200 text-center rounded-md px-2 py-6 shadow-md my-10 min-w-min hover:bg-blue-300 hover:cursor-pointer;
}
</style>
