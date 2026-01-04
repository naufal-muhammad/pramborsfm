import React, { useState, useRef, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Trash2, Plus, GripVertical, RefreshCw, Newspaper, Music, Mic, Calendar, MessageCircle, Settings, MapPin, Save, Upload, Image as ImageIcon, Headphones, ChevronDown, ChevronUp, Home as HomeIcon, MessageSquare, Send, Users, Shield, Ban, CheckCircle, Search, Edit, X } from 'lucide-react';
import { NewsItem, PodcastEpisode, Show, PollOption, NetworkItem, DnaItem, ChatMessage, UserRole, UserStatus, User } from '../types';

type AdminTab = 'news' | 'charts' | 'programs' | 'podcasts' | 'interaction' | 'livechat' | 'users' | 'about' | 'home' | 'settings';

interface TabButtonProps {
  id: AdminTab;
  icon: any;
  label: string;
  activeTab: AdminTab;
  setActiveTab: (id: AdminTab) => void;
}

const TabButton: React.FC<TabButtonProps> = ({ id, icon: Icon, label, activeTab, setActiveTab }) => (
    <button 
        onClick={() => setActiveTab(id)}
        className={`px-4 py-3 rounded-xl font-bold flex items-center gap-2 transition-all whitespace-nowrap ${activeTab === id ? 'bg-prambors-yellow text-black' : 'bg-white/5 text-gray-400 hover:text-white'}`}
    >
        <Icon size={18} /> <span className="hidden md:inline">{label}</span>
    </button>
);

interface FileUploadInputProps {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  previewUrl?: string;
  accept?: string;
}

const FileUploadInput: React.FC<FileUploadInputProps> = ({ label, onChange, previewUrl, accept = "image/*" }) => (
     <div className="space-y-2">
        <label className="block text-sm font-bold text-gray-400">{label}</label>
        <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-xl cursor-pointer transition-colors border border-white/10">
                <Upload size={18} />
                <span className="text-sm">Choose File</span>
                <input type="file" className="hidden" accept={accept} onChange={onChange} />
            </label>
            {previewUrl && accept.includes('image') && (
                <img src={previewUrl} alt="Preview" className="h-12 w-12 object-cover rounded-lg bg-white/5" />
            )}
            {previewUrl && accept.includes('audio') && (
                 <div className="flex items-center gap-2 text-xs text-green-500 font-bold bg-green-900/20 px-3 py-2 rounded-lg border border-green-500/20">
                     <Headphones size={14} /> File Loaded
                 </div>
            )}
        </div>
     </div>
);

