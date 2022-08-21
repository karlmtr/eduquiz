<script setup lang="ts">
import AppBar from "@/components/AppBar.vue";
import { db } from "../firebase/init";
import { ref } from "vue";
import { collection, getDocs, query } from "@firebase/firestore";
import { onMounted } from "vue";
import type { DocumentData } from "@firebase/firestore";
import { useRouter } from "vue-router";
import {
  VContainer,
  VCard,
  VCol,
  VRow,
  VCardTitle,
  VCardActions,
  VCardSubtitle,
  VCardText,
  VDialog,
  VSheet,
  VProgressCircular,
} from "vuetify/components";

const router = useRouter();

const questions = ref<DocumentData[]>([]);
const loading = ref(false);
onMounted(async () => {
  loading.value = true;
  const querySnap = await getDocs(query(collection(db, "questions")));
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
          color="primary"
          :size="100"
          :width="10"
        ></v-progress-circular>
      </v-dialog>
    </v-container>
  </div>
</template>
