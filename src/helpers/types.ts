interface Question {
  question: string;
  answerOptions: { answer: string; isCorrect?: boolean }[];
  theme: string;
  year: "Préparatoire" | "1" | "2" | "3";
  collection: string;
  ID: string;
  teacherUID: string | undefined;
}

export type { Question };
