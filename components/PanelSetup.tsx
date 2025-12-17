import React, { useState, useMemo } from "react";
import { ASSETS } from "../constants";
import SpeechBubble from "./SpeechBubble";
import ComicButton from "./ComicButton";

interface Props {
  onNext: () => void;
}

const PanelSetup: React.FC<Props> = ({ onNext }) => {
  const [wind, setWind] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Generate random background emojis for the outer page theme
  const backgroundItems = useMemo(() => {
    const emojis = ["🎅", "🎄", "🦌", "⛄", "🎁", "❄️", "🍪"];
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      left: Math.random() * 100,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 10,
      size: 2 + Math.random() * 3, // rem
    }));
  }, []);

  // Enhanced smoke particles configuration with organic shapes
  const smokeParticles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      size: 20 + Math.random() * 25, // Random size between 20px and 45px
      duration: 3 + Math.random() * 2, // Slower, more relaxed duration
      delay: Math.random() * 3, // Spread out start times
      initialOffset: Math.random() * 30 - 15, // Start slightly left or right
      rotationEnd: Math.random() * 180 - 90, // Rotate left or right
      borderRadius: `${40 + Math.random() * 60}% ${40 + Math.random() * 60}% ${
        40 + Math.random() * 60
      }% ${40 + Math.random() * 60}% / ${40 + Math.random() * 60}% ${
        40 + Math.random() * 60
      }% ${40 + Math.random() * 60}% ${40 + Math.random() * 60}%`, // Organic blob shape
    }));
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Normalized coordinates (-1 to 1)
    const normX = (e.clientX / window.innerWidth - 0.5) * 2;
    const normY = (e.clientY / window.innerHeight - 0.5) * 2;

    // Map mouse X to wind direction (-100px to 100px)
    setWind(normX * 100);
    setMousePos({ x: normX, y: normY });
  };

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center bg-[#c0392b] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background Gradient for the Page */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#e74c3c] to-[#c0392b] pointer-events-none"></div>

      {/* Floating Chibi Background Items */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {backgroundItems.map((item) => (
          <div
            key={item.id}
            className="absolute opacity-50 blur-[1px]"
            style={{
              left: `${item.left}%`,
              fontSize: `${item.size}rem`,
              animation: `floatUp ${item.duration}s linear ${item.delay}s infinite`,
              bottom: "-10vh",
            }}
          >
            {item.emoji}
          </div>
        ))}
      </div>

      {/* Comic Panel Container */}
      <div className="relative w-full max-w-4xl aspect-[4/3] md:aspect-video border-8 border-black bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col z-10">
        {/* Scene Content: CSS Art Christmas Scene */}
        <div className="relative flex-grow w-full overflow-hidden bg-slate-900">
          {/* 1. Sky Background (Parallax Layer) */}
          <div
            className="absolute inset-[-5%] bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-900 transition-transform duration-100 ease-out"
            style={{
              transform: `translate(${mousePos.x * -15}px, ${
                mousePos.y * -15
              }px)`,
            }}
          ></div>

          {/* Stars (Parallax Layer - Moves slightly faster than sky base) */}
          <div
            className="absolute inset-[-5%] opacity-70 transition-transform duration-100 ease-out"
            style={{
              backgroundImage: "radial-gradient(white 2px, transparent 2px)",
              backgroundSize: "60px 60px",
              transform: `translate(${mousePos.x * -25}px, ${
                mousePos.y * -25
              }px)`,
            }}
          ></div>

          {/* Moon (Parallax Layer - Moves fastest of background) */}
          <div
            className="absolute top-8 right-8 w-16 h-16 md:w-24 md:h-24 bg-yellow-100 rounded-full shadow-[0_0_50px_rgba(255,255,200,0.5)] transition-transform duration-100 ease-out"
            style={{
              transform: `translate(${mousePos.x * -40}px, ${
                mousePos.y * -40
              }px)`,
            }}
          ></div>

          {/* Snow Ground */}
          <div className="absolute -bottom-10 -left-10 w-[120%] h-40 bg-white rounded-[100%] border-t-4 border-blue-100 z-10"></div>

          {/* 2. Chimney Overlay (Enhanced Chibi Style) */}
          <div className="absolute bottom-0 left-6 md:left-24 w-24 h-48 md:w-32 md:h-56 bg-orange-700 border-4 border-black border-b-0 flex flex-col items-center z-10 rounded-t-sm">
            {/* Bricks Pattern */}
            <div
              className="w-full h-full opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.3) 2px, transparent 2px), linear-gradient(90deg, rgba(0,0,0,0.3) 2px, transparent 2px)",
                backgroundSize: "40px 20px",
              }}
            ></div>

            {/* Chimney Top Rim */}
            <div className="absolute -top-4 w-32 md:w-40 h-8 bg-orange-800 border-4 border-black rounded-sm shadow-md"></div>

            {/* Snow on Chimney */}
            <div className="absolute -top-8 left-0 w-full h-8 bg-white rounded-full border-4 border-black/10"></div>
            <div className="absolute -top-6 left-2 w-10 h-6 bg-white rounded-full"></div>
            <div className="absolute -top-5 right-2 w-12 h-8 bg-white rounded-full"></div>
          </div>

          {/* 3. Chibi Santa (CSS Art) */}
          <div
            className="absolute bottom-16 left-36 md:bottom-20 md:left-64 z-20 flex flex-col items-center animate-bounce scale-75 md:scale-100 origin-bottom"
            style={{ animationDuration: "4s" }}
          >
            {/* Hat */}
            <div className="relative z-30 -mb-2 -ml-6 rotate-[-15deg]">
              <div className="w-5 h-5 bg-white rounded-full absolute -top-1 -right-1 border-2 border-black/10"></div>
              <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[40px] border-b-red-600 drop-shadow-sm"></div>
              <div className="w-8 h-3 bg-white rounded-full absolute -bottom-1 -left-1 border border-gray-200"></div>
            </div>

            {/* Face */}
            <div className="w-14 h-14 bg-[#ffddc4] rounded-full relative z-20 flex flex-col items-center justify-center border-2 border-black/10">
              {/* Eyes */}
              <div className="flex space-x-3 mt-1">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <div className="w-2 h-2 bg-black rounded-full"></div>
              </div>
              {/* Blush */}
              <div className="flex space-x-6 absolute top-8">
                <div className="w-2 h-1 bg-pink-400 rounded-full opacity-40"></div>
                <div className="w-2 h-1 bg-pink-400 rounded-full opacity-40"></div>
              </div>
            </div>

            {/* Beard */}
            <div className="w-20 h-16 bg-white rounded-[40%] -mt-6 z-20 relative shadow-sm border-b-2 border-gray-100"></div>

            {/* Body */}
            <div className="w-20 h-24 bg-red-600 rounded-[2rem] -mt-10 z-10 flex flex-col items-center relative border-2 border-black/20">
              {/* Belt */}
              <div className="w-full h-5 bg-black mt-12 relative flex justify-center items-center">
                <div className="w-6 h-6 border-4 border-yellow-400 rounded-sm bg-yellow-500"></div>
              </div>
              {/* Buttons */}
              <div className="w-2 h-2 bg-white rounded-full absolute top-20"></div>
            </div>

            {/* Arms */}
            <div className="absolute top-14 -left-4 w-6 h-12 bg-red-600 rounded-full rotate-45 z-0 border-2 border-black/10">
              <div className="absolute bottom-0 w-full h-3 bg-white rounded-b-full"></div>
            </div>
            <div className="absolute top-14 -right-4 w-6 h-12 bg-red-600 rounded-full -rotate-45 z-0 border-2 border-black/10">
              <div className="absolute bottom-0 w-full h-3 bg-white rounded-b-full"></div>
            </div>
          </div>

          {/* Smoke Particles - Enhanced Organic Effect */}
          <div className="absolute bottom-[11.5rem] left-[4.5rem] md:bottom-[13.5rem] md:left-[10rem] z-0 pointer-events-none">
            {smokeParticles.map((p) => (
              <div
                key={p.id}
                className="absolute bottom-0 bg-white/30 backdrop-blur-[2px] smoke-puff"
                style={
                  {
                    left: `${p.initialOffset}px`,
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    borderRadius: p.borderRadius,
                    animationDuration: `${p.duration}s`,
                    animationDelay: `${p.delay}s`,
                    // Wind affects end position X, rotation adds dynamic feel
                    "--wind-x": `${wind + p.initialOffset * 3}px`,
                    "--rot-end": `${p.rotationEnd}deg`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>

          {/* Speech Bubble */}
          <div className="absolute top-4 left-4 md:top-8 md:left-12 max-w-[85%] md:max-w-[70%] float z-30">
            <SpeechBubble
              speaker="Ông già Noel 🎅🎄🎁"
              text="Hừm... Tọa độ đã xác định. 
               Đồng chí:Phạm NHật Linh siêu cấp đáng yêu.Mức độ ngoan: Vượt chỉ tiêu!"
              position="top-left"
              className="text-sm md:text-base"
            />
          </div>
        </div>

        {/* Action Bar */}
        <div className="h-16 md:h-20 bg-yellow-400 border-t-8 border-black flex items-center justify-center p-2 md:p-4 relative z-20">
          <ComicButton
            text="Bắt đầu nhiệm vụ!"
            onClick={onNext}
            className="animate-pulse scale-90 md:scale-100"
          />
        </div>
      </div>
    </div>
  );
};

export default PanelSetup;
