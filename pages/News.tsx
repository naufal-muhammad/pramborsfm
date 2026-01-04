import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Calendar, Hash, ArrowRight, TrendingUp } from 'lucide-react';

const News: React.FC = () => {
  const { news: newsData } = useData();
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Extract categories dynamically
  const categories = ['All', ...Array.from(new Set(newsData.map(n => n.category)))];

  // Logic to separate Headline (First item) vs List
  const headlineNews = newsData.length > 0 ? newsData[0] : null;
  
  // Filter for the grid list (excluding headline if category is 'All', otherwise just filter by category)
  const newsList = newsData.filter((news, index) => {
    if (activeCategory === 'All') return index !== 0; // Skip headline in 'All' view
    return news.category === activeCategory;
  });

  if (newsData.length === 0) {
      return (
          <div className="text-center py-20">
              <h2 className="text-2xl font-bold">Belum ada berita.</h2>
              <p className="text-gray-400">Cek kembali nanti ya, Kawula Muda!</p>
          </div>
      )
  }

  return (
    <div className="animate-fade-in pb-12 space-y-10">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
            <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-2 text-white">
                NEWS & <span className="text-prambors-yellow">ENTERTAINMENT</span>
            </h1>
            <p className="text-gray-400">Berita paling hits seputar musik, film, dan gaya hidup anak muda.</p>
        </div>
      </div>

      {/* Featured Headline Section */}
      {headlineNews && (activeCategory === 'All' || headlineNews.category === activeCategory) && (
        <section className="relative h-[450px] rounded-3xl overflow-hidden group cursor-pointer border border-white/5">
            <div className="absolute inset-0 bg-gray-900">
                <img 
                    src={headlineNews.imageUrl} 
                    alt={headlineNews.title} 
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 p-6 md:p-12 max-w-4xl">
                <span className="inline-block px-3 py-1 bg-prambors-yellow text-black text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                    Breaking News
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight group-hover:text-prambors-yellow transition-colors">
                    {headlineNews.title}
                </h2>
                <p className="text-gray-200 text-lg md:text-xl line-clamp-2 mb-6">
                    {headlineNews.excerpt}
                </p>
                <button className="flex items-center gap-2 font-bold text-white group-hover:gap-4 transition-all">
                    Baca Selengkapnya <ArrowRight size={20} className="text-prambors-yellow" />
                </button>
            </div>
        </section>
      )}

      {/* Content Area */}
      <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
        
        {/* Main News Column */}
        <div className="flex-1">
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
                <Hash size={20} className="text-prambors-yellow shrink-0" />
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                            activeCategory === cat
                            ? 'bg-white text-black'
                            : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {newsList.map(news => (
                    <div key={news.id} className="group cursor-pointer flex flex-col h-full bg-prambors-gray rounded-2xl overflow-hidden border border-transparent hover:border-white/10 transition-all hover:bg-white/5">
                        <div className="aspect-video overflow-hidden">
                            <img 
                                src={news.imageUrl} 
                                alt={news.title} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                            />
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-[10px] font-bold bg-white/10 text-prambors-yellow px-2 py-1 rounded uppercase tracking-wide">
                                    {news.category}
                                </span>
                                <span className="text-[10px] text-gray-500 flex items-center gap-1">
                                    <Calendar size={10} /> {news.date}
                                </span>
                            </div>
                            <h3 className="font-bold text-xl leading-tight text-white mb-3 group-hover:text-prambors-yellow transition-colors">
                                {news.title}
                            </h3>
                            <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
                                {news.excerpt}
                            </p>
                            <div className="pt-4 border-t border-white/5 mt-auto">
                                <span className="text-sm font-bold text-gray-400 group-hover:text-white flex items-center gap-2 transition-colors">
                                    Read More <ArrowRight size={16} />
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {newsList.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    <p>Belum ada berita di kategori ini.</p>
                </div>
            )}
        </div>

        {/* Sidebar (Trending) */}
        <div className="w-full lg:w-80 shrink-0 space-y-8">
            <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-3xl border border-white/10 sticky top-24">
                <h3 className="text-xl font-black italic mb-6 flex items-center gap-2">
                    <TrendingUp className="text-prambors-yellow" /> TRENDING NOW
                </h3>
                <div className="space-y-6">
                    {newsData.slice(1, 5).map((news, idx) => (
                        <div key={news.id} className="flex gap-4 group cursor-pointer">
                            <span className="text-3xl font-black text-white/10 group-hover:text-prambors-yellow transition-colors italic">
                                {idx + 1}
                            </span>
                            <div>
                                <h4 className="font-bold text-sm leading-snug text-white group-hover:text-gray-300 transition-colors mb-1">
                                    {news.title}
                                </h4>
                                <span className="text-[10px] text-prambors-yellow font-bold uppercase">{news.category}</span>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/10">
                    <h4 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">Popular Tags</h4>
                    <div className="flex flex-wrap gap-2">
                        {['#ColdplayJakarta', '#NewJeans', '#Viral', '#ResepAnakKos', '#FilmBaru', '#Zodiac'].map(tag => (
                            <span key={tag} className="text-xs bg-white/5 hover:bg-white/20 px-3 py-1 rounded-full cursor-pointer transition-colors text-gray-300">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default News;