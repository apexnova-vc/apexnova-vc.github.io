import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutPage from "../screens/AboutPage";
import HomePage from "../screens/HomePage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
