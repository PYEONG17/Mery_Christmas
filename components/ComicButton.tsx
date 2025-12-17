import React from 'react';
import { ComicButtonProps } from '../types';

const ComicButton: React.FC<ComicButtonProps> = ({ onClick, text, variant = 'primary', className = '' }) => {
  let bgColor = 'bg-red-500 hover:bg-red-600';
  if (variant === 'success') bgColor = 'bg-green-500 hover:bg-green-600';
  if (variant === 'danger') bgColor = 'bg-orange-500 hover:bg-orange-600';

  return (
    <button
      onClick={onClick}
      className={`
        relative px-8 py-3 
        font-['Bangers'] text-2xl tracking-wider text-white uppercase
        border-4 border-black 
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        active:translate-y-1 active:shadow-none active:translate-x-1
        transition-all duration-100
        ${bgColor}
        ${className}
      `}
    >
      {text}
    </button>
  );
};

export default ComicButton;