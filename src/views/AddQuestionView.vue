<script setup lang="ts">
import AppBar from "@/components/AppBar.vue";
import { ref, reactive, computed } from "vue";
import { auth, db } from "../firebase/init";
import { doc, setDoc, collection } from "firebase/firestore";
import { Qthemes, Qyears } from "@/helpers/definitions";
import type { Question } from "../helpers/types";
import { useRouter } from "vue-router";
import { emitToast } from "@/helpers/functions";
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
  teacherUID: "",
});

const router = useRouter();

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
const sendToFirestore = async () => {
  if (isQuestionValid.value) {
    const colRef = doc(collection(db, "questions", question.ID));
    question.ID = colRef.id;
    question.teacherUID = auth.currentUser?.uid;
    await setDoc(colRef, question);
  }
};
const processQuestion = () => {
  submitting.value = true;
  sendToFirestore()
    .then(() => {
      submitting.value = false;
      emitToast("Votre question a été ajoutée avec succès !", "success");
      resetQuestion();
    })
    .catch((): void => {
      submitting.value = false;
      emitToast("Erreur, vérifiez votre connexion...", "danger");
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
        <label class="form-label">Question</label>
        <textarea
          class="px-2 rounded-md"
          rows="5"
          v-model="question.question"
        ></textarea>
        <label class="form-label"> Réponse juste </label>
        <input
          class="h-8 px-2 rounded-md"
          v-model="question.answerOptions[0].answer"
          type="text"
        />
        <label class="form-label"> Réponse 2</label>
        <input
          class="h-8 px-2 rounded-md"
          v-model="question.answerOptions[1].answer"
          type="text"
        />
        <label class="form-label"> Réponse 3 </label>
        <input
          class="h-8 px-2 rounded-md"
          v-model="question.answerOptions[2].answer"
          type="text"
        />
        <label class="form-label"> Réponse 4 </label>
        <input
          class="h-8 px-2 rounded-md"
          v-model="question.answerOptions[3].answer"
          type="text"
        />
        <div class="flex items-center">
          <label class="w-1/4 form-label">Thème</label>
          <select class="w-1/2 h-8 px-2 rounded-md" v-model="question.theme">
            <option v-for="theme in themes" :value="theme" :key="theme">
              {{ theme }}
            </option>
          </select>
          <label class="w-1/4 form-label"> Année </label>
          <select class="w-1/4 h-8 px-2 rounded-md" v-model="question.year">
            <option v-for="year in years" :value="year" :key="year">
              {{ year }}
            </option>
          </select>
        </div>
        <label class="form-label">Collection (optionel)</label>
        <input
          class="h-8 px-2 rounded-md"
          v-model="question.collection"
          type="text"
        />
        <div v-if="!isQuestionValid" class="text-center text-red-400">
          Il faut remplir tous les champs obligatoires !
        </div>
        <div class="flex justify-center">
          <button
            type="button"
            class="flex gap-2 px-3 py-2 bg-green-300 rounded-lg"
            @click="processQuestion"
            :disabled="!isQuestionValid"
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
            Add
          </button>
        </div>
      </form>
    </main>
  </div>
</template>
