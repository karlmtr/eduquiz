<script setup lang="ts">
import router from "../router/index";
import AppBar from "@/components/AppBar.vue";
import db from "../firebase/init";
import { ref } from "vue";
import { collection, getDocs, query } from "@firebase/firestore";
import { onMounted } from "vue";
import type { DocumentData } from "@firebase/firestore";

const questions = ref<DocumentData[]>([]);
onMounted(async () => {
  const querySnap = await getDocs(query(collection(db, "questions")));
  querySnap.forEach((doc) => {
    const data = doc.data();
    if (data) {
      questions.value.push(data);
    }
  });
});
</script>

<template>
  <div>
    <AppBar
      :arrow="true"
      title="Questions"
      @pressedArrow="router.go(-1)"
    ></AppBar>
    <main class="main-container overflow-y-auto">
      <!-- <div @click="fetchQuestions" class="p-10 bg-red-200">Checher quesitons</div> -->
      <div class="flex flex-col gap-3">
        <div
          v-for="question in questions"
          :key="question.ID"
          class="bg-red-100 rounded-xl min-h-[50px] shadow-md px-2 py-1"
        >
          {{ question.question }}
        </div>
      </div>
    </main>
  </div>
</template>
