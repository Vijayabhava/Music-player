import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const songs = [
  {
    title: 'Midnight Vibes',
    artist: 'DJ Moonlight',
    audio: process.env.PUBLIC_URL + '/songs/song1.mp3',
    cover: process.env.PUBLIC_URL + '/covers/cover1.jpg',
  },
  {
    title: 'Electric Dreams',
    artist: 'SynthWave',
    audio: process.env.PUBLIC_URL + '/songs/song2.mp3',
    cover: process.env.PUBLIC_URL + '/covers/cover2.jpg',
  },
  {
    title: 'Lo-Fi Chill',
    artist: 'Sleepy Beats',
    audio: process.env.PUBLIC_URL + '/songs/song3.mp3',
    cover: process.env.PUBLIC_URL + '/covers/cover3.jpg',
  },
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const audioRef = useRef(null);

  const current = songs[currentIndex];

  const playNext = () => {
    setHistory((prev) => [...prev, currentIndex]);
    setCurrentIndex((prev) => (prev + 1) % songs.length);
  };

  const playPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const seekForward = () => {
    audioRef.current.currentTime += 10;
  };

  const seekBackward = () => {
    audioRef.current.currentTime -= 10;
  };

  const handlePlayFromHistory = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const card = document.querySelector('.song-card');

card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left; // mouse X inside card
  const y = e.clientY - rect.top;  // mouse Y inside card

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) / centerY) * 5; // max 5deg
  const rotateY = ((x - centerX) / centerX) * 5;

  card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
});

card.addEventListener('mouseleave', () => {
  card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
});

    const audio = audioRef.current;
    const handleCanPlay = () => {
      audio.play().catch((err) => console.warn('Autoplay error:', err));
      audio.removeEventListener('loadeddata', handleCanPlay);
    };
    audio.addEventListener('loadeddata', handleCanPlay);
    audio.load();
  }, [currentIndex]);
  useEffect(() => {
    const bubbleCount = 20;
    const container = document.createElement('div');
    container.className = 'bubble-container';
  
    for (let i = 0; i < bubbleCount; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.animationDuration = `${4 + Math.random() * 6}s`;
      bubble.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(bubble);
    }
  
    document.body.appendChild(container);

    
  
    return () => {
      document.body.removeChild(container);
    };
  }, []);
  

  return (
    <div className="app">
      <h1 className="glow-title">🎧 Smooth Player</h1>

      <div className="song-card">
        <img src={current.cover} alt={current.title} className="cover-image" />
        <h2 className="song-title">{current.title}</h2>
        <h3 className="song-artist">{current.artist}</h3>

        <div className="audio-wrapper">
          <audio ref={audioRef} className="audio-player" controls>
            <source src={current.audio} type="audio/mpeg" />
          </audio>
        </div>

        <div className="controls">
          <button onClick={playPrevious} className="icon-btn" title="Previous Song">⏪</button>
          <button onClick={seekBackward} className="icon-btn" title="-10 seconds">⏮️ 10s</button>
          <button onClick={seekForward} className="icon-btn" title="+10 seconds">10s ⏭️</button>
          <button onClick={playNext} className="icon-btn" title="Next Song">⏩</button>
        </div>
     


        <div className="bubbles">
  {[...Array(20)].map((_, i) => (
    <div
      className="bubble"
      key={i}
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 10}s`,
        width: `${10 + Math.random() * 20}px`,
        height: `${10 + Math.random() * 20}px`,
        fontSize: `${12 + Math.random() * 8}px`,
      }}
    >
      🎵
    </div>
  ))}
</div>

        <div className="music-notes">
  {[...Array(15)].map((_, i) => (
    <div
      className="note"
      key={i}
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
      }}
    >
      🎵
    </div>
  ))}
</div>




        <button className="icon-btn toggle-history" onClick={() => setShowHistory(!showHistory)}>
          {showHistory ? '⬆️ Hide History' : '⬇️ Show Played Songs'}
        </button>

        {showHistory && (
          <div className="history-list">
            <h4>🕘 Recently Played</h4>
            <ul>
              {history.map((idx, i) => (
                <li key={i} onClick={() => handlePlayFromHistory(idx)}>
                  🎵 {songs[idx].title} - <em>{songs[idx].artist}</em>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <footer>Made with ❤️ by Sumit</footer>
    </div>
  );
}

export default App;
