<script setup lang="ts">
import { auth } from "@/firebase/init";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { isTeacher } from "@/helpers/functions";
import { VBtn, VContainer, VDivider } from "vuetify/components";

const router = useRouter();
const email = ref(auth.currentUser?.email);
</script>

<template>
  <div>
    <v-container class="d-flex flex-column">
      <v-btn
        class="mb-8"
        color="blue lighten-6"
        height="75"
        @click="router.push({ name: 'newGame' })"
      >
        Nouvelle partie
      </v-btn>
      <v-btn
        class="mb-8"
        color="blue lighten-4"
        height="75"
        @click="router.push({ name: 'statistics' })"
      >
        Statistiques
      </v-btn>
      <v-divider inset></v-divider>

      <v-btn
        class="mb-8"
        v-if="isTeacher(email)"
        color="blue lighten-4"
        height="75"
        @click="router.push({ name: 'qList' })"
      >
        Voir/éditer les questions
      </v-btn>
      <v-btn
        class="mb-8"
        v-if="isTeacher(email)"
        color="blue lighten-4"
        height="75"
        @click="router.push({ name: 'addQuestion' })"
      >
        Nouvelle question
      </v-btn>
    </v-container>
    <!-- </main> -->
  </div>
</template>
<style scoped>
.home-button {
  @apply bg-blue-200 text-center rounded-md px-2 py-6 shadow-md my-10 min-w-min hover:bg-blue-300 hover:cursor-pointer active:bg-slate-500 text-slate-700;
}
</style>
