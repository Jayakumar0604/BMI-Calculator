import React from 'react';
import BmiCalculator from './components/bmi/BmiCalculator';

const App = () => {
  return (
    <div className="relative min-h-screen bg-[#070a13] flex flex-col justify-between overflow-hidden">
      
      {/* Background Ambient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-radial-orb-1 rounded-full pointer-events-none z-0 animate-pulse duration-10000" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-radial-orb-2 rounded-full pointer-events-none z-0 animate-pulse duration-8000" />
      
      {/* Dashboard container */}
      <main className="relative z-10 flex-grow flex items-center justify-center py-6">
        <BmiCalculator />
      </main>

      {/* Modern Trust Footer */}
      <footer className="relative z-10 py-6 border-t border-white/5 bg-slate-950/40 text-center text-xs text-slate-500 font-mono">
        <div>
          © {new Date().getFullYear()} Aura Wellness Index. Clinical guidelines sourced from WHO classification standards.
        </div>
      </footer>
    </div>
  );
};

export default App;