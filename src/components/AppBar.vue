<script setup lang="ts">
import { ArrowLeftIcon } from "@heroicons/vue/solid";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  title: { type: String, required: false, default: "" },
  arrow: { type: Boolean, required: false, default: false },
  profile: { type: Object, required: false },
});
</script>

<template>
  <header class="sticky top-0 z-50 p-3 backdrop-blur-xl">
    <div class="flex justify-between">
      <div
        class="flex items-center p-2 rounded-full hover:cursor-pointer hover:bg-slate-50"
        :class="!arrow ? 'invisible' : ''"
        @click="$emit('pressedArrow')"
      >
        <ArrowLeftIcon v-if="arrow" class="w-5 h-5"></ArrowLeftIcon>
      </div>

      <div><div v-if="profile" class="p-5 bg-white rounded-full"></div></div>
    </div>
  </header>
</template>
