<script setup lang="ts">
import { generalStateStore } from "@/stores/generalStateStore";
import { VContainer, VRow } from "vuetify/components";

const generalStore = generalStateStore();
generalStore.appBar.profileMenu = false;
generalStore.appBar.goingBack = true;
</script>

<template>
  <v-container>
    <v-row class="text-center d-flex align-center">
      <div class="mx-auto text-center my-15 text-h4">Coming soon™️</div>
    </v-row>
  </v-container>
</template>
