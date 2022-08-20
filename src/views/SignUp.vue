<script setup lang="ts">
import { ref, computed } from "vue";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { app } from "@/firebase/init";
import { emitToast } from "@/helpers/functions";

const email = ref("");
const emailSent = ref(false);
const processInscription = () => {
  if (!invalidEmail.value) {
    // On continue l'authentification
    const actionCodeSettings = {
      url: "http://localhost:3333/finishSignIn",
      handleCodeInApp: true,
    };
    const auth = getAuth(app);
    sendSignInLinkToEmail(auth, email.value, actionCodeSettings)
      .then(() => {
        emitToast("Le message a bien été envoyé !", "success");
        window.localStorage.setItem("emailForSignIn", email.value);
        emailSent.value = true;
        // ...
      })
      .catch(() => {
        emitToast("Erreur d'authentification", "danger");
        // ...
      });
  } else {
    console.log("ça marche pas");
  }
};

const invalidEmail = computed(() => {
  const sampleRegEx = /^\S+@(edu\.ge|eduge|gmail|galantay)\.(ch|com)$/;
  return !sampleRegEx.test(email.value);
});
</script>

<template>
  <div>
    <main class="h-screen align-middle justify-begin main-container">
      <div id="logo" class="my-10 text-6xl text-center font-logo">EduQuiz</div>
      <div
        class="flex flex-col justify-center rounded-md min-h-[25%] border-blue-500 border-4"
      >
        <form v-if="!emailSent" class="flex flex-col justify-center p-3">
          <div class="text-sm text-center">
            S'inscrire/connecter avec son adresse mail, finissant par
            @eduge.ch/@edu.ge.ch
          </div>
          <input
            required
            pattern="/^\S+@(edu\.ge|eduge)\.ch$/"
            class="w-2/3 px-2 py-1 mx-auto my-2 rounded-md bg-slate-200 active:bg-slate-300"
            v-model="email"
            placeholder=""
          />
          <div
            class="w-2/3 mx-auto mt-1 text-xs italic text-red-500"
            :class="!invalidEmail ? 'invisible' : ''"
          >
            Veuillez entrer une adresse mail valide
          </div>
          <button
            type="button"
            class="px-2 py-3 mx-auto my-2 text-center bg-green-400 rounded-md active:bg-green-500"
            @click="processInscription"
            :disabled="invalidEmail"
            :class="invalidEmail ? 'bg-slate-500 active:' : ''"
          >
            Envoyer le mail de confirmation
          </button>
        </form>
        <div v-else class="px-5 text-center">
          Veuillez vérifier dans les spams si vous n'avez pas reçu de mail.
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped></style>
