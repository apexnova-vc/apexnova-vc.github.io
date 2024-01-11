import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../core/Home";
import JobDetailsPage from "../core/JobDetailsPage";
// import { useLazy } from "../hooks/useLazy";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<JobDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
