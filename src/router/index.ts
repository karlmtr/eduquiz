import { user } from "@/firebase/init";
import { isTeacher } from "@/helpers/functions";
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
        requiresTeacher: false,
        requiresAuth: true,
      },
    },
    {
      path: "/quiz",
      name: "quiz",
      beforeEnter: [quizStarted],
      component: () => import("../views/QuizView.vue"),
      meta: {
        requiresTeacher: false,
        requiresAuth: true,
      },
    },
    {
      path: "/newGame",
      name: "newGame",
      component: () => import("../views/NewGameView.vue"),
      meta: {
        requiresTeacher: false,
        requiresAuth: true,
      },
    },
    {
      path: "/statistics",
      name: "statistics",
      component: () => import("../views/StatisticsView.vue"),
      meta: {
        requiresTeacher: false,
        requiresAuth: true,
      },
    },
    {
      path: "/qList",
      name: "qList",
      component: () => import("../views/ListQuestionsView.vue"),
      meta: {
        requiresTeacher: true,
        requiresAuth: true,
      },
    },
    {
      path: "/addQuestion",
      name: "addQuestion",
      component: () => import("../views/AddQuestionView.vue"),
      meta: {
        requiresTeacher: true,
        requiresAuth: true,
      },
    },
    {
      path: "/resultsQuiz",
      name: "resultsQuiz",
      beforeEnter: [quizFinished],
      component: () => import("../views/resultsView.vue"),
      meta: {
        requiresTeacher: false,
        requiresAuth: true,
      },
    },
    {
      path: "/edit/:ID",
      name: "edit",
      component: () => import("../views/editView.vue"),
      meta: {
        requiresTeacher: true,
        requiresAuth: true,
      },
    },
    {
      path: "/signUp",
      name: "signUp",
      component: () => import("../views/SignUp.vue"),
      meta: {
        requiresTeacher: false,
        requiresAuth: false,
      },
    },
    {
      path: "/finishSignIn",
      name: "finishSignIn",
      component: () => import("../views/finishSignIn.vue"),
      meta: {
        requiresTeacher: false,
        requiresAuth: false,
      },
    },
  ],
});

router.beforeEach(async (to) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresTeacher = to.matched.some(
    (record) => record.meta.requiresTeacher
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userInfo: any = await user();
  if (requiresAuth && !userInfo) {
    return { name: "signUp" };
  } else if ((to.name === "signUp" || to.name === "finishSignIn") && userInfo) {
    return { name: "home" };
  } else if (requiresTeacher && !isTeacher(userInfo.email)) {
    return { name: "home" };
  } else {
    return true;
  }
});

export default router;
