<script setup lang="ts">
import router from "../router/index";
import AppBar from "@/components/AppBar.vue";
import { ref, reactive, computed } from "vue";
import db from "../firebase/init";
import { collection, doc, setDoc } from "firebase/firestore";
import { Qthemes, Qyears } from "@/helpers/definitions";
import type { Question } from "../helpers/types";
const question = reactive<Question>({
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
});
const themes = ref(Qthemes);
const years = ref(Qyears);
const submitting = ref(false);

const isQuestionValid = computed(() => {
  if (
    question.question === "" ||
    question.answerOptions[0].answer === "" ||
    question.answerOptions[1].answer === "" ||
    question.answerOptions[2].answer === "" ||
    question.answerOptions[3].answer === ""
  ) {
    return false;
  } else {
    return true;
  }
});
async function sendToFirestore() {
  submitting.value = true;
  if (isQuestionValid.value) {
    const colRef = doc(collection(db, "questions"));
    question.ID = colRef.id;
    await setDoc(colRef, question);
  }
}
const processQuestion = () => {
  sendToFirestore().then(() => {
    submitting.value = false;
    resetQuestion();
  });
};
const resetQuestion = () => {
  question.answerOptions = [
    { answer: "", isCorrect: true },
    { answer: "" },
    { answer: "" },
    { answer: "" },
  ];
  question.question = "";
};
</script>

<template>
  <div>
    <AppBar :arrow="true" title="" @pressedArrow="router.go(-1)"></AppBar>
    <main class="main-container">
      <form class="flex flex-col gap-3">
        <label class="text-center">Question</label>
        <textarea
          class="rounded-md px-2"
          rows="5"
          v-model="question.question"
        ></textarea>
        <label class="text-center"> Réponse juste </label>
        <input
          class="rounded-md h-8 px-2"
          v-model="question.answerOptions[0].answer"
          type="text"
        />
        <label class="text-center"> Réponse 2</label>
        <input
          class="rounded-md h-8 px-2"
          v-model="question.answerOptions[1].answer"
          type="text"
        />
        <label class="text-center"> Réponse 3 </label>
        <input
          class="rounded-md h-8 px-2"
          v-model="question.answerOptions[2].answer"
          type="text"
        />
        <label class="text-center"> Réponse 4 </label>
        <input
          class="rounded-md h-8 px-2"
          v-model="question.answerOptions[3].answer"
          type="text"
        />
        <div class="flex items-center">
          <label class="text-center w-1/4">Thème</label>
          <select class="rounded-md w-1/2 h-8 px-2" v-model="question.theme">
            <option v-for="theme in themes" :value="theme" :key="theme">
              {{ theme }}
            </option>
          </select>
          <label class="text-center w-1/4"> Année </label>
          <select class="rounded-md w-1/4 h-8 px-2" v-model="question.year">
            <option v-for="year in years" :value="year" :key="year">
              {{ year }}
            </option>
          </select>
        </div>
        <label class="text-center">Collection (optionel)</label>
        <input
          class="rounded-md h-8 px-2"
          v-model="question.collection"
          type="text"
        />
        <div v-if="!isQuestionValid" class="text-red-400 text-center">
          Il faut remplir tous les champs obligatoires !
        </div>
        <div class="flex justify-center">
          <button
            type="button"
            class="flex gap-2 px-3 py-2 rounded-lg bg-green-300"
            @click="processQuestion"
            :disabled="!isQuestionValid"
          >
            <svg
              v-show="submitting"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 hidden"
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
            Add
          </button>
        </div>
      </form>
    </main>
  </div>
</template>
