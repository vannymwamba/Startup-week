import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const DynamicCountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [nextWalkTime, setNextWalkTime] = useState('');

  const walkTimes = [
    { time: '10:00', label: 'Morning Walk' },
    { time: '14:00', label: 'Afternoon Stroll' },
    { time: '18:00', label: 'Sunset Explorer' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const today = now.toISOString().split('T')[0];
      const nextWalk = walkTimes.find(walk => {
        const walkDateTime = new Date(`${today}T${walk.time}:00`);
        return walkDateTime > now;
      });

      if (nextWalk) {
        const nextWalkDate = new Date(`${today}T${nextWalk.time}:00`);
        const difference = nextWalkDate - now;

        if (difference > 0) {
          setTimeLeft({
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
          });
          setNextWalkTime(nextWalk.label);
        } else {
          setTimeLeft({});
          setNextWalkTime('');
        }
      } else {
        // If all walks for today have passed, set countdown for first walk of next day
        const tomorrowDate = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        const nextDayWalk = new Date(`${tomorrowDate}T${walkTimes[0].time}:00`);
        const difference = nextDayWalk - now;

        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
        setNextWalkTime(walkTimes[0].label);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-yellow p-4  shadow-md text-center">
      <h3 className="text-xl font-bold mb-2">Next Walk: {nextWalkTime}</h3>
      <div className="flex justify-center items-center">
        <Clock className="mr-2 text-yellow-600" size={24} />
        <div className="text-2xl font-bold">
          {timeLeft.hours?.toString().padStart(2, '0')}:
          {timeLeft.minutes?.toString().padStart(2, '0')}:
          {timeLeft.seconds?.toString().padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

export default DynamicCountdownTimer;