import React, { useEffect, useState } from 'react';
import './Loader.scss'; // Import the CSS file for custom styles

const Loader = () => {
  const [audioPlayed, setAudioPlayed] = useState(false);

  useEffect(() => {
    if (!audioPlayed) {
      // Play the Netflix sound if it hasn't been played yet
      const audio = new Audio('/netflix.mp3'); // Update the path accordingly
      audio.play();
      setAudioPlayed(true);
    }
  }, [audioPlayed]);

  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
}

export default Loader;

