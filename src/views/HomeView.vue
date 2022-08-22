<script setup lang="ts">
import { app } from "@/firebase/init";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { isTeacher } from "@/helpers/functions";
import { VBtn, VContainer, VDivider } from "vuetify/components";
import { getAuth } from "@firebase/auth";
import { generalStateStore } from "@/stores/generalStateStore";

const router = useRouter();
const auth = getAuth(app);
const generalStore = generalStateStore();
generalStore.appBar.profileMenu = true;
generalStore.appBar.goingBack = false;
const email = ref(auth.currentUser?.email);
</script>

<template>
  <div>
    <v-container class="d-flex flex-column">
      <v-btn
        class="mb-8"
        color="info"
        height="75"
        @click="router.push({ name: 'newGame' })"
      >
        Nouvelle partie
      </v-btn>
      <v-btn
        class="mb-8"
        color="info"
        height="75"
        @click="router.push({ name: 'statistics' })"
      >
        Statistiques
      </v-btn>
      <v-divider inset></v-divider>

      <v-btn
        class="mb-8"
        v-if="isTeacher(email)"
        color="info"
        height="75"
        @click="router.push({ name: 'qList' })"
      >
        Voir/éditer les questions
      </v-btn>
      <v-btn
        class="mb-8"
        v-if="isTeacher(email)"
        color="info"
        height="75"
        @click="router.push({ name: 'addQuestion' })"
      >
        Nouvelle question
      </v-btn>
    </v-container>
    <!-- </main> -->
  </div>
</template>
