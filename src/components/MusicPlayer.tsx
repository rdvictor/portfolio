import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, SkipForward, SkipBack } from 'lucide-react';

const SONGS = [
  {
    title: "Family Matters (OPIUM)",
    artist: "Drake",
    url: "./public/opium.mp3",
    cover: "./public/music/cover.jpg"
  },
  {
    title: "I Could Never",
    artist: "Drake",
    url: "./public/never.mp3",
    cover: "./public/music/cover.jpg"
  }
];

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, []);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setError(null);
    }
  };

  const handleError = () => {
    setError('Error loading audio file');
    setIsPlaying(false);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? volume / 100 : 0;
    }
  };

  const togglePlayPause = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          await audioRef.current.pause();
        } else {
          await audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
        setError(null);
      } catch (err) {
        setError('Playback failed');
        setIsPlaying(false);
      }
    }
  };

  const playNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % SONGS.length);
    setIsPlaying(true);
  };

  const playPrevious = () => {
    setCurrentSongIndex((prev) => (prev - 1 + SONGS.length) % SONGS.length);
    setIsPlaying(true);
  };

  const currentSong = SONGS[currentSongIndex];

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        src={currentSong.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onError={handleError}
        onEnded={playNext}
        autoPlay={true}
      />
      <div className="music-player-container">
        {/* Album Cover */}
        <div className="w-12 h-12 mr-4">
          <img 
            src={currentSong.cover}
            alt={`${currentSong.title} cover`}
            className="w-full h-full object-cover rounded"
          />
        </div>

        {/* Controls and Song Info */}
        <div className="flex-1 mx-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <button 
                  onClick={playPrevious}
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  <SkipBack size={20} />
                </button>
                <button 
                  onClick={togglePlayPause}
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <button 
                  onClick={playNext}
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  <SkipForward size={20} />
                </button>
              </div>
              
              <div className="ml-4 text-sm">
                <p className="font-medium">{currentSong.title}</p>
                <p className="opacity-60">{currentSong.artist}</p>
                {error && <p className="text-red-500 text-xs">{error}</p>}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 text-xs">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1 bg-[var(--primary)] bg-opacity-20 rounded-full appearance-none cursor-pointer"
              style={{height: '1px'}}
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleMute}
            className="hover:text-[var(--primary)] transition-colors"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <div className="volume-control">
            <input
              type="range"
              height="1px"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="volume-slider"
              style={{height: '1px'}}
            />
            <span className="volume-value">{isMuted ? 0 : volume}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;