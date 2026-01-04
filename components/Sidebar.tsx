import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Radio, Mic, Music, Calendar, Newspaper, MessageCircle, Info, Settings } from 'lucide-react';
import { useData } from '../context/DataContext';

const Sidebar: React.FC = () => {
  const { branding } = useData();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Radio, label: 'Live Radio', path: '/live' },
    { icon: Mic, label: 'Podcast', path: '/podcast' },
    { icon: Calendar, label: 'Programs', path: '/programs' },
    { icon: Music, label: 'Top 40', path: '/charts' },
    { icon: Newspaper, label: 'News', path: '/news' },
    { icon: MessageCircle, label: 'Interaksi', path: '/interaksi' },
    { icon: Info, label: 'About', path: '/about' },
  ];

  return (
    <div className="hidden lg:flex flex-col w-64 bg-black h-screen fixed left-0 top-0 border-r border-white/10 z-40 pb-28 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
            {branding.logoUrl ? (
                 <img src={branding.logoUrl} alt={branding.siteTitle} className="h-10 object-contain" />
            ) : (
                <div className="w-10 h-10 bg-prambors-yellow rounded-full flex items-center justify-center font-black text-black text-xl italic shrink-0">
                    {branding.siteTitle.charAt(0)}
                </div>
            )}
            
            <div className="overflow-hidden">
                <h1 className="text-xl font-bold italic tracking-tighter text-white truncate">{branding.siteTitle}</h1>
                <p className="text-[10px] text-prambors-yellow tracking-widest uppercase font-bold truncate">Indonesia No.1</p>
            </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-prambors-yellow text-black font-bold shadow-[0_0_15px_rgba(255,205,0,0.3)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <item.icon size={20} className="group-hover:scale-110 transition-transform" />
              <span>{item.label}</span>
            </NavLink>
          ))}
          
          <div className="pt-4 mt-4 border-t border-white/10">
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-gray-800 text-prambors-yellow font-bold'
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <Settings size={20} className="group-hover:rotate-90 transition-transform" />
              <span>Admin Panel</span>
            </NavLink>
          </div>
        </nav>
      </div>

      <div className="mt-auto px-6 mb-4">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 text-center border border-white/5 mb-6">
            <h3 className="font-bold text-white mb-1">Prambors Apps</h3>
            <p className="text-xs text-gray-400 mb-3">Dengerin lebih gampang di HP lo!</p>
            <button className="w-full bg-white text-black py-2 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors">
                Download Now
            </button>
        </div>

        <div className="text-center space-y-1">
            <p className="text-[10px] text-gray-600">
                &copy; {new Date().getFullYear()} Prambors FM
            </p>
            <p className="text-[10px] text-gray-600">
                Developed by <span className="font-bold text-gray-500 hover:text-prambors-yellow transition-colors cursor-default">Indotech Digital Group</span>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;