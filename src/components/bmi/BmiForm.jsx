import React from 'react';
import Card from '../ui/Card';
import Slider from '../ui/Slider';

export const BmiForm = ({
  gender, setGender,
  age, setAge,
  unitSystem, toggleUnitSystem,
  heightCm, setHeightCm,
  weightKg, setWeightKg,
  heightFt, setHeightFt,
  heightIn, setHeightIn,
  weightLbs, setWeightLbs,
  activityLevel, setActivityLevel,
  calculate,
  clear
}) => {
  return (
    <Card className="w-full" glow={true}>
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-pulse"></span>
        Personal Diagnostics
      </h2>

      <div className="space-y-6">
        {/* Unit Selector Toggle */}
        <div className="flex bg-slate-950 p-1.5 rounded-xl border border-white/5">
          <button
            type="button"
            onClick={() => toggleUnitSystem('metric')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-300 ${
              unitSystem === 'metric'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Metric System (cm/kg)
          </button>
          <button
            type="button"
            onClick={() => toggleUnitSystem('imperial')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-300 ${
              unitSystem === 'imperial'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Imperial System (ft/lbs)
          </button>
        </div>

        {/* Gender Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-3">Gender</label>
          <div className="grid grid-cols-3 gap-3">
            {/* Male Option */}
            <button
              type="button"
              onClick={() => setGender('male')}
              className={`
                flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-300 gap-1.5
                ${
                  gender === 'male'
                    ? 'border-blue-500/50 bg-blue-500/10 text-blue-400 shadow-md shadow-blue-500/5'
                    : 'border-white/5 bg-slate-950/40 text-slate-400 hover:border-white/10 hover:text-slate-200'
                }
              `}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs font-medium">Male</span>
            </button>

            {/* Female Option */}
            <button
              type="button"
              onClick={() => setGender('female')}
              className={`
                flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-300 gap-1.5
                ${
                  gender === 'female'
                    ? 'border-pink-500/50 bg-pink-500/10 text-pink-400 shadow-md shadow-pink-500/5'
                    : 'border-white/5 bg-slate-950/40 text-slate-400 hover:border-white/10 hover:text-slate-200'
                }
              `}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3zm0 0v8m-3-3h6m-3-5c-2.761 0-5 2.239-5 5h10c0-2.761-2.239-5-5-5z" />
              </svg>
              <span className="text-xs font-medium">Female</span>
            </button>

            {/* Diverse Option */}
            <button
              type="button"
              onClick={() => setGender('other')}
              className={`
                flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-300 gap-1.5
                ${
                  gender === 'other'
                    ? 'border-purple-500/50 bg-purple-500/10 text-purple-400 shadow-md shadow-purple-500/5'
                    : 'border-white/5 bg-slate-950/40 text-slate-400 hover:border-white/10 hover:text-slate-200'
                }
              `}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0M12 4.5v15M12 12l4.5 4.5M12 12L7.5 7.5" />
              </svg>
              <span className="text-xs font-medium">Diverse</span>
            </button>
          </div>
        </div>

        {/* Height Controls */}
        <div>
          {unitSystem === 'metric' ? (
            <div className="space-y-3">
              <Slider
                label="Height"
                min={100}
                max={220}
                value={heightCm}
                onChange={setHeightCm}
                unit="cm"
              />
              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-500">Fine Tune:</span>
                <input
                  type="number"
                  min={100}
                  max={220}
                  value={heightCm}
                  onChange={(e) => setHeightCm(Math.min(Math.max(Number(e.target.value), 30), 300))}
                  className="w-20 bg-slate-950/80 border border-white/10 rounded-lg p-1 text-center text-sm text-indigo-300 font-mono focus:border-indigo-500 outline-none"
                />
                <span className="text-xs text-slate-500">cm</span>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <span className="block text-sm font-medium text-slate-400">Height</span>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-mono">Feet (ft)</label>
                  <input
                    type="number"
                    min={1}
                    max={9}
                    value={heightFt}
                    onChange={(e) => setHeightFt(Math.min(Math.max(Number(e.target.value), 1), 9))}
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl p-2.5 text-center text-white font-mono focus:border-indigo-500 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-mono">Inches (in)</label>
                  <input
                    type="number"
                    min={0}
                    max={11}
                    value={heightIn}
                    onChange={(e) => setHeightIn(Math.min(Math.max(Number(e.target.value), 0), 11))}
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl p-2.5 text-center text-white font-mono focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Weight Controls */}
        <div>
          {unitSystem === 'metric' ? (
            <div className="space-y-3">
              <Slider
                label="Weight"
                min={30}
                max={150}
                value={weightKg}
                onChange={setWeightKg}
                unit="kg"
              />
              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-500">Fine Tune:</span>
                <input
                  type="number"
                  min={30}
                  max={250}
                  value={weightKg}
                  onChange={(e) => setWeightKg(Math.min(Math.max(Number(e.target.value), 2), 500))}
                  className="w-20 bg-slate-950/80 border border-white/10 rounded-lg p-1 text-center text-sm text-indigo-300 font-mono focus:border-indigo-500 outline-none"
                />
                <span className="text-xs text-slate-500">kg</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <Slider
                label="Weight"
                min={60}
                max={350}
                value={weightLbs}
                onChange={setWeightLbs}
                unit="lbs"
              />
              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-500">Fine Tune:</span>
                <input
                  type="number"
                  min={60}
                  max={350}
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(Math.min(Math.max(Number(e.target.value), 5), 1100))}
                  className="w-20 bg-slate-950/80 border border-white/10 rounded-lg p-1 text-center text-sm text-indigo-300 font-mono focus:border-indigo-500 outline-none"
                />
                <span className="text-xs text-slate-500">lbs</span>
              </div>
            </div>
          )}
        </div>

        {/* Age & Activity Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Age Slider */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-slate-400">Age</label>
            <input
              type="number"
              min={1}
              max={120}
              value={age}
              onChange={(e) => setAge(Math.min(Math.max(Number(e.target.value), 1), 120))}
              className="w-full bg-slate-950/80 border border-white/10 rounded-xl p-2.5 text-center text-white font-mono focus:border-indigo-500 outline-none"
            />
          </div>

          {/* Activity dropdown */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-slate-400">Activity Level</label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              className="w-full bg-slate-950/80 border border-white/10 rounded-xl p-2.5 text-center text-slate-200 text-sm focus:border-indigo-500 outline-none"
            >
              <option value="sedentary">Sedentary (Office)</option>
              <option value="light">Light Active (1-3 d/wk)</option>
              <option value="moderate">Moderate Active (3-5 d/wk)</option>
              <option value="active">Very Active (6-7 d/wk)</option>
              <option value="veryActive">Extreme Athlete</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={calculate}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98]"
          >
            Calculate BMI
          </button>
          <button
            type="button"
            onClick={clear}
            className="py-3 px-5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 font-semibold rounded-xl transition-all duration-300"
          >
            Reset
          </button>
        </div>
      </div>
    </Card>
  );
};

export default BmiForm;
