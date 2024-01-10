import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useLazy } from "../hooks/useLazy";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
