<script setup lang="ts">
import { ArrowLeftIcon } from "@heroicons/vue/solid";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/init";
import router from "@/router";
import {
  VBtn,
  VList,
  VMenu,
  VListItem,
  VListItemTitle,
} from "vuetify/components";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  title: { type: String, required: false, default: "" },
  arrow: { type: Boolean, required: false, default: false },
  profileMenu: { type: Boolean, required: false },
});

const disconnectUser = async () => {
  signOut(auth)
    .then(() => {
      router.push({ name: "signUp" });
    })
    .catch((error) => {
      console.log("Erreur:", error);
    });
};

const getEmail = () => {
  return auth.currentUser?.email;
};
</script>

<template>
  <header class="sticky top-0 z-50 p-3 backdrop-blur-xl">
    <div class="flex justify-between">
      <div
        class="flex items-center p-2 rounded-full hover:cursor-pointer active:bg-slate-50"
        :class="!arrow ? 'invisible' : ''"
        @click="$emit('pressedArrow')"
      >
        <ArrowLeftIcon
          v-if="arrow"
          class="w-7 h-7 fill-blue-200"
        ></ArrowLeftIcon>
      </div>

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props"> Activator slot </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title> Connecté : {{ getEmail() }}</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title> Se déconnecter </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </header>
</template>
