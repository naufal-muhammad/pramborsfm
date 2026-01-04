import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ChartItem, NewsItem, PodcastEpisode, Show, Poll, NetworkItem, BrandingConfig, AboutPageData, NotificationItem, HomePageData, ChatMessage, User, UserRole, UserStatus } from '../types';
import { MOCK_CHART, MOCK_NEWS, MOCK_PODCASTS, MOCK_SHOWS, MOCK_POLL, MOCK_NETWORKS } from '../constants';

// Default Initial Data for About Page
const DEFAULT_ABOUT_DATA: AboutPageData = {
  hero: {
    titleLine1: 'MORE THAN',
    titleLine2: 'JUST',
    highlightWord: 'RADIO',
    subtitle: "Indonesia's No. 1 Hit Music Station. Rumah bagi generasi muda yang kreatif, dinamis, dan penuh energi.",
    bgImage: 'https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    sinceYear: '1971'
  },
  story: {
    title: 'The Legend of',
    highlightWord: 'Prambors',
    description1: 'Berawal dari sebuah kamar kecil di Jalan Prambanan, Jakarta Pusat pada tahun 1971, sekelompok anak muda visioner menciptakan sesuatu yang lebih dari sekadar gelombang radio. Mereka menciptakan sebuah pergerakan.',
    description2: 'Dari era Warkop Prambors hingga menjadi kiblat musik & lifestyle Gen Z hari ini, Prambors terus berevolusi. Kami bukan hanya pemutar lagu; kami adalah teman perjalanan, sumber tawa, dan platform di mana tren-tren besar Indonesia lahir.',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    stat1Value: '50+',
    stat1Label: 'Years on Air',
    stat2Value: '#1',
    stat2Label: 'Youth Radio'
  },
  dna: {
    title: 'Our',
    highlightWord: 'DNA',
    subtitle: 'Apa yang membuat Prambors berbeda?',
    items: [
      { id: 'dna-1', icon: 'Music', title: 'HIT MUSIC', desc: 'Hanya memutar lagu-lagu hits terbaik dari dalam dan luar negeri.' },
      { id: 'dna-2', icon: 'Users', title: 'GEN Z SOUL', desc: 'Bahasa, gaya, dan konten yang relevan dengan kehidupan anak muda masa kini.' },
      { id: 'dna-3', icon: 'Award', title: 'CREATIVE HUB', desc: 'Wadah bagi kreator, musisi, dan talenta muda untuk bersinar.' }
    ]
  },
  contact: {
    address: 'Jl. Adityawarman No. 71, Kebayoran Baru, Jakarta Selatan',
    email: 'hello@pramborsfm.com',
    phone: '+62 21 720 2238'
  }
};

const DEFAULT_HOME_DATA: HomePageData = {
  hero: {
    tagline: 'On Air Now',
    title: 'MANGKAL PAGI RYO',
    description: 'Mulai harimu bareng Ryo Wicaksono, penuh energi dan musik hits!',
    bgImage: 'https://picsum.photos/id/450/1200/800',
    ctaText: 'Dengerin Sekarang',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  }
};

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  { id: 'notif-1', title: 'Program Dimulai!', message: 'Mangkal Pagi Ryo sedang berlangsung. Dengerin sekarang!', time: 'Baru saja', read: false, type: 'success' },
  { id: 'notif-2', title: 'Lagu Baru di Chart', message: 'Lagu "Seven" dari Jungkook naik ke peringkat #1 minggu ini.', time: '1 Jam lalu', read: false, type: 'info' },
  { id: 'notif-3', title: 'Pemenang Kuis', message: 'Selamat kepada @dinda_putri memenangkan tiket konser Coldplay!', time: 'Hari ini', read: true, type: 'alert' }
];

const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
    { id: 'msg-1', userId: 'admin', userName: 'Prambors Admin', userAvatar: 'https://ui-avatars.com/api/?name=Prambors+Admin&background=FFCD00&color=000', text: 'Halo Kawula Muda! Mau request lagu apa hari ini? 🤩', timestamp: '10:00', role: 'admin' },
    { id: 'msg-2', userId: 'u-1', userName: 'Dinda', userAvatar: 'https://ui-avatars.com/api/?name=Dinda&background=random', text: 'Request lagu Taylor Swift dong kak!', timestamp: '10:02', role: 'user' },
    { id: 'msg-3', userId: 'u-2', userName: 'Budi Santoso', userAvatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random', text: 'Titip salam buat anak-anak SMA 3 Jakarta!', timestamp: '10:05', role: 'user' },
];

