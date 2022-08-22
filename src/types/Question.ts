import type { Answer } from "@/types/Answer";
interface Question {
  question: string;
  answerOptions: Answer[];
  theme: string;
  ID: string;
  teacherUID: string | undefined;
}

export type { Question };
