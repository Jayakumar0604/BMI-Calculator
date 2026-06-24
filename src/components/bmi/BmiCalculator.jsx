import React from 'react';
import { useBmi } from '../../hooks/useBmi';
import BmiForm from './BmiForm';
import BmiGauge from './BmiGauge';
import BmiInsights from './BmiInsights';
import BmiHistory from './BmiHistory';

export const BmiCalculator = () => {
  const bmiState = useBmi();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 animate-fadeIn">
      {/* Dashboard Header */}
      <header className="text-center mb-10 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Clinical Health Index
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-purple-400 tracking-tight">
          AURA WELLNESS DIAL
        </h1>
        <p className="text-slate-400 text-sm md:text-base mt-3 max-w-2xl leading-relaxed">
          Unlock standard Body Mass Index (BMI), Basal Metabolic Rate (BMR), daily calorie expenditures, and clinical weight recommendations.
        </p>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Input form and diagnostic logs */}
        <div className="lg:col-span-6 space-y-6">
          <BmiForm {...bmiState} />
          <BmiHistory 
            history={bmiState.history}
            deleteHistoryItem={bmiState.deleteHistoryItem}
            clearHistory={bmiState.clearHistory}
          />
        </div>

        {/* Right Column: Gauges and insights */}
        <div className="lg:col-span-6 space-y-6">
          <BmiGauge result={bmiState.result} />
          {bmiState.result && <BmiInsights result={bmiState.result} />}
        </div>

      </div>
    </div>
  );
};

export default BmiCalculator;
