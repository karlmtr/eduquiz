<script setup lang="ts">
import { ref } from "vue";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { app } from "@/firebase/init";
import {
  VContainer,
  VForm,
  VTextField,
  VBtn,
  VRow,
  VCol,
  VSnackbar,
} from "vuetify/components";
import { generalStateStore } from "@/stores/generalStateStore";

const generalStore = generalStateStore();
generalStore.appBar.profileMenu = false;
generalStore.appBar.goingBack = false;
const email = ref("");
const sending = ref(false);
const emailSent = ref(false);
const validForm = ref(false);
const snackbar = ref(false);
const processInscription = () => {
  if (validForm.value) {
    // On continue l'authentification
    sending.value = true;
    const actionCodeSettings = {
      url: `${window.location.origin}/finishSignIn`,
      handleCodeInApp: true,
    };
    // const actionCodeSettings = {
    //   url: "http://localhost:3333/finishSignIn",
    //   handleCodeInApp: true,
    // };
    const auth = getAuth(app);
    sendSignInLinkToEmail(auth, email.value, actionCodeSettings)
      .then(() => {
        sending.value = false;
        emailSent.value = true;
        snackbar.value = true;
        window.localStorage.setItem("emailForSignIn", email.value);
      })
      .catch(() => {
        snackbar.value = true;
      });
  } else {
    console.log("ça marche pas");
  }
};

const emailRules = ref([
  (v: string) => !!v || "Obligatoire",
  (v: string) => {
    const sampleRegex = /^\S+@(edu\.ge|eduge|galantay)\.(ch|com)$/;
    return (v && sampleRegex.test(v)) || "Veuillez entrer une adresse valide";
  },
]);
</script>

<template>
  <div>
    <v-container>
      <h1 id="logo" color="success" class="text-center w-100">EduQuiz</h1>
      <template v-if="!emailSent">
        <v-row>
          <v-col cols="12">
            <p
              class="text-center text-subtitle-1 font-weight-light font-italic"
            >
              S'inscrire/connecter avec son adresse mail scolaire
            </p>
          </v-col>
        </v-row>
        <v-row>
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
                :loading="sending"
                class="mx-auto"
              >
                Envoyer le lien par mail
              </v-btn>
            </v-form>
          </v-col>
        </v-row>
      </template>

      <v-row v-else class="text-center">
        <v-col cols="12">
          <p>
            Vous pouvez maintenant cliquer sur le lien que vous avez reçu par
            email pour finaliser la connexion/inscription.
          </p>
          <br />
          <p class="font-italic">
            Si vous ne reçevez rien, vérifiez dans votre boîte spam.
          </p>
        </v-col>
      </v-row>

      <v-snackbar
        v-model="snackbar"
        :timeout="2000"
        :color="emailSent ? 'success' : 'error'"
        location="top"
      >
        {{
          emailSent
            ? "Email bien envoyé ! "
            : "Erreur, veuillez vérifier votre connexion"
        }}
      </v-snackbar>
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
