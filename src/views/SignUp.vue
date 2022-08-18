<script setup lang="ts">
import { ref, computed } from "vue";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { app } from "@/firebase/init";

const email = ref("");
const emailSent = ref(false);
const processInscription = () => {
  if (!invalidEmail.value) {
    // On continue l'authentification
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: "http://localhost:3333/finishSignIn",
      // This must be true.
      handleCodeInApp: true,
    };

    const auth = getAuth(app);
    sendSignInLinkToEmail(auth, email.value, actionCodeSettings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem("emailForSignIn", email.value);
        console.log("ça fonctinone !!!!!!!!!");
        emailSent.value = true;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode", errorCode, "errorMessage", errorMessage);
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
    <main class="justify-center h-screen align-middle main-container">
      <div
        class="flex flex-col justify-center rounded-md min-h-[25%] bg-slate-400"
      >
        <form v-if="!emailSent" class="flex flex-col justify-center p-3">
          <div class="text-xl text-center">
            S'inscrire/connecter avec son adresse mail edu, finissant par
            @eduge.ch ou @edu.ge.ch
          </div>
          <input
            required
            pattern="/^\S+@(edu\.ge|eduge)\.ch$/"
            class="w-2/3 px-2 py-3 mx-auto my-2 rounded-md bg-slate-200 active:bg-slate-300"
            v-model="email"
            placeholder="<prof>@eduge.ch ou <eleve>@edu.ge.ch"
          />
          <div
            class="w-2/3 mx-auto mt-1 text-xs text-red-700"
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
        <div v-else>Mail Envoyé</div>
      </div>
    </main>
  </div>
</template>

<style scoped></style>
