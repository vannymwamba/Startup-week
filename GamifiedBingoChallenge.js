import React, { useState } from 'react';

const GamifiedBingoChallenge = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const tasks = [
    'Spot a mural', 'Visit a local cafe', 'Take a selfie with a landmark',
    'Attend a street performance', 'Try a local delicacy', 'Identify 3 types of architecture',
    'Find a hidden park', 'Spot 5 different birds', 'Learn a historical fact'
  ];

  const leaderboard = [
    { name: "Alex", points: 75 },
    { name: "Sam", points: 60 },
    { name: "Jordan", points: 45 },
  ];

  const toggleTask = (index) => {
    setCompletedTasks(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="text-xl font-bold mb-2 text-center">Urban Hiking Bingo Challenge</h3>
      <p className="text-center mb-4">Complete tasks to earn points!</p>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {tasks.map((task, index) => (
          <div 
            key={index}
            className={`p-2 rounded border text-center cursor-pointer transition-colors ${
              completedTasks.includes(index) ? 'bg-yellow-300 border-yellow-500' : 'bg-white border-gray-300 hover:bg-yellow-100'
            }`}
            onClick={() => toggleTask(index)}
          >
            {task}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h4 className="font-bold mb-2">Leaderboard</h4>
        <ul>
          {leaderboard.map((player, index) => (
            <li key={index} className="flex justify-between">
              <span>{player.name}</span>
              <span>{player.points} points</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GamifiedBingoChallenge;