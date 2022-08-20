<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  getAdditionalUserInfo,
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import { useRouter } from "vue-router";
import { app, db } from "@/firebase/init";

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
      signInWithEmailLink(auth, email.value, window.location.href)
        .then((result) => {
          window.localStorage.removeItem("emailForSignIn");

          if (getAdditionalUserInfo(result)?.isNewUser) {
            console.log("New User");
            const colRef = doc(db, "users", result.user.uid);
            setDoc(colRef, { email: result.user.email });
          }
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
