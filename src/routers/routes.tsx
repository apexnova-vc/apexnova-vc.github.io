import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLazy } from "../hooks/useLazy";

function AppRoutes() {
  // Lazy-loaded components using the useLazy hook
  const LazyFeed = useLazy(() => import("../screens/Home"));
  const LazyAbout = useLazy(() => import("../screens/About"));
  const LazyQuestion = useLazy(() => import("../core/QuestionDetail"));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LazyFeed />} />
        <Route path="/about" element={<LazyAbout />} />
        <Route path="/questions/:id" element={<LazyQuestion />} />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
