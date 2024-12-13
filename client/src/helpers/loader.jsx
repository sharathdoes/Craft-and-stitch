// components/LottieLoader.jsx
import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '../components/some.json'; // Your Lottie JSON file

const LottieLoader = () => {
  return (
    <div className="bg-[#2596be]" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Player
        autoplay
        loop
        src={animationData}
        style={{ height: '200px', width: '200px' }}
      />
    </div>
  );
};

export default LottieLoader;