const DEFAULT_USER: User = {
  id: 'u-current',
  name: 'Kawula Muda',
  email: 'member@pramborsfm.com',
  avatar: '',
  bio: 'Prambors Listener since 2010. Love music, travel, and good vibes!',
  role: 'admin',
  status: 'active',
  joinedDate: '2023-01-15'
};

const MOCK_USERS_LIST: User[] = [
  DEFAULT_USER,
  { id: 'u-1', name: 'Dinda Putri', email: 'dinda@example.com', avatar: 'https://ui-avatars.com/api/?name=Dinda+Putri&background=random', bio: 'Music Lover', role: 'user', status: 'active', joinedDate: '2023-05-20' },
  { id: 'u-2', name: 'Budi Santoso', email: 'budi.san@example.com', avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random', bio: 'Podcast Addict', role: 'user', status: 'active', joinedDate: '2023-06-10' },
  { id: 'u-3', name: 'Ryo Wicaksono', email: 'ryo@pramborsfm.com', avatar: 'https://ui-avatars.com/api/?name=Ryo+Wicaksono&background=FFCD00&color=000', bio: 'Host Mangkal Pagi', role: 'moderator', status: 'active', joinedDate: '2022-01-01' },
  { id: 'u-4', name: 'Spammer Bot', email: 'spam@bot.com', avatar: '', bio: 'Buy follower cheap', role: 'user', status: 'banned', joinedDate: '2023-08-01' },
];

interface DataContextType {
  // Data
  news: NewsItem[];
  charts: ChartItem[];
  podcasts: PodcastEpisode[];
  shows: Show[];
  poll: Poll;
  networks: NetworkItem[];
  branding: BrandingConfig;
  aboutData: AboutPageData;
  homeData: HomePageData;
  notifications: NotificationItem[];
  chatMessages: ChatMessage[];
  currentUser: User;
  allUsers: User[];

  // Actions
  addNews: (item: NewsItem) => void;
  deleteNews: (id: string) => void;
  
  updateChart: (items: ChartItem[]) => void;
  
  addPodcast: (item: PodcastEpisode) => void;
  deletePodcast: (id: string) => void;

  addShow: (item: Show) => void;
  deleteShow: (id: string) => void;

  updatePoll: (poll: Poll) => void;
  
  addNetwork: (item: NetworkItem) => void;
  deleteNetwork: (id: string) => void;

  updateBranding: (config: BrandingConfig) => void;
  updateAboutData: (data: AboutPageData) => void;
  updateHomeData: (data: HomePageData) => void;
  
  updateUser: (user: User) => void;
  
  // User Management
  addUser: (user: User) => void;
  editUser: (user: User) => void;
  updateUserRole: (id: string, role: UserRole) => void;
  updateUserStatus: (id: string, status: UserStatus) => void;
  deleteUser: (id: string) => void;

  markAllNotificationsAsRead: () => void;
  clearNotifications: () => void;
  
  sendChatMessage: (msg: ChatMessage) => void;
  deleteChatMessage: (id: string) => void;

  resetData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // --- Initialize State (LocalStorage > Mock) ---
  
  const [news, setNews] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem('prambors_news');
    return saved ? JSON.parse(saved) : MOCK_NEWS;
  });

  const [charts, setCharts] = useState<ChartItem[]>(() => {
    const saved = localStorage.getItem('prambors_charts');
    return saved ? JSON.parse(saved) : MOCK_CHART;
  });

  const [podcasts, setPodcasts] = useState<PodcastEpisode[]>(() => {
    const saved = localStorage.getItem('prambors_podcasts');
    return saved ? JSON.parse(saved) : MOCK_PODCASTS;
  });

  const [shows, setShows] = useState<Show[]>(() => {
    const saved = localStorage.getItem('prambors_shows');
    return saved ? JSON.parse(saved) : MOCK_SHOWS;
  });

  const [poll, setPoll] = useState<Poll>(() => {
    const saved = localStorage.getItem('prambors_poll');
    return saved ? JSON.parse(saved) : MOCK_POLL;
  });

  const [networks, setNetworks] = useState<NetworkItem[]>(() => {
    const saved = localStorage.getItem('prambors_networks');
    const mockedWithIds = MOCK_NETWORKS.map((n, i) => ({ ...n, id: `net-${i}` }));
    return saved ? JSON.parse(saved) : mockedWithIds;
  });

  const [branding, setBranding] = useState<BrandingConfig>(() => {
    const saved = localStorage.getItem('prambors_branding');
    return saved ? JSON.parse(saved) : {
      siteTitle: 'PRAMBORS',
      logoUrl: '',
      primaryColor: '#FFCD00',
      faviconUrl: ''
    };
  });

  const [aboutData, setAboutData] = useState<AboutPageData>(() => {
    const saved = localStorage.getItem('prambors_about');
    return saved ? JSON.parse(saved) : DEFAULT_ABOUT_DATA;
  });

  const [homeData, setHomeData] = useState<HomePageData>(() => {
    const saved = localStorage.getItem('prambors_home');
    return saved ? JSON.parse(saved) : DEFAULT_HOME_DATA;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('prambors_notifications');
    return saved ? JSON.parse(saved) : MOCK_NOTIFICATIONS;
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
      // Chat is usually volatile, but we keep it for demo persistence
      const saved = localStorage.getItem('prambors_chat');
      return saved ? JSON.parse(saved) : INITIAL_CHAT_MESSAGES;
  });

  const [currentUser, setCurrentUser] = useState<User>(() => {
      const saved = localStorage.getItem('prambors_user');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
  });
  
  const [allUsers, setAllUsers] = useState<User[]>(() => {
      const saved = localStorage.getItem('prambors_all_users');
      return saved ? JSON.parse(saved) : MOCK_USERS_LIST;
  });

  // --- Effects for Persistence & Branding ---

  useEffect(() => { localStorage.setItem('prambors_news', JSON.stringify(news)); }, [news]);
  useEffect(() => { localStorage.setItem('prambors_charts', JSON.stringify(charts)); }, [charts]);
  useEffect(() => { localStorage.setItem('prambors_podcasts', JSON.stringify(podcasts)); }, [podcasts]);
  useEffect(() => { localStorage.setItem('prambors_shows', JSON.stringify(shows)); }, [shows]);
  useEffect(() => { localStorage.setItem('prambors_poll', JSON.stringify(poll)); }, [poll]);
  useEffect(() => { localStorage.setItem('prambors_networks', JSON.stringify(networks)); }, [networks]);
  useEffect(() => { localStorage.setItem('prambors_about', JSON.stringify(aboutData)); }, [aboutData]);
  useEffect(() => { localStorage.setItem('prambors_home', JSON.stringify(homeData)); }, [homeData]);
  useEffect(() => { localStorage.setItem('prambors_notifications', JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { localStorage.setItem('prambors_chat', JSON.stringify(chatMessages)); }, [chatMessages]);
  useEffect(() => { localStorage.setItem('prambors_user', JSON.stringify(currentUser)); }, [currentUser]);
  useEffect(() => { localStorage.setItem('prambors_all_users', JSON.stringify(allUsers)); }, [allUsers]);

  useEffect(() => { 
    localStorage.setItem('prambors_branding', JSON.stringify(branding)); 
    document.documentElement.style.setProperty('--brand-color', branding.primaryColor);
    
    // Update Favicon
    if (branding.faviconUrl) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = branding.faviconUrl;
    }
  }, [branding]);

  // Simulate Real-time Chat
  useEffect(() => {
    const randomMessages = [
        "Lagu ini enak banget! 🔥",
        "Salam dari Bandung!",
        "Kapan konser Sheila on 7?",
        "Hostnya lucu banget hari ini haha",
        "Request Coldplay dong min",
        "Selamat pagi semuaaa",
        "Macet banget di Sudirman :("
    ];
    const randomNames = ["Citra", "Bagus", "Dewi", "Eko", "Fajar", "Gita", "Hendra"];

    const interval = setInterval(() => {
        // 30% chance to add a message every 8 seconds
        if (Math.random() > 0.7) {
            const name = randomNames[Math.floor(Math.random() * randomNames.length)];
            const text = randomMessages[Math.floor(Math.random() * randomMessages.length)];
            const now = new Date();
            const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
            
            const newMsg: ChatMessage = {
                id: `msg-${Date.now()}`,
                userId: `u-${Date.now()}`,
                userName: name,
                userAvatar: `https://ui-avatars.com/api/?name=${name}&background=random`,
                text: text,
                timestamp: timeString,
                role: 'user'
            };
            setChatMessages(prev => [...prev, newMsg]);
        }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--brand-color', branding.primaryColor);
  }, []);


  // --- Action Functions ---

  const addNews = (item: NewsItem) => setNews([item, ...news]);
  const deleteNews = (id: string) => setNews(news.filter(n => n.id !== id));

  const updateChart = (items: ChartItem[]) => {
    const reordered = items.map((item, index) => ({ ...item, rank: index + 1 }));
    setCharts(reordered);
  };

  const addPodcast = (item: PodcastEpisode) => setPodcasts([item, ...podcasts]);
  const deletePodcast = (id: string) => setPodcasts(podcasts.filter(p => p.id !== id));

  const addShow = (item: Show) => setShows([...shows, item]);
  const deleteShow = (id: string) => setShows(shows.filter(s => s.id !== id));

  const updatePoll = (newPoll: Poll) => setPoll(newPoll);

  const addNetwork = (item: NetworkItem) => setNetworks([...networks, item]);
  const deleteNetwork = (id: string) => setNetworks(networks.filter(n => n.id !== id));

  const updateBranding = (config: BrandingConfig) => setBranding(config);
  const updateAboutData = (data: AboutPageData) => setAboutData(data);
  const updateHomeData = (data: HomePageData) => setHomeData(data);
  
  const updateUser = (user: User) => setCurrentUser(user);

  // User Management
  const addUser = (user: User) => {
    setAllUsers([user, ...allUsers]);
  };

  const editUser = (updatedUser: User) => {
    setAllUsers(allUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
  };

  const updateUserRole = (id: string, role: UserRole) => {
    setAllUsers(allUsers.map(u => u.id === id ? { ...u, role } : u));
  };

  const updateUserStatus = (id: string, status: UserStatus) => {
    setAllUsers(allUsers.map(u => u.id === id ? { ...u, status } : u));
  };

  const deleteUser = (id: string) => {
    setAllUsers(allUsers.filter(u => u.id !== id));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const sendChatMessage = (msg: ChatMessage) => {
      setChatMessages(prev => [...prev, msg]);
  };

  const deleteChatMessage = (id: string) => {
      setChatMessages(prev => prev.filter(m => m.id !== id));
  };

  const resetData = () => {
    if(confirm('Reset semua data ke default?')) {
        setNews(MOCK_NEWS);
        setCharts(MOCK_CHART);
        setPodcasts(MOCK_PODCASTS);
        setShows(MOCK_SHOWS);
        setPoll(MOCK_POLL);
        setNetworks(MOCK_NETWORKS.map((n, i) => ({ ...n, id: `net-${i}` })));
        setBranding({ siteTitle: 'PRAMBORS', logoUrl: '', primaryColor: '#FFCD00', faviconUrl: '' });
        setAboutData(DEFAULT_ABOUT_DATA);
        setHomeData(DEFAULT_HOME_DATA);
        setNotifications(MOCK_NOTIFICATIONS);
        setChatMessages(INITIAL_CHAT_MESSAGES);
        setCurrentUser(DEFAULT_USER);
        setAllUsers(MOCK_USERS_LIST);
        localStorage.clear();
        window.location.reload();
    }
  };

  return (
    <DataContext.Provider
      value={{
        news, charts, podcasts, shows, poll, networks, branding, aboutData, homeData, notifications, chatMessages, currentUser, allUsers,
        addNews, deleteNews,
        updateChart,
        addPodcast, deletePodcast,
        addShow, deleteShow,
        updatePoll,
        addNetwork, deleteNetwork,
        updateBranding, updateAboutData, updateHomeData, updateUser,
        addUser, editUser, updateUserRole, updateUserStatus, deleteUser,
        markAllNotificationsAsRead, clearNotifications,
        sendChatMessage, deleteChatMessage,
        resetData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};