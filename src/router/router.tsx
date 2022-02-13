import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Quiz from "src/pages/quiz/quiz";

const Router: React.FC = () => {
  return (
    <div className="router">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Quiz />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
