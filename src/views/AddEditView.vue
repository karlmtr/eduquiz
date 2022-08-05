<script setup lang="ts">
import router from "../router/index";
import AppBar from "@/components/AppBar.vue";
</script>

<template>
  <AppBar :arrow="true" title="" @pressedArrow="router.go(-1)"></AppBar>
  <main>
    <div class="flex flex-col justify-center gap-3">
      <div class="bg-red-900 text-center" @click="router.push('quiz')">
        Ajouter une nouvelle question
      </div>
      <div class="bg-red-900 text-center" @click="router.push('quiz')">
        Voir et éditer les questions
      </div>
    </div>
  </main>
</template>
