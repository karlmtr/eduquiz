import { quizStateStore } from "@/stores/quizStore";
import { app } from "@/firebase/init";
import { getAuth } from "firebase/auth";

async function quizFinished() {
  const quizStore = quizStateStore();
  if (!quizStore.finished) {
    return { name: "newGame" };
  } else {
    return true;
  }
}

async function quizStarted() {
  const quizStore = quizStateStore();
  if (!quizStore.started) {
    return { name: "newGame" };
  } else {
    return true;
  }
}

// async function loggedAsTeacher() {
//   const auth = getAuth(app);
//   const user = auth.currentUser;
//   if (user) {
//     const email = user?.email;
//     console.log(email);
//     const sampleRegEx = /@galantay.com$/;

//     if (sampleRegEx.test(email as string)) {
//       //logged as teacher
//       return true;
//     } else {
//       return { name: "home" };
//     }
//   } else {
//     return { name: "signUp" };
//   }
// }

async function logged() {
  const auth = getAuth(app);
  const user = auth.currentUser;
  if (user) {
    return true;
  } else {
    return { name: "signUp" };
  }
}

export { quizFinished, quizStarted, logged };
