import React from 'react';
import Card from '../ui/Card';

export const BmiHistory = ({ history, deleteHistoryItem, clearHistory }) => {
  const getCategoryColorClass = (category) => {
    switch (category) {
      case 'Underweight': return 'text-sky-400 border-sky-500/20 bg-sky-500/5';
      case 'Healthy Weight': return 'text-green-400 border-green-500/20 bg-green-500/5';
      case 'Overweight': return 'text-yellow-400 border-yellow-500/20 bg-yellow-500/5';
      case 'Obesity': return 'text-red-400 border-red-500/20 bg-red-500/5';
      default: return 'text-slate-400 border-white/5 bg-slate-950/20';
    }
  };

  return (
    <Card className="w-full h-full flex flex-col min-h-[350px]" glow={true}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-pulse"></span>
          Diagnostic Logs
        </h2>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-xs text-rose-400 hover:text-rose-300 font-semibold px-2.5 py-1 rounded-lg border border-rose-500/10 hover:bg-rose-500/10 transition-all duration-300"
          >
            Clear All
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 py-8 text-center">
          <div className="p-4 rounded-full bg-slate-950/40 border border-white/5 mb-4">
            <svg className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p className="text-sm text-slate-500 max-w-[200px] leading-relaxed">
            No previous records found. New entries will save locally automatically.
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto max-h-[380px] pr-1 space-y-3 custom-scrollbar">
          {history.map((item) => (
            <div
              key={item.id}
              className="group flex items-center justify-between p-3.5 rounded-xl border border-white/5 bg-slate-950/20 hover:bg-slate-950/40 hover:border-white/10 transition-all duration-300"
            >
              {/* BMI score and Tag */}
              <div className="flex items-center gap-3">
                <div className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl border font-bold text-base font-mono ${getCategoryColorClass(item.category).split(' ')[0]} ${getCategoryColorClass(item.category).split(' ')[1]}`}>
                  {item.bmi.toFixed(1)}
                </div>
                <div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getCategoryColorClass(item.category)}`}>
                    {item.category}
                  </span>
                  <div className="text-xs text-slate-300 font-semibold mt-1">
                    {item.weightText} <span className="text-slate-500 font-normal">|</span> {item.heightText}
                  </div>
                </div>
              </div>

              {/* Date and actions */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 font-semibold">{item.date}</div>
                  <div className="text-[9px] text-slate-600 font-mono capitalize">{item.gender}</div>
                </div>
                <button
                  onClick={() => deleteHistoryItem(item.id)}
                  className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-300"
                  title="Delete log"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default BmiHistory;
