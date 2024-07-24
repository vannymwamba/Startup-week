import React, { useState } from 'react';
import { Users } from 'lucide-react';

// Import the guide photos
import guidePhoto1 from './images/Vanny.jpeg';
import guidePhoto2 from './images/Vanny.jpeg';
import guidePhoto3 from './images/Vanny.jpeg';

const GroupWalkScreen = () => {
  const [guidedWalks, setGuidedWalks] = useState([
    {
      id: 1,
      title: "Morning Heritage Walk",
      time: "10:00 AM",
      spots: 18,
      guide: {
        name: "Vanny Mwamba",
        photo: guidePhoto1,
        description: "History buff and architecture enthusiast"
      }
    },
    {
      id: 2,
      title: "Afternoon Food Tour",
      time: "2:00 PM",
      spots: 16,
      guide: {
        name: "Vanny Mwamba ",
        photo: guidePhoto2,
        description: "Local foodie and culinary expert"
      }
    },
    {
      id: 3,
      title: "Sunset Art Walk",
      time: "6:00 PM",
      spots: 14,
      guide: {
        name: "Vanny Mwamba",
        photo: guidePhoto3,
        description: "Artist and longtime Cincinnati resident"
      }
    }
  ]);

  const handleJoinWalk = (walkId) => {
    setGuidedWalks(walks =>
      walks.map(walk =>
        walk.id === walkId
          ? { ...walk, spots: Math.max(0, walk.spots - 1) }
          : walk
      )
    );
  };

  return (
    <div className="space-y-6 bg-black text-yellow-400 p-6 rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Group Walks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guidedWalks.map((walk) => (
          <div key={walk.id} className="bg-yellow-400 p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
            <div className="flex items-center mb-4">
              <img src={walk.guide.photo} alt={walk.guide.name} className="w-12 h-12 rounded-full mr-4 object-cover" />
              <div>
                <h4 className="font-semibold text-black">{walk.guide.name}</h4>
                <p className="text-sm text-gray-800">{walk.guide.description}</p>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-black mb-2">{walk.title}</h3>
            <p className="text-sm text-gray-800 mb-1">{walk.time}</p>
            <p className="text-xs text-gray-700 mb-4">{walk.spots} spots left</p>
            <button 
              className="w-full bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              onClick={() => handleJoinWalk(walk.id)}
              disabled={walk.spots === 0}
            >
              {walk.spots > 0 ? 'Join Walk' : 'Fully Booked'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupWalkScreen;