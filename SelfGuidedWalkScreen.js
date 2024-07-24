import React, { useState } from 'react';
import { Play, Pause, Stop, Camera, Info } from 'lucide-react';

const SelfGuidedWalkScreen = () => {
  const [isWalking, setIsWalking] = useState(false);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);

  const toggleWalk = () => setIsWalking(!isWalking);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-yellow-600">Self-Guided Walk</h1>
      </header>

      <main>
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="bg-gray-200 h-64 rounded flex items-center justify-center mb-4">
            <span className="text-gray-500">Interactive Map</span>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-600">Distance</p>
              <p className="text-xl font-bold">{distance.toFixed(2)} km</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Time</p>
              <p className="text-xl font-bold">{Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}</p>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button 
              className={`p-4 rounded-full ${isWalking ? 'bg-yellow-500' : 'bg-green-500'} text-white`}
              onClick={toggleWalk}
            >
              {isWalking ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button className="p-4 rounded-full bg-red-500 text-white">
              <Stop size={24} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="bg-blue-500 text-white p-4 rounded-lg shadow flex items-center justify-center">
            <Camera size={24} className="mr-2" />
            <span>Take Photo</span>
          </button>
          <button className="bg-green-500 text-white p-4 rounded-lg shadow flex items-center justify-center">
            <Info size={24} className="mr-2" />
            <span>Points of Interest</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default SelfGuidedWalkScreen;