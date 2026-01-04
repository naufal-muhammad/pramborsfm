import { ChartItem, NewsItem, PodcastEpisode, Show, Song } from "./types";

// Sampel audio untuk demo (Royalty Free / Testing URL)
const SAMPLE_AUDIO = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
const SAMPLE_AUDIO_2 = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3';

export const MOCK_NOW_PLAYING: Song = {
  id: 'np-1',
  title: 'As It Was',
  artist: 'Harry Styles',
  coverUrl: 'https://picsum.photos/id/10/300/300',
  duration: 'Live',
  audioUrl: SAMPLE_AUDIO // Simulasi live stream dengan file audio
};

export const MOCK_SHOWS: Show[] = [
  {
    id: 's1',
    title: 'Mangkal Pagi Ryo',
    host: 'Ryo Wicaksono',
    time: '06:00 - 10:00',
    imageUrl: 'https://picsum.photos/id/64/400/400',
    description: 'Semangat pagi bareng Ryo dengan lagu-lagu hits dan info terkini!'
  },
  {
    id: 's2',
    title: 'Sunset Trip',
    host: 'Julio & Genus',
    time: '16:00 - 20:00',
    imageUrl: 'https://picsum.photos/id/91/400/400',
    description: 'Teman perjalanan pulang kantor dengan candaan seru.'
  },
  {
    id: 's3',
    title: 'Night Shift',
    host: 'Eda Dharmawan',
    time: '20:00 - 24:00',
    imageUrl: 'https://picsum.photos/id/129/400/400',
    description: 'Request lagu favorit lo buat nemenin malam santai.'
  },
  {
    id: 's4',
    title: 'Prambors Top 40',
    host: 'Hanny Dini',
    time: 'Sabtu, 16:00',
    imageUrl: 'https://picsum.photos/id/145/400/400',
    description: '40 Lagu teratas minggu ini yang paling banyak direquest Kawula Muda.'
  },
  {
    id: 's5',
    title: 'Weekend Vibes',
    host: 'Cia Wardhana',
    time: 'Minggu, 10:00',
    imageUrl: 'https://picsum.photos/id/158/400/400',
    description: 'Nemenin hari minggu lo biar makin chill dan asik.'
  },
  {
    id: 's6',
    title: 'DJ Show: Electronic City',
    host: 'DJ Pallas',
    time: 'Jumat, 22:00',
    imageUrl: 'https://picsum.photos/id/180/400/400',
    description: 'Party dari rumah dengan mix lagu-lagu EDM terbaik.'
  }
];

export const MOCK_PODCASTS: PodcastEpisode[] = [
  {
    id: 'p1',
    title: 'Curhat Babu: Dilema Gen Z',
    category: 'Lifestyle',
    date: '2 Hari Lalu',
    duration: '45 Min',
    imageUrl: 'https://picsum.photos/id/145/300/300'
  },
  {
    id: 'p2',
    title: 'Horor Story: Misteri Kantor Lama',
    category: 'Horror',
    date: '3 Hari Lalu',
    duration: '32 Min',
    imageUrl: 'https://picsum.photos/id/231/300/300'
  },
  {
    id: 'p3',
    title: 'Review Film: Oppenheimer vs Barbie',
    category: 'Entertainment',
    date: '1 Minggu Lalu',
    duration: '50 Min',
    imageUrl: 'https://picsum.photos/id/338/300/300'
  },
  {
    id: 'p4',
    title: 'Klub Buku: Novel Best Seller 2024',
    category: 'Lifestyle',
    date: '5 Hari Lalu',
    duration: '38 Min',
    imageUrl: 'https://picsum.photos/id/1011/300/300'
  },
  {
    id: 'p5',
    title: 'Stand Up Indo: Lucu-lucuan Aja',
    category: 'Comedy',
    date: '1 Hari Lalu',
    duration: '55 Min',
    imageUrl: 'https://picsum.photos/id/1025/300/300'
  },
  {
    id: 'p6',
    title: 'Tech Talk: AI Mengambil Alih?',
    category: 'Talkshow',
    date: '12 Jam Lalu',
    duration: '60 Min',
    imageUrl: 'https://picsum.photos/id/1074/300/300'
  }
];

