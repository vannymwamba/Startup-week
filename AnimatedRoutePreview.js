import React, { useState, useRef, useMemo } from 'react';
import { MapPin, Clock, Footprints, Coffee, ShoppingBag, DollarSign, Users } from 'lucide-react';

const AnimatedRoutePreview = () => {
  const [selectedRoute, setSelectedRoute] = useState('orange');
  const [groupSize, setGroupSize] = useState(4);
  const svgRef = useRef(null);

  const routes = {
    orange: { distance: '1.5 mi', time: '30 mins', color: '#FFA500', spending: 15 },
    green: { distance: '2.5 mi', time: '50 mins', color: '#4CAF50', spending: 25 },
    pink: { distance: '3.5 mi', time: '70 mins', color: '#FF69B4', spending: 35 },
  };

  const stops = [
    { name: "City Hall", x: 100, y: 150, type: 'landmark' },
    { name: "Arts Library", x: 250, y: 150, type: 'landmark' },
    { name: "Local Cafe", x: 200, y: 100, type: 'cafe' },
    { name: "Fountain Square", x: 175, y: 225, type: 'landmark' },
    { name: "Artisan Market", x: 300, y: 200, type: 'shop' },
    { name: "History Museum", x: 150, y: 275, type: 'museum' },
    { name: "Taft Theatre", x: 325, y: 300, type: 'landmark' },
    { name: "Freedom Center", x: 75, y: 325, type: 'landmark' },
    { name: "Riverfront Park", x: 350, y: 350, type: 'landmark' },
  ];

  const yearlySpending = useMemo(() => {
    const weeklySpending = routes[selectedRoute].spending * groupSize;
    return weeklySpending * 52; // 52 weeks in a year
  }, [selectedRoute, groupSize]);

  const getPathCoordinates = () => {
    return stops.map(stop => `${stop.x},${stop.y}`).join(" L ");
  };

  const getIcon = (type) => {
    switch(type) {
      case 'cafe': return <Coffee size={16} />;
      case 'shop': return <ShoppingBag size={16} />;
      default: return <MapPin size={16} />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-3xl font-bold mb-4 text-center text-purple-800">GoVibrant Downtown</h3>
      <p className="text-xl text-center mb-6">Explore, Learn, and Boost Local Economy!</p>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">1. CHOOSE YOUR ROUTE</h4>
          <div className="flex flex-col space-y-2 mt-2">
            {Object.entries(routes).map(([key, route]) => (
              <button
                key={key}
                onClick={() => setSelectedRoute(key)}
                className={`px-3 py-2 rounded text-white transition-all ${selectedRoute === key ? 'ring-2 ring-black scale-105' : 'hover:scale-105'}`}
                style={{ backgroundColor: route.color }}
              >
                {route.distance} - {route.time}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">2. SET YOUR GROUP SIZE</h4>
          <div className="flex items-center space-x-4">
            <Users size={24} />
            <input
              type="range"
              min="1"
              max="10"
              value={groupSize}
              onChange={(e) => setGroupSize(parseInt(e.target.value))}
              className="w-full"
            />
            <span className="font-bold">{groupSize}</span>
          </div>
          <p className="mt-4 text-lg font-bold">Estimated Yearly Spending:</p>
          <p className="text-2xl font-bold text-green-600">${yearlySpending.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Based on weekly walks for one year</p>
        </div>
      </div>

      <div className="relative" style={{ height: '500px', backgroundColor: '#f0f0f0' }}>
        <svg 
          viewBox="0 0 400 400" 
          className="w-full h-full"
          ref={svgRef}
        >
          {/* Simplified city grid */}
          <path d="M 50 50 H 350 M 50 150 H 350 M 50 250 H 350 M 50 350 H 350 M 50 50 V 350 M 150 50 V 350 M 250 50 V 350 M 350 50 V 350" 
                stroke="#ccc" strokeWidth="1" />

          {/* Route path */}
          <path
            d={`M ${getPathCoordinates()}`}
            fill="none"
            stroke={routes[selectedRoute].color}
            strokeWidth="4"
            className="route-animation"
          />

          {/* Stops */}
          {stops.map((stop, index) => (
            <g key={index}>
              <circle
                cx={stop.x}
                cy={stop.y}
                r={8}
                fill={routes[selectedRoute].color}
                className="stop-pulse"
              />
              <title>{stop.name}</title>
              <foreignObject x={stop.x - 10} y={stop.y - 10} width="20" height="20">
                <div className="flex items-center justify-center w-full h-full text-white">
                  {getIcon(stop.type)}
                </div>
              </foreignObject>
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-6 flex justify-between text-sm bg-gray-100 p-4 rounded-lg">
        <div className="flex items-center">
          <MapPin size={20} className="mr-2 text-blue-600" />
          <span className="font-semibold">{routes[selectedRoute].distance}</span>
        </div>
        <div className="flex items-center">
          <Clock size={20} className="mr-2 text-green-600" />
          <span className="font-semibold">{routes[selectedRoute].time}</span>
        </div>
        <div className="flex items-center">
          <Footprints size={20} className="mr-2 text-purple-600" />
          <span className="font-semibold">Walk or Run</span>
        </div>
        <div className="flex items-center">
          <DollarSign size={20} className="mr-2 text-red-600" />
          <span className="font-semibold">${routes[selectedRoute].spending}/person (est.)</span>
        </div>
      </div>

      <style jsx>{`
        .route-animation {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw 15s linear forwards infinite;
        }
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
        .stop-pulse {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedRoutePreview;