<script setup lang="ts">
import router from "../router/index";
import AppBar from "@/components/AppBar.vue";
</script>

<template>
  <AppBar
    :arrow="true"
    title="Statistiques"
    @pressedArrow="router.go(-1)"
  ></AppBar>
  <main>
    <div class="flex flex-col justify-center gap-3">
      <div>Statistiques</div>
    </div>
  </main>
</template>
