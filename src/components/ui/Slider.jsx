import React from 'react';

/**
 * Custom range slider UI component
 */
export const Slider = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = '',
  className = ''
}) => {
  return (
    <div className={`flex flex-col space-y-2 w-full ${className}`}>
      <div className="flex justify-between items-center text-sm font-medium">
        <span className="text-slate-400">{label}</span>
        <span className="text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full font-mono font-semibold text-xs border border-indigo-500/25">
          {value} {unit}
        </span>
      </div>
      <div className="relative flex items-center group">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="
            w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-800
            outline-none transition-colors duration-200
            accent-indigo-500 hover:accent-indigo-400
            [&::-webkit-slider-runnable-track]:bg-slate-800
            [&::-webkit-slider-runnable-track]:rounded-lg
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-indigo-500
            [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(99,102,241,0.5)]
            [&::-webkit-slider-thumb]:transition-all
            [&::-webkit-slider-thumb]:duration-150
            [&::-webkit-slider-thumb]:hover:scale-125
          "
        />
      </div>
      <div className="flex justify-between text-[10px] text-slate-600 font-mono">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default Slider;
