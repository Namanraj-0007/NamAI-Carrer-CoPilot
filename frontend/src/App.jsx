import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Header } from './components/Header.jsx';
import Landing from './pages/Landing.jsx';
import Upload from './pages/Upload.jsx';
import Dashboard from './pages/Dashboard.jsx';
import { AnalysisProvider } from './store/AnalysisContext.jsx';

function AppContent() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-900">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AnalysisProvider>
      <AppContent />
    </AnalysisProvider>
  );
}
