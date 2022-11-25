<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { query, getDocs, limit, where, doc, getDoc } from "firebase/firestore";
import { generalCol, questionsCol } from "@/firebase/init";
import { quizStateStore } from "../stores/quizStore";
import { useRouter } from "vue-router";
import {
  VRow,
  VCol,
  VSelect,
  VContainer,
  VBtn,
  VAutocomplete,
  VSnackbar,
} from "vuetify/components";
import { generalStateStore } from "@/stores/generalStateStore";
const router = useRouter();
const quizStore = quizStateStore();
const generalStore = generalStateStore();
generalStore.appBar.profileMenu = false;
generalStore.appBar.goingBack = true;

const prefs = reactive({
  number_questions: 10,
  theme: "",
});

const loading = ref(false);
const themes = ref<string[] | undefined>([]);
const rules = ref([(v: string) => !!v || "Obligatoire"]);
const snackbar = ref(false);

onMounted(() => {
  getDoc(doc(generalCol, "question")).then((result) => {
    themes.value = result.data()?.themes;
  });
});

const fetchDatabase = async () => {
  const q = query(
    questionsCol,
    where("theme", "==", prefs.theme),
    limit(prefs.number_questions)
  );
  const querySnapshot = await getDocs(q);
  quizStore.$reset(); // if not already reset
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
    if (quizStore.questions.length == 0) {
      snackbar.value = true;
      return;
    }
    quizStore.setStarted();
    router.push({
      name: "quiz",
    });
  });
};
</script>

<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-select
            @change="prefs.number_questions"
            variant="outlined"
            hide-details
            label="Nombre de questions"
            :items="[10]"
          ></v-select
        ></v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-autocomplete
            :rules="rules"
            v-model="prefs.theme"
            variant="outlined"
            hide-details
            label="Thème"
            :items="themes"
          ></v-autocomplete
        ></v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="d-flex">
          <v-btn
            class="mx-auto my-3"
            color="success"
            :loading="loading"
            :disabled="prefs.theme === ''"
            @click="createNewQuiz"
          >
            Commencer !
          </v-btn>
        </v-col>
      </v-row>
      <v-snackbar
        v-model="snackbar"
        :timeout="2000"
        color="error"
        location="top"
      >
        Aucune question trouvée à partir de vos choix
      </v-snackbar>
    </v-container>
  </div>
</template>
