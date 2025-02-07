import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuizItem from "./quizItem";
import { deleteQuiz } from "../store/quiz";

const QuizList = () => {
  const quizzes = useSelector((state) => state.quizzes.data);
  const dispatch = useDispatch();

  const handleDelete = useCallback((id) => {
    dispatch(
      deleteQuiz({
        id,
      })
    );
  }, []);

  return (
    <div className="quiz-container">
      {quizzes.map((quiz) => (
        <QuizItem key={quiz.id} quiz={quiz} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

export default QuizList;
