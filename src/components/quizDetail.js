import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import QuestionItem from "./questionItem";
import { deleteQuestion, submitAttempt } from "../store/quiz";

const QuizDetail = () => {
  const { id, mode } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quizzes = useSelector((state) => state.quizzes.data);
  const [quizData, setQuizData] = useState();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  useEffect(() => {
    if (id) {
      const quiz = quizzes.find((quiz) => quiz.id === id);
      setQuizData(quiz);
    }
  }, [id, quizzes]);

  const handleAnswerChange = (id, answer) => {
    setSelectedAnswers((prev) => ({ ...prev, [id]: answer }));
  };

  function calculateScore(questions, selectedAnswers) {
    let score = 0;

    questions.forEach((question) => {
      const userAnswer = selectedAnswers[question.id];
      const correctAnswer = question.correct_answer;

      if (!userAnswer) return; // Skip if no answer provided

      if (question.type === "single" || question.type === "text-input") {
        if (userAnswer === correctAnswer) {
          score++;
        }
      } else if (question.type === "multi") {
        const correctSet = new Set(correctAnswer);
        const userSet = new Set(userAnswer);
        if (
          userSet.size === correctSet.size &&
          [...userSet].every((answer) => correctSet.has(answer))
        ) {
          score++;
        }
      }
    });

    return score;
  }
  const handleSubmit = () => {
    const score = calculateScore(quizData.questions, selectedAnswers);
    dispatch(
      submitAttempt({
        score,
        answer: selectedAnswers,
        quiz_id: quizData.id,
      })
    );
    navigate(`/quiz/${id}/score`);
  };

  const handleDeleteQuestion = (questionId) => {
    dispatch(deleteQuestion({ quizId: quizData.id, questionId }));
  };

  return quizData ? (
    <div>
      <div className="quiz-detail-header">
        <h1 className="quiz-detail-header-title">{quizData.title}</h1>
        {mode === "edit" ? (
          <button
            className="primary-button"
            onClick={() => {
              navigate(`/quiz/${id}/question/add`);
            }}
          >
            Add Question
          </button>
        ) : (
          <></>
        )}
      </div>
      <div>
        {quizData.questions.map((question) => (
          <QuestionItem
            question={question}
            key={question.id}
            handleAnswerChange={handleAnswerChange}
            selectedAnswers={selectedAnswers}
            handleDeleteQuestion={handleDeleteQuestion}
          />
        ))}
      </div>
      <div className="button-container">
        {mode === "edit" ? (
          <button
            className="primary-button"
            onClick={() => {
              navigate("/quiz");
            }}
          >
            Done
          </button>
        ) : (
          <button className="primary-button" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default QuizDetail;
