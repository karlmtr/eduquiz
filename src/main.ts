import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./index.css";
import "vuetify/styles"; // Global CSS has to be imported
import { createVuetify } from "vuetify";
import "./assets/main.css";
import "@mdi/font/css/materialdesignicons.css";
const app = createApp(App);

const vuetify = createVuetify();
app.use(createPinia());
app.use(router);
app.use(vuetify);
app.mount("#app");
