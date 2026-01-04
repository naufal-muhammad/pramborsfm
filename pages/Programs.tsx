import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Clock, User, Bell, ChevronRight } from 'lucide-react';

const Programs: React.FC = () => {
  const { shows } = useData();
  const [activeDay, setActiveDay] = useState('All');
  const days = ['All', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

  // Handle empty state
  if (shows.length === 0) {
      return <div className="p-8 text-center text-gray-500">Belum ada program yang ditambahkan.</div>;
  }

  const featuredShow = shows[0];

  const handleRemind = (title: string) => {
    alert(`Reminder set for ${title}! We'll verify your schedule.`);
  };

  return (
    <div className="animate-fade-in pb-12 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
            <h1 className="text-4xl font-black mb-2 uppercase italic tracking-tighter">Programs & Shows</h1>
            <p className="text-gray-400 max-w-lg">
                Jadwal lengkap siaran Prambors FM. Jangan sampai ketinggalan acara favorit bareng penyiar kesayangan lo!
            </p>
        </div>
      </div>

      {/* Featured Show Card */}
      <div className="relative rounded-3xl overflow-hidden bg-gray-900 border border-white/10 group cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
        <img 
            src={featuredShow.imageUrl} 
            alt={featuredShow.title} 
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
        />
        
        <div className="relative z-20 p-6 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-end h-full min-h-[300px]">
            <div className="space-y-4 max-w-2xl">
                <span className="inline-block px-3 py-1 bg-prambors-yellow text-black text-xs font-bold rounded-full uppercase tracking-wider">
                    Featured Show
                </span>
                <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                    {featuredShow.title}
                </h2>
                <div className="flex items-center gap-4 text-gray-300 font-medium">
                    <span className="flex items-center gap-2"><User size={18} /> {featuredShow.host}</span>
                    <span className="flex items-center gap-2"><Clock size={18} /> {featuredShow.time}</span>
                </div>
                <p className="text-gray-300 text-lg line-clamp-2">{featuredShow.description}</p>
            </div>
            
            <button className="bg-prambors-yellow text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform mt-6 md:mt-0 shadow-[0_0_20px_rgba(255,205,0,0.3)]">
                Lihat Detail <ChevronRight size={20} />
            </button>
        </div>
      </div>

      {/* Schedule Grid */}
      <div>
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {days.map(day => (
                <button
                    key={day}
                    onClick={() => setActiveDay(day)}
                    className={`px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                        activeDay === day
                        ? 'bg-white text-black'
                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                >
                    {day}
                </button>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shows.slice(1).map(show => (
                <div key={show.id} className="bg-prambors-gray rounded-2xl p-5 border border-white/5 hover:border-prambors-yellow/50 transition-all group flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                             <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10">
                                <img src={show.imageUrl} alt={show.host} className="w-full h-full object-cover" />
                             </div>
                             <div>
                                <h3 className="font-bold text-lg leading-none mb-1 group-hover:text-prambors-yellow transition-colors">{show.title}</h3>
                                <p className="text-xs text-gray-400">{show.host}</p>
                             </div>
                        </div>
                        <button onClick={() => handleRemind(show.title)} className="text-gray-500 hover:text-white"><Bell size={18} /></button>
                    </div>
                    
                    <p className="text-sm text-gray-400 mb-6 flex-1 line-clamp-2">
                        {show.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                         <div className="flex items-center gap-2 text-xs font-bold text-prambors-yellow bg-white/5 px-3 py-1.5 rounded-lg">
                            <Clock size={14} /> {show.time}
                         </div>
                         <button className="text-xs font-bold text-gray-400 hover:text-white flex items-center gap-1">
                            More Info <ChevronRight size={14} />
                         </button>
                    </div>
                </div>
            ))}
        </div>
      </div>

    </div>
  );
};

export default Programs;