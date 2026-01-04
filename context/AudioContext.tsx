import React, { createContext, useContext, useState, ReactNode, useRef, useEffect } from 'react';
import { Song, PlayerState } from '../types';
import { MOCK_NOW_PLAYING } from '../constants';

interface AudioContextType {
  isPlaying: boolean;
  currentSong: Song | null;
  volume: number;
  playerState: PlayerState;
  playSong: (song: Song) => void;
  togglePlay: () => void;
  setVolume: (vol: number) => void;
  isLive: boolean;
  setIsLive: (live: boolean) => void;
  duration: number;
  currentTime: number;
  seek: (time: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(MOCK_NOW_PLAYING);
  const [volume, setVolume] = useState(0.8);
  const [playerState, setPlayerState] = useState<PlayerState>(PlayerState.PAUSED);
  const [isLive, setIsLive] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(new Audio());

  // Setup event listeners and volume
  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const onEnded = () => {
        setIsPlaying(false);
        setPlayerState(PlayerState.PAUSED);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  // Handle Song Changes
  useEffect(() => {
    if (currentSong?.audioUrl) {
      audioRef.current.src = currentSong.audioUrl;
      // Only auto-play if the user initiated an action (like clicking playSong)
      // or if we want continuous playback. For now, we trust playSong to set isPlaying=true
    }
  }, [currentSong]);

  // Handle Play/Pause State
  useEffect(() => {
    if (isPlaying) {
      // Small promise handling to avoid "play request interrupted" errors
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Playback failed or was interrupted:", error);
          setIsPlaying(false);
          setPlayerState(PlayerState.PAUSED);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]); // Dependency on currentSong ensures we try to play when song changes if isPlaying is true

  // Handle Volume Change
  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const playSong = (song: Song) => {
    // If clicking same song, just toggle
    if (currentSong?.id === song.id) {
        togglePlay();
        return;
    }

    setCurrentSong(song);
    setIsPlaying(true);
    setPlayerState(PlayerState.PLAYING);
    setIsLive(song.duration === 'Live');
  };

  const togglePlay = () => {
    setIsPlaying((prev) => {
      const newState = !prev;
      setPlayerState(newState ? PlayerState.PLAYING : PlayerState.PAUSED);
      return newState;
    });
  };

  const seek = (time: number) => {
    if (audioRef.current) {
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        currentSong,
        volume,
        playerState,
        playSong,
        togglePlay,
        setVolume,
        isLive,
        setIsLive,
        duration,
        currentTime,
        seek
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};