import React, { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./components/styles.css";
const Quizes = lazy(() => import("./components/quizes"));
const QuizDetail = lazy(() => import("./components/quizDetail"));
const Welcome = lazy(() => import("./components/welcome"));
const QuestionDetail = lazy(() => import("./components/question"));
const Score = lazy(() => import("./components/score"));
const App = () => {
  return (
    <div className="app">
      <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          <Router>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/quiz/:id/score" element={<Score />} />
                <Route path="/quiz" element={<Quizes />} />
                <Route path="/quiz/:id/:mode" element={<QuizDetail />} />
                <Route
                  path="/quiz/:quiz_id/question/add"
                  element={<QuestionDetail />}
                />
                <Route
                  path="/quiz/:quiz_id/question/:id"
                  element={<QuestionDetail />}
                />
              </Routes>
            </Suspense>
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
};

export default App;
