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
      url: "http://localhost:3333/finishSignIn",
      handleCodeInApp: true,
    };
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
  (v: string) => !!v || "L'Email est obligatoire",
  (v: string) => {
    const sampleRegex = /^\S+@(edu\.ge|eduge|gmail|galantay)\.(ch|com)$/;
    return (v && sampleRegex.test(v)) || "Veuillez entrer une adresse valide";
  },
]);
</script>

<template>
  <div>
    <v-container>
      <template v-if="!emailSent">
        <v-row>
          <v-col cols="12">
            <p class="text-center text-h6 font-weight-bold">
              S'inscrire/connecter avec son adresse mail scolaire
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-form ref="form" v-model="validForm" class="d-flex flex-column">
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

<style scoped></style>
