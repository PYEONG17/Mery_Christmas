import React, { useState } from 'react';
import { ASSETS } from '../constants';
import SpeechBubble from './SpeechBubble';

interface Props {
  onNext: () => void;
}

const PanelAction: React.FC<Props> = ({ onNext }) => {
  const [thrown, setThrown] = useState(false);
  const [showEffects, setShowEffects] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    setMousePos({ x, y });
  };

  const handleThrow = () => {
    if (thrown) return;
    setThrown(true);
    
    // Trigger sound effects visually
    setTimeout(() => setShowEffects(true), 100);

    // End scene after animation
    setTimeout(() => {
      onNext();
    }, 1600); // Matches CSS animation duration + buffer
  };

  return (
    <div 
      className="relative w-full h-full flex flex-col items-center justify-center bg-indigo-900 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="relative w-full max-w-4xl aspect-[4/3] md:aspect-video border-8 border-black bg-sky-900 shadow-[10px_10px_0px_0px_#222] overflow-hidden">
        
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 to-indigo-800"></div>
        
        {/* Moon - Parallax Layer 1 (Far background) */}
        <div 
          className="absolute top-6 right-8 md:top-10 md:right-20 w-16 h-16 md:w-24 md:h-24 rounded-full bg-yellow-200 border-4 border-black shadow-[0_0_20px_rgba(255,255,0,0.5)] transition-transform duration-100 ease-out"
          style={{ transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)` }}
        ></div>

        {/* Target House (Far away) - Parallax Layer 2 */}
        <div 
          className="absolute bottom-6 right-4 md:bottom-10 md:right-10 w-24 h-24 md:w-48 md:h-48 z-0 transition-transform duration-100 ease-out"
          style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 15}px)` }}
        >
          <img src={ASSETS.CRUSH_HOUSE} className="w-full h-full object-contain drop-shadow-lg" alt="Target House" />
          {/* Lit window */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 bg-yellow-300 animate-pulse rounded-sm shadow-[0_0_10px_#ff0]"></div>
        </div>

        {/* Santa Container (Clickable) - Parallax Layer 3 (Foreground) */}
        <div 
          className={`absolute bottom-0 left-[-2rem] md:left-10 transition-transform duration-300 ${!thrown ? 'cursor-pointer hover:scale-105' : ''} z-10`}
          onClick={handleThrow}
          style={{ 
            // Combine the parallax translate with the hover scale/thrown transform logic
             transform: `${thrown ? 'scaleX(-1)' : ''} translate(${mousePos.x * -30}px, ${mousePos.y * -20}px)` 
          }}
        >
          {/* Santa Sprite */}
          <div className="relative w-48 h-60 md:w-80 md:h-96">
            <img 
              src={ASSETS.SANTA_THROW} 
              alt="Santa" 
              className={`w-full h-full object-cover border-4 border-black ${thrown ? 'filter brightness-110' : ''}`}
              style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)' }} // Comic rough cut look
            />
            
            {/* The Gift */}
            <div className={`absolute top-1/2 right-0 w-12 h-12 md:w-24 md:h-24 z-20 ${thrown ? 'comic-throw' : 'breathe'}`}>
               <div className="w-full h-full bg-red-600 border-4 border-black flex items-center justify-center relative shadow-lg">
                 <div className="absolute w-full h-4 bg-yellow-400 border-y-2 border-black"></div>
                 <div className="absolute h-full w-4 bg-yellow-400 border-x-2 border-black"></div>
               </div>
            </div>
          </div>
        </div>

        {/* Speech Bubble (Disappears when thrown) */}
        {!thrown && (
          <div className="absolute top-16 left-4 md:top-20 md:left-40 max-w-[200px] md:max-w-xs z-30 transition-transform duration-75"
               style={{ transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -5}px)` }}>
            <SpeechBubble 
              speaker="Ông già Noel"
              text="Chuẩn bị... 1000 tấn tình cảm... PHÓNG!"
              position="bottom-left"
              className="text-sm md:text-lg"
            />
            <div className="mt-2 text-white font-['Bangers'] text-lg md:text-xl text-center animate-bounce">
              (Nhấn vào Ông già Noel!)
            </div>
          </div>
        )}

        {/* Visual Sound Effects */}
        {showEffects && (
          <>
            <div className="absolute top-1/2 left-1/4 md:left-1/3 text-4xl md:text-8xl font-['Bangers'] text-yellow-400 tracking-widest -rotate-12 drop-shadow-[4px_4px_0_#000] pop-in z-40 pointer-events-none">
              WOOSH!
            </div>
             <div className="absolute bottom-1/3 left-1/2 md:left-2/3 text-4xl md:text-7xl font-['Bangers'] text-white tracking-widest rotate-12 drop-shadow-[4px_4px_0_#000] pop-in delay-100 z-40 pointer-events-none">
              ZOOOOOM!
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PanelAction;