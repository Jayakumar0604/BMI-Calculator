import React, { useEffect, useState } from 'react';
import Card from '../ui/Card';

export const BmiGauge = ({ result }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    if (result && result.bmi) {
      // Smooth counting effect for the BMI score text
      const duration = 800; // ms
      const steps = 30;
      const stepTime = duration / steps;
      let currentStep = 0;
      const target = result.bmi;
      
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const currentVal = (target * progress).toFixed(1);
        
        if (currentStep >= steps) {
          setAnimatedScore(target);
          clearInterval(timer);
        } else {
          setAnimatedScore(parseFloat(currentVal));
        }
      }, stepTime);

      return () => clearInterval(timer);
    } else {
      setAnimatedScore(0);
    }
  }, [result]);

  const radius = 80;
  const circumference = 2 * Math.PI * radius; // ~502.65
  
  // Map BMI value (15 to 40) to gauge percentage (0 to 100)
  // For the SVG dashoffset, 100% filled means offset = 0, 0% filled means offset = circumference
  const getStrokeOffset = () => {
    if (!result) return circumference;
    const bmiVal = result.bmi;
    const minBmi = 15;
    const maxBmi = 35;
    const ratio = Math.min(Math.max((bmiVal - minBmi) / (maxBmi - minBmi), 0), 1);
    
    // We only fill 3/4 of the circle (270 degrees)
    const arcPercent = 0.75;
    const filledLength = ratio * circumference * arcPercent;
    return circumference - filledLength;
  };

  const getBmiCategoryColorClass = (bmi) => {
    if (!bmi) return 'text-slate-400';
    if (bmi < 18.5) return 'text-sky-400';
    if (bmi >= 18.5 && bmi < 25) return 'text-green-400';
    if (bmi >= 25 && bmi < 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  const categoryColorClass = result ? getBmiCategoryColorClass(result.bmi) : 'text-slate-500';

  return (
    <Card className="w-full flex flex-col items-center justify-center text-center h-full min-h-[380px]" glow={true}>
      <h2 className="text-xl font-bold text-white mb-6 w-full text-left flex items-center gap-2">
        <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-pulse"></span>
        BMI Analysis Dial
      </h2>

      {!result ? (
        <div className="flex flex-col items-center justify-center flex-1 py-8">
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Background static circle */}
            <svg className="w-full h-full -rotate-225" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r={radius}
                className="stroke-slate-800 fill-none"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-3xl font-extrabold text-slate-700">--.-</span>
              <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">Awaiting Inputs</p>
            </div>
          </div>
          <p className="text-sm text-slate-400 mt-6 max-w-xs leading-relaxed">
            Enter your height, weight, and age on the diagnostics form to visualize your score.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 w-full">
          <div className="relative w-56 h-56 flex items-center justify-center">
            
            {/* SVG Arc Gauge */}
            <svg className="w-full h-full -rotate-225 drop-shadow-[0_0_15px_rgba(99,102,241,0.15)]" viewBox="0 0 200 200">
              {/* Outer Glow Ring */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                className="stroke-slate-800 fill-none"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
              />
              {/* Animated Progress Indicator */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                className="fill-none transition-all duration-1000 ease-out"
                style={{
                  stroke: result.color,
                  strokeDashoffset: getStrokeOffset(),
                  strokeDasharray: circumference,
                  strokeWidth: 12,
                  strokeLinecap: 'round',
                  transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />
            </svg>

            {/* Inner Dashboard Score Display */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className={`text-5xl font-black tracking-tight transition-all duration-300 ${categoryColorClass}`}>
                {animatedScore.toFixed(1)}
              </span>
              <span className={`text-sm font-bold uppercase tracking-wider mt-1 px-3 py-1 rounded-full bg-slate-950/60 border border-white/5 shadow-inner ${categoryColorClass}`}>
                {result.category}
              </span>
            </div>

            {/* Range markers on the dial (labels) */}
            <div className="absolute bottom-2 left-6 text-[10px] text-sky-400 font-bold font-mono">15.0</div>
            <div className="absolute top-8 left-2 text-[10px] text-green-400 font-bold font-mono">18.5</div>
            <div className="absolute top-8 right-2 text-[10px] text-yellow-400 font-bold font-mono">25.0</div>
            <div className="absolute bottom-2 right-6 text-[10px] text-red-400 font-bold font-mono">30.0+</div>
          </div>

          <div className="mt-4 px-4">
            <p className="text-sm text-slate-300 font-medium leading-relaxed max-w-sm">
              "{result.description}"
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default BmiGauge;
