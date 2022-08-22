<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  getAdditionalUserInfo,
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import { useRouter } from "vue-router";
import { app, db } from "@/firebase/init";
import {
  VContainer,
  VRow,
  VCol,
  VTextField,
  VForm,
  VBtn,
} from "vuetify/components";
import { generalStateStore } from "@/stores/generalStateStore";

const router = useRouter();
const generalStore = generalStateStore();
generalStore.appBar.profileMenu = false;
generalStore.appBar.goingBack = true;

const email = ref<string>("");
const validForm = ref(false);
const processing = ref(false);

onMounted(() => {
  const emailCache = window.localStorage.getItem("emailForSignIn");
  if (emailCache) {
    email.value = emailCache;
  }
});
const processInscription = () => {
  processing.value = true;
  if (email.value.length !== 0) {
    const auth = getAuth(app);
    if (isSignInWithEmailLink(auth, window.location.href)) {
      signInWithEmailLink(auth, email.value, window.location.href)
        .then((result) => {
          window.localStorage.removeItem("emailForSignIn");

          if (getAdditionalUserInfo(result)?.isNewUser) {
            console.log("New User");
            const colRef = doc(db, "users", result.user.uid);
            setDoc(colRef, { email: result.user.email });
          }
          processing.value = false;
          router.push({ name: "home" });
        })
        .catch((error) => {
          console.log("Ça marche pas, erreur");
          console.log(error);
        });
    }
  } else {
    console.log("ça marche pas");
  }
};

const emailRules = ref([
  (v: string) => !!v || "L'email est obligatoire",
  (v: string) => {
    const sampleRegex = /^\S+@(edu\.ge|eduge|galantay)\.(ch|com)$/;
    return (v && sampleRegex.test(v)) || "Veuillez entrer une adresse valide";
  },
]);
</script>

<template>
  <div>
    <v-container class="justify-center h-screen align-middle main-container">
      <v-row>
        <v-col cols="12" class="text-center">
          Veuillez confirmer votre email</v-col
        >
      </v-row>
      <v-row class="flex gap-2">
        <v-col>
          <v-form
            ref="form"
            v-model="validForm"
            class="d-flex flex-column"
            @submit="processInscription"
            @keydown.enter.prevent="processInscription"
          >
            <v-text-field
              v-model="email"
              required
              label="Email scolaire (@edu...)"
              variant="outlined"
              :rules="emailRules"
            ></v-text-field>
            <v-btn
              color="success"
              @click="processInscription"
              :disabled="!validForm"
              :loading="processing"
              class="mx-auto"
            >
              Confirmer
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped></style>
