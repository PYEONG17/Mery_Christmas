import React, { useState, useEffect } from "react";
import { ASSETS, COLORS } from "../constants";
import SpeechBubble from "./SpeechBubble";
import { RefreshCcw } from "lucide-react";

interface Props {
  onRestart: () => void;
}

interface ConfettiPiece {
  id: number;
  left: number;
  delay: number;
  color: string;
  speed: number;
  size: number;
  borderRadius: string;
}

const PanelClimax: React.FC<Props> = ({ onRestart }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    // Generate confetti with more variety
    const colors = [
      COLORS.RED,
      COLORS.GREEN,
      COLORS.YELLOW,
      COLORS.WHITE,
      "#3498db",
      "#9b59b6",
      "#e67e22",
      "#1abc9c",
    ];

    const pieces = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5, // Spread start times
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: 2.5 + Math.random() * 3, // Varying fall speeds
      size: 6 + Math.random() * 8, // Varying sizes
      borderRadius: Math.random() > 0.5 ? "50%" : "0px", // Mix of circles and squares
    }));
    setConfetti(pieces);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Calculate tilt rotation based on mouse position relative to center
    const x = (e.clientX - window.innerWidth / 2) / 40;
    const y = (e.clientY - window.innerHeight / 2) / 40;
    // Invert Y axis for natural tilt feel (mouse up -> tilt back)
    setTilt({ x: -y, y: x });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      className="relative w-full min-h-full flex flex-col items-center justify-center bg-red-900 p-2 md:p-4 perspective-1000 pb-20"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px" }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_2px,transparent_2px)] [background-size:16px_16px]"></div>

      {/* Confetti Layer - Higher Z-index to float over content */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
        {confetti.map((piece) => (
          <div
            key={piece.id}
            className="absolute shadow-sm"
            style={{
              left: `${piece.left}%`,
              top: "-20px",
              width: `${piece.size}px`,
              height: `${piece.size}px`,
              backgroundColor: piece.color,
              borderRadius: piece.borderRadius,
              animation: `confettiFall ${piece.speed}s linear ${piece.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Tilt Container */}
      <div
        className="relative transition-transform duration-100 ease-out z-10 w-full max-w-3xl"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Animation Wrapper (separated from tilt to avoid conflict) */}
        <div className="w-full bg-white border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-4 md:p-10 flex flex-col items-center text-center space-y-4 md:space-y-6 burst-in">
          {/* Header: Santa Success */}
          <div
            className="flex items-center space-x-2 md:space-x-4 mb-2 md:mb-4"
            style={{ transform: "translateZ(20px)" }}
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-black overflow-hidden bg-red-200">
              <img
                src={ASSETS.SANTA_THROW}
                className="w-full h-full object-cover"
                alt="Santa Face"
              />
            </div>
            <div className="text-left">
              <SpeechBubble
                text="Nhiệm vụ hoàn thành! Merry Christmas!"
                position="center"
                className="!p-2 text-sm md:text-lg"
              />
            </div>
          </div>

          {/* The Card Content */}
          <div
            className="w-full bg-red-50 border-dashed border-4 border-red-300 p-4 md:p-8 rounded-lg relative group pop-in"
            style={{
              transform: "translateZ(10px)",
              opacity: 0,
              animationDelay: "0.5s",
              animationFillMode: "forwards",
            }}
          >
            {/* Decorative holly/corner */}
            <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-12 h-12 md:w-16 md:h-16 bg-green-500 rounded-full border-4 border-black z-10 animate-bounce"></div>
            <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-12 h-12 md:w-16 md:h-16 bg-red-500 rounded-full border-4 border-black z-10 animate-bounce [animation-delay:0.2s]"></div>

            <h1 className="font-['Bangers'] text-3xl md:text-5xl text-red-600 mb-4 md:mb-6 drop-shadow-md">
              GIÁNG SINH VUI VẺ NHÉ!
            </h1>

            <div className="font-['Comic_Neue'] text-lg md:text-2xl text-slate-800 font-bold leading-relaxed space-y-2 md:space-y-4">
              <p>
                Gửi{" "}
                <span className="text-red-600 underline decoration-wavy">
                  chị mình cute đáng yêu siêu cấp VIP PRO
                </span>
                ,
              </p>
              <p>
                Ông già Noel bảo chị Linh là món quà tuyệt vời nhất năm nay đấy.
                Mong chị luôn cười tươi nhé. He he he !!!
              </p>
            </div>

            {/* Photo Placeholder */}
            <div
              className="mt-6 md:mt-8 relative inline-block transform rotate-2 hover:rotate-0 transition-transform duration-300 hover:scale-105"
              style={{ transform: "translateZ(30px) rotate(2deg)" }}
            >
              <div className="bg-white p-2 md:p-3 pb-8 md:pb-12 border-4 border-black shadow-md">
                <img
                  src={ASSETS.CRUSH_PHOTO}
                  alt="Crush"
                  className="w-full max-w-[200px] md:max-w-xs h-auto object-cover border-2 border-gray-200 bg-gray-100"
                />
                <div className="absolute bottom-2 md:bottom-4 left-0 w-full text-center font-['Comic_Neue'] text-gray-500 font-bold text-sm md:text-base">
                  &lt;3 Smile smile smile 💗
                </div>
              </div>
              {/* Tape effect */}
              <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 w-16 md:w-24 h-6 md:h-8 bg-yellow-200 opacity-80 rotate-3 shadow-sm"></div>
            </div>
          </div>

          <div
            className="pt-2 md:pt-4"
            style={{ transform: "translateZ(20px)" }}
          >
            <button
              onClick={onRestart}
              className="flex items-center gap-2 text-gray-500 font-['Bangers'] text-lg md:text-xl hover:text-black transition-colors"
            >
              <RefreshCcw size={20} />
              Chơi lại từ đầu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelClimax;
