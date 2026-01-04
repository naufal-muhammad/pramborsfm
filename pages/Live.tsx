import React from 'react';
import { Clock, User, Play, Pause, Bell } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { useData } from '../context/DataContext';
import { Song } from '../types';

const Live: React.FC = () => {
  const { shows } = useData();
  const { playSong, isPlaying, isLive, currentSong, togglePlay } = useAudio();

  // Handle case where no shows exist
  if (shows.length === 0) {
    return (
        <div className="animate-fade-in pb-12 text-center pt-20">
             <h1 className="text-3xl font-black mb-2">LIVE RADIO</h1>
             <p className="text-gray-500">Jadwal siaran belum tersedia.</p>
        </div>
    );
  }

  // Assuming the first show is the current live show for this demo
  const currentShow = shows[0];

  const handlePlayLive = () => {
    // If currently listening to the live stream, toggle play/pause
    if (isLive && currentSong?.id === 'live-stream') {
        togglePlay();
        return;
    }

    // Otherwise, start the live stream
    const liveStreamSong: Song = {
      id: 'live-stream',
      title: currentShow.title,
      artist: `Host: ${currentShow.host}`,
      coverUrl: currentShow.imageUrl,
      duration: 'Live'
    };
    playSong(liveStreamSong);
  };

  const handleSetReminder = (showTitle: string) => {
    // Mock notification functionality
    alert(`Reminder set! We'll notify you when "${showTitle}" starts.`);
  };

  return (
    <div className="animate-fade-in pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black mb-2">LIVE RADIO</h1>
        <p className="text-gray-400">Jadwal siaran hari ini di Prambors FM.</p>
      </div>

      <div className="space-y-4 relative">
        {/* Vertical timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-800 hidden md:block"></div>
        
        {shows.map((show, index) => {
            const isNowPlaying = index === 0; // Simulate first item is always current

            return (
            <div key={show.id} className={`relative flex flex-col md:flex-row gap-6 p-6 rounded-2xl border transition-colors group ${isNowPlaying ? 'bg-gradient-to-r from-prambors-gray to-gray-900 border-prambors-yellow/50' : 'bg-prambors-gray border-white/5 hover:border-white/20'}`}>
                
                {/* Timeline Dot */}
                <div className={`absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full -ml-[5px] hidden md:block shadow-[0_0_10px_#FFCD00] ${isNowPlaying ? 'bg-red-500 animate-pulse' : 'bg-gray-600'}`}></div>
                
                <div className="w-full md:w-48 shrink-0 relative">
                    <img src={show.imageUrl} alt={show.title} className={`w-full aspect-video md:aspect-square object-cover rounded-xl shadow-lg transition-all duration-300 ${isNowPlaying ? '' : 'grayscale group-hover:grayscale-0'}`} />
                    {isNowPlaying && (
                        <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded animate-pulse shadow-md">
                            ON AIR
                        </div>
                    )}
                </div>
                
                <div className="flex-1 flex flex-col justify-center">
                    <div className={`flex items-center gap-2 font-bold mb-2 ${isNowPlaying ? 'text-prambors-yellow' : 'text-gray-400'}`}>
                        <Clock size={16} />
                        <span>{show.time}</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-white">{show.title}</h2>
                    <p className="text-gray-400 mb-4">{show.description}</p>
                    
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                             <User size={14} className="text-gray-400" />
                        </div>
                        <span className="text-sm font-medium">{show.host}</span>
                    </div>
                </div>

                <div className="flex items-center justify-center md:justify-end min-w-[140px] mt-4 md:mt-0">
                    {isNowPlaying ? (
                         <button 
                            onClick={handlePlayLive}
                            className={`w-full md:w-auto px-6 py-3 font-bold rounded-full uppercase text-xs tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-105 ${
                                isLive && isPlaying && currentSong?.id === 'live-stream' 
                                ? 'bg-prambors-yellow text-black shadow-[0_0_20px_rgba(255,205,0,0.5)]' 
                                : 'bg-white text-black hover:bg-gray-200'
                            }`}
                         >
                            {isLive && isPlaying && currentSong?.id === 'live-stream' ? (
                                <><Pause size={16} fill="black"/> Pause</>
                            ) : (
                                <><Play size={16} fill="black"/> Listen Live</>
                            )}
                         </button>
                    ) : (
                        <button 
                            onClick={() => handleSetReminder(show.title)}
                            className="w-full md:w-auto px-6 py-3 bg-white/5 text-white font-bold rounded-full hover:bg-white/10 uppercase text-xs tracking-wider flex items-center justify-center gap-2 border border-white/10 hover:border-white/30 transition-all"
                        >
                            <Bell size={16} /> Set Reminder
                        </button>
                    )}
                </div>
            </div>
            );
        })}
      </div>
    </div>
  );
};

export default Live;