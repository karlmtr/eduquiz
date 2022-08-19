<script setup lang="ts">
import AppBar from "@/components/AppBar.vue";
import { auth } from "@/firebase/init";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { isTeacher } from "@/helpers/functions";
const router = useRouter();
const email = ref(auth.currentUser?.email);
</script>

<template>
  <div>
    <AppBar title="Home" :profile-menu="true"></AppBar>
    <main class="main-container">
      <div class="home-button" @click="router.push({ name: 'newGame' })">
        Nouvelle partie
      </div>
      <div class="home-button" @click="router.push({ name: 'statistics' })">
        Statistiques
      </div>
      <div
        v-if="isTeacher(email)"
        class="home-button"
        @click="router.push({ name: 'qList' })"
      >
        Voir/éditer les questions
      </div>
      <div
        v-if="isTeacher(email)"
        class="home-button"
        @click="router.push({ name: 'addQuestion' })"
      >
        Ajouter une nouvelle question
      </div>
    </main>
  </div>
</template>
<style scoped>
.home-button {
  @apply bg-blue-200 text-center rounded-md px-2 py-6 shadow-md my-10 min-w-min hover:bg-blue-300 hover:cursor-pointer active:bg-slate-500;
}
</style>
