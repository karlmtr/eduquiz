<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { app } from "../firebase/init";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import type { Question } from "@/types/Question";
import { questionsCol, generalCol } from "@/firebase/init";

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
} from "vuetify/components";
import { getAuth } from "@firebase/auth";
import { generalStateStore } from "@/stores/generalStateStore";

const generalStore = generalStateStore();
generalStore.appBar.profileMenu = false;
generalStore.appBar.goingBack = true;

const question = reactive<Question>({
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

const themes = ref<string[] | undefined>([]);

const submitting = ref(false);
const snackbar = ref(false);

const sendToFirestore = async () => {
  if (validForm.value) {
    const auth = getAuth(app);
    const docRef = doc(questionsCol);
    question.ID = docRef.id;
    question.teacherUID = auth.currentUser?.uid;
    await setDoc(docRef, question);
  }
};
const processQuestion = () => {
  submitting.value = true;
  if (!themes.value?.includes(question.theme)) {
    themes.value?.push(question.theme);
    updateDoc(doc(generalCol, "question"), {
      themes: themes.value,
    });
  }
  sendToFirestore()
    .then(() => {
      submitting.value = false;
      success.value = true;
      snackbar.value = true;
    })
    .catch((): void => {
      submitting.value = false;
      success.value = false;
      snackbar.value = true;
    });
};

onMounted(() => {
  getDoc(doc(generalCol, "question")).then((result) => {
    themes.value = result.data()?.themes;
  });
});

const rules = ref([(v: string) => !!v || "Obligatoire"]);

const validForm = ref(false);
const success = ref(false);
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
              color="success"
              :loading="submitting"
              class="mx-auto"
              @click="processQuestion"
            >
              Créer
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
            ? "Question enregistrée ! "
            : "Erreur, veuillez vérifier votre connexion"
        }}
      </v-snackbar>
    </v-form>
  </div>
</template>
