<script setup lang="ts">
import AppBar from "@/components/AppBar.vue";
import { ref, computed, onMounted } from "vue";
import { db } from "../firebase/init";
import {
  doc,
  updateDoc,
  getDoc,
  type DocumentData,
  deleteDoc,
} from "firebase/firestore";
import { Qthemes, Qyears } from "@/helpers/definitions";
import type { Question } from "../helpers/types";
import { useRoute, useRouter } from "vue-router";
import isEqual from "lodash.isequal";
import { emitToast } from "@/helpers/functions";

// const props = defineProps<{
//   ID: string;
// }>();

const router = useRouter();
const route = useRoute();
const questionTemplate = {
  question: "",
  answerOptions: [
    { answer: "", isCorrect: true },
    { answer: "" },
    { answer: "" },
    { answer: "" },
  ],
  theme: "Optique",
  year: "3",
  collection: "",
  ID: "",
};
const deleting = ref(false);
const submitting = ref(false);

const themes = ref(Qthemes);
const years = ref(Qyears);
const question = ref<Question | DocumentData>(questionTemplate);
const snap = ref<Question | DocumentData>();

onMounted(async () => {
  snap.value = await (
    await getDoc(doc(db, "questions", route.params.ID as string))
  ).data();
  question.value = JSON.parse(
    JSON.stringify(snap.value as unknown as DocumentData)
  );
});

const isQuestionValid = computed(() => {
  if (
    question.value.question === "" ||
    question.value.answerOptions[0].answer === "" ||
    question.value.answerOptions[1].answer === "" ||
    question.value.answerOptions[2].answer === "" ||
    question.value.answerOptions[3].answer === ""
  ) {
    return false;
  } else {
    return true;
  }
});

const sytleButtonSubmit = computed(() => {
  if (edited.value && isQuestionValid.value) {
    return "bg-green-300";
  } else if (edited.value && !isQuestionValid.value) {
    return "bg-slate-400";
  } else {
    return "bg-slate-300";
  }
});

const edited = computed(() => {
  return !isEqual(snap.value, question.value);
});

const sendToFirestore = async () => {
  updateDoc(doc(db, "questions", question.value.ID), question.value);
};
const deleteFromFirestore = async () => {
  deleteDoc(doc(db, "questions", question.value.ID));
};

const deleteQuestion = () => {
  deleting.value = true;
  deleteFromFirestore()
    .then(() => {
      deleting.value = false;
      emitToast("Effacé avec succès", "success");
      router.replace({ name: "qList" });
    })
    .catch(() => {
      emitToast(`Erreur, vérifiez votre connexion...`, "danger");
    });
};

const processQuestion = () => {
  submitting.value = true;

  sendToFirestore()
    .then(() => {
      submitting.value = false;
      emitToast("Succès", "success");
      snap.value = question.value;
      snap.value = JSON.parse(
        JSON.stringify(question.value as unknown as Question)
      );
    })
    .catch(() => {
      emitToast("Erreur", "danger");
    });
};
</script>

<template>
  <div>
    <AppBar :arrow="true" title="" @pressedArrow="router.go(-1)"></AppBar>
    <main class="main-container">
      <form class="flex flex-col gap-3">
        <label class="text-center">Question</label>
        <textarea
          class="px-2 rounded-md"
          rows="5"
          v-model="question.question"
        ></textarea>
        <label class="text-center"> Réponse juste </label>
        <input
          class="h-8 px-2 rounded-md"
          v-model="question.answerOptions[0].answer"
          type="text"
        />
        <label class="text-center"> Réponse 2</label>
        <input
          class="h-8 px-2 rounded-md"
          v-model="question.answerOptions[1].answer"
          type="text"
        />
        <label class="text-center"> Réponse 3 </label>
        <input
          class="h-8 px-2 rounded-md"
          v-model="question.answerOptions[2].answer"
          type="text"
        />
        <label class="text-center"> Réponse 4 </label>
        <input
          class="h-8 px-2 rounded-md"
          v-model="question.answerOptions[3].answer"
          type="text"
        />
        <div class="flex items-center">
          <label class="w-1/4 text-center">Thème</label>
          <select class="w-1/2 h-8 px-2 rounded-md" v-model="question.theme">
            <option v-for="theme in themes" :value="theme" :key="theme">
              {{ theme }}
            </option>
          </select>
          <label class="w-1/4 text-center"> Année </label>
          <select class="w-1/4 h-8 px-2 rounded-md" v-model="question.year">
            <option v-for="year in years" :value="year" :key="year">
              {{ year }}
            </option>
          </select>
        </div>
        <label class="text-center">Collection (optionel)</label>
        <input
          class="h-8 px-2 rounded-md"
          v-model="question.collection"
          type="text"
        />
        <div v-if="!isQuestionValid" class="text-center text-red-400">
          Il faut remplir tous les champs obligatoires !
        </div>
        <div class="flex justify-center gap-2 my-5">
          <button
            type="button"
            class="flex gap-2 px-3 py-2 bg-red-400 rounded-lg"
            @click="deleteQuestion"
          >
            Supprimer la question
          </button>
          <button
            type="button"
            class="flex gap-2 px-3 py-2 rounded-lg"
            :class="sytleButtonSubmit"
            @click="processQuestion"
            :disabled="!edited || !isQuestionValid"
          >
            <svg
              v-show="submitting"
              xmlns="http://www.w3.org/2000/svg"
              class="hidden w-6 h-6"
              :class="submitting ? 'animate-spin' : ''"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            Sauver les modifications
          </button>
        </div>
      </form>
    </main>
  </div>
</template>
