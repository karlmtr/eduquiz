<script setup lang="ts">
import router from "../router/index";
import AppBar from "@/components/AppBar.vue";
import { ref } from "vue";

const question = ref({
  question: "",
  valid_answer: "",
  answer2: "",
  answer3: "",
  answer4: "",
  theme: "Optique",
  year: "3",
  collection:"",
});
const themes = ref(["Astronomie", "Optique", "Energie", "Mécanique"]);
const years = ref(["Préparatoire", "1", "2", "3"]);
</script>

<template>
  <AppBar :arrow="true" title="" @pressedArrow="router.go(-1)"></AppBar>
  <main>
    <form class="flex flex-col gap-1">
      <label>Question</label>
      <textarea v-model="question.question"></textarea>
      <label> Réponse juste </label>
      <input v-model="question.valid_answer" type="text" />
      <label> Réponse 2</label>
      <input v-model="question.answer2" type="text" />
      <label> Réponse 3 </label>
      <input v-model="question.answer3" type="text" />
      <label> Réponse 4 </label>
      <input v-model="question.answer4" type="text" />
      <label>Thème</label>
      <select v-model="question.theme">
        <option v-for="theme in themes" :value="theme" :key="theme">
          {{ theme }}
        </option>
      </select>
      <label> Année </label>
      <select v-model="question.year">
        <option v-for="year in years" :value="year" :key="year">
          {{ year }}
        </option>
      </select>
      <label>Collection</label>
      <input v-model="question.collection" type="text" />
      <div class="flex justify-center px-3 py-2 bg-blue-200">
        <div>Add</div>
      </div>
    </form>
  </main>
</template>
