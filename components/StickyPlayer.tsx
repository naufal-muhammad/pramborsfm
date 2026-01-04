import React from 'react';
import { useAudio } from '../context/AudioContext';
import { Play, Pause, SkipBack, SkipForward, Volume2, Mic2, Radio, Heart } from 'lucide-react';

const StickyPlayer: React.FC = () => {
  const { isPlaying, currentSong, togglePlay, volume, setVolume, isLive, currentTime, duration, seek } = useAudio();

  if (!currentSong) return null;

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    seek(time);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-prambors-gray/95 backdrop-blur-lg border-t border-white/10 h-24 px-4 md:px-8 flex items-center justify-between z-50 text-white">
      
      {/* Progress Bar Container */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800 group cursor-pointer">
        {isLive ? (
           <div 
             className="h-full bg-prambors-yellow animate-pulse shadow-[0_0_10px_#FFCD00]" 
             style={{ width: '100%' }}
           />
        ) : (
           <>
             <div 
               className="h-full bg-prambors-yellow transition-all duration-100 ease-linear" 
               style={{ width: `${(currentTime / duration) * 100}%` }}
             />
             <input 
               type="range"
               min={0}
               max={duration || 100}
               value={currentTime}
               onChange={handleSeek}
               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
             />
           </>
        )}
      </div>

      {/* Track Info */}
      <div className="flex items-center w-1/4 min-w-[160px]">
        <img 
          src={currentSong.coverUrl} 
          alt={currentSong.title} 
          className={`w-14 h-14 rounded-lg object-cover shadow-lg ${isPlaying && isLive ? 'animate-pulse' : ''}`}
        />
        <div className="ml-4 truncate">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-white truncate">{currentSong.title}</h4>
            {isLive && (
              <span className="text-[10px] font-bold bg-red-600 text-white px-1.5 py-0.5 rounded uppercase tracking-wider animate-pulse">
                Live
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400 truncate">{currentSong.artist}</p>
        </div>
        <button className="ml-4 text-gray-400 hover:text-prambors-yellow transition-colors hidden md:block">
          <Heart size={18} />
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="flex items-center gap-6">
          <button className="text-gray-400 hover:text-white transition-colors">
            <SkipBack size={20} />
          </button>
          <button 
            onClick={togglePlay}
            className="w-12 h-12 bg-prambors-yellow rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,205,0,0.4)]"
          >
            {isPlaying ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" className="ml-1" />}
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <SkipForward size={20} />
          </button>
        </div>
        {/* Time Display for Playback */}
        {!isLive && (
            <div className="text-[10px] text-gray-400 font-medium mt-1 tracking-wide">
                <span>{formatTime(currentTime)}</span>
                <span className="mx-1">/</span>
                <span>{formatTime(duration)}</span>
            </div>
        )}
      </div>

      {/* Volume & Extras */}
      <div className="flex items-center justify-end w-1/4 gap-4 hidden md:flex">
        <button className="text-gray-400 hover:text-white" title="Request Song">
          <Mic2 size={18} />
        </button>
        <button className={`text-gray-400 hover:text-white ${isLive ? 'text-prambors-yellow' : ''}`} title="Live Radio">
          <Radio size={18} />
        </button>
        <div className="flex items-center gap-2 w-24 group">
          <Volume2 size={18} className="text-gray-400" />
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-prambors-yellow"
          />
        </div>
      </div>
    </div>
  );
};

export default StickyPlayer;