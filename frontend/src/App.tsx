import { useState } from 'react';
import BillCalculator from './components/BillCalculator';
import AdminPanel from './components/AdminPanel';

function App() {
  const [view, setView] = useState<'user' | 'admin'>('user');

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-indigo-600 tracking-tight">Utility Bill Calculator</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setView('user')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  view === 'user' 
                    ? 'bg-indigo-50 text-indigo-700' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                Calculator
              </button>
              <button
                onClick={() => setView('admin')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  view === 'admin' 
                    ? 'bg-indigo-50 text-indigo-700' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                Admin Panel
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="transition-opacity duration-300 ease-in-out">
          {view === 'user' ? <BillCalculator /> : <AdminPanel />}
        </div>
      </main>
    </div>
  );
}

export default App;