<script setup lang="ts">
import { questionsCol } from "../firebase/init";
import { ref } from "vue";
import { getDocs, query } from "@firebase/firestore";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  VContainer,
  VCard,
  VCol,
  VRow,
  VCardText,
  VDialog,
  VProgressCircular,
} from "vuetify/components";
import type { Question } from "@/types/Question";
import { generalStateStore } from "@/stores/generalStateStore";

const router = useRouter();
const generalStore = generalStateStore();
generalStore.appBar.profileMenu = false;
generalStore.appBar.goingBack = true;

const questions = ref<Question[]>([]);
const loading = ref(false);
onMounted(async () => {
  loading.value = true;
  const querySnap = await getDocs(query(questionsCol));
  loading.value = false;
  querySnap.forEach((doc) => {
    const data = doc.data();
    if (data) {
      questions.value.push(data);
    }
  });
});

const openQuestion = (ID: string) => {
  router.push({ name: "edit", params: { ID: ID as string } });
};
</script>

<template>
  <div>
    <v-container class="d-flex flex-column">
      <v-row>
        <v-col
          cols="12"
          dense
          md="6"
          lg="4"
          v-for="question in questions"
          :key="question.ID"
        >
          <v-card @click="openQuestion(question.ID)">
            <v-card-text>
              <div>{{ question.question }}</div>
              <div class="text-caption font-italic">{{ question.theme }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-dialog v-model="loading" hide-overlay persistent>
        <v-progress-circular
          indeterminate
          color="info"
          :size="100"
          :width="10"
        ></v-progress-circular>
      </v-dialog>
    </v-container>
  </div>
</template>
