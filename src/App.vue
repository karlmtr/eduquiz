<script setup lang="ts">
import { signOut } from "firebase/auth";
import { RouterView, useRouter } from "vue-router";
import {
  VMain,
  VContainer,
  VApp,
  VAppBar,
  VBtn,
  VMenu,
  VList,
  VListItem,
  VListItemTitle,
} from "vuetify/components";
import { auth } from "./firebase/init";

const getEmail = () => {
  return auth.currentUser?.email;
};
const disconnectUser = async () => {
  signOut(auth)
    .then(() => {
      router.push({ name: "signUp" });
    })
    .catch((error) => {
      console.log("Erreur:", error);
    });
};
const router = useRouter();
</script>

<template>
  <v-app theme="light">
    <v-app-bar app density="compact">
      <template v-slot:prepend>
        <v-btn icon="mdi-arrow-left" @click="router.go(-1)"> </v-btn>
      </template>
      <template v-slot:append>
        <v-menu activator="parent">
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>
                Connecté :
                <span class="font-italic">{{ getEmail() }}</span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="disconnectUser">
              <v-list-item-title> Se déconnecter </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>
    <div class="flex flex-col min-h-screen">
      <v-main>
        <v-container>
          <RouterView v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </RouterView>
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
