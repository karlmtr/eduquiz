import { defineStore } from "pinia";
export const userStore = defineStore({
  id: "user",
  state: () => ({
    email: "",
    uid: "",
    logged: false,
  }),
  getters: {},
  actions: {},
});
