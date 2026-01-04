import React, { useState, useRef, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import StickyPlayer from './components/StickyPlayer';
import NotificationModal from './components/NotificationModal';
import Home from './pages/Home';
import Live from './pages/Live';
import Interaction from './pages/Interaction';
import Podcast from './pages/Podcast';
import Programs from './pages/Programs';
import Top40 from './pages/Top40';
import News from './pages/News';
import About from './pages/About';
import Admin from './pages/Admin';
import Settings from './pages/Settings';
import Register from './pages/Register';
import Login from './pages/Login';
import { AudioProvider } from './context/AudioContext';
import { DataProvider, useData } from './context/DataContext';
import { Bell, Search, User, LogOut, Settings as SettingsIcon, Shield, LogIn } from 'lucide-react';

// Wrapper component to access useData inside Router context
const MainLayout: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { notifications, currentUser } = useData();
    const userMenuRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter(n => !n.read).length;

    // Handle click outside for User Menu
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };

        if (isUserMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isUserMenuOpen]);

    return (
        <div className="min-h-screen bg-black text-white flex font-sans selection:bg-prambors-yellow selection:text-black">
          {/* Sidebar Navigation */}
          <Sidebar />

          {/* Main Content Area */}
          <div className="flex-1 lg:ml-64 relative flex flex-col min-h-screen">
            
            {/* Top Bar */}
            <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-lg border-b border-white/5 px-6 py-4 flex justify-between items-center relative">
                <div className="lg:hidden">
                   {/* Mobile Logo */}
                   <span className="font-black italic text-xl tracking-tighter">PRAMBORS</span>
                </div>

                <div className="hidden lg:flex flex-1 max-w-md bg-gray-900 rounded-full px-4 py-2 items-center text-gray-400 focus-within:ring-2 focus-within:ring-prambors-yellow focus-within:text-white transition-all">
                    <Search size={18} />
                    <input type="text" placeholder="Cari artis, lagu, atau podcast..." className="bg-transparent border-none focus:outline-none ml-2 w-full text-sm" />
                </div>

                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                        className={`relative text-gray-400 hover:text-white transition-colors ${isNotificationOpen ? 'text-white' : ''}`}
                    >
                        <Bell size={20} />
                        {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] font-bold flex items-center justify-center text-white border-2 border-black">
                                {unreadCount}
                            </span>
                        )}
                    </button>
                    
                    {/* User Menu Dropdown */}
                    <div className="relative" ref={userMenuRef}>
                        <button 
                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            className="w-8 h-8 rounded-full bg-gradient-to-tr from-prambors-yellow to-yellow-600 flex items-center justify-center text-black font-bold text-sm hover:scale-110 transition-transform shadow-lg border border-yellow-500/50 overflow-hidden"
                        >
                            {currentUser.avatar ? (
                                <img src={currentUser.avatar} alt="User" className="w-full h-full object-cover" />
                            ) : (
                                <User size={16} />
                            )}
                        </button>

                        {isUserMenuOpen && (
                            <div className="absolute top-12 right-0 w-64 bg-gray-900 border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden animate-fade-in origin-top-right">
                                <div className="p-5 border-b border-white/10 bg-black/20">
                                    <div className="flex items-center gap-3">
                                         <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-prambors-yellow to-yellow-600 flex items-center justify-center text-black font-bold shrink-0 overflow-hidden">
                                            {currentUser.avatar ? (
                                                <img src={currentUser.avatar} alt="User" className="w-full h-full object-cover" />
                                            ) : (
                                                <User size={20} />
                                            )}
                                         </div>
                                         <div className="overflow-hidden">
                                            <p className="font-bold text-white truncate">{currentUser.name}</p>
                                            <p className="text-xs text-gray-400 truncate">{currentUser.email}</p>
                                         </div>
                                    </div>
                                </div>
                                <div className="p-2 space-y-1">
                                     <Link 
                                        to="/admin" 
                                        onClick={() => setIsUserMenuOpen(false)} 
                                        className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                                     >
                                        <Shield size={18} className="text-prambors-yellow" /> Admin Dashboard
                                     </Link>
                                     <Link 
                                        to="/settings"
                                        onClick={() => setIsUserMenuOpen(false)}
                                        className="w-full flex items-center gap-3 px-3 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors text-left"
                                     >
                                        <SettingsIcon size={18} /> Account Settings
                                     </Link>
                                     <div className="h-px bg-white/5 my-1"></div>
                                     <Link
                                        to="/login"
                                        onClick={() => setIsUserMenuOpen(false)}
                                        className="w-full flex items-center gap-3 px-3 py-3 text-sm font-bold text-white hover:bg-white/5 rounded-xl transition-colors text-left"
                                     >
                                        <LogIn size={18} /> Login
                                     </Link>
                                     <Link
                                        to="/register"
                                        onClick={() => setIsUserMenuOpen(false)}
                                        className="w-full flex items-center gap-3 px-3 py-3 text-sm font-bold text-prambors-yellow hover:bg-white/5 rounded-xl transition-colors text-left"
                                     >
                                        <User size={18} /> Register New Account
                                     </Link>
                                     <button 
                                        onClick={() => { alert('Logout berhasil!'); setIsUserMenuOpen(false); }} 
                                        className="w-full flex items-center gap-3 px-3 py-3 text-sm font-bold text-red-400 hover:bg-red-500/10 rounded-xl transition-colors text-left"
                                     >
                                        <LogOut size={18} /> Sign Out
                                     </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Notification Modal */}
                <NotificationModal isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />
            </header>

            {/* Page Content */}
            <main className="flex-1 p-4 md:p-8 overflow-y-auto pb-32">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/live" element={<Live />} />
                <Route path="/interaksi" element={<Interaction />} />
                <Route path="/podcast" element={<Podcast />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/charts" element={<Top40 />} />
                <Route path="/news" element={<News />} />
                <Route path="/about" element={<About />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>

              {/* Mobile Only Footer Credit */}
              <div className="mt-12 text-center lg:hidden pb-4 opacity-70">
                 <p className="text-[10px] text-gray-600">
                    Developed by <span className="font-bold text-gray-500">Indotech Digital Group</span>
                 </p>
              </div>
            </main>

            {/* Mobile Navigation */}
            <MobileNav onOpenMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />

            {/* Sticky Player */}
            <StickyPlayer />
          </div>
        </div>
    );
};

const App: React.FC = () => {
  return (
    <DataProvider>
    <AudioProvider>
      <Router>
         <MainLayout />
      </Router>
    </AudioProvider>
    </DataProvider>
  );
};

export default App;