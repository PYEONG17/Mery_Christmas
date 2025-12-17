import React, { useState, useRef, useEffect } from "react";
import { Scene } from "./types";
import PanelSetup from "./components/PanelSetup";
import PanelAction from "./components/PanelAction";
import PanelClimax from "./components/PanelClimax";
import { Music, VolumeX } from "lucide-react";

// Using a public domain Jingle Bells track (Kevin MacLeod)
const CHRISTMAS_MUSIC_URL =
  "https://upload.wikimedia.org/wikipedia/commons/e/e8/Jingle_Bells_-_Kevin_MacLeod_-_No_Voice.ogg";

const App: React.FC = () => {
  const [currentScene, setCurrentScene] = useState<Scene>(Scene.SETUP);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Set initial volume on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
    }
  }, []);

  // Handle play/pause based on state
  useEffect(() => {
    if (audioRef.current) {
      if (audioEnabled) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.warn("Audio playback prevented by browser policy:", error);
            // Don't strictly disable state here to allow potential future user interactions to work
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [audioEnabled]);

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  const renderScene = () => {
    switch (currentScene) {
      case Scene.SETUP:
        return (
          <PanelSetup
            onNext={() => {
              // Auto-play music when starting the mission
              setAudioEnabled(true);
              setCurrentScene(Scene.ACTION);
            }}
          />
        );
      case Scene.ACTION:
        return <PanelAction onNext={() => setCurrentScene(Scene.CLIMAX)} />;
      case Scene.CLIMAX:
        return <PanelClimax onRestart={() => setCurrentScene(Scene.SETUP)} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-screen bg-black text-slate-900 font-sans overflow-hidden flex flex-col">
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src="./picture/merry-christmas-ambient-piano-218350.mp3"
        loop
        preload="auto"
      />

      {/* Top Bar for Audio Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleAudio}
          className="bg-white border-4 border-black p-2 rounded-full shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] hover:translate-y-1 hover:shadow-none transition-all group"
          title={audioEnabled ? "Tắt nhạc" : "Bật nhạc"}
        >
          {audioEnabled ? (
            <Music className="text-red-500 w-6 h-6 animate-pulse" />
          ) : (
            <VolumeX className="text-gray-400 w-6 h-6 group-hover:text-gray-600" />
          )}
        </button>
      </div>

      {/* Main Stage - Modified to allow scrolling if content overflows (like the final letter) */}
      <main className="flex-grow relative w-full h-full overflow-y-auto overflow-x-hidden">
        {renderScene()}
      </main>

      {/* Comic Book Footer / Branding */}
      <div className="absolute bottom-2 right-4 text-white/30 font-['Bangers'] text-sm pointer-events-none z-50">
        by Nguyen Tien Binh
      </div>
    </div>
  );
};

export default App;