export const MOCK_NEWS: NewsItem[] = [
  {
    id: 'n1',
    title: 'Coldplay Konfirmasi Konser 6 Hari di Jakarta!',
    category: 'Music News',
    date: '1 Jam Lalu',
    imageUrl: 'https://picsum.photos/id/400/800/600',
    excerpt: 'Setelah antusiasme yang luar biasa, promotor akhirnya menambah jadwal konser menjadi total 6 hari di GBK. Siap-siap war tiket lagi!'
  },
  {
    id: 'n2',
    title: '5 Tempat Hangout Hidden Gem di Jaksel',
    category: 'Lifestyle',
    date: '4 Jam Lalu',
    imageUrl: 'https://picsum.photos/id/435/600/400',
    excerpt: 'Bosen ke mall? Cek rekomendasi tempat nongkrong asik, murah, dan aesthetic di Jakarta Selatan buat malam minggu lo.'
  },
  {
    id: 'n3',
    title: 'Lineup Fase 1 We The Fest 2024 Diumumkan!',
    category: 'Event Update',
    date: '6 Jam Lalu',
    imageUrl: 'https://picsum.photos/id/449/600/400',
    excerpt: 'Ada The 1975, The Strokes, dan banyak lagi musisi internasional keren yang bakal guncang Jakarta tahun ini.'
  },
  {
    id: 'n4',
    title: 'Film "Barbie" Pecahkan Rekor Box Office Global',
    category: 'Pop Culture',
    date: '1 Hari Lalu',
    imageUrl: 'https://picsum.photos/id/338/600/400',
    excerpt: 'Margot Robbie sukses membawa boneka ikonik ini hidup di layar lebar dan meraup pendapatan fantastis di minggu pertama.'
  },
  {
    id: 'n5',
    title: 'iPhone 15 Rilis: Pakai USB-C Akhirnya!',
    category: 'Tech',
    date: '2 Hari Lalu',
    imageUrl: 'https://picsum.photos/id/3/600/400',
    excerpt: 'Apple akhirnya menyerah pada regulasi EU dan mengganti port lightning legendaris mereka dengan USB-C.'
  },
  {
    id: 'n6',
    title: 'Jungkook BTS Rilis Album Solo "Golden"',
    category: 'K-Pop',
    date: '2 Hari Lalu',
    imageUrl: 'https://picsum.photos/id/331/600/400',
    excerpt: 'Golden Maknae BTS ini siap mendominasi chart global dengan album solo perdananya yang full bahasa Inggris.'
  },
  {
    id: 'n7',
    title: 'Resep Viral: Seblak Coet Rafael Tan',
    category: 'Viral',
    date: '3 Hari Lalu',
    imageUrl: 'https://picsum.photos/id/493/600/400',
    excerpt: 'Kerupuk mawar belum direbus? Cobain resep seblak viral yang bikin nagih dan gampang banget dibuat di kosan.'
  },
  {
    id: 'n8',
    title: 'Tips Hemat Buat Mahasiswa Baru',
    category: 'Lifestyle',
    date: '4 Hari Lalu',
    imageUrl: 'https://picsum.photos/id/531/600/400',
    excerpt: 'Jangan boros di awal bulan! Ikuti tips mengatur keuangan biar nggak makan mie instan terus di akhir bulan.'
  }
];

