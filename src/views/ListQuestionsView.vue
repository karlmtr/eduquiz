<script setup lang="ts">
import AppBar from "@/components/AppBar.vue";
import { db } from "../firebase/init";
import { ref } from "vue";
import { collection, getDocs, query } from "@firebase/firestore";
import { onMounted } from "vue";
import type { DocumentData } from "@firebase/firestore";
import { useRouter } from "vue-router";

const router = useRouter();

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

const openQuestion = (ID: string) => {
  router.push({ name: "edit", params: { ID: ID as string } });
};
</script>

<template>
  <div>
    <AppBar
      :arrow="true"
      title="Questions"
      @pressedArrow="router.push({ name: 'home' })"
    ></AppBar>
    <main class="overflow-y-auto main-container">
      <div class="flex flex-col gap-3 mb-5">
        <div
          v-for="question in questions"
          :key="question.ID"
          class="bg-red-100 rounded-xl min-h-[50px] shadow-md px-2 py-1 hover:bg-blue-200 hover:shadow-none cursor-pointer"
          @click="openQuestion(question.ID)"
        >
          {{ question.question }}
        </div>
      </div>
    </main>
  </div>
</template>
