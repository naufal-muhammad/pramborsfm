import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Radio, Mic, Music, Menu } from 'lucide-react';

const MobileNav: React.FC<{onOpenMenu: () => void}> = ({ onOpenMenu }) => {
  return (
    <div className="fixed bottom-24 left-4 right-4 bg-black/90 backdrop-blur-md rounded-2xl border border-white/10 lg:hidden z-40 flex justify-between items-center px-6 py-4 shadow-2xl">
      <NavLink to="/" className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-prambors-yellow' : 'text-gray-400'}`}>
        <Home size={20} />
      </NavLink>
      <NavLink to="/live" className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-prambors-yellow' : 'text-gray-400'}`}>
        <Radio size={20} />
      </NavLink>
      <div className="w-12 h-12 -mt-10 bg-prambors-yellow rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,205,0,0.5)] border-4 border-black">
        <NavLink to="/charts" className="text-black">
            <Music size={24} fill="black" />
        </NavLink>
      </div>
      <NavLink to="/podcast" className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-prambors-yellow' : 'text-gray-400'}`}>
        <Mic size={20} />
      </NavLink>
      <button onClick={onOpenMenu} className="text-gray-400">
        <Menu size={20} />
      </button>
    </div>
  );
};

export default MobileNav;