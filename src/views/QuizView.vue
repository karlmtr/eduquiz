<script setup lang="ts">
import { quizStateStore } from "@/stores/quizStore";
import { ref } from "vue";
import QuestionComp from "@/components/QuestionComp.vue";
import { useRouter } from "vue-router";
import { VRow, VBtn, VContainer } from "vuetify/components";
import { generalStateStore } from "@/stores/generalStateStore";

const router = useRouter();
const quizStore = quizStateStore();
const generalStore = generalStateStore();
generalStore.appBar.profileMenu = false;
generalStore.appBar.goingBack = false;

const setNextQuestion = () => {
  quizStore.questionAnswered = false;
  quizStore.indexQuestion++;
};

const processEnding = () => {
  quizStore.finished = true;
  router.push({ name: "resultsQuiz" });
};

const questions = ref(quizStore.getRandomOrderQuestions);
</script>

<template>
  <div>
    <v-container>
      <v-row
        ><div class="mx-auto my-3">
          Question {{ quizStore.indexQuestion + 1 }} / {{ questions.length }}
        </div>
      </v-row>
      <QuestionComp :question="questions[quizStore.indexQuestion]">
        <v-btn
          v-if="quizStore.indexQuestion < quizStore.questions.length - 1"
          color="warning"
          class="mx-auto my-5"
          :style="{
            visibility: !quizStore.questionAnswered ? 'hidden' : 'visible',
          }"
          @click="setNextQuestion"
        >
          Suivant
        </v-btn>
        <v-btn
          v-else
          color="warning"
          class="mx-auto my-5"
          :style="{
            visibility: !quizStore.questionAnswered ? 'hidden' : 'visible',
          }"
          @click="processEnding"
        >
          Voir les résultats
        </v-btn>
      </QuestionComp>
    </v-container>
  </div>
</template>
