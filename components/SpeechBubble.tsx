import React from 'react';
import { SpeechBubbleProps } from '../types';

const SpeechBubble: React.FC<SpeechBubbleProps> = ({ text, position = 'top-left', speaker, className = '' }) => {
  
  const positionClasses = {
    'top-left': 'rounded-br-none',
    'top-right': 'rounded-bl-none',
    'bottom-left': 'rounded-tr-none',
    'bottom-right': 'rounded-tl-none',
    'center': ''
  };

  return (
    <div className={`relative max-w-xs md:max-w-md z-20 ${className}`}>
      <div className={`
        bg-white border-4 border-black p-4 md:p-6
        shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
        font-['Comic_Neue'] font-bold text-lg md:text-xl text-black leading-tight
        ${positionClasses[position]}
        pop-in
      `}>
        {speaker && (
          <span className="block font-['Bangers'] text-red-600 text-xl md:text-2xl mb-1 uppercase tracking-wide">
            {speaker}:
          </span>
        )}
        {text}
      </div>
      {/* Little triangle tail for the bubble */}
      <div className={`
        absolute w-6 h-6 bg-white border-b-4 border-r-4 border-black
        ${position === 'top-left' ? '-bottom-3 left-8 rotate-45' : ''}
        ${position === 'top-right' ? '-bottom-3 right-8 rotate-45' : ''}
        ${position === 'bottom-left' ? '-top-3 left-8 -rotate-135 bg-white' : ''} 
      `}></div>
    </div>
  );
};

export default SpeechBubble;