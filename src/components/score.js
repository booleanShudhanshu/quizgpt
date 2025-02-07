import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Score = ({}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const quizzes = useSelector((state) => state.quizzes);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h1>Your score {quizzes.attempts[quizzes.user.email][id].score}</h1>
      <button
        className="primary-button"
        onClick={() => {
          navigate("/quiz");
        }}
      >
        Done
      </button>
    </div>
  );
};

export default Score;
