<script setup lang="ts">
import router from "../router/index";
import AppBar from "@/components/AppBar.vue";
</script>

<template>
  <AppBar
    :arrow="true"
    title="Questions"
    @pressedArrow="router.go(-1)"
  ></AppBar>
  <main>
    <div>Liste de questions</div>
  </main>
</template>