interface AccordionSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  expandedSection: string | null;
  setExpandedSection: (id: string | null) => void;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({ id, title, children, expandedSection, setExpandedSection }) => (
    <div className="border border-white/10 rounded-xl overflow-hidden mb-4 bg-white/5">
      <button 
        className="w-full flex justify-between items-center p-4 font-bold text-white hover:bg-white/5 transition-colors"
        onClick={() => setExpandedSection(expandedSection === id ? null : id)}
        type="button"
      >
        {title}
        {expandedSection === id ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
      </button>
      {expandedSection === id && (
        <div className="p-4 border-t border-white/10 space-y-4">
          {children}
        </div>
      )}
    </div>
);

const Admin: React.FC = () => {
  const { 
    news, addNews, deleteNews,
    charts, updateChart,
    shows, addShow, deleteShow,
    podcasts, addPodcast, deletePodcast,
    poll, updatePoll,
    networks, addNetwork, deleteNetwork,
    branding, updateBranding,
    aboutData, updateAboutData,
    homeData, updateHomeData,
    chatMessages, sendChatMessage, deleteChatMessage,
    allUsers, addUser, editUser, updateUserRole, updateUserStatus, deleteUser,
    resetData 
  } = useData();

  const [activeTab, setActiveTab] = useState<AdminTab>('news');

  // --- Form States ---
  const [isAddingNews, setIsAddingNews] = useState(false);
  const [newNews, setNewNews] = useState<Partial<NewsItem>>({ title: '', category: 'Music News', excerpt: '', imageUrl: '' });

  const [isAddingShow, setIsAddingShow] = useState(false);
  const [newShow, setNewShow] = useState<Partial<Show>>({ title: '', host: '', time: '', imageUrl: '', description: '' });

  const [isAddingPodcast, setIsAddingPodcast] = useState(false);
  const [newPodcast, setNewPodcast] = useState<Partial<PodcastEpisode>>({ title: '', category: 'Lifestyle', duration: '', imageUrl: '', audioUrl: '' });

  const [pollInput, setPollInput] = useState(poll.question);
  const [pollOptionsInput, setPollOptionsInput] = useState(poll.options);

  const [isAddingNetwork, setIsAddingNetwork] = useState(false);
  const [newNetwork, setNewNetwork] = useState<Partial<NetworkItem>>({ city: '', freq: '' });

  const [brandingInput, setBrandingInput] = useState(branding);
  
  // Chat Moderation State
  const [adminChatInput, setAdminChatInput] = useState('');
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // User Management State
  const [userSearch, setUserSearch] = useState('');
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [userForm, setUserForm] = useState<Partial<User>>({
      name: '', email: '', role: 'user', status: 'active', bio: '', avatar: ''
  });

  // Local state for editing pages
  const [aboutForm, setAboutForm] = useState(aboutData);
  const [homeForm, setHomeForm] = useState(homeData);
  
  // Expand/Collapse state for Admin Sections
  const [expandedAboutSection, setExpandedAboutSection] = useState<string | null>('hero');

  // Scroll to bottom of chat on new message
  useEffect(() => {
    if (activeTab === 'livechat' && chatScrollRef.current) {
        chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages, activeTab]);

  // Filter Users
  const filteredUsers = allUsers.filter(u => 
    u.name.toLowerCase().includes(userSearch.toLowerCase()) || 
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  // --- Helper: File to Base64 ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string, setState: any, currentState: any) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5000000) { 
          alert("Ukuran file terlalu besar! Max 5MB untuk demo ini.");
          return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setState({ ...currentState, [field]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper for About form nested updates
  const updateAboutField = (section: keyof typeof aboutForm, field: string, value: any) => {
    setAboutForm(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };
  
  // Helper for Home form updates
  const updateHomeField = (field: string, value: any) => {
      setHomeForm(prev => ({
          ...prev,
          hero: {
              ...prev.hero,
              [field]: value
          }
      }));
  };

  const updateDnaItem = (index: number, field: keyof DnaItem, value: string) => {
    const newItems = [...aboutForm.dna.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setAboutForm(prev => ({
      ...prev,
      dna: { ...prev.dna, items: newItems }
    }));
  };

  const addDnaItem = () => {
    const newItem: DnaItem = { id: `dna-${Date.now()}`, title: 'New Item', desc: 'Description', icon: 'Music' };
    setAboutForm(prev => ({
      ...prev,
      dna: { ...prev.dna, items: [...prev.dna.items, newItem] }
    }));
  };

  const removeDnaItem = (index: number) => {
    const newItems = aboutForm.dna.items.filter((_, i) => i !== index);
    setAboutForm(prev => ({
      ...prev,
      dna: { ...prev.dna, items: newItems }
    }));
  };


  // --- Handlers ---

  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    addNews({
      id: `n-${Date.now()}`,
      title: newNews.title || 'No Title',
      category: newNews.category || 'General',
      date: 'Baru Saja',
      imageUrl: newNews.imageUrl || 'https://picsum.photos/600/400',
      excerpt: newNews.excerpt || ''
    });
    setIsAddingNews(false); setNewNews({ title: '', category: 'Music News', excerpt: '', imageUrl: '' });
  };

  const handleAddShow = (e: React.FormEvent) => {
    e.preventDefault();
    addShow({
      id: `s-${Date.now()}`,
      title: newShow.title || '',
      host: newShow.host || '',
      time: newShow.time || '',
      imageUrl: newShow.imageUrl || 'https://picsum.photos/400/400',
      description: newShow.description || ''
    });
    setIsAddingShow(false); setNewShow({ title: '', host: '', time: '', imageUrl: '', description: '' });
  };

  const handleAddPodcast = (e: React.FormEvent) => {
    e.preventDefault();
    addPodcast({
      id: `p-${Date.now()}`,
      title: newPodcast.title || '',
      category: newPodcast.category || '',
      date: 'Baru Saja',
      duration: newPodcast.duration || '0 Min',
      imageUrl: newPodcast.imageUrl || 'https://picsum.photos/300/300',
      audioUrl: newPodcast.audioUrl // Audio file
    });
    setIsAddingPodcast(false); setNewPodcast({ title: '', category: 'Lifestyle', duration: '', imageUrl: '', audioUrl: '' });
  };

  const handleUpdatePoll = (e: React.FormEvent) => {
    e.preventDefault();
    updatePoll({ question: pollInput, options: pollOptionsInput });
    alert('Polling updated!');
  };

  const handleOptionChange = (idx: number, val: string) => {
    const newOpts = [...pollOptionsInput];
    newOpts[idx].text = val;
    setPollOptionsInput(newOpts);
  };

  const handleAddNetwork = (e: React.FormEvent) => {
    e.preventDefault();
    addNetwork({
      id: `net-${Date.now()}`,
      city: newNetwork.city || '',
      freq: newNetwork.freq || ''
    });
    setIsAddingNetwork(false); setNewNetwork({ city: '', freq: '' });
  };

  const handleSaveBranding = () => {
    updateBranding(brandingInput);
    alert('Settings saved!');
  };

  const handleSaveAbout = () => {
    updateAboutData(aboutForm);
    alert('About page content saved!');
  };
  
  const handleSaveHome = () => {
      updateHomeData(homeForm);
      alert('Home page content saved!');
  };

  const handleSendAdminMessage = (e: React.FormEvent) => {
      e.preventDefault();
      if(!adminChatInput.trim()) return;
      
      const now = new Date();
      const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      const msg: ChatMessage = {
          id: `msg-${Date.now()}`,
          userId: 'admin-1',
          userName: 'Prambors Host',
          userAvatar: 'https://ui-avatars.com/api/?name=Prambors+Host&background=FFCD00&color=000',
          text: adminChatInput,
          timestamp: timeString,
          role: 'host'
      };
      
      sendChatMessage(msg);
      setAdminChatInput('');
  };

  // User CRUD Handlers
  const handleOpenUserForm = (user?: User) => {
      if (user) {
          setEditingUserId(user.id);
          setUserForm(user);
      } else {
          setEditingUserId(null);
          setUserForm({ name: '', email: '', role: 'user', status: 'active', bio: '', avatar: '' });
      }
      setIsUserFormOpen(true);
  };

  const handleCloseUserForm = () => {
      setIsUserFormOpen(false);
      setEditingUserId(null);
  };

  const handleSaveUser = (e: React.FormEvent) => {
      e.preventDefault();
      if (!userForm.name || !userForm.email) {
          alert("Name and Email are required!");
          return;
      }

      if (editingUserId) {
          // Edit Mode
          editUser({
             ...userForm as User,
             id: editingUserId
          });
      } else {
          // Add Mode
          const newUser: User = {
              id: `u-${Date.now()}`,
              name: userForm.name || '',
              email: userForm.email || '',
              role: userForm.role as UserRole,
              status: userForm.status as UserStatus,
              bio: userForm.bio || '',
              avatar: userForm.avatar || '',
              joinedDate: new Date().toISOString().split('T')[0]
          };
          addUser(newUser);
      }
      handleCloseUserForm();
  };

  const moveChartItem = (index: number, direction: 'up' | 'down') => {
    const newCharts = [...charts];
    if (direction === 'up' && index > 0) {
      [newCharts[index], newCharts[index - 1]] = [newCharts[index - 1], newCharts[index]];
    } else if (direction === 'down' && index < newCharts.length - 1) {
      [newCharts[index], newCharts[index + 1]] = [newCharts[index + 1], newCharts[index]];
    }
    updateChart(newCharts);
  };

  return (
    <div className="animate-fade-in pb-12 space-y-8">
      <div className="flex justify-between items-center border-b border-white/10 pb-6">
        <div>
            <h1 className="text-4xl font-black italic tracking-tighter text-white mb-2">ADMIN PANEL</h1>
            <p className="text-gray-400">Kelola semua konten website secara dinamis.</p>
        </div>
        <button onClick={resetData} className="flex items-center gap-2 text-xs font-bold bg-red-900/30 text-red-500 px-4 py-2 rounded-lg hover:bg-red-900/50 transition-colors border border-red-900">
            <RefreshCw size={14} /> Reset Data
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <TabButton id="news" icon={Newspaper} label="News" activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabButton id="charts" icon={Music} label="Top 40" activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabButton id="programs" icon={Calendar} label="Programs" activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabButton id="podcasts" icon={Mic} label="Podcasts" activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabButton id="interaction" icon={MessageCircle} label="Interaction" activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabButton id="livechat" icon={MessageSquare} label="Live Chat" activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabButton id="users" icon={Users} label="Users" activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabButton id="home" icon={HomeIcon} label="Home Page" activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabButton id="about" icon={MapPin} label="About Page" activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabButton id="settings" icon={Settings} label="Settings" activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="bg-prambors-gray rounded-3xl border border-white/10 overflow-hidden min-h-[500px]">
        
        {/* NEWS */}
        {activeTab === 'news' && (
            <div className="p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">News Manager</h3>
                    <button onClick={() => setIsAddingNews(!isAddingNews)} className="bg-white text-black font-bold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200"><Plus size={18} /> Add News</button>
                </div>
                {isAddingNews && (
                    <form onSubmit={handleAddNews} className="bg-black/40 p-6 rounded-xl border border-white/10 mb-8 space-y-4">
                        <input type="text" placeholder="Title" className="w-full bg-gray-800 p-3 rounded text-white" value={newNews.title} onChange={e => setNewNews({...newNews, title: e.target.value})} required />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <select className="bg-gray-800 p-3 rounded text-white" value={newNews.category} onChange={e => setNewNews({...newNews, category: e.target.value})}>
                                {['Music News', 'Lifestyle', 'Event Update', 'Pop Culture', 'Tech', 'Viral'].map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            
                            {/* Image Upload */}
                            <FileUploadInput 
                                label="Cover Image"
                                previewUrl={newNews.imageUrl}
                                onChange={(e) => handleFileChange(e, 'imageUrl', setNewNews, newNews)}
                            />
                        </div>
                        {/* Fallback Text Input for URL */}
                        <input type="text" placeholder="Or paste Image URL here..." className="w-full bg-gray-800 p-3 rounded text-white text-sm" value={newNews.imageUrl} onChange={e => setNewNews({...newNews, imageUrl: e.target.value})} />
                        
                        <textarea placeholder="Excerpt" className="w-full bg-gray-800 p-3 rounded text-white h-24" value={newNews.excerpt} onChange={e => setNewNews({...newNews, excerpt: e.target.value})} required />
                        <button type="submit" className="bg-prambors-yellow text-black font-bold px-6 py-2 rounded">Save</button>
                    </form>
                )}
                <div className="space-y-4">
                    {news.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/5 items-center">
                            <img src={item.imageUrl} className="w-16 h-16 object-cover rounded" />
                            <div className="flex-1">
                                <h4 className="font-bold">{item.title}</h4>
                                <span className="text-xs text-prambors-yellow">{item.category}</span>
                            </div>
                            <button onClick={() => deleteNews(item.id)} className="text-red-500"><Trash2 size={18} /></button>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* CHARTS */}
        {activeTab === 'charts' && (
            <div className="p-6 md:p-8">
                 <h3 className="text-xl font-bold mb-6">Top 40 Ordering</h3>
                 <div className="space-y-2">
                    {charts.map((item, index) => (
                        <div key={item.song.id} className="flex items-center gap-4 p-3 bg-white/5 rounded-xl">
                            <div className="flex flex-col gap-1">
                                <button onClick={() => moveChartItem(index, 'up')} disabled={index === 0} className="hover:text-prambors-yellow">▲</button>
                                <button onClick={() => moveChartItem(index, 'down')} disabled={index === charts.length - 1} className="hover:text-prambors-yellow">▼</button>
                            </div>
                            <span className="font-black text-xl text-prambors-yellow w-8 text-center">{item.rank}</span>
                            <img src={item.song.coverUrl} className="w-10 h-10 rounded" />
                            <div className="flex-1">
                                <p className="font-bold">{item.song.title}</p>
                                <p className="text-xs text-gray-400">{item.song.artist}</p>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
        )}

        {/* PROGRAMS */}
        {activeTab === 'programs' && (
             <div className="p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Programs & Shows</h3>
                    <button onClick={() => setIsAddingShow(!isAddingShow)} className="bg-white text-black font-bold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200"><Plus size={18} /> Add Show</button>
                </div>
                {isAddingShow && (
                    <form onSubmit={handleAddShow} className="bg-black/40 p-6 rounded-xl border border-white/10 mb-8 space-y-4">
                        <input type="text" placeholder="Show Title" className="w-full bg-gray-800 p-3 rounded text-white" value={newShow.title} onChange={e => setNewShow({...newShow, title: e.target.value})} required />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <input type="text" placeholder="Host Name" className="bg-gray-800 p-3 rounded text-white" value={newShow.host} onChange={e => setNewShow({...newShow, host: e.target.value})} required />
                             <input type="text" placeholder="Time (e.g. 06:00 - 10:00)" className="bg-gray-800 p-3 rounded text-white" value={newShow.time} onChange={e => setNewShow({...newShow, time: e.target.value})} required />
                        </div>
                        
                        {/* Image Upload */}
                        <FileUploadInput 
                            label="Program Cover"
                            previewUrl={newShow.imageUrl}
                            onChange={(e) => handleFileChange(e, 'imageUrl', setNewShow, newShow)}
                        />
                        <input type="text" placeholder="Or paste Image URL here..." className="w-full bg-gray-800 p-3 rounded text-white text-sm" value={newShow.imageUrl} onChange={e => setNewShow({...newShow, imageUrl: e.target.value})} />

                        <textarea placeholder="Description" className="w-full bg-gray-800 p-3 rounded text-white" value={newShow.description} onChange={e => setNewShow({...newShow, description: e.target.value})} />
                        <button type="submit" className="bg-prambors-yellow text-black font-bold px-6 py-2 rounded">Save Program</button>
                    </form>
                )}
                <div className="space-y-4">
                    {shows.map((show) => (
                        <div key={show.id} className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/5 items-center">
                            <img src={show.imageUrl} className="w-16 h-16 object-cover rounded" />
                            <div className="flex-1">
                                <h4 className="font-bold">{show.title}</h4>
                                <p className="text-xs text-gray-400">{show.host} • {show.time}</p>
                            </div>
                            <button onClick={() => deleteShow(show.id)} className="text-red-500"><Trash2 size={18} /></button>
                        </div>
                    ))}
                </div>
             </div>
        )}

        {/* PODCASTS */}
        {activeTab === 'podcasts' && (
             <div className="p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Podcasts</h3>
                    <button onClick={() => setIsAddingPodcast(!isAddingPodcast)} className="bg-white text-black font-bold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200"><Plus size={18} /> Add Episode</button>
                </div>
                {isAddingPodcast && (
                    <form onSubmit={handleAddPodcast} className="bg-black/40 p-6 rounded-xl border border-white/10 mb-8 space-y-4">
                         <input type="text" placeholder="Episode Title" className="w-full bg-gray-800 p-3 rounded text-white" value={newPodcast.title} onChange={e => setNewPodcast({...newPodcast, title: e.target.value})} required />
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <select className="bg-gray-800 p-3 rounded text-white" value={newPodcast.category} onChange={e => setNewPodcast({...newPodcast, category: e.target.value})}>
                                {['Lifestyle', 'Horror', 'Entertainment', 'Comedy', 'Talkshow'].map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <input type="text" placeholder="Duration (e.g. 45 Min)" className="bg-gray-800 p-3 rounded text-white" value={newPodcast.duration} onChange={e => setNewPodcast({...newPodcast, duration: e.target.value})} />
                         </div>

                         {/* Image Upload */}
                         <FileUploadInput 
                            label="Cover Image"
                            previewUrl={newPodcast.imageUrl}
                            onChange={(e) => handleFileChange(e, 'imageUrl', setNewPodcast, newPodcast)}
                         />
                         <input type="text" placeholder="Or paste Image URL here..." className="w-full bg-gray-800 p-3 rounded text-white text-sm" value={newPodcast.imageUrl} onChange={e => setNewPodcast({...newPodcast, imageUrl: e.target.value})} />

                         {/* Audio Upload */}
                         <FileUploadInput 
                            label="Audio File (MP3)"
                            accept="audio/*"
                            previewUrl={newPodcast.audioUrl}
                            onChange={(e) => handleFileChange(e, 'audioUrl', setNewPodcast, newPodcast)}
                         />

                         <button type="submit" className="bg-prambors-yellow text-black font-bold px-6 py-2 rounded">Save Episode</button>
                    </form>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {podcasts.map((pod) => (
                        <div key={pod.id} className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/5 items-center">
                            <img src={pod.imageUrl} className="w-14 h-14 object-cover rounded" />
                            <div className="flex-1">
                                <h4 className="font-bold text-sm line-clamp-1">{pod.title}</h4>
                                <div className="flex items-center gap-2">
                                    <p className="text-xs text-prambors-yellow">{pod.category}</p>
                                    {pod.audioUrl && <span className="text-[10px] bg-green-500/20 text-green-500 px-1 rounded border border-green-500/20">AUDIO READY</span>}
                                </div>
                            </div>
                            <button onClick={() => deletePodcast(pod.id)} className="text-red-500"><Trash2 size={18} /></button>
                        </div>
                    ))}
                </div>
             </div>
        )}

        {/* INTERACTION (POLL) */}
        {activeTab === 'interaction' && (
            <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold mb-6">Edit Polling</h3>
                <form onSubmit={handleUpdatePoll} className="space-y-6 max-w-2xl">
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Question</label>
                        <input type="text" className="w-full bg-gray-800 p-4 rounded-xl text-white border border-white/10 focus:border-prambors-yellow outline-none" value={pollInput} onChange={e => setPollInput(e.target.value)} />
                    </div>
                    
                    <div className="space-y-3">
                        <label className="block text-sm font-bold text-gray-400">Options</label>
                        {pollOptionsInput.map((opt, idx) => (
                            <div key={opt.id} className="flex items-center gap-3">
                                <span className="text-gray-500 font-mono w-4">{idx+1}.</span>
                                <input 
                                    type="text" 
                                    className="flex-1 bg-gray-800 p-3 rounded-lg text-white border border-white/10"
                                    value={opt.text}
                                    onChange={(e) => handleOptionChange(idx, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>

                    <button type="submit" className="bg-prambors-yellow text-black font-bold px-8 py-3 rounded-full flex items-center gap-2"><Save size={18} /> Update Poll</button>
                </form>
            </div>
        )}

        {/* LIVE CHAT MODERATION */}
        {activeTab === 'livechat' && (
             <div className="p-6 md:p-8 flex flex-col h-[600px]">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Live Chat Moderation</h3>
                    <div className="text-xs text-gray-400 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Live Monitoring
                    </div>
                 </div>

                 <div className="flex-1 bg-black/40 rounded-xl border border-white/10 overflow-hidden flex flex-col">
                     <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={chatScrollRef}>
                        {chatMessages.length === 0 ? (
                            <div className="text-center text-gray-500 py-10">No messages yet.</div>
                        ) : (
                            chatMessages.map(msg => (
                                <div key={msg.id} className="flex items-start gap-3 group">
                                    <img src={msg.userAvatar} className="w-8 h-8 rounded-full bg-white/10" alt={msg.userName} />
                                    <div className="flex-1">
                                        <div className="flex items-baseline gap-2">
                                            <span className={`font-bold text-sm ${msg.role === 'host' ? 'text-prambors-yellow' : 'text-white'}`}>
                                                {msg.userName}
                                                {msg.role === 'host' && <span className="ml-1 text-[9px] bg-prambors-yellow text-black px-1 rounded">HOST</span>}
                                            </span>
                                            <span className="text-[10px] text-gray-500">{msg.timestamp}</span>
                                        </div>
                                        <p className="text-gray-300 text-sm">{msg.text}</p>
                                    </div>
                                    <button 
                                        onClick={() => deleteChatMessage(msg.id)}
                                        className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/10 rounded" 
                                        title="Delete Message"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))
                        )}
                     </div>
                     <div className="p-4 bg-gray-800 border-t border-white/10">
                         <form onSubmit={handleSendAdminMessage} className="flex gap-2">
                             <input 
                                type="text" 
                                className="flex-1 bg-gray-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-prambors-yellow"
                                placeholder="Send message as Host..."
                                value={adminChatInput}
                                onChange={e => setAdminChatInput(e.target.value)}
                             />
                             <button type="submit" className="bg-prambors-yellow text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                                 <Send size={16} /> Send
                             </button>
                         </form>
                     </div>
                 </div>
             </div>
        )}
        
        {/* USER MANAGEMENT */}
        {activeTab === 'users' && (
            <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h3 className="text-xl font-bold">User Management</h3>
                    <div className="flex gap-2 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                             <input 
                                type="text" 
                                placeholder="Search users..." 
                                className="w-full bg-black/40 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-prambors-yellow text-white"
                                value={userSearch}
                                onChange={(e) => setUserSearch(e.target.value)}
                             />
                        </div>
                        <button 
                            onClick={() => handleOpenUserForm()}
                            className="bg-white text-black font-bold px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-200 text-sm whitespace-nowrap"
                        >
                            <Plus size={16} /> Add User
                        </button>
                    </div>
                </div>

                {/* Add/Edit User Form */}
                {isUserFormOpen && (
                    <div className="bg-black/40 p-6 rounded-xl border border-white/10 mb-8 animate-fade-in">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-bold text-lg text-white">{editingUserId ? 'Edit User' : 'Add New User'}</h4>
                            <button onClick={handleCloseUserForm} className="text-gray-400 hover:text-white"><X size={20}/></button>
                        </div>
                        <form onSubmit={handleSaveUser} className="space-y-4">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <div>
                                    <label className="block text-xs font-bold text-gray-400 mb-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-gray-800 p-3 rounded-lg text-white border border-white/10"
                                        value={userForm.name} 
                                        onChange={e => setUserForm({...userForm, name: e.target.value})} 
                                        required 
                                    />
                                 </div>
                                 <div>
                                    <label className="block text-xs font-bold text-gray-400 mb-1">Email</label>
                                    <input 
                                        type="email" 
                                        className="w-full bg-gray-800 p-3 rounded-lg text-white border border-white/10"
                                        value={userForm.email} 
                                        onChange={e => setUserForm({...userForm, email: e.target.value})} 
                                        required 
                                    />
                                 </div>
                             </div>

                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <div>
                                    <label className="block text-xs font-bold text-gray-400 mb-1">Role</label>
                                    <select 
                                        className="w-full bg-gray-800 p-3 rounded-lg text-white border border-white/10"
                                        value={userForm.role}
                                        onChange={e => setUserForm({...userForm, role: e.target.value as UserRole})}
                                    >
                                        <option value="user">User</option>
                                        <option value="moderator">Moderator</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                 </div>
                                 <div>
                                    <label className="block text-xs font-bold text-gray-400 mb-1">Status</label>
                                    <select 
                                        className="w-full bg-gray-800 p-3 rounded-lg text-white border border-white/10"
                                        value={userForm.status}
                                        onChange={e => setUserForm({...userForm, status: e.target.value as UserStatus})}
                                    >
                                        <option value="active">Active</option>
                                        <option value="banned">Banned</option>
                                    </select>
                                 </div>
                             </div>

                             {/* Avatar Upload */}
                             <FileUploadInput 
                                label="User Avatar"
                                previewUrl={userForm.avatar}
                                onChange={(e) => handleFileChange(e, 'avatar', setUserForm, userForm)}
                             />

                             <div>
                                <label className="block text-xs font-bold text-gray-400 mb-1">Bio</label>
                                <textarea 
                                    className="w-full bg-gray-800 p-3 rounded-lg text-white border border-white/10 h-20"
                                    value={userForm.bio}
                                    onChange={e => setUserForm({...userForm, bio: e.target.value})}
                                />
                             </div>

                             <div className="flex justify-end gap-3 pt-2">
                                 <button type="button" onClick={handleCloseUserForm} className="px-4 py-2 rounded-lg text-gray-400 hover:text-white font-bold text-sm">Cancel</button>
                                 <button type="submit" className="bg-prambors-yellow text-black px-6 py-2 rounded-lg font-bold text-sm hover:bg-yellow-400 flex items-center gap-2">
                                     <Save size={16} /> Save User
                                 </button>
                             </div>
                        </form>
                    </div>
                )}

                <div className="bg-black/20 rounded-xl border border-white/10 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-300">
                            <thead className="bg-white/5 text-gray-100 font-bold uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Joined</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} alt={user.name} className="w-10 h-10 rounded-full bg-gray-700 object-cover" />
                                                <div>
                                                    <div className="font-bold text-white">{user.name}</div>
                                                    <div className="text-xs text-gray-500">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                                                user.role === 'admin' ? 'bg-purple-500/20 text-purple-400' :
                                                user.role === 'moderator' ? 'bg-blue-500/20 text-blue-400' :
                                                'bg-gray-700 text-gray-300'
                                            }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button 
                                                onClick={() => updateUserStatus(user.id, user.status === 'active' ? 'banned' : 'active')}
                                                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-fit ${user.status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}
                                            >
                                                {user.status === 'active' ? <CheckCircle size={10} /> : <Ban size={10} />}
                                                {user.status}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-mono">
                                            {user.joinedDate}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button 
                                                    onClick={() => handleOpenUserForm(user)}
                                                    className="text-gray-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
                                                    title="Edit User"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button 
                                                    onClick={() => deleteUser(user.id)}
                                                    className="text-gray-500 hover:text-red-500 transition-colors p-2 hover:bg-white/5 rounded-lg"
                                                    title="Delete User"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredUsers.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                            No users found matching "{userSearch}"
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )}
        
        {/* HOME PAGE SETTINGS */}
        {activeTab === 'home' && (
             <div className="p-6 md:p-8">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Home Page Hero</h3>
                    <button onClick={handleSaveHome} className="bg-prambors-yellow text-black font-bold px-4 py-2 rounded-lg flex items-center gap-2"><Save size={18} /> Save Changes</button>
                </div>
                
                <div className="space-y-6 max-w-2xl">
                    {/* Hero Image */}
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 font-bold">Hero Background Image</label>
                        <FileUploadInput 
                           label="" 
                           previewUrl={homeForm.hero.bgImage}
                           onChange={(e) => {
                               const file = e.target.files?.[0];
                               if(file) {
                                   const reader = new FileReader();
                                   reader.onloadend = () => updateHomeField('bgImage', reader.result as string);
                                   reader.readAsDataURL(file);
                               }
                           }}
                        />
                        <input type="text" placeholder="Or paste Image URL here..." className="w-full bg-gray-800 p-3 rounded text-white mt-2" value={homeForm.hero.bgImage} onChange={e => updateHomeField('bgImage', e.target.value)} />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Tagline (e.g. On Air Now)</label>
                        <input type="text" className="w-full bg-gray-800 p-3 rounded text-white" value={homeForm.hero.tagline} onChange={e => updateHomeField('tagline', e.target.value)} />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Program Title</label>
                        <input type="text" className="w-full bg-gray-800 p-3 rounded text-white text-lg font-bold" value={homeForm.hero.title} onChange={e => updateHomeField('title', e.target.value)} />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Description / Subtitle</label>
                        <textarea className="w-full bg-gray-800 p-3 rounded text-white h-24" value={homeForm.hero.description} onChange={e => updateHomeField('description', e.target.value)} />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Button Text</label>
                        <input type="text" className="w-full bg-gray-800 p-3 rounded text-white" value={homeForm.hero.ctaText} onChange={e => updateHomeField('ctaText', e.target.value)} />
                    </div>

                    {/* Audio Upload */}
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 font-bold">Hero Audio (Promo/Streaming URL)</label>
                        <FileUploadInput 
                            label=""
                            accept="audio/*"
                            previewUrl={homeForm.hero.audioUrl}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if(file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => updateHomeField('audioUrl', reader.result as string);
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                        <input type="text" placeholder="Or paste Audio URL here..." className="w-full bg-gray-800 p-3 rounded text-white mt-2" value={homeForm.hero.audioUrl || ''} onChange={e => updateHomeField('audioUrl', e.target.value)} />
                    </div>
                </div>
             </div>
        )}

        {/* ABOUT (Full Dynamic) */}
        {activeTab === 'about' && (
             <div className="p-6 md:p-8">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">About Page Content</h3>
                    <button onClick={handleSaveAbout} className="bg-prambors-yellow text-black font-bold px-4 py-2 rounded-lg flex items-center gap-2"><Save size={18} /> Save Content</button>
                </div>
                
                {/* 1. Hero Section */}
                <AccordionSection id="hero" title="Hero / Header Section" expandedSection={expandedAboutSection} setExpandedSection={setExpandedAboutSection}>
                   <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Title Line 1" className="bg-gray-800 p-3 rounded text-white" value={aboutForm.hero.titleLine1} onChange={e => updateAboutField('hero', 'titleLine1', e.target.value)} />
                        <input type="text" placeholder="Title Line 2" className="bg-gray-800 p-3 rounded text-white" value={aboutForm.hero.titleLine2} onChange={e => updateAboutField('hero', 'titleLine2', e.target.value)} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Highlight Word (Yellow)" className="bg-gray-800 p-3 rounded text-white" value={aboutForm.hero.highlightWord} onChange={e => updateAboutField('hero', 'highlightWord', e.target.value)} />
                        <input type="text" placeholder="Since Year" className="bg-gray-800 p-3 rounded text-white" value={aboutForm.hero.sinceYear} onChange={e => updateAboutField('hero', 'sinceYear', e.target.value)} />
                      </div>
                      <textarea placeholder="Subtitle / Description" className="w-full bg-gray-800 p-3 rounded text-white" value={aboutForm.hero.subtitle} onChange={e => updateAboutField('hero', 'subtitle', e.target.value)} />
                      
                      {/* Hero Image */}
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400 font-bold">Background Image</label>
                        <input type="text" className="w-full bg-gray-800 p-3 rounded text-white mb-2" value={aboutForm.hero.bgImage} onChange={e => updateAboutField('hero', 'bgImage', e.target.value)} />
                         <div className="flex gap-4">
                            <label className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded cursor-pointer text-sm font-bold flex items-center gap-2">
                                <Upload size={14}/> Upload Image
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if(file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => updateAboutField('hero', 'bgImage', reader.result as string);
                                        reader.readAsDataURL(file);
                                    }
                                }} />
                            </label>
                         </div>
                      </div>
                   </div>
                </AccordionSection>

                {/* 2. Story Section */}
                <AccordionSection id="story" title="Story / Legend Section" expandedSection={expandedAboutSection} setExpandedSection={setExpandedAboutSection}>
                   <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                         <input type="text" className="bg-gray-800 p-3 rounded text-white" value={aboutForm.story.title} onChange={e => updateAboutField('story', 'title', e.target.value)} />
                         <input type="text" className="bg-gray-800 p-3 rounded text-white" value={aboutForm.story.highlightWord} onChange={e => updateAboutField('story', 'highlightWord', e.target.value)} />
                      </div>
                      <textarea className="w-full bg-gray-800 p-3 rounded text-white h-24" value={aboutForm.story.description1} onChange={e => updateAboutField('story', 'description1', e.target.value)} />
                      <textarea className="w-full bg-gray-800 p-3 rounded text-white h-24" value={aboutForm.story.description2} onChange={e => updateAboutField('story', 'description2', e.target.value)} />
                      
                      <div className="grid grid-cols-2 gap-4 bg-black/20 p-4 rounded-xl">
                         <div>
                            <label className="text-xs text-gray-500 uppercase font-bold">Stat 1</label>
                            <input type="text" className="w-full bg-gray-800 p-2 rounded text-white mb-1" value={aboutForm.story.stat1Value} onChange={e => updateAboutField('story', 'stat1Value', e.target.value)} />
                            <input type="text" className="w-full bg-gray-800 p-2 rounded text-white text-xs" value={aboutForm.story.stat1Label} onChange={e => updateAboutField('story', 'stat1Label', e.target.value)} />
                         </div>
                         <div>
                            <label className="text-xs text-gray-500 uppercase font-bold">Stat 2</label>
                            <input type="text" className="w-full bg-gray-800 p-2 rounded text-white mb-1" value={aboutForm.story.stat2Value} onChange={e => updateAboutField('story', 'stat2Value', e.target.value)} />
                            <input type="text" className="w-full bg-gray-800 p-2 rounded text-white text-xs" value={aboutForm.story.stat2Label} onChange={e => updateAboutField('story', 'stat2Label', e.target.value)} />
                         </div>
                      </div>

                      {/* Story Image */}
                      <div className="space-y-2">
                         <label className="text-sm text-gray-400 font-bold">Side Image</label>
                         <FileUploadInput 
                            label="" 
                            previewUrl={aboutForm.story.image}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if(file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => updateAboutField('story', 'image', reader.result as string);
                                    reader.readAsDataURL(file);
                                }
                            }}
                         />
                         <input type="text" placeholder="Or paste Image URL here..." className="w-full bg-gray-800 p-3 rounded text-white mt-2" value={aboutForm.story.image} onChange={e => updateAboutField('story', 'image', e.target.value)} />
                      </div>
                   </div>
                </AccordionSection>

                {/* 3. DNA Section */}
                <AccordionSection id="dna" title="Our DNA Cards" expandedSection={expandedAboutSection} setExpandedSection={setExpandedAboutSection}>
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <input type="text" className="bg-gray-800 p-3 rounded text-white flex-1" value={aboutForm.dna.title} onChange={e => updateAboutField('dna', 'title', e.target.value)} />
                            <input type="text" className="bg-gray-800 p-3 rounded text-white flex-1" value={aboutForm.dna.highlightWord} onChange={e => updateAboutField('dna', 'highlightWord', e.target.value)} />
                        </div>
                        <input type="text" className="w-full bg-gray-800 p-3 rounded text-white" value={aboutForm.dna.subtitle} onChange={e => updateAboutField('dna', 'subtitle', e.target.value)} />
                        
                        <div className="space-y-4 mt-4">
                            {aboutForm.dna.items.map((item, index) => (
                                <div key={item.id} className="bg-black/20 p-4 rounded-xl border border-white/5 flex gap-4 items-start">
                                    <div className="w-10 flex flex-col gap-2">
                                        <div className="font-bold text-gray-500 text-xs">#{index + 1}</div>
                                        <button onClick={() => removeDnaItem(index)} className="text-red-500 hover:bg-white/10 p-1 rounded"><Trash2 size={16}/></button>
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex gap-2">
                                            <input type="text" className="bg-gray-800 p-2 rounded text-white flex-1 font-bold" value={item.title} onChange={e => updateDnaItem(index, 'title', e.target.value)} placeholder="Title" />
                                            <select className="bg-gray-800 p-2 rounded text-white w-32" value={item.icon} onChange={e => updateDnaItem(index, 'icon', e.target.value)}>
                                                {['Music', 'Users', 'Award', 'Globe', 'Star', 'Zap', 'Heart', 'Smile'].map(ic => (
                                                    <option key={ic} value={ic}>{ic}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <textarea className="w-full bg-gray-800 p-2 rounded text-white text-sm" value={item.desc} onChange={e => updateDnaItem(index, 'desc', e.target.value)} placeholder="Description" />
                                    </div>
                                </div>
                            ))}
                            <button onClick={addDnaItem} className="w-full py-2 border border-dashed border-white/20 rounded-xl text-gray-400 hover:text-white hover:border-white/50 transition-colors flex justify-center gap-2">
                                <Plus size={18} /> Add DNA Card
                            </button>
                        </div>
                    </div>
                </AccordionSection>

                {/* 4. Networks List (Existing) */}
                <AccordionSection id="networks" title="Network List (Cities)" expandedSection={expandedAboutSection} setExpandedSection={setExpandedAboutSection}>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-400">Daftar kota jaringan Prambors.</p>
                            <button onClick={() => setIsAddingNetwork(!isAddingNetwork)} className="bg-white text-black font-bold px-3 py-1 rounded-lg flex items-center gap-2 hover:bg-gray-200 text-xs"><Plus size={14} /> Add City</button>
                        </div>
                        {isAddingNetwork && (
                            <form onSubmit={handleAddNetwork} className="bg-black/40 p-4 rounded-xl border border-white/10 mb-6 flex gap-4">
                                <input type="text" placeholder="City" className="bg-gray-800 p-2 rounded text-white flex-1" value={newNetwork.city} onChange={e => setNewNetwork({...newNetwork, city: e.target.value})} required />
                                <input type="text" placeholder="Freq (e.g. 102.2 FM)" className="bg-gray-800 p-2 rounded text-white flex-1" value={newNetwork.freq} onChange={e => setNewNetwork({...newNetwork, freq: e.target.value})} required />
                                <button type="submit" className="bg-prambors-yellow text-black font-bold px-4 rounded">Add</button>
                            </form>
                        )}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {networks.map(net => (
                                <div key={net.id} className="bg-white/5 p-4 rounded-xl relative group">
                                    <h4 className="font-bold">{net.city}</h4>
                                    <p className="text-prambors-yellow font-black">{net.freq}</p>
                                    <button onClick={() => deleteNetwork(net.id)} className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                </AccordionSection>

                {/* 5. Contact Info */}
                <AccordionSection id="contact" title="Connect With Us" expandedSection={expandedAboutSection} setExpandedSection={setExpandedAboutSection}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Headquarters Address</label>
                            <input type="text" className="w-full bg-gray-800 p-3 rounded text-white" value={aboutForm.contact.address} onChange={e => updateAboutField('contact', 'address', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Email</label>
                                <input type="email" className="w-full bg-gray-800 p-3 rounded text-white" value={aboutForm.contact.email} onChange={e => updateAboutField('contact', 'email', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Phone</label>
                                <input type="text" className="w-full bg-gray-800 p-3 rounded text-white" value={aboutForm.contact.phone} onChange={e => updateAboutField('contact', 'phone', e.target.value)} />
                            </div>
                        </div>
                    </div>
                </AccordionSection>

             </div>
        )}

        {/* SETTINGS (BRANDING) */}
        {activeTab === 'settings' && (
            <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold mb-6">Website Branding</h3>
                <div className="space-y-6 max-w-xl">
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Site Title</label>
                        <input type="text" className="w-full bg-gray-800 p-3 rounded-xl text-white" value={brandingInput.siteTitle} onChange={e => setBrandingInput({...brandingInput, siteTitle: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Primary Color</label>
                        <div className="flex items-center gap-4">
                            <input type="color" className="w-16 h-16 rounded cursor-pointer bg-transparent" value={brandingInput.primaryColor} onChange={e => setBrandingInput({...brandingInput, primaryColor: e.target.value})} />
                            <span className="font-mono text-white">{brandingInput.primaryColor}</span>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Logo</label>
                        <FileUploadInput 
                            label=""
                            previewUrl={brandingInput.logoUrl}
                            onChange={(e) => handleFileChange(e, 'logoUrl', setBrandingInput, brandingInput)}
                        />
                         <input type="text" placeholder="Or paste Logo URL here..." className="w-full bg-gray-800 p-3 rounded-xl text-white mt-2" value={brandingInput.logoUrl} onChange={e => setBrandingInput({...brandingInput, logoUrl: e.target.value})} />
                    </div>

                    {/* Add Favicon Input */}
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Favicon</label>
                        <FileUploadInput 
                            label=""
                            previewUrl={brandingInput.faviconUrl}
                            onChange={(e) => handleFileChange(e, 'faviconUrl', setBrandingInput, brandingInput)}
                        />
                         <input type="text" placeholder="Or paste Favicon URL here..." className="w-full bg-gray-800 p-3 rounded-xl text-white mt-2" value={brandingInput.faviconUrl || ''} onChange={e => setBrandingInput({...brandingInput, faviconUrl: e.target.value})} />
                    </div>

                    <button onClick={handleSaveBranding} className="bg-prambors-yellow text-black font-bold px-8 py-3 rounded-full flex items-center gap-2"><Save size={18} /> Save Settings</button>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default Admin;