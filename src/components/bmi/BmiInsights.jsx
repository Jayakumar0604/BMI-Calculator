import React, { useState } from 'react';
import Card from '../ui/Card';
import { getHealthRecommendations } from '../../utils/bmiCalculator';

export const BmiInsights = ({ result }) => {
  const [activeTab, setActiveTab] = useState('profile');

  if (!result) return null;

  const recommendations = getHealthRecommendations(result.category);

  return (
    <Card className="w-full" glow={true}>
      <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
        <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-pulse"></span>
        Health & Caloric Insights
      </h2>

      {/* Tabs Headers */}
      <div className="flex border-b border-white/5 mb-6">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex-1 pb-3 text-sm font-semibold transition-all duration-300 border-b-2 ${
            activeTab === 'profile'
              ? 'border-indigo-500 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Health Profile
        </button>
        <button
          onClick={() => setActiveTab('metabolic')}
          className={`flex-1 pb-3 text-sm font-semibold transition-all duration-300 border-b-2 ${
            activeTab === 'metabolic'
              ? 'border-indigo-500 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Metabolism & Calories
        </button>
        <button
          onClick={() => setActiveTab('wellness')}
          className={`flex-1 pb-3 text-sm font-semibold transition-all duration-300 border-b-2 ${
            activeTab === 'wellness'
              ? 'border-indigo-500 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Wellness Plan
        </button>
      </div>

      {/* Tabs Content */}
      <div className="min-h-[220px]">
        {activeTab === 'profile' && (
          <div className="space-y-5 animate-fadeIn">
            {/* Weight difference banner */}
            <div className={`p-4 rounded-xl border flex items-start gap-3 ${
              result.weightDiffStatus === 'normal' 
                ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                : result.weightDiffStatus === 'lose' 
                  ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' 
                  : 'bg-sky-500/10 border-sky-500/20 text-sky-400'
            }`}>
              <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-bold text-sm">Status Assessment</h4>
                <p className="text-xs mt-1 text-slate-300 leading-relaxed">
                  {result.weightDiffStatus === 'normal' && 'Your body weight is perfectly proportioned for your height.'}
                  {result.weightDiffStatus === 'lose' && `You are currently above your healthy weight range. We recommend a target reduction of ${result.weightDiff} ${result.healthyRange.min === 0 ? 'kg' : result.displayWeight.split(' ')[1]} to return to a normal range.`}
                  {result.weightDiffStatus === 'gain' && `You are below your healthy weight range. We suggest a target gain of ${result.weightDiff} ${result.healthyRange.min === 0 ? 'kg' : result.displayWeight.split(' ')[1]} to achieve a balanced weight.`}
                </p>
              </div>
            </div>

            {/* Ideal Weight metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-950/40 p-4 rounded-xl border border-white/5 flex flex-col justify-center">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Height & Weight</span>
                <span className="text-lg font-bold text-slate-100">{result.displayHeight} / {result.displayWeight}</span>
                <span className="text-xs text-slate-400 mt-1">Recorded stats</span>
              </div>
              <div className="bg-slate-950/40 p-4 rounded-xl border border-white/5 flex flex-col justify-center">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Healthy Weight Limit</span>
                <span className="text-lg font-bold text-slate-100">
                  {result.healthyRange.min} - {result.healthyRange.max} {result.displayWeight.split(' ')[1]}
                </span>
                <span className="text-xs text-slate-400 mt-1">For optimal health index (18.5 - 24.9)</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'metabolic' && (
          <div className="space-y-4 animate-fadeIn">
            {/* BMR and TDEE Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-500/5 p-4 rounded-xl border border-indigo-500/10 text-center">
                <span className="text-[10px] text-indigo-400 uppercase font-bold tracking-wider block mb-1">BMR (Basal Metabolic Rate)</span>
                <span className="text-2xl font-black text-white font-mono">{result.bmr}</span>
                <span className="text-[10px] text-indigo-300 block mt-1">kcal/day required at complete rest</span>
              </div>
              <div className="bg-purple-500/5 p-4 rounded-xl border border-purple-500/10 text-center">
                <span className="text-[10px] text-purple-400 uppercase font-bold tracking-wider block mb-1">Daily Maintenance TDEE</span>
                <span className="text-2xl font-black text-white font-mono">{result.dailyCalories}</span>
                <span className="text-[10px] text-purple-300 block mt-1">kcal/day based on activity level</span>
              </div>
            </div>

            {/* Explanation box */}
            <div className="bg-slate-950/30 p-4 rounded-xl border border-white/5 text-xs text-slate-400 leading-relaxed">
              <p>
                <strong>Basal Metabolic Rate (BMR)</strong> represents the calories your body burns to keep vital organs functioning. 
                Your <strong>TDEE (Total Daily Energy Expenditure)</strong> factors in your physical activity level. To lose weight, 
                aim below your TDEE; to gain weight safely, aim above your TDEE.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'wellness' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Wellness recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950/20 p-4 rounded-xl border border-white/5">
                <h5 className="text-xs font-bold text-indigo-400 mb-2 uppercase tracking-wide flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  Nutrition Guidance
                </h5>
                <ul className="space-y-1.5">
                  {recommendations.nutrition.map((rec, i) => (
                    <li key={i} className="text-xs text-slate-300 list-disc list-inside leading-relaxed pl-1">
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-950/20 p-4 rounded-xl border border-white/5">
                <h5 className="text-xs font-bold text-purple-400 mb-2 uppercase tracking-wide flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                  Active Fitness
                </h5>
                <ul className="space-y-1.5">
                  {recommendations.exercise.map((rec, i) => (
                    <li key={i} className="text-xs text-slate-300 list-disc list-inside leading-relaxed pl-1">
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Lifestyle and risk footer */}
            <div className="bg-slate-950/40 p-3 rounded-xl border border-white/5 flex flex-col gap-2">
              <div className="text-[11px] text-slate-400 leading-relaxed">
                <span className="font-semibold text-slate-300">Lifestyle Advice:</span> {recommendations.lifestyle.join(' ')}
              </div>
              <div className="text-[11px] text-red-400/90 leading-relaxed border-t border-white/5 pt-2">
                <span className="font-semibold text-slate-300">Risk Assessment:</span> {recommendations.risks}
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default BmiInsights;
