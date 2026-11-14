import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/index';
import { useTheme } from './hooks/useTheme';

function AppContent() {
  useTheme();
  return <RouterProvider router={router} />;
}

export default function App() {
  return <AppContent />;
}
