import { Link } from 'react-router-dom';
import { 
  Bars3Icon, 
  XMarkIcon 
} from '@heroicons/react/24/outline';

export function Header({ darkMode, setDarkMode }) {
  return (
    <header className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 sticky top-0 z-50 border-b border-slate-200/50 dark:border-slate-700/50 shadow-sm">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-3xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg">
            NamAI Career Copilot
          </Link>
          
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-lg font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 hover:scale-105">
              Home
            </Link>
            <Link to="/upload" className="text-lg font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 hover:scale-105">
              Analyze Resume
            </Link>
            <Link to="/dashboard" className="text-lg font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 hover:scale-105">
              Dashboard
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200"
              title={darkMode ? 'Light mode' : 'Dark mode'}
            >
              {darkMode ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 0 0 8.354-5.646z" />
                </svg>
              )}
            </button>
            <Link 
              to="/dashboard" 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:-translate-y-1 hidden lg:block"
            >
            Dashboard → Made by Namandip Raj with ❤️

            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
