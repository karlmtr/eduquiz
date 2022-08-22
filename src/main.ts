import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./index.css";
import "vuetify/styles"; // Global CSS has to be imported
import { createVuetify } from "vuetify";
// import "@mdi/font/css/materialdesignicons.css";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
const app = createApp(App);

const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});
app.use(createPinia());
app.use(router);
app.use(vuetify);
app.mount("#app");
