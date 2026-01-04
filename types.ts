export interface Song {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  duration: string;
  audioUrl?: string;
}

export interface Show {
  id: string;
  title: string;
  host: string;
  time: string;
  imageUrl: string;
  description: string;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  date: string;
  duration: string;
  imageUrl: string;
  category: string;
  audioUrl?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
  excerpt: string;
}

export interface ChartItem {
  rank: number;
  song: Song;
  trend: 'up' | 'down' | 'same' | 'new';
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  question: string;
  options: PollOption[];
}

export interface NetworkItem {
  id: string;
  city: string;
  freq: string;
}

export interface DnaItem {
  id: string;
  title: string;
  desc: string;
  icon: string; // Store icon name (e.g., 'Music', 'Users')
}

export interface AboutPageData {
  hero: {
    titleLine1: string;
    titleLine2: string;
    highlightWord: string;
    subtitle: string;
    bgImage: string;
    sinceYear: string;
  };
  story: {
    title: string;
    highlightWord: string;
    description1: string;
    description2: string;
    image: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
  };
  dna: {
    title: string;
    highlightWord: string;
    subtitle: string;
    items: DnaItem[];
  };
  contact: {
    address: string;
    email: string;
    phone: string;
  };
}

export interface HomePageData {
  hero: {
    tagline: string;
    title: string;
    description: string;
    bgImage: string;
    ctaText: string;
    audioUrl?: string;
  };
}

export interface BrandingConfig {
  siteTitle: string;
  logoUrl: string;
  primaryColor: string;
  faviconUrl?: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: string;
  role: 'user' | 'admin' | 'host';
}

export enum PlayerState {
  PLAYING,
  PAUSED,
  BUFFERING
}

export type UserRole = 'admin' | 'moderator' | 'user';
export type UserStatus = 'active' | 'banned';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
  role: UserRole;
  status: UserStatus;
  joinedDate: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'alert';
}