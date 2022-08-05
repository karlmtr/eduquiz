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
  <div class="flex justify-between p-3">
    <div>
      <ArrowLeftIcon
        v-if="arrow"
        class="h-5"
        @click="$emit('pressedArrow')"
      ></ArrowLeftIcon>
    </div>
    <div>{{ title }}</div>
    <div><div v-if="profile" id="avatar">Avatar</div></div>
  </div>
</template>
