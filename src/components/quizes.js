import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addQuiz } from "../store/quiz";
import QuizList from "./quizList";

export const questions = [
  {
    text: "What is the capital of France?",
    type: "single",
    option_type: "text",
    id: "q1",
    options: [
      { value: "Berlin", id: "opt1" },
      { value: "Madrid", id: "opt2" },
      { value: "Paris", id: "opt3" },
      { value: "Rome", id: "opt4" },
    ],
    correct_answer: "opt3",
  },

  {
    text: "Which of the following are programming languages?",
    type: "multi",
    option_type: "text",
    id: "q2",
    options: [
      { value: "Python", id: "opt1" },
      { value: "Java", id: "opt2" },
      { value: "HTML", id: "opt3" },
      { value: "C++", id: "opt4" },
    ],
    correct_answer: ["opt1", "opt2", "opt4"],
  },

  {
    text: "What is 5 + 3?",
    type: "text-input",
    id: "q3",
    options: [],
    correct_answer: "8",
  },

  {
    text: "Select the image that represents a cat.",
    type: "multi",
    option_type: "image",
    id: "q4",
    options: [
      { value: "https://picsum.photos/id/237/200/300", id: "opt1" },
      { value: "https://picsum.photos/seed/picsum/200/300", id: "opt2" },
      {
        value:
          "https://fastly.picsum.photos/id/588/200/200.jpg?hmac=amAMbyBq8ZvuCFGI8jPIt928PLIRtxNQ33bISsbDAys",
        id: "opt3",
      },
    ],
    correct_answer: "opt2",
  },
  {
    text: "Select the image that represents a cat.",
    type: "single",
    option_type: "image",
    id: "q4",
    options: [
      { value: "https://picsum.photos/id/237/200/300", id: "opt1" },
      { value: "https://picsum.photos/seed/picsum/200/300", id: "opt2" },
      {
        value:
          "https://fastly.picsum.photos/id/588/200/200.jpg?hmac=amAMbyBq8ZvuCFGI8jPIt928PLIRtxNQ33bISsbDAys",
        id: "opt3",
      },
    ],
    correct_answer: "opt2",
  },
];
function Quizes() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quizName, setQuizName] = useState("");

  const handleCreate = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setQuizName("");
  };
  const handleCreateQuiz = () => {
    dispatch(
      addQuiz({
        title: quizName,

        questions: questions,
      })
    );
    handleModalClose();
  };
  return (
    <div className="app">
      <header className="app-header">
        <div className="app-container">
          <h1 className="app-title">QuizGPT 🤖</h1>
          <button className="create-button" onClick={handleCreate}>
            Create
          </button>
        </div>
      </header>
      <section>
        <QuizList />
      </section>
      {isModalOpen ? (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">Create a New Quiz</div>
            <div className="input-container">
              <div className="label">
                Name <span className="mandatory">*</span>
              </div>
              <input
                type="text"
                className="quiz-input"
                placeholder="Enter quiz name"
                value={quizName}
                onChange={(e) => setQuizName(e.target.value)}
              />
            </div>
            <div className="button-container">
              <button className="secondary-button" onClick={handleModalClose}>
                Cancel
              </button>
              <button className="primary-button" onClick={handleCreateQuiz}>
                Create
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Quizes;
