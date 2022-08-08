<script setup lang="ts">
import router from "../router/index";
import AppBar from "@/components/AppBar.vue";
</script>

<template>
  <div>
    <AppBar
      :arrow="true"
      title="Statistiques"
      @pressedArrow="router.go(-1)"
    ></AppBar>
    <main>
      <div class="flex flex-col justify-center gap-3">
        <div>
          Sera implémenté quand les comptes fonctionneront, vu que c'est lié à
          l'utilisateur
        </div>
      </div>
    </main>
  </div>
</template>
