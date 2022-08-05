import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/quiz",
      name: "quiz",
      component: () => import("../views/QuizView.vue"),
    },
    {
      path: "/newGame",
      name: "newGame",
      component: () => import("../views/NewGameView.vue"),
    },
    {
      path: "/statistics",
      name: "statistics",
      component: () => import("../views/StatisticsView.vue"),
    },
    {
      path: "/qList",
      name: "qList",
      component: () => import("../views/ListQuestionsView.vue"),
    },
    {
      path: "/addQuestion",
      name: "addQuestion",
      component: () => import("../views/AddQuestionView.vue"),
    },
  ],
});

export default router;
