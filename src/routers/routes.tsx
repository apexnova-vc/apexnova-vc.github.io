import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useLazy} from '../hooks/useLazy';

function AppRoutes () {
  // Lazy-loaded components using the useLazy hook
  const LazyFeed = useLazy(() => import('../screens/Home'));
  const LazyAbout = useLazy(() => import('../screens/About'));
  const LazyQuestion = useLazy(() => import('../screens/QuestionDetail'));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LazyFeed />} />
        <Route path="/about" element={<LazyAbout />} />
        <Route path="/questions/:id" element={<LazyQuestion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
