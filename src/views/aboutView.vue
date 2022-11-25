<script setup lang="ts">
import { VContainer, VBtn, VRow, VCol } from "vuetify/components";
import { generalStateStore } from "@/stores/generalStateStore";
import { useRouter } from "vue-router";

const generalStore = generalStateStore();
generalStore.appBar.profileMenu = false;
generalStore.appBar.goingBack = false;
const router = useRouter();
</script>

<template>
  <div>
    <v-container>
      <h1 id="logo" color="success" class="text-center w-100">EduQuiz</h1>
      <v-row>
        <v-col cols="12">
          <p class="text-center text-subtitle-1">
            Bienvenue sur EduQuiz, un moyen pour les enseignants de créer des
            questions à choix multiples et de tester les connaissances de ses
            élèves sur des thèmes à choix. <br />
            L'application est en constante évolution, donc n'hésitez pas à me
            contacter pour toute question, remarques, suggestions, etc. à
            l'adresse
            <span style="color: #ef5340">edward.galantay@gmail.com</span>
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <v-btn flat color="success" @click="router.push({ name: 'signUp' })">
            Se connecter
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
#logo {
  font-family: "Courgette";
  font-size: 18vw;
  background-image: linear-gradient(
    to right,
    rgb(236, 72, 153),
    rgb(239, 68, 68),
    rgb(234, 179, 8)
  );
  background-size: 100%;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}

@media screen and (min-width: 900px) {
  #logo {
    font-size: 150px;
  }
}
</style>
