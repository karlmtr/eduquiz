import { defineStore } from "pinia";
export const generalStateStore = defineStore({
  id: "general",
  state: () => ({
    appBar: {
      goingBack: false,
      profileMenu: false,
    },
  }),
  getters: {},
  actions: {},
});
