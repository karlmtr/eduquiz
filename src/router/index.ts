import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { quizStateStore } from "@/stores/quizStore";
import { quizFinished, quizStarted } from "./beforeGuards";

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
      beforeEnter: [quizStarted],
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
    {
      path: "/resultsQuiz",
      name: "resultsQuiz",
      beforeEnter: [quizFinished],
      component: () => import("../views/resultsView.vue"),
    },
    {
      path: "/edit/:ID",
      name: "edit",
      component: () => import("../views/editView.vue"),
    },
    {
      path: "/signUp",
      name: "signUp",
      component: () => import("../views/SignUp.vue"),
    },
  ],
});

export default router;
