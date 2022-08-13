<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div
    class="flex flex-col min-h-screen bg-gradient-to-r from-blue-500 to-blue-600"
  >
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
