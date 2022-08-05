<script setup lang="ts">
import router from "../router/index";
import AppBar from "@/components/AppBar.vue";
</script>

<template>
  <AppBar title="Home" :profile="{}"></AppBar>
  <main>
    <div class="flex flex-col justify-center gap-3">
      <div class="bg-red-900 text-center" @click="router.push('newGame')">
        Nouvelle partie
      </div>
      <div class="bg-red-900 text-center" @click="router.push('statistics')">
        Statistiques
      </div>
      <div class="bg-red-900 text-center" @click="router.push('qList')">
        Voir/éditer les questions
      </div>
      <div class="bg-red-900 text-center" @click="router.push('addQuestion')">
        Ajouter une nouvelle question
      </div>
    </div>
  </main>
</template>
