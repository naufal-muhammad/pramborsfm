import React from 'react';
import { Play, TrendingUp, Calendar, ChevronRight, Pause } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { Song } from '../types';

const Home: React.FC = () => {
  const { togglePlay, isPlaying, playSong, currentSong } = useAudio();
  const { news, charts, podcasts, homeData } = useData();

  // Get Top 4 items dynamically
  const topChart = charts.slice(0, 4);
  const latestNews = news.slice(0, 6);
  const trendingPodcasts = podcasts.slice(0, 3);

  const HERO_AUDIO_ID = 'hero-audio-stream';

  const handleHeroPlay = () => {
    // Check if the current song is the hero audio
    if (currentSong?.id === HERO_AUDIO_ID) {
        togglePlay();
        return;
    }
    
    // Construct a song object for the hero audio
    const heroSong: Song = {
        id: HERO_AUDIO_ID,
        title: homeData.hero.title,
        artist: 'Prambors FM Special',
        coverUrl: homeData.hero.bgImage,
        duration: 'Promo',
        audioUrl: homeData.hero.audioUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' // Fallback
    };
    
    playSong(heroSong);
  };

  const isHeroPlaying = isPlaying && currentSong?.id === HERO_AUDIO_ID;

  return (
    <div className="space-y-10 pb-12 animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[400px] rounded-3xl overflow-hidden group">
        <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url('${homeData.hero.bgImage}')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full max-w-3xl">
          <span className="inline-block px-3 py-1 bg-prambors-yellow text-black text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
            {homeData.hero.tagline}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-2 leading-tight">
            {homeData.hero.title}
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-6 font-medium">
            {homeData.hero.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={handleHeroPlay}
              className="bg-prambors-yellow text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,205,0,0.4)]"
            >
              {isHeroPlaying ? (
                  <span className="flex items-center gap-2">
                      <Pause size={20} fill="black" /> Pause
                  </span>
              ) : (
                  <>
                      <Play size={20} fill="black" /> {homeData.hero.ctaText}
                  </>
              )}
            </button>
            <Link to="/programs" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-3 rounded-full font-bold hover:bg-white/20 transition-colors">
              Lihat Jadwal
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Podcasts */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="text-prambors-yellow" /> Trending Podcast
          </h2>
          <Link to="/podcast" className="text-sm font-semibold text-gray-400 hover:text-white flex items-center gap-1">
            Lihat Semua <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trendingPodcasts.map((pod) => (
            <div key={pod.id} className="bg-prambors-gray rounded-2xl p-4 hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/10">
              <div className="relative aspect-square mb-4 rounded-xl overflow-hidden">
                <img src={pod.imageUrl} alt={pod.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <button className="absolute bottom-3 right-3 w-10 h-10 bg-prambors-yellow rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                  <Play size={18} fill="black" className="ml-1 text-black" />
                </button>
                <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded font-bold">
                    {pod.category}
                </span>
              </div>
              <h3 className="font-bold text-lg mb-1 line-clamp-1 group-hover:text-prambors-yellow transition-colors">{pod.title}</h3>
              <p className="text-gray-400 text-sm">{pod.date} • {pod.duration}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top 5 Chart Preview */}
      <section className="bg-gradient-to-r from-prambors-gray to-black rounded-3xl p-6 md:p-10 border border-white/5">
        <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-1/3">
                <h2 className="text-3xl font-black mb-4">PRAMBORS <br/><span className="text-prambors-yellow">TOP 40</span></h2>
                <p className="text-gray-400 mb-6">Deretan lagu paling hits minggu ini yang wajib masuk playlist lo.</p>
                <Link to="/charts" className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all font-bold">
                    Lihat Full Chart
                </Link>
            </div>
            <div className="w-full md:w-2/3 space-y-3">
                {topChart.map((item) => (
                    <div key={item.song.id} className="flex items-center bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-colors group">
                        <span className="w-8 text-center font-black text-2xl text-prambors-yellow italic">{item.rank}</span>
                        <img src={item.song.coverUrl} className="w-12 h-12 rounded-lg ml-4 object-cover" alt="cover"/>
                        <div className="ml-4 flex-1">
                            <h4 className="font-bold group-hover:text-prambors-yellow transition-colors">{item.song.title}</h4>
                            <p className="text-xs text-gray-400">{item.song.artist}</p>
                        </div>
                        <div className="text-gray-500 text-sm hidden sm:block">{item.song.duration}</div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Latest News */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="text-prambors-yellow" /> Latest Updates
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestNews.map(news => (
                <div key={news.id} className="flex gap-4 group cursor-pointer">
                    <div className="w-32 h-32 shrink-0 rounded-xl overflow-hidden">
                        <img src={news.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={news.title}/>
                    </div>
                    <div>
                        <span className="text-xs text-prambors-yellow font-bold uppercase">{news.category}</span>
                        <h3 className="font-bold text-lg leading-tight mt-1 mb-2 group-hover:text-gray-300 transition-colors">{news.title}</h3>
                        <p className="text-xs text-gray-500">{news.date}</p>
                    </div>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Home;