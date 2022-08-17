import { user } from "@/firebase/init";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { quizFinished, quizStarted } from "./beforeGuards";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        teacher: true,
        requiresAuth: true,
      },
    },
    {
      path: "/quiz",
      name: "quiz",
      beforeEnter: [quizStarted],
      component: () => import("../views/QuizView.vue"),
      meta: {
        teacher: false,
        requiresAuth: true,
      },
    },
    {
      path: "/newGame",
      name: "newGame",
      component: () => import("../views/NewGameView.vue"),
      meta: {
        teacher: false,
        requiresAuth: true,
      },
    },
    {
      path: "/statistics",
      name: "statistics",
      component: () => import("../views/StatisticsView.vue"),
      meta: {
        teacher: false,
        requiresAuth: true,
      },
    },
    {
      path: "/qList",
      name: "qList",
      component: () => import("../views/ListQuestionsView.vue"),
      meta: {
        teacher: true,
        requiresAuth: true,
      },
    },
    {
      path: "/addQuestion",
      name: "addQuestion",
      component: () => import("../views/AddQuestionView.vue"),
      meta: {
        teacher: true,
        requiresAuth: true,
      },
    },
    {
      path: "/resultsQuiz",
      name: "resultsQuiz",
      beforeEnter: [quizFinished],
      component: () => import("../views/resultsView.vue"),
      meta: {
        teacher: false,
        requiresAuth: true,
      },
    },
    {
      path: "/edit/:ID",
      name: "edit",
      component: () => import("../views/editView.vue"),
      meta: {
        teacher: true,
        requiresAuth: true,
      },
    },
    {
      path: "/signUp",
      name: "signUp",
      component: () => import("../views/SignUp.vue"),
      meta: {
        teacher: false,
        requiresAuth: false,
      },
    },
    {
      path: "/finishSignIn",
      name: "finishSignIn",
      component: () => import("../views/finishSignIn.vue"),
      meta: {
        teacher: false,
        requiresAuth: false,
      },
    },
  ],
});

router.beforeEach(async (to) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const logged = await user();
  if (requiresAuth && !logged) {
    return { name: "signUp" };
  } else if (to.name === "signUp" && logged) {
    return { name: "home" };
  } else {
    return true;
  }
});

export default router;
