import { useCallback, useRef, useState } from 'react';

// Simple sound effect generator using Web Audio API
const createAudioContext = () => {
  return new (window.AudioContext || (window as any).webkitAudioContext)();
};

export const useSoundEffects = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = createAudioContext();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    if (isMuted) return;
    
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio not supported
    }
  }, [isMuted, getAudioContext]);

  const playMoveSound = useCallback(() => {
    playTone(600, 0.1, 'sine');
  }, [playTone]);

  const playWinSound = useCallback(() => {
    if (isMuted) return;
    
    try {
      const audio = new Audio('/sounds/win-sound.mp3');
      audio.volume = 0.5;
      audio.play();
    } catch (e) {
      // Fallback to generated sound if file doesn't load
      setTimeout(() => playTone(523, 0.15, 'sine'), 0);
      setTimeout(() => playTone(659, 0.15, 'sine'), 150);
      setTimeout(() => playTone(784, 0.3, 'sine'), 300);
    }
  }, [isMuted, playTone]);

  const playLoseSound = useCallback(() => {
    if (isMuted) return;
    
    try {
      const audio = new Audio('/sounds/lose-sound.mp3');
      audio.volume = 0.5;
      audio.play();
    } catch (e) {
      // Fallback to sad tone
      playTone(200, 0.4, 'triangle');
    }
  }, [isMuted, playTone]);

  const playDrawSound = useCallback(() => {
    playTone(300, 0.3, 'triangle');
  }, [playTone]);

  const playClickSound = useCallback(() => {
    playTone(800, 0.05, 'square');
  }, [playTone]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  return {
    isMuted,
    toggleMute,
    playMoveSound,
    playWinSound,
    playLoseSound,
    playDrawSound,
    playClickSound,
  };
};
