<script setup lang="ts">
import AppBar from "@/components/AppBar.vue";
import { reactive, ref } from "vue";
import { QnumberChoice, Qthemes } from "../helpers/definitions";
import { query, collection, getDocs, limit, where } from "firebase/firestore";
import { db } from "@/firebase/init";
import { quizStateStore } from "../stores/quizStore";
import { useRouter } from "vue-router";

const router = useRouter();
const quizStore = quizStateStore();
const prefs = reactive({
  number_questions: 4,
  theme: "",
});

const loading = ref(false);

const fetchDatabase = async () => {
  const q = query(
    collection(db, "questions"),
    where("theme", "==", prefs.theme),
    limit(prefs.number_questions)
  );
  const querySnapshot = await getDocs(q);
  quizStore.$reset();
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data) {
      quizStore.addQuestion(data);
    }
  });
};

const createNewQuiz = () => {
  loading.value = true;
  quizStore.$reset;
  fetchDatabase().then(() => {
    loading.value = false;
    quizStore.setStarted();
    router.push({
      name: "quiz",
    });
  });
};
</script>

<template>
  <div>
    <AppBar
      :arrow="true"
      title="Nouvelle partie"
      @pressedArrow="router.push({ name: 'home' })"
    ></AppBar>
    <main class="main-container">
      <div class="flex flex-col justify-center gap-3 my-4">
        <form class="flex flex-col gap-5">
          <div class="flex">
            <label class="w-1/2"> Nbre questions</label>
            <select
              class="h-8 px-2 rounded-md"
              v-model="prefs.number_questions"
            >
              <option v-for="num in QnumberChoice" :key="num" :value="num">
                {{ num }}
              </option>
            </select>
          </div>
          <div class="flex">
            <label class="w-1/2"> Thème </label>
            <select class="w-1/2 h-8 px-2 rounded-md" v-model="prefs.theme">
              <option v-for="theme in Qthemes" :key="theme">{{ theme }}</option>
            </select>
          </div>
        </form>
        <button
          type="button"
          :disabled="prefs.theme === '' ? true : false"
          class="flex justify-center w-2/3 gap-2 px-3 py-4 mx-auto my-10 text-center bg-green-400 rounded-lg shadow-md hover:bg-green-500"
          @click="createNewQuiz"
        >
          <svg
            v-show="loading"
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            :class="loading ? 'animate-spin' : ''"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
          Commencer le quiz
        </button>
      </div>
    </main>
  </div>
</template>
