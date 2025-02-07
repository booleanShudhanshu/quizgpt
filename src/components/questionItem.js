import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const QuestionItem = ({
  question,
  handleAnswerChange,
  selectedAnswers,
  handleDeleteQuestion,
}) => {
  const { mode, id } = useParams();
  const navigate = useNavigate();
  const isMultiSelect = question.type === "multi";
  const isImageType = question.option_type === "image";
  const [inputText, setInputText] = useState("");

  const handleChange = (optionId) => {
    if (isMultiSelect) {
      let selectedOption = isMultiSelect ? [] : "";
      selectedOption = selectedAnswers[question.id] || selectedOption;
      handleAnswerChange(
        question.id,
        selectedOption.includes(optionId)
          ? selectedOption.filter((id) => id !== optionId)
          : [...selectedOption, optionId]
      );
    } else {
      handleAnswerChange(question.id, optionId);
    }
  };

  return (
    <div className="question-container">
      <div className="question-text-container ">
        <p className="question-text">{question.text}</p>
        {mode === "edit" ? (
          <div className="question-action-button-container ">
            <button
              className="primary-button"
              onClick={() => navigate(`/quiz/${id}/question/${question.id}`)}
            >
              Edit
            </button>

            <button
              onClick={() => handleDeleteQuestion(question.id)}
              className="danger-button"
            >
              Delete
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      {question.type === "text-input" ? (
        <input
          type="text"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            handleAnswerChange(question.id, e.target.value);
          }}
          className="text-input"
          placeholder="Type your answer..."
        />
      ) : (
        <div
          className={
            question.option_type === "text"
              ? "options-list"
              : "image-options-grid"
          }
        >
          {question.options.map((option) => (
            <div
              onClick={() => handleChange(option.id)}
              key={option.id}
              className={`option-label ${
                isImageType ? "image-option-wrapper" : ""
              }`}
            >
              <input
                type={isMultiSelect ? "checkbox" : "radio"}
                name={isMultiSelect ? "multi-choice" : "single-choice"}
                value={option.id}
                checked={
                  isMultiSelect
                    ? (selectedAnswers[question.id] || []).includes(option.id)
                    : (selectedAnswers[question.id] || "") === option.id
                }
                className="option-input"
              />
              {isImageType ? (
                <img
                  src={option.value}
                  alt="Option"
                  className={`image-option`}
                />
              ) : (
                <span className="option-text">{option.value}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionItem;