export const MOCK_CHART: ChartItem[] = [
  {
    rank: 1,
    trend: 'same',
    song: { id: 'c1', title: 'Seven', artist: 'Jungkook ft. Latto', coverUrl: 'https://picsum.photos/id/500/300/300', duration: '3:04', audioUrl: SAMPLE_AUDIO }
  },
  {
    rank: 2,
    trend: 'up',
    song: { id: 'c2', title: 'Super Shy', artist: 'NewJeans', coverUrl: 'https://picsum.photos/id/501/300/300', duration: '2:35', audioUrl: SAMPLE_AUDIO_2 }
  },
  {
    rank: 3,
    trend: 'down',
    song: { id: 'c3', title: 'Vampire', artist: 'Olivia Rodrigo', coverUrl: 'https://picsum.photos/id/502/300/300', duration: '3:40', audioUrl: SAMPLE_AUDIO }
  },
  {
    rank: 4,
    trend: 'new',
    song: { id: 'c4', title: 'Paint The Town Red', artist: 'Doja Cat', coverUrl: 'https://picsum.photos/id/503/300/300', duration: '3:51', audioUrl: SAMPLE_AUDIO_2 }
  },
  {
    rank: 5,
    trend: 'up',
    song: { id: 'c5', title: 'Cruel Summer', artist: 'Taylor Swift', coverUrl: 'https://picsum.photos/id/504/300/300', duration: '2:58', audioUrl: SAMPLE_AUDIO }
  },
  {
    rank: 6,
    trend: 'down',
    song: { id: 'c6', title: 'What Was I Made For?', artist: 'Billie Eilish', coverUrl: 'https://picsum.photos/id/505/300/300', duration: '3:42', audioUrl: SAMPLE_AUDIO_2 }
  },
  {
    rank: 7,
    trend: 'same',
    song: { id: 'c7', title: 'Flowers', artist: 'Miley Cyrus', coverUrl: 'https://picsum.photos/id/506/300/300', duration: '3:21', audioUrl: SAMPLE_AUDIO }
  },
  {
    rank: 8,
    trend: 'new',
    song: { id: 'c8', title: 'Dance The Night', artist: 'Dua Lipa', coverUrl: 'https://picsum.photos/id/507/300/300', duration: '2:56', audioUrl: SAMPLE_AUDIO_2 }
  },
  {
    rank: 9,
    trend: 'up',
    song: { id: 'c9', title: 'Kill Bill', artist: 'SZA', coverUrl: 'https://picsum.photos/id/508/300/300', duration: '2:35', audioUrl: SAMPLE_AUDIO }
  },
  {
    rank: 10,
    trend: 'down',
    song: { id: 'c10', title: 'As It Was', artist: 'Harry Styles', coverUrl: 'https://picsum.photos/id/509/300/300', duration: '2:47', audioUrl: SAMPLE_AUDIO_2 }
  },
  {
    rank: 11,
    trend: 'same',
    song: { id: 'c11', title: 'Anti-Hero', artist: 'Taylor Swift', coverUrl: 'https://picsum.photos/id/510/300/300', duration: '3:21', audioUrl: SAMPLE_AUDIO }
  },
  {
    rank: 12,
    trend: 'new',
    song: { id: 'c12', title: 'Bad Idea Right?', artist: 'Olivia Rodrigo', coverUrl: 'https://picsum.photos/id/511/300/300', duration: '3:05', audioUrl: SAMPLE_AUDIO_2 }
  }
];

export const MOCK_VOTING = [
  { id: 'v1', title: 'Better', artist: 'Zayn', votes: 1240 },
  { id: 'v2', title: 'Used To Be Young', artist: 'Miley Cyrus', votes: 980 },
  { id: 'v3', title: 'Single Soon', artist: 'Selena Gomez', votes: 850 },
  { id: 'v4', title: 'Rush', artist: 'Troye Sivan', votes: 720 },
];

export const MOCK_POLL = {
  question: 'Siapa artis tamu yang lo pengen banget dateng ke Prambors minggu depan?',
  options: [
    { id: 'o1', text: 'Sheila on 7', votes: 45 },
    { id: 'o2', text: 'Tulus', votes: 30 },
    { id: 'o3', text: 'Nadin Amizah', votes: 15 },
    { id: 'o4', text: 'Hindia', votes: 10 },
  ]
};

export const MOCK_NETWORKS = [
  { city: 'Jakarta', freq: '102.2 FM' },
  { city: 'Bandung', freq: '98.4 FM' },
  { city: 'Surabaya', freq: '89.3 FM' },
  { city: 'Medan', freq: '97.5 FM' },
  { city: 'Makassar', freq: '105.1 FM' },
  { city: 'Yogyakarta', freq: '95.8 FM' },
  { city: 'Semarang', freq: '102.0 FM' },
  { city: 'Solo', freq: '99.2 FM' },
  { city: 'Manado', freq: '103.6 FM' },
];