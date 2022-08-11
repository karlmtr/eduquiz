<script setup lang="ts">
import AppBar from "@/components/AppBar.vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div>
    <AppBar
      :arrow="true"
      title="Statistiques"
      @pressedArrow="router.push({ name: 'home' })"
    ></AppBar>
    <main class="main-container">
      <div class="flex flex-col justify-center gap-3">
        <div>
          Sera implémenté quand les comptes fonctionneront, vu que c'est lié à
          l'utilisateur
        </div>
      </div>
    </main>
  </div>
</template>
