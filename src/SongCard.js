import React, { useEffect, useRef } from 'react';
import './SongCard.css';

const SongCard = ({ song }) => {
  const audioRef = useRef();

  useEffect(() => {
    if (audioRef.current && song) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [song]);

  if (!song) return null;

  return (
    <div className="song-card">
      <img src={song.cover} alt={song.title} className="cover-img" />
      <h2>{song.title}</h2>
      <p>By {song.artist}</p>
      <audio ref={audioRef} controls>
        <source src={song.audio} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default SongCard;
