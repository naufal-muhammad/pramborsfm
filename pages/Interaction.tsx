import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Smile, Music2, X, BarChart2, MessageSquare, MoreVertical, Crown, User } from 'lucide-react';
import { useData } from '../context/DataContext';
import { MOCK_VOTING } from '../constants';
import { ChatMessage } from '../types';

const Interaction: React.FC = () => {
  const { poll, chatMessages, sendChatMessage } = useData();
  
  const [input, setInput] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Request Form State
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [requestData, setRequestData] = useState({ artist: '', title: '', message: '' });

  // Voting & Poll State
  const [votedSongs, setVotedSongs] = useState<string[]>([]);
  const [hasPolled, setHasPolled] = useState(false);
  const [pollResults, setPollResults] = useState(poll.options);

  // Sync local poll results with context when context changes (Admin Update)
  useEffect(() => {
    setPollResults(poll.options);
    setHasPolled(false);
  }, [poll]);

  // Auto scroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const now = new Date();
    const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const newMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        userId: 'current-user',
        userName: 'You', // Hardcoded for demo
        userAvatar: 'https://ui-avatars.com/api/?name=You&background=FFCD00&color=000',
        text: input,
        timestamp: timeString,
        role: 'user'
    };

    sendChatMessage(newMessage);
    setInput('');
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Request terkirim! ${requestData.title} by ${requestData.artist}`);
    setIsRequestOpen(false);
    setRequestData({ artist: '', title: '', message: '' });
  };

  const handleVote = (id: string) => {
    if (votedSongs.includes(id)) return;
    setVotedSongs([...votedSongs, id]);
  };

  const handlePollVote = (optionId: string) => {
    if (hasPolled) return;
    const updatedOptions = pollResults.map(opt => 
      opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
    );
    setPollResults(updatedOptions);
    setHasPolled(true);
  };

  const totalPollVotes = pollResults.reduce((acc, curr) => acc + curr.votes, 0);

  return (
    <div className="flex flex-col md:flex-row gap-6 animate-fade-in pb-12 h-[calc(100vh-140px)]">
        
        {/* Left Column: Live Chat */}
        <div className="flex-1 bg-prambors-gray rounded-3xl overflow-hidden flex flex-col border border-white/10 relative">
            <div className="p-4 bg-gray-900 border-b border-white/10 flex justify-between items-center z-10 shadow-md">
                <div>
                    <h2 className="font-black text-xl flex items-center gap-2 italic">LIVE CHAT <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"/></h2>
                    <p className="text-xs text-gray-400">Ngobrol seru bareng penyiar & Kawula Muda lain!</p>
                </div>
                <div className="flex -space-x-2">
                    {[1,2,3].map(i => <div key={i} className={`w-8 h-8 rounded-full border-2 border-gray-900 bg-gray-700`}></div>)}
                    <div className="w-8 h-8 rounded-full border-2 border-gray-900 bg-prambors-yellow text-black flex items-center justify-center text-xs font-bold">+99</div>
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-6" ref={chatContainerRef}>
                {chatMessages.map((msg) => {
                    const isMe = msg.userId === 'current-user';
                    const isAdmin = msg.role === 'admin' || msg.role === 'host';
                    
                    return (
                        <div key={msg.id} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                            {/* Avatar */}
                            <div className="shrink-0 flex flex-col items-center">
                                <img src={msg.userAvatar} alt={msg.userName} className="w-10 h-10 rounded-full border border-white/10 object-cover" />
                                {isAdmin && (
                                    <span className="bg-prambors-yellow text-black text-[9px] font-bold px-1.5 py-0.5 rounded-full -mt-2 z-10 border border-black flex items-center gap-0.5">
                                        <Crown size={8} /> {msg.role === 'host' ? 'HOST' : 'ADMIN'}
                                    </span>
                                )}
                            </div>

                            <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[80%]`}>
                                 <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-[11px] font-bold ${isAdmin ? 'text-prambors-yellow' : 'text-gray-300'}`}>{msg.userName}</span>
                                    <span className="text-[10px] text-gray-600">{msg.timestamp}</span>
                                 </div>
                                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-lg relative ${
                                    isMe
                                    ? 'bg-prambors-yellow text-black rounded-tr-none font-medium'
                                    : isAdmin 
                                        ? 'bg-gray-800 text-white border border-prambors-yellow/50 shadow-[0_0_10px_rgba(255,205,0,0.1)]'
                                        : 'bg-white/10 text-white rounded-tl-none border border-white/5'
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <form onSubmit={handleSend} className="p-4 bg-gray-900 border-t border-white/10 flex gap-3 items-center">
                <button type="button" className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                    <Mic size={20} />
                </button>
                <div className="flex-1 relative">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Kirim pesan..." 
                        className="w-full bg-gray-800 text-white rounded-full pl-5 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-prambors-yellow placeholder-gray-500 text-sm"
                    />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-prambors-yellow">
                        <Smile size={20} />
                    </button>
                </div>
                <button type="submit" className="w-10 h-10 flex items-center justify-center bg-prambors-yellow text-black rounded-full hover:scale-110 transition-transform shadow-lg disabled:opacity-50" disabled={!input.trim()}>
                    <Send size={18} className="ml-0.5" />
                </button>
            </form>
        </div>

        {/* Right Column: Interaction Widgets */}
        <div className="w-full md:w-80 flex flex-col gap-6 overflow-y-auto pr-1">
            
            {/* 1. Request Song Widget */}
            <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-6 relative overflow-hidden group shadow-xl border border-white/10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
                <Music2 className="absolute -right-4 -bottom-4 text-white/10 w-32 h-32 group-hover:scale-110 transition-transform duration-500" />
                
                <h3 className="font-black text-xl mb-1 italic">REQUEST LAGU</h3>
                <p className="text-xs text-indigo-200 mb-4 leading-relaxed">Lagu favorit lo belum diputer? Request sekarang biar didenger penyiar!</p>
                
                <button 
                    onClick={() => setIsRequestOpen(true)}
                    className="w-full bg-white text-indigo-900 font-bold py-3 rounded-xl hover:bg-indigo-50 transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                    <Music2 size={16} /> Kirim Request
                </button>
            </div>

            {/* 2. Voting Widget */}
            <div className="bg-gray-900 rounded-3xl p-6 border border-white/5">
                <h3 className="font-black text-white mb-4 flex items-center gap-2">
                    <BarChart2 className="text-prambors-yellow" size={20} /> CALON JUARA
                </h3>
                <div className="space-y-3">
                    {MOCK_VOTING.map((song, idx) => (
                         <div key={song.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group">
                            <div className="flex items-center gap-3 overflow-hidden">
                                <span className="font-black text-prambors-yellow text-lg w-4">{idx + 1}</span>
                                <div className="min-w-0">
                                    <p className="font-bold text-sm truncate text-white group-hover:text-prambors-yellow transition-colors">{song.title}</p>
                                    <p className="text-gray-400 text-[10px] truncate">{song.artist}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => handleVote(song.id)}
                                disabled={votedSongs.includes(song.id)}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                                    votedSongs.includes(song.id)
                                    ? 'bg-green-500 text-white cursor-default'
                                    : 'bg-white/10 hover:bg-prambors-yellow hover:text-black text-gray-300'
                                }`}
                            >
                                {votedSongs.includes(song.id) ? 'Voted' : 'Vote'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. Polling Widget */}
            <div className="bg-prambors-yellow/10 rounded-3xl p-6 border border-prambors-yellow/20">
                <h3 className="font-black text-prambors-yellow mb-3 text-sm uppercase tracking-wide">Polling Minggu Ini</h3>
                <p className="font-bold text-white mb-4 leading-snug">{poll.question}</p>
                
                <div className="space-y-2">
                    {pollResults.map((option) => {
                        const percent = totalPollVotes > 0 ? Math.round((option.votes / totalPollVotes) * 100) : 0;
                        return (
                            <div key={option.id} className="relative group cursor-pointer" onClick={() => handlePollVote(option.id)}>
                                <div className="absolute inset-0 bg-gray-800 rounded-lg overflow-hidden">
                                    {hasPolled && (
                                        <div 
                                            className="h-full bg-prambors-yellow/20 transition-all duration-1000 ease-out" 
                                            style={{ width: `${percent}%` }}
                                        ></div>
                                    )}
                                </div>
                                <div className="relative p-3 flex justify-between items-center text-sm z-10">
                                    <span className="font-medium text-gray-200">{option.text}</span>
                                    {hasPolled && <span className="font-bold text-prambors-yellow">{percent}%</span>}
                                </div>
                            </div>
                        );
                    })}
                </div>
                {!hasPolled && <p className="text-[10px] text-gray-500 mt-3 text-center">Klik pilihan untuk melihat hasil</p>}
            </div>

        </div>

        {/* Modal Request Form */}
        {isRequestOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                <div className="bg-gray-900 w-full max-w-md rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative">
                    <button 
                        onClick={() => setIsRequestOpen(false)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                    
                    <div className="p-8">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full mx-auto flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(99,102,241,0.5)]">
                                <MessageSquare size={32} className="text-white" />
                            </div>
                            <h3 className="text-2xl font-black text-white italic">REQUEST LAGU</h3>
                            <p className="text-gray-400 text-sm">Kasih tau kita lo mau dengerin apa!</p>
                        </div>

                        <form onSubmit={handleSubmitRequest} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-2">Nama Artis</label>
                                <input 
                                    required
                                    type="text" 
                                    className="w-full bg-gray-800 border border-transparent focus:border-prambors-yellow text-white rounded-xl px-4 py-3 focus:outline-none transition-colors"
                                    placeholder="Contoh: Tulus"
                                    value={requestData.artist}
                                    onChange={e => setRequestData({...requestData, artist: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-2">Judul Lagu</label>
                                <input 
                                    required
                                    type="text" 
                                    className="w-full bg-gray-800 border border-transparent focus:border-prambors-yellow text-white rounded-xl px-4 py-3 focus:outline-none transition-colors"
                                    placeholder="Contoh: Hati-Hati di Jalan"
                                    value={requestData.title}
                                    onChange={e => setRequestData({...requestData, title: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-2">Pesan / Salam (Opsional)</label>
                                <textarea 
                                    className="w-full bg-gray-800 border border-transparent focus:border-prambors-yellow text-white rounded-xl px-4 py-3 focus:outline-none transition-colors h-24 resize-none"
                                    placeholder="Buat siapa nih lagunya?"
                                    value={requestData.message}
                                    onChange={e => setRequestData({...requestData, message: e.target.value})}
                                />
                            </div>
                            
                            <button type="submit" className="w-full bg-prambors-yellow text-black font-bold py-4 rounded-xl hover:bg-yellow-400 transition-colors mt-2 shadow-[0_0_15px_rgba(255,205,0,0.3)]">
                                KIRIM REQUEST
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default Interaction;