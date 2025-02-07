import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import { addQuestion, updateQuestion } from "../store/quiz";
const QuestionDetail = () => {
  const { id, quiz_id } = useParams();
  const navigate = useNavigate();
  const quizzes = useSelector((state) => state.quizzes.data);
  const dispatch = useDispatch();
  const [question, setQuestion] = useState({
    text: "",
    type: "single",
    option_type: "text",
    options: [],
    correct_answer: "",
  });

  useEffect(() => {
    if (id) {
      let questionData = {};
      quizzes.forEach((quiz) => {
        if (quiz.id === quiz_id) {
          quiz.questions.forEach((ques) => {
            if (ques.id === id) {
              questionData = ques;
            }
          });
        }
      });
      setQuestion({
        ...questionData,
      });
    }
  }, [quizzes, id]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...question.options];
    newOptions[index].value = value;
    setQuestion({ ...question, options: newOptions });
  };

  const removeOption = (index, option) => {
    const newOptions = question.options.filter((_, i) => i !== index);
    let correct_answer = question.correct_answer;
    if (question.type === "multi") {
      correct_answer = correct_answer.filter((el) => el !== option.id);
    } else {
      correct_answer = correct_answer === option.id ? "" : correct_answer;
    }
    setQuestion({ ...question, options: newOptions, correct_answer });
  };

  const addOption = () => {
    setQuestion({
      ...question,
      options: [
        ...question.options,
        { value: `option-${question.options.length + 1}`, id: nanoid(9) },
      ],
    });
  };

  const handleSave = () => {
    if (id) {
      dispatch(
        updateQuestion({
          quizId: quiz_id,
          questionId: id,
          updatedQuestion: question,
        })
      );
    } else {
      dispatch(
        addQuestion({
          question,
          quizId: quiz_id,
        })
      );
    }
    navigate(`/quiz/${quiz_id}/edit`);
  };

  return (
    <div>
      <div className="quiz-detail-header">
        <h1 className="quiz-detail-header-title">
          {id ? "Edit" : "Add"} Question
        </h1>
        <button
          className="primary-button"
          onClick={() => handleSave()}
          disabled={
            question.correct_answer.length === 0 ||
            (question.type !== "text-input" && question.options.length === 0) ||
            question.text.length === ""
          }
        >
          Save
        </button>
      </div>
      <div>
        <div className="question-form">
          <div className="category">
            Type <span className="mandatory">*</span>
          </div>
          <div className="radio-group">
            {[
              { value: "single", label: "Single Select" },
              { value: "multi", label: "Multi Select" },
              { value: "text-input", label: "Text Input" },
            ].map((option) => (
              <label key={option.value} className="radio-label">
                <input
                  type="radio"
                  name={option.value}
                  value={option.value}
                  checked={question.type === option.value}
                  onChange={() => {
                    if (option.value !== question.type) {
                      setQuestion({
                        ...question,
                        type: option.value,
                        correct_answer: option.value === "multi" ? [] : "",
                      });
                    }
                  }}
                  className="radio-input"
                />
                <span className="radio-custom"></span>
                {option.label}
              </label>
            ))}
          </div>
          <div className="category">
            Option Type <span className="mandatory">*</span>
          </div>
          <div className="radio-group">
            {[
              { value: "text", label: "Text" },
              { value: "image", label: "Image" },
            ].map((option) => (
              <label key={option.value} className="radio-label">
                <input
                  type="radio"
                  name={option.value}
                  value={option.value}
                  checked={question.option_type === option.value}
                  onChange={() =>
                    setQuestion({
                      ...question,
                      option_type: option.value,
                    })
                  }
                  className="radio-input"
                />
                <span className="radio-custom"></span>
                {option.label}
              </label>
            ))}
          </div>
          <div className="category">
            Question <span className="mandatory">*</span>
          </div>
          <input
            type="text"
            className="question-input"
            placeholder="Enter Question"
            value={question.text}
            onChange={(e) =>
              setQuestion((prev) => ({ ...prev, text: e.target.value }))
            }
          />

          {question.type !== "text-input" && (
            <>
              <div className="category">
                Options <span className="mandatory">*</span>
              </div>
              <div className="options-list">
                {question.options.map((option, index) => (
                  <div key={option.id} className="option-container">
                    <input
                      type="text"
                      className="option-input"
                      placeholder={`Option ${index + 1}`}
                      value={option.value}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                    />
                    {question.options.length > 1 && (
                      <button
                        className="remove-option danger-button"
                        onClick={() => removeOption(index, option)}
                      >
                        ✖
                      </button>
                    )}
                  </div>
                ))}
                <button className="add-option" onClick={addOption}>
                  + Add Option
                </button>
              </div>
            </>
          )}
          <div className="category">
            Correct Answer <span className="mandatory">*</span>
          </div>
          <div>
            {question.type === "text-input" ? (
              <>
                <input
                  type="text"
                  className="question-input"
                  placeholder="Correct Answer"
                  value={question.correct_answer}
                  onChange={(e) =>
                    setQuestion((prev) => ({
                      ...prev,
                      correct_answer: e.target.value,
                    }))
                  }
                />
              </>
            ) : (
              <>
                {question.options.map((option) => (
                  <div
                    onClick={() => {
                      if (question.type === "single") {
                        setQuestion((prev) => ({
                          ...prev,
                          correct_answer: option.id,
                        }));
                      } else {
                        setQuestion((prev) => ({
                          ...prev,
                          correct_answer: prev.correct_answer.includes(
                            option.id
                          )
                            ? prev.correct_answer.filter(
                                (el) => el !== option.id
                              )
                            : [...prev.correct_answer, option.id],
                        }));
                      }
                    }}
                    key={option.id}
                    className={`option-label ${
                      question.option_type === "image"
                        ? "image-option-wrapper"
                        : ""
                    }`}
                  >
                    <input
                      type={"checkbox"}
                      name={"multi-choice"}
                      value={option.id}
                      checked={
                        question.type === "multi"
                          ? question.correct_answer.includes(option.id)
                          : question.correct_answer === option.id
                      }
                      className="option-input"
                    />
                    {question.option_type === "image" ? (
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;
