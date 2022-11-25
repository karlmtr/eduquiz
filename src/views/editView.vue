<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { generalCol, questionsCol } from "../firebase/init";
import { doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";

import type { Question } from "@/types/Question";
import { useRoute, useRouter } from "vue-router";
import isEqual from "lodash.isequal";
import {
  VContainer,
  VForm,
  VTextField,
  VTextarea,
  VRow,
  VCol,
  VCombobox,
  VBtn,
  VSnackbar,
  VDialog,
  VProgressCircular,
} from "vuetify/components";
import { generalStateStore } from "@/stores/generalStateStore";

const router = useRouter();
const route = useRoute();
const generalStore = generalStateStore();
generalStore.appBar.profileMenu = false;
generalStore.appBar.goingBack = true;

const deleting = ref(false);
const submitting = ref(false);

const themes = ref<string[] | undefined>([]);
const question = ref<Question>({
  question: "",
  answerOptions: [
    { answer: "", isCorrect: true },
    { answer: "" },
    { answer: "" },
    { answer: "" },
  ],
  theme: "Optique",
  ID: "",
  teacherUID: "",
});
const snapQuestion = ref<Question>();

onMounted(() => {
  loading.value = true;
  getDoc(doc(questionsCol, route.params.ID as string)).then((result) => {
    snapQuestion.value = result.data();
    question.value = JSON.parse(JSON.stringify(snapQuestion.value));
    loading.value = false;
  });
  getDoc(doc(generalCol, "question")).then((result) => {
    themes.value = result.data()?.themes;
  });
});

const edited = computed(() => {
  return !isEqual(snapQuestion.value, question.value);
});

const sendToFirestore = async () => {
  updateDoc(doc(questionsCol, question?.value?.ID), question.value);
};
const deleteFromFirestore = async () => {
  deleteDoc(doc(questionsCol, question?.value?.ID));
};

const deleteQuestion = () => {
  deleting.value = true;
  deleteFromFirestore()
    .then(() => {
      success.value = true;
      deleting.value = false;
      router.replace({ name: "qList" });
    })
    .catch(() => {
      snackbar.value = true;
      success.value = false;
    });
};

const processQuestion = () => {
  submitting.value = true;
  if (!themes.value?.includes(question.value.theme)) {
    themes.value?.push(question.value.theme);
    updateDoc(doc(generalCol, "question"), {
      themes: themes.value,
    });
  }
  sendToFirestore()
    .then(() => {
      submitting.value = false;
      success.value = true;
      snackbar.value = true;
      snapQuestion.value = JSON.parse(JSON.stringify(question.value));
    })
    .catch(() => {
      submitting.value = false;
      success.value = false;
      snackbar.value = true;
    });
};
const validForm = ref(false);

const rules = ref([(v: string) => !!v || "Obligatoire"]);
const snackbar = ref(false);
const success = ref(false);
const loading = ref(false);
</script>

<template>
  <div>
    <v-form ref="form" v-model="validForm">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-textarea
              required
              rows="4"
              variant="outlined"
              label="Question"
              :rules="rules"
              v-model="question.question"
            >
            </v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6"
            ><v-text-field
              variant="outlined"
              density="compact"
              label="Bonne réponse"
              :rules="rules"
              v-model="question.answerOptions[0].answer"
            ></v-text-field
          ></v-col>

          <v-col cols="12" sm="6"
            ><v-text-field
              variant="outlined"
              density="compact"
              label="Réponse fausse 1"
              :rules="rules"
              v-model="question.answerOptions[1].answer"
            ></v-text-field
          ></v-col>

          <v-col cols="12" sm="6"
            ><v-text-field
              variant="outlined"
              density="compact"
              label="Réponse fausse 2"
              :rules="rules"
              v-model="question.answerOptions[2].answer"
            ></v-text-field
          ></v-col>

          <v-col cols="12" sm="6"
            ><v-text-field
              variant="outlined"
              density="compact"
              label="Réponse fausse 3"
              :rules="rules"
              v-model="question.answerOptions[3].answer"
            ></v-text-field
          ></v-col>
          <v-col align-self="end" cols="12" sm="6">
            <v-combobox
              :rules="rules"
              :items="themes"
              density="compact"
              label="Thème"
              variant="outlined"
              v-model="question.theme"
            >
            </v-combobox>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="d-flex">
            <v-btn
              color="error"
              :loading="deleting"
              class="mx-auto"
              @click="deleteQuestion"
            >
              Supprimer
            </v-btn>
            <v-btn
              color="success"
              :loading="submitting"
              class="mx-auto"
              @click="processQuestion"
              :disabled="!edited"
            >
              Enregistrer
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-snackbar
        v-model="snackbar"
        :timeout="2000"
        :color="success ? 'success' : 'error'"
        location="top"
      >
        {{
          success
            ? "Question modifiée ! "
            : "Erreur, veuillez vérifier votre connexion"
        }}
      </v-snackbar>
      <v-dialog v-model="loading" width="auto" hide-overlay persistent>
        <v-progress-circular
          indeterminate
          color="info"
          :size="100"
          :width="10"
        ></v-progress-circular>
      </v-dialog>
    </v-form>
  </div>
</template>
