<script setup lang="ts">
import { getAuth, signOut } from "firebase/auth";
import { ref } from "vue";
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
  VSpacer,
} from "vuetify/components";
import { app } from "./firebase/init";
import { generalStateStore } from "@/stores/generalStateStore";
import { mdiArrowLeft, mdiThemeLightDark, mdiDotsVertical } from "@mdi/js";

const getEmail = () => {
  const auth = getAuth(app);
  return auth.currentUser?.email;
};
const disconnectUser = async () => {
  const auth = getAuth(app);
  signOut(auth)
    .then(() => {
      router.push({ name: "signUp" });
    })
    .catch((error) => {
      console.log("Erreur:", error);
    });
};
const router = useRouter();
const darkTheme = ref(false);
const generalStore = generalStateStore();

</script>

<template>
  <v-app :theme="darkTheme ? 'dark' : 'light'">
    <v-app-bar app density="compact">
      <template v-if="generalStore.appBar.goingBack" v-slot:prepend>
        <v-btn :icon="mdiArrowLeft" @click="router.go(-1)"> </v-btn>
      </template>
      <v-spacer></v-spacer>
      <v-btn :icon="mdiThemeLightDark" @click="darkTheme = !darkTheme"> </v-btn>

      <template v-if="generalStore.appBar.profileMenu" v-slot:append>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn :icon="mdiDotsVertical" v-bind="props"></v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>
                Connecté :
                <span class="font-italic text-blue">{{ getEmail() }}</span>
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
