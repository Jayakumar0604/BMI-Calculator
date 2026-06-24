import React from 'react';

/**
 * Reusable Card component for glassmorphic elements
 */
export const Card = ({ children, className = '', glow = false, hover = false }) => {
  return (
    <div
      className={`
        relative backdrop-blur-md rounded-2xl border border-white/10 bg-slate-900/60 p-6 
        transition-all duration-300 shadow-xl
        ${glow ? 'shadow-indigo-500/5 hover:shadow-indigo-500/10' : ''}
        ${hover ? 'hover:-translate-y-1 hover:border-white/20' : ''}
        ${className}
      `}
    >
      {/* Outer glow layer */}
      {glow && (
        <div className="absolute -inset-[1px] bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-pink-500/15 rounded-2xl -z-10 blur-sm pointer-events-none opacity-70" />
      )}
      {children}
    </div>
  );
};

export default Card;
