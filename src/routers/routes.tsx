import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useLazy} from '../hooks/useLazy';

function AppRoutes () {
  // Lazy-loaded components using the useLazy hook
  const LazyFeed = useLazy(() => import('../screens/Feed'));
  const LazyAbout = useLazy(() => import('../screens/About'));
  const LazyQuestion = useLazy(() => import('../screens/Question'));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LazyFeed />} />
        <Route path="/about" element={<LazyAbout />} />
        <Route path="/some-component" element={<LazyQuestion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
