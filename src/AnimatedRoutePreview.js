import React, { useState, useEffect, useRef } from 'react';
import { DollarSign, Clock, Footprints, Camera, Coffee, Book, ZoomIn, ZoomOut, Sun, Cloud, CloudRain } from 'lucide-react';

const AnimatedRoutePreview = () => {
  const [currentStop, setCurrentStop] = useState(0);
  const [showSpendingInfo, setShowSpendingInfo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const svgRef = useRef(null);

  const stops = [
    { name: "Start/End", x: 50, y: 350, spending: 0, time: 0, steps: 0, category: 'general', icon: Footprints, weather: 'sunny' },
    { name: "Fountain Square", x: 50, y: 50, spending: 25, time: 30, steps: 2000, category: 'sightseeing', icon: Camera, weather: 'cloudy' },
    { name: "Coffee Emporium", x: 350, y: 50, spending: 15, time: 20, steps: 1000, category: 'food', icon: Coffee, weather: 'sunny' },
    { name: "Ohio Book Store", x: 350, y: 200, spending: 40, time: 45, steps: 1500, category: 'shopping', icon: Book, weather: 'rainy' },
    { name: "Fountain Square", x: 200, y: 350, spending: 20, time: 25, steps: 1800, category: 'sightseeing', icon: Camera, weather: 'cloudy' },
  ];

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStop((prevStop) => (prevStop + 1) % stops.length);
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const getPathCoordinates = () => {
    return stops.map(stop => `${stop.x},${stop.y}`).join(" L ");
  };

  const filteredStops = selectedCategory === 'all' ? stops : stops.filter(stop => stop.category === selectedCategory);

  const totalSpending = filteredStops.reduce((sum, stop) => sum + stop.spending, 0);
  const totalTime = filteredStops.reduce((sum, stop) => sum + stop.time, 0);
  const totalSteps = filteredStops.reduce((sum, stop) => sum + stop.steps, 0);

  const handleWheel = (e) => {
    e.preventDefault();
    const newZoom = zoom * (e.deltaY > 0 ? 0.9 : 1.1);
    setZoom(Math.min(Math.max(newZoom, 0.5), 3));
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      setPanOffset({ x: panOffset.x + dx, y: panOffset.y + dy });
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowRight':
        setCurrentStop((prevStop) => (prevStop + 1) % stops.length);
        break;
      case 'ArrowLeft':
        setCurrentStop((prevStop) => (prevStop - 1 + stops.length) % stops.length);
        break;
      case '+':
        setZoom(Math.min(zoom * 1.1, 3));
        break;
      case '-':
        setZoom(Math.max(zoom * 0.9, 0.5));
        break;
      default:
        break;
    }
  };

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case 'sunny': return <Sun size={16} color="#FFD700" />;
      case 'cloudy': return <Cloud size={16} color="#A9A9A9" />;
      case 'rainy': return <CloudRain size={16} color="#4682B4" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md" onKeyDown={handleKeyDown} tabIndex="0">
      <h3 className="text-xl font-bold mb-4 text-center">Urban Hike Route Preview</h3>
      <div className="flex justify-center space-x-2 mb-4">
        <button onClick={() => setSelectedCategory('all')} className={`px-2 py-1 rounded ${selectedCategory === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>All</button>
        <button onClick={() => setSelectedCategory('sightseeing')} className={`px-2 py-1 rounded ${selectedCategory === 'sightseeing' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Sightseeing</button>
        <button onClick={() => setSelectedCategory('food')} className={`px-2 py-1 rounded ${selectedCategory === 'food' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Food</button>
        <button onClick={() => setSelectedCategory('shopping')} className={`px-2 py-1 rounded ${selectedCategory === 'shopping' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Shopping</button>
      </div>
      <div className="relative overflow-hidden" style={{ height: '400px' }}>
        <svg 
          viewBox="0 0 400 400" 
          className="w-full h-full"
          ref={svgRef}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <g transform={`translate(${panOffset.x},${panOffset.y}) scale(${zoom})`}>
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#eee" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="400" height="400" fill="url(#grid)" />

            <path
              d={`M ${getPathCoordinates()}`}
              fill="none"
              stroke="#3B82F6"
              strokeWidth="4"
              className="route-animation"
            />

            {filteredStops.map((stop, index) => (
              <g key={index} className="stop-group" onClick={() => setShowSpendingInfo(index)}>
                <circle
                  cx={stop.x}
                  cy={stop.y}
                  r={currentStop === index ? 8 : 6}
                  fill={currentStop === index ? "#FCD34D" : "#9CA3AF"}
                  className="stop-circle"
                />
                <text x={stop.x + 10} y={stop.y - 10} fontSize="12" fill={currentStop === index ? "#000" : "#4B5563"}>
                  {stop.name}
                </text>
                {React.createElement(stop.icon, { x: stop.x - 20, y: stop.y - 20, size: 16, color: "#4B5563" })}
                <g transform={`translate(${stop.x + 20}, ${stop.y - 20})`}>
                  {getWeatherIcon(stop.weather)}
                </g>
                {showSpendingInfo === index && (
                  <g>
                    <rect x={stop.x - 50} y={stop.y + 15} width="100" height="60" rx="5" fill="#FCD34D" />
                    <text x={stop.x} y={stop.y + 32} fontSize="12" textAnchor="middle" fill="#000">
                      ${stop.spending}
                    </text>
                    <text x={stop.x} y={stop.y + 48} fontSize="12" textAnchor="middle" fill="#000">
                      {stop.time} min
                    </text>
                    <text x={stop.x} y={stop.y + 64} fontSize="12" textAnchor="middle" fill="#000">
                      {stop.steps} steps
                    </text>
                  </g>
                )}
              </g>
            ))}
          </g>
        </svg>
      </div>
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>Total Spending: ${totalSpending} | Total Time: {totalTime} min | Total Steps: {totalSteps}</p>
        <div className="flex justify-center space-x-2 mt-2">
          <button onClick={() => setIsPlaying(!isPlaying)} className="px-4 py-2 bg-blue-500 text-white rounded">
            {isPlaying ? 'Pause' : 'Play'} Animation
          </button>
          <button onClick={() => setZoom(Math.min(zoom * 1.1, 3))} className="px-4 py-2 bg-gray-200 rounded">
            <ZoomIn size={16} />
          </button>
          <button onClick={() => setZoom(Math.max(zoom * 0.9, 0.5))} className="px-4 py-2 bg-gray-200 rounded">
            <ZoomOut size={16} />
          </button>
        </div>
      </div>
      <div className="mt-2 text-center text-xs text-gray-500">
        Use arrow keys to navigate stops, +/- to zoom, or click and drag to pan
      </div>
      <style jsx>{`
        .route-animation {
          stroke-dasharray: 1400;
          stroke-dashoffset: 1400;
          animation: draw 15s linear forwards infinite;
          animation-play-state: ${isPlaying ? 'running' : 'paused'};
        }
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
        .stop-circle {
          transition: all 0.3s ease;
        }
        .stop-group:hover .stop-circle {
          r: 8;
          fill: #FCD34D;
        }
      `}</style>
    </div>
  );
};

export default AnimatedRoutePreview; 