<script setup lang="ts">
import { ArrowLeftIcon, DotsVerticalIcon } from "@heroicons/vue/solid";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/init";
import router from "@/router";

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

      <Menu as="div" class="relative inline-block text-left">
        <div>
          <MenuButton
            class="inline-flex justify-center w-full p-2 rounded-full hover:bg-black hover:bg-opacity-20 active:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            :class="!profileMenu ? 'invisible' : ''"
          >
            <DotsVerticalIcon class="w-7 h-7 fill-blue-200"></DotsVerticalIcon>
          </MenuButton>
        </div>

        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <MenuItems
            class="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div class="px-1 py-1">
              <MenuItem v-slot="{ active }">
                <button
                  :class="[
                    active ? 'bg-blue-500 text-white' : 'text-gray-900',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                  ]"
                  @click="disconnectUser"
                >
                  Se déconnecter
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </header>
</template>
