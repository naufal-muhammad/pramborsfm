import React from 'react';
import { useData } from '../context/DataContext';
import { useAudio } from '../context/AudioContext';
import { Play, Pause, TrendingUp, TrendingDown, Minus, Sparkles, Heart, Share2, Clock } from 'lucide-react';
import { Song, ChartItem } from '../types';

const Top40: React.FC = () => {
  const { playSong, isPlaying, currentSong, togglePlay } = useAudio();
  const { charts } = useData();

  const handlePlay = (song: Song) => {
    if (currentSong?.id === song.id) {
      togglePlay();
    } else {
      playSong(song);
    }
  };

  const handleVote = (songTitle: string) => {
    alert(`Vote masuk untuk "${songTitle}"! Makasih Kawula Muda.`);
  };

  const renderTrendIcon = (trend: ChartItem['trend']) => {
    switch (trend) {
      case 'up':
        return <div className="flex items-center gap-1 text-green-500"><TrendingUp size={16} /><span className="text-[10px] font-bold">UP</span></div>;
      case 'down':
        return <div className="flex items-center gap-1 text-red-500"><TrendingDown size={16} /><span className="text-[10px] font-bold">DOWN</span></div>;
      case 'new':
        return <div className="flex items-center gap-1 text-prambors-yellow"><Sparkles size={16} /><span className="text-[10px] font-bold">NEW</span></div>;
      default:
        return <div className="flex items-center gap-1 text-gray-500"><Minus size={16} /><span className="text-[10px] font-bold">SAME</span></div>;
    }
  };

  // Safe check if chart is empty
  if (charts.length === 0) return <div>No chart data available.</div>;

  const numberOne = charts[0];
  const restOfChart = charts.slice(1);

  return (
    <div className="animate-fade-in pb-12 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-2">
            PRAMBORS <span className="text-prambors-yellow">TOP 40</span>
        </h1>
        <p className="text-gray-400">Update tangga lagu paling hits se-Indonesia minggu ini.</p>
      </div>

      {/* Number One Spot */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-prambors-yellow/20 to-black border border-prambors-yellow/30">
        <div className="absolute top-0 right-0 p-8 opacity-10 font-black text-9xl text-white select-none">#1</div>
        <div className="p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="w-full md:w-64 aspect-square shrink-0 relative group">
                <img src={numberOne.song.coverUrl} alt={numberOne.song.title} className="w-full h-full object-cover rounded-2xl shadow-[0_0_30px_rgba(255,205,0,0.2)]" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                    <button 
                        onClick={() => handlePlay(numberOne.song)}
                        className="w-16 h-16 bg-prambors-yellow rounded-full flex items-center justify-center text-black shadow-xl hover:scale-110 transition-transform"
                    >
                        {isPlaying && currentSong?.id === numberOne.song.id ? (
                            <Pause size={28} fill="black" />
                        ) : (
                            <Play size={28} fill="black" className="ml-1" />
                        )}
                    </button>
                </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-prambors-yellow text-black px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wider mb-4">
                    <span className="animate-pulse">●</span> Champion of the Week
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-2 leading-tight">{numberOne.song.title}</h2>
                <h3 className="text-xl md:text-2xl text-gray-300 mb-6 font-medium">{numberOne.song.artist}</h3>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                    <button 
                         onClick={() => handlePlay(numberOne.song)}
                         className="bg-prambors-yellow text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform"
                    >
                        {isPlaying && currentSong?.id === numberOne.song.id ? <Pause size={20} fill="black"/> : <Play size={20} fill="black"/>}
                        Putar Lagu
                    </button>
                    <button 
                        onClick={() => handleVote(numberOne.song.title)}
                        className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded-full font-bold hover:bg-white/20 transition-all flex items-center gap-2"
                    >
                        <Heart size={20} className="text-red-500" fill="currentColor" /> Vote Stay
                    </button>
                </div>
            </div>
        </div>
      </div>

      {/* Chart List */}
      <div className="bg-prambors-gray rounded-3xl border border-white/5 overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:flex items-center px-6 py-4 border-b border-white/5 text-gray-400 text-xs font-bold uppercase tracking-wider">
            <div className="w-16 text-center">Rank</div>
            <div className="w-24">Trend</div>
            <div className="flex-1">Song</div>
            <div className="w-24 text-center">Time</div>
            <div className="w-32 text-center">Actions</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-white/5">
            {restOfChart.map((item) => (
                <div key={item.song.id} className="flex flex-col md:flex-row items-center p-4 md:px-6 md:py-3 hover:bg-white/5 transition-colors group">
                    
                    {/* Rank & Trend Mobile */}
                    <div className="flex md:hidden items-center justify-between w-full mb-3">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl font-black text-prambors-yellow italic w-8">{item.rank}</span>
                             {renderTrendIcon(item.trend)}
                        </div>
                        <span className="text-xs font-bold text-gray-500">{item.song.duration}</span>
                    </div>

                    {/* Rank Desktop */}
                    <div className="hidden md:block w-16 text-center font-black text-2xl text-gray-300 italic group-hover:text-prambors-yellow transition-colors">
                        {item.rank}
                    </div>

                    {/* Trend Desktop */}
                    <div className="hidden md:block w-24">
                        {renderTrendIcon(item.trend)}
                    </div>

                    {/* Song Info */}
                    <div className="flex-1 flex items-center gap-4 w-full md:w-auto">
                         <div className="relative w-14 h-14 shrink-0">
                            <img src={item.song.coverUrl} alt={item.song.title} className="w-full h-full object-cover rounded-lg" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                                <button onClick={() => handlePlay(item.song)} className="text-white hover:scale-110 transition-transform">
                                     {isPlaying && currentSong?.id === item.song.id ? <Pause size={20} /> : <Play size={20} />}
                                </button>
                            </div>
                         </div>
                         <div className="min-w-0">
                            <h4 className={`font-bold text-lg truncate ${isPlaying && currentSong?.id === item.song.id ? 'text-prambors-yellow' : 'text-white'}`}>
                                {item.song.title}
                            </h4>
                            <p className="text-sm text-gray-400 truncate">{item.song.artist}</p>
                         </div>
                    </div>

                    {/* Duration Desktop */}
                    <div className="hidden md:flex w-24 justify-center items-center text-sm text-gray-500 gap-1">
                        <Clock size={14} /> {item.song.duration}
                    </div>

                    {/* Actions */}
                    <div className="w-full md:w-32 flex items-center justify-end md:justify-center gap-3 mt-3 md:mt-0">
                        <button 
                            onClick={() => handleVote(item.song.title)}
                            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-500/20 hover:text-red-500 transition-colors text-gray-400" 
                            title="Vote"
                        >
                            <Heart size={18} />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20 transition-colors text-gray-400">
                            <Share2 size={18} />
                        </button>
                        <button 
                            onClick={() => handlePlay(item.song)}
                            className="md:hidden w-10 h-10 rounded-full bg-prambors-yellow text-black flex items-center justify-center"
                        >
                             {isPlaying && currentSong?.id === item.song.id ? <Pause size={18} fill="black" /> : <Play size={18} fill="black" className="ml-1" />}
                        </button>
                    </div>

                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Top40;