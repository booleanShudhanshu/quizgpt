import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userDetail } from "../store/quiz";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleProceed = () => {
    dispatch(
      userDetail({
        ...form,
      })
    );
    navigate("/quiz");
  };

  return (
    <div className="welcome-container">
      <div className="welcome-box">
        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} />

        <label>Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
        <button onClick={handleProceed} className="primary-button">
          Proceed
        </button>
      </div>
    </div>
  );
};

export default Welcome;
