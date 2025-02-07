import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const QuizItem = ({ quiz, handleDelete }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.quizzes.user);
  return (
    <div className="card">
      <h3>{quiz.title}</h3>
      <p>
        <strong>Created By:</strong> {quiz.created_by}
      </p>
      <p>
        <strong>Created At:</strong>{" "}
        {new Date(quiz.created_at).toLocaleDateString()}
      </p>
      <p>
        <strong>Updated At:</strong>{" "}
        {new Date(quiz.updated_at).toLocaleDateString()}
      </p>
      <p>
        <strong>Questions:</strong> {quiz.questions.length}
      </p>

      <div className="button-container">
        {user.email === quiz.created_by && (
          <button
            className="primary-button"
            onClick={() => navigate(`/quiz/${quiz.id}/edit`)}
          >
            Edit
          </button>
        )}
        <button
          className="primary-button"
          onClick={() => navigate(`/quiz/${quiz.id}/attempt`)}
        >
          Attempt
        </button>
        {user.email === quiz.created_by && (
          <button
            onClick={() => handleDelete(quiz.id)}
            className="danger-button"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizItem;
