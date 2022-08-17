<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { useRouter } from "vue-router";
import { app } from "@/firebase/init";

const router = useRouter();
const email = ref<string>("");

onMounted(() => {
  const emailCache = window.localStorage.getItem("emailForSignIn");
  if (emailCache) {
    email.value = emailCache;
  }
});
const processInscription = () => {
  if (email.value.length !== 0) {
    const auth = getAuth(app);
    if (isSignInWithEmailLink(auth, window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.

      // User opened the link on a different device. To prevent session fixation
      // attacks, ask the user to provide the associated email again. For example:

      // The client SDK will parse the code from the link for you.
      signInWithEmailLink(auth, email.value, window.location.href)
        .then((result) => {
          console.log(result);
          console.log("Ça a marché");
          // Clear email from storage.
          window.localStorage.removeItem("emailForSignIn");
          router.push({ name: "home" });
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
        })
        .catch((error) => {
          console.log("Ça marche pas, erreur");
          console.log(error);
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        });
    }
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
      <div>Remettre son adresse mail</div>
      <div class="flex gap-2">
        <input
          required
          pattern="/^\S+@(edu\.ge|eduge)\.ch$/"
          class="w-2/3 px-2 py-3 mx-auto my-2 rounded-md bg-slate-200 active:bg-slate-300"
          v-model="email"
          placeholder="<prof>@eduge.ch ou <eleve>@edu.ge.ch"
        />

        <button
          type="button"
          class="w-1/3 px-2 py-3 mx-auto my-2 text-center bg-green-400 rounded-md active:bg-green-500"
          @click="processInscription"
          :disabled="invalidEmail"
          :class="invalidEmail ? 'bg-slate-500 active:' : ''"
        >
          Se connecter
        </button>
      </div>
    </main>
  </div>
</template>

<style scoped></style>
