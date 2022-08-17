<script setup lang="ts">
// import router from "../router/index";
import AppBar from "@/components/AppBar.vue";
import { useRouter } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/firebase/init";

const router = useRouter();

const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const email = user.email;
    console.log("Connecté ! ", email);
    // ...
  } else {
    console.log("Decconnecté ! ");
    // User is signed out
    // ...
  }
});
</script>

<template>
  <div>
    <AppBar title="Home" :profile="{ hello: true }"></AppBar>
    <main class="main-container">
      <div class="home-button" @click="router.push({ name: 'newGame' })">
        Nouvelle partie
      </div>
      <div class="home-button" @click="router.push({ name: 'statistics' })">
        Statistiques
      </div>
      <div class="home-button" @click="router.push({ name: 'qList' })">
        Voir/éditer les questions
      </div>
      <div class="home-button" @click="router.push({ name: 'addQuestion' })">
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
