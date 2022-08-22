<script setup lang="ts">
import { generalStateStore } from "@/stores/generalStateStore";
import { quizStateStore } from "@/stores/quizStore";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { VContainer, VRow, VBtn } from "vuetify/components";

const quizStore = quizStateStore();
const router = useRouter();
const generalStore = generalStateStore();
generalStore.appBar.profileMenu = false;
generalStore.appBar.goingBack = false;

const finishQuiz = () => {
  // push user and statistiques pour question
  router.replace({ name: "home" });
};

const perfectScore = computed(() => {
  return quizStore.nbGoodAnswers == quizStore.questions.length;
});
</script>

<template>
  <v-container>
    <v-row class="text-center d-flex align-center">
      <div class="mx-auto my-5 file:text-center text-h6">Résultat du quiz</div>
    </v-row>
    <v-row class="text-center d-flex align-center">
      <div class="mx-auto text-center my-15 text-h1">
        {{ quizStore.nbGoodAnswers }} / {{ quizStore.questions.length }}
      </div>
    </v-row>
    <v-row class="text-center d-flex align-center">
      <div v-if="perfectScore" class="mx-auto my-5 file:text-center text-h5">
        Bravo, un sans-faute ! 🥳
      </div>
    </v-row>
    <v-row class="d-flex align-center">
      <v-btn class="mx-auto my-15" color="success" @click="finishQuiz"
        >Retourner au menu</v-btn
      >
    </v-row>
  </v-container>
</template>
