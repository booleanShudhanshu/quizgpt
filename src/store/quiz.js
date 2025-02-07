import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    data: [],
    user: {
      email: "",
      name: "",
    },
    attempts: {},
  },
  reducers: {
    userDetail: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    addQuiz: (state, action) => {
      state.data = [
        ...state.data,
        {
          ...action.payload,
          created_at: new Date().toISOString(),
          created_by: state.user.email,
          updated_at: new Date().toISOString(),
          id: nanoid(9),
        },
      ];
    },
    submitAttempt: (state, action) => {
      state.attempts = {
        ...state.attempts,
        [state.user.email]: {
          [action.payload.quiz_id]: {
            score: action.payload.score,
            submittedAnswers: action.payload.answer,
          },
        },
      };
    },
    deleteQuiz: (state, action) => {
      state.data = state.data.filter((quiz) => quiz.id !== action.payload.id);
    },

    addQuestion: (state, action) => {
      const { quizId, question } = action.payload;

      const quiz = state.data.find((q) => q.id === quizId);
      if (quiz) {
        quiz.questions = [...quiz.questions, { id: nanoid(9), ...question }];
      }
    },
    deleteQuestion: (state, action) => {
      const { quizId, questionId } = action.payload;
      const quiz = state.data.find((q) => q.id === quizId);
      if (quiz) {
        quiz.questions = quiz.questions.filter((q) => q.id !== questionId);
      }
    },
    updateQuestion: (state, action) => {
      const { quizId, questionId, updatedQuestion } = action.payload;
      const quiz = state.data.find((q) => q.id === quizId);
      if (quiz) {
        const questionIndex = quiz.questions.findIndex(
          (q) => q.id === questionId
        );
        if (questionIndex !== -1) {
          quiz.questions[questionIndex] = {
            ...quiz.questions[questionIndex],
            ...updatedQuestion,
          };
        }
      }
    },
  },
});

export const {
  addQuiz,
  deleteQuiz,
  addQuestion,
  deleteQuestion,
  updateQuestion,
  userDetail,
  submitAttempt,
} = quizSlice.actions;
export default quizSlice.reducer;
