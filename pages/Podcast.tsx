import React, { useState } from 'react';
import { Play, Pause, Clock, Heart, Share2, Filter } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAudio } from '../context/AudioContext';
import { PodcastEpisode } from '../types';

const Podcast: React.FC = () => {
  const { podcasts } = useData();
  const { playSong, isPlaying, currentSong, togglePlay } = useAudio();
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (podcasts.length === 0) {
      return <div className="p-8 text-center text-gray-500">Belum ada podcast yang tersedia.</div>;
  }

  const categories = ['All', ...Array.from(new Set(podcasts.map(p => p.category)))];

  const filteredPodcasts = selectedCategory === 'All' 
    ? podcasts 
    : podcasts.filter(p => p.category === selectedCategory);

  const featuredPodcast = podcasts[0]; // Assume the first one is featured

  const handlePlayPodcast = (podcast: PodcastEpisode) => {
    if (currentSong?.id === podcast.id) {
      togglePlay();
    } else {
      // Use uploaded audioUrl if available, otherwise fallback to a sample
      const audioSource = podcast.audioUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
      
      playSong({
        id: podcast.id,
        title: podcast.title,
        artist: `Prambors ${podcast.category}`,
        coverUrl: podcast.imageUrl,
        duration: podcast.duration,
        audioUrl: audioSource
      });
    }
  };

  return (
    <div className="animate-fade-in space-y-8 pb-12">
      
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-prambors-gray border border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-[url('https://picsum.photos/id/338/1200/600')] bg-cover bg-center opacity-50"></div>
        
        <div className="relative z-20 p-6 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/3 max-w-[300px] aspect-square rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10">
                <img src={featuredPodcast.imageUrl} alt={featuredPodcast.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 text-center md:text-left">
                <span className="inline-block px-3 py-1 bg-white/10 text-prambors-yellow text-xs font-bold rounded-full mb-4 uppercase tracking-wider backdrop-blur-md">
                    Featured Podcast
                </span>
                <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                    {featuredPodcast.title}
                </h1>
                <p className="text-gray-300 text-lg mb-6 max-w-xl">
                    Dengerin episode terbaru yang lagi trending minggu ini. Obrolan seru yang bikin harimu makin berwarna!
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                     <button 
                        onClick={() => handlePlayPodcast(featuredPodcast)}
                        className="bg-prambors-yellow text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,205,0,0.3)]"
                     >
                        {isPlaying && currentSong?.id === featuredPodcast.id ? (
                            <><Pause size={20} fill="black" /> Pause Episode</>
                        ) : (
                            <><Play size={20} fill="black" /> Play Episode</>
                        )}
                    </button>
                    <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors text-white">
                        <Heart size={20} />
                    </button>
                    <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors text-white">
                        <Share2 size={20} />
                    </button>
                </div>
            </div>
        </div>
      </section>

      {/* Filter & List */}
      <section>
        <div className="flex items-center justify-between mb-6 overflow-x-auto pb-2">
            <div className="flex items-center gap-2">
                <Filter size={18} className="text-prambors-yellow mr-2" />
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                            selectedCategory === cat 
                            ? 'bg-white text-black' 
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPodcasts.map(podcast => (
                <div key={podcast.id} className="bg-prambors-gray rounded-2xl p-4 hover:bg-white/5 transition-all group border border-transparent hover:border-white/10 flex flex-col h-full">
                    <div className="relative aspect-square mb-4 rounded-xl overflow-hidden shadow-lg">
                        <img src={podcast.imageUrl} alt={podcast.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                             <button 
                                onClick={() => handlePlayPodcast(podcast)}
                                className="w-14 h-14 bg-prambors-yellow rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                             >
                                {isPlaying && currentSong?.id === podcast.id ? (
                                    <Pause size={24} fill="black" className="text-black" />
                                ) : (
                                    <Play size={24} fill="black" className="text-black ml-1" />
                                )}
                             </button>
                        </div>
                        
                        <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded font-bold">
                            {podcast.duration}
                        </span>
                    </div>
                    
                    <div className="flex-1 flex flex-col">
                        <div className="text-xs font-bold text-prambors-yellow mb-1 uppercase tracking-wider">{podcast.category}</div>
                        <h3 className="font-bold text-lg leading-tight mb-2 text-white line-clamp-2 group-hover:text-prambors-yellow transition-colors cursor-pointer">
                            {podcast.title}
                        </h3>
                        <div className="mt-auto pt-4 flex items-center justify-between text-gray-400 text-xs border-t border-white/5">
                            <span className="flex items-center gap-1"><Clock size={12} /> {podcast.date}</span>
                            <button className="hover:text-white"><Share2 size={14} /></button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Podcast;