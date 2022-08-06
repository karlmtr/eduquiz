<script setup lang="ts">
import router from "../router/index";
import AppBar from "@/components/AppBar.vue";
import { ref, reactive, computed } from "vue";
import db from "../firebase/init";
import { collection, addDoc } from "firebase/firestore";

const question = reactive({
  question: "",
  valid_answer: "",
  answer2: "",
  answer3: "",
  answer4: "",
  theme: "Optique",
  year: "3",
  collection: "",
});
const themes = ref(["Astronomie", "Optique", "Energie", "Mécanique"]);
const years = ref(["Préparatoire", "1", "2", "3"]);

const isQuestionValid = computed(() => {
  const keys: Array<string> = Object.keys(question);
  let valid = true;
  keys.forEach((el) => {
    if (question[el as keyof typeof question] === "" && el != "collection") {
      valid = false;
    }
  });
  return valid;
});
async function processQuestion() {
  if (isQuestionValid.value) {
    const colRef = collection(db, "questions");
    const docRef = await addDoc(colRef, question);
    console.log("Question ajoutée avec ID : ", docRef.id);
  } else {
    console.log("Pas possible, pas tous les champs sont remplis");
  }
}
</script>

<template>
  <AppBar :arrow="true" title="" @pressedArrow="router.go(-1)"></AppBar>
  <main>
    <form class="flex flex-col gap-1 px-5">
      <label class="text-center">Question</label>
      <textarea v-model="question.question"></textarea>
      <label class="text-center"> Réponse juste </label>
      <input v-model="question.valid_answer" type="text" />
      <label class="text-center"> Réponse 2</label>
      <input v-model="question.answer2" type="text" />
      <label class="text-center"> Réponse 3 </label>
      <input v-model="question.answer3" type="text" />
      <label class="text-center"> Réponse 4 </label>
      <input v-model="question.answer4" type="text" />
      <label class="text-center">Thème</label>
      <select v-model="question.theme">
        <option v-for="theme in themes" :value="theme" :key="theme">
          {{ theme }}
        </option>
      </select>

      <label class="text-center"> Année </label>
      <select v-model="question.year">
        <option v-for="year in years" :value="year" :key="year">
          {{ year }}
        </option>
      </select>
      <label class="text-center">Collection</label>
      <input v-model="question.collection" type="text" />
      <div v-if="!isQuestionValid" class="text-red-600 text-center">
        Il faut remplir tous les champs obligatoires !
      </div>
      <div class="flex justify-center">
        <div class="px-3 py-2 rounded-lg bg-green-300" @click="processQuestion">
          Add
        </div>
      </div>
    </form>
  </main>
</template>
