import React, { useState, useEffect, lazy, Suspense, startTransition } from 'react';
import { Clock, Map, Users, User, Play, Pause, Square, Camera, Info, Navigation, Menu, Coffee, Star, ChevronRight } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import WeatherForecast from './WeatherForecast';
import SocialShare from './SocialShare';
import QuickRegister from './QuickRegister';
import Modal from './Modal';
import ScrollingTestimonials from './ScrollingTestimonials';
import AnimatedRoutePreview from './AnimatedRoutePreview';
import GamifiedBingoChallenge from './GamifiedBingoChallenge';
import LocalBusinessHighlights from './LocalBusinessHighlights';

import mtAdamsImage from './images/mt-adams.jpeg';
import findlayMarketImage from './images/findlay-market.jpeg';
import fountainSquareImage from './images/fountain-square.jpeg';

import guidePhoto1 from './images/Vanny.jpeg';
import guidePhoto2 from './images/Vanny.jpeg';
import guidePhoto3 from './images/Vanny.jpeg';

const CincinnatiLocation = ({ title, description, imageSrc, facts }) => {
  const [showFacts, setShowFacts] = useState(false);

  return (
    <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg group">
      <img src={imageSrc} alt={title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center">
        <button 
          onClick={() => setShowFacts(!showFacts)} 
          className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold hover:bg-yellow-300"
        >
          {showFacts ? 'Hide Facts' : 'Show Facts'}
        </button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
      {showFacts && (
        <div className="absolute inset-0 bg-white bg-opacity-90 p-4 overflow-auto">
          <h4 className="font-bold mb-2">Fun Facts:</h4>
          <ul className="list-disc pl-5">
            {facts.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const UrbanHikersPoster = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [currentScreen, setCurrentScreen] = useState('home');
  const [isWalking, setIsWalking] = useState(false);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);

  const translations = {
    en: {
      title: "Urban Hikers: Discover Cincinnati",
      subtitle: "StartupCincy Week 2024",
      registerNow: "Register Now",
      explorePrompt: "Ready to explore Cincinnati?",
    },
    es: {
      title: "Caminantes Urbanos: Descubre Cincinnati",
      subtitle: "Semana StartupCincy 2024",
      registerNow: "Regístrate Ahora",
      explorePrompt: "¿Listo para explorar Cincinnati?",
    },
  };

  const t = translations[language];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setRegistrationSuccess(false);
  };

  const handleRegistration = (formData) => {
    console.log('Registration data:', formData);
    setRegistrationSuccess(true);
    setTimeout(closeModal, 3000);
  };

  const toggleWalk = () => setIsWalking(!isWalking);

  const CardButton = ({ icon: Icon, title, onClick }) => (
    <button 
      onClick={onClick}
      className="bg-yellow-400 p-6 rounded-2xl shadow-lg flex items-center justify-between w-full transition-all duration-300 hover:shadow-xl hover:scale-105"
    >
      <div className="flex items-center">
        <Icon size={24} className="text-black mr-4" />
        <span className="text-lg font-bold text-black">{title}</span>
      </div>
      <ChevronRight size={20} className="text-black" />
    </button>
  );

  const changeScreen = (screen) => {
    startTransition(() => {
      setCurrentScreen(screen);
    });
  };

  const HomeScreen = ({ onChangeScreen }) => (
    <Suspense fallback={<div className="flex justify-center items-center h-64"><span className="text-gray-500">Loading...</span></div>}>
      <div className="space-y-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-4">Share experiences with<br />a bunch of strangers.</h2>
          <p className="text-xl mb-6">Explore Cincinnati like never before!</p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <CardButton icon={Navigation} title="Self-Guided Walk" onClick={() => onChangeScreen('selfGuided')} />
            <CardButton icon={Users} title="Group Walk" onClick={() => onChangeScreen('groupWalk')} />
          </div>
        </section>
        
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-black mb-4">Featured Locations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CincinnatiLocation
              title="Mt. Adams"
              description="Panoramic city views"
              imageSrc={mtAdamsImage}
              facts={[
                "Home to the Cincinnati Art Museum",
                "Named after President John Quincy Adams",
                "Features the Immaculata Church"
              ]}
            />
            <CincinnatiLocation
              title="Findlay Market"
              description="Historic market"
              imageSrc={findlayMarketImage}
              facts={[
                "Ohio's oldest continuously operated public market",
                "Founded in 1852",
                "Houses over 50 vendors"
              ]}
            />
            <CincinnatiLocation
              title="Fountain Square"
              description="Central hub"
              imageSrc={fountainSquareImage}
              facts={[
                "The Tyler Davidson Fountain was dedicated in 1871",
                "Nicknamed 'The Square' by locals",
                "Hosts numerous public events"
              ]}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-black mb-4">Nearby Routes</h3>
          <AnimatedRoutePreview />
        </div>

        <ScrollingTestimonials />
      </div>
    </Suspense>
  );

  const SelfGuidedWalkScreen = () => (
    <Suspense fallback={<div className="flex justify-center items-center h-64"><span className="text-gray-500">Loading...</span></div>}>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-black mb-4">Self-Guided Walk</h2>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <AnimatedRoutePreview />
          <div className="flex justify-between items-center my-6">
            <div>
              <p className="text-sm text-gray-500">Distance</p>
              <p className="text-2xl font-bold text-black">{distance.toFixed(2)} km</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Time</p>
              <p className="text-2xl font-bold text-black">{Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}</p>
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <button 
              className={`p-4 rounded-full ${isWalking ? 'bg-yellow-500' : 'bg-green-500'} text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105`}
              onClick={toggleWalk}
            >
              {isWalking ? <Pause size={32} /> : <Play size={32} />}
            </button>
            <button 
              className="p-4 rounded-full bg-red-500 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
              onClick={() => {setIsWalking(false); setDistance(0); setTime(0);}}
            >
              <Square size={32} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CardButton icon={Camera} title="Take Photo" onClick={() => {}} />
          <CardButton icon={Info} title="Points of Interest" onClick={() => {}} />
        </div>
      </div>
    </Suspense>
  );

  const GroupWalkScreen = () => {
    const guidedWalks = [
      {
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
        title: "Sunset Art Walk",
        time: "6:00 PM",
        spots: 14,
        guide: {
          name: "Vanny Mwamba",
          photo: guidePhoto3,
          description: "Artist and longtime Cincinnati resident"
        }
      }
    ];

    return (
      <Suspense fallback={<div className="flex justify-center items-center h-64"><span className="text-gray-500">Loading...</span></div>}>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-black mb-4">Group Walks</h2>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-black mb-4">Upcoming Walks</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guidedWalks.map((walk, index) => (
                <div key={index} className="bg-yellow-100 p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
                  <div className="flex items-center mb-4">
                    <img src={walk.guide.photo} alt={walk.guide.name} className="w-12 h-12 rounded-full mr-4 object-cover" />
                    <div>
                      <h4 className="font-semibold text-black">{walk.guide.name}</h4>
                      <p className="text-sm text-gray-600">{walk.guide.description}</p>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-2">{walk.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">{walk.time}</p>
                  <p className="text-xs text-gray-500 mb-4">{walk.spots} spots left</p>
                  <button className="w-full bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold transition-colors hover:bg-yellow-500">
                    Join Walk
                  </button>
                </div>
              ))}
            </div>
          </div>
          <WeatherForecast />
        </div>
      </Suspense>
    );
  };

  return (
    <div className="bg-yellow-400 min-h-screen flex flex-col">
      <header className="bg-black text-yellow-400 p-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{t.title}</h1>
          <p className="text-sm">{t.subtitle}</p>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            className="text-sm font-medium hover:underline"
          >
            {language === 'en' ? 'ES' : 'EN'}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="hover:text-yellow-300">
            <Menu size={24} />
          </button>
        </div>
      </header>
  
      <main className="flex-grow p-6 space-y-8 overflow-y-auto">
        <CountdownTimer eventDate="2024-07-15T09:00:00" />
        <SocialShare />
  
        <Suspense fallback={<div className="flex justify-center items-center h-64"><span className="text-gray-500">Loading...</span></div>}>
          {currentScreen === 'home' && <HomeScreen onChangeScreen={changeScreen} />}
          {currentScreen === 'selfGuided' && <SelfGuidedWalkScreen />}
          {currentScreen === 'groupWalk' && <GroupWalkScreen />}
        </Suspense>
        
        <Suspense fallback={<div className="flex justify-center items-center h-64"><span className="text-gray-500">Loading...</span></div>}>
          <GamifiedBingoChallenge />
          <LocalBusinessHighlights />
        </Suspense>
  
        <div className="bg-black text-yellow-400 rounded-2xl shadow-lg p-6 mt-8">
          <p className="text-2xl font-bold mb-4">{t.explorePrompt}</p>
          <button 
            className="bg-yellow-400 text-black px-6 py-3 rounded-full text-lg font-bold transition-all duration-300 hover:bg-yellow-300 hover:shadow-lg hover:scale-105"
            onClick={openModal}
          >
            {t.registerNow}
          </button>
        </div>
  
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {registrationSuccess ? (
            <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg" role="alert">
              <p className="font-bold">Registration Successful!</p>
              <p className="text-sm">Thank you for registering. We'll contact you with more details soon.</p>
            </div>
          ) : (
            <QuickRegister onSubmit={handleRegistration} />
          )}
        </Modal>
      </main>
  
      <nav className="bg-black text-yellow-400 flex justify-around p-4">
        {[
          { icon: Navigation, screen: 'home', label: 'Home' },
          { icon: Map, screen: 'selfGuided', label: 'Self-Guided' },
          { icon: Users, screen: 'groupWalk', label: 'Group Walks' },
          { icon: User, screen: 'profile', label: 'Profile' }
        ].map(({ icon: Icon, screen, label }) => (
          <button 
            key={screen}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${currentScreen === screen ? 'bg-yellow-400 text-black' : 'hover:text-yellow-300'}`}
            onClick={() => changeScreen(screen)}
          >
            <Icon size={24} />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
  return (
  <div className="bg-yellow-400 min-h-screen flex flex-col">
    <header className="bg-black text-yellow-400 p-4 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">{t.title}</h1>
        <p className="text-sm">{t.subtitle}</p>
      </div>
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
          className="text-sm font-medium hover:underline"
        >
          {language === 'en' ? 'ES' : 'EN'}
        </button>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="hover:text-yellow-300">
          <Menu size={24} />
        </button>
      </div>
    </header>

    <main className="flex-grow p-6 space-y-8 overflow-y-auto">
      <CountdownTimer eventDate="2024-07-15T09:00:00" />
      <SocialShare />

      <Suspense fallback={<div className="flex justify-center items-center h-64"><span className="text-gray-500">Loading...</span></div>}>
        {currentScreen === 'home' && <HomeScreen onChangeScreen={changeScreen} />}
        {currentScreen === 'selfGuided' && <SelfGuidedWalkScreen />}
        {currentScreen === 'groupWalk' && <GroupWalkScreen />}
      </Suspense>
      
      <Suspense fallback={<div className="flex justify-center items-center h-64"><span className="text-gray-500">Loading...</span></div>}>
        <GamifiedBingoChallenge />
        <LocalBusinessHighlights />
      </Suspense>

      <div className="bg-black text-yellow-400 rounded-2xl shadow-lg p-6 mt-8">
        <p className="text-2xl font-bold mb-4">{t.explorePrompt}</p>
        <button 
          className="bg-yellow-400 text-black px-6 py-3 rounded-full text-lg font-bold transition-all duration-300 hover:bg-yellow-300 hover:shadow-lg hover:scale-105"
          onClick={openModal}
        >
          {t.registerNow}
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {registrationSuccess ? (
          <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg" role="alert">
            <p className="font-bold">Registration Successful!</p>
            <p className="text-sm">Thank you for registering. We'll contact you with more details soon.</p>
          </div>
        ) : (
          <QuickRegister onSubmit={handleRegistration} />
        )}
      </Modal>
    </main>

    <nav className="bg-black text-yellow-400 flex justify-around p-4">
      {[
        { icon: Navigation, screen: 'home', label: 'Home' },
        { icon: Map, screen: 'selfGuided', label: 'Self-Guided' },
        { icon: Users, screen: 'groupWalk', label: 'Group Walks' },
        { icon: User, screen: 'profile', label: 'Profile' }
      ].map(({ icon: Icon, screen, label }) => (
        <button 
          key={screen}
          className={`flex flex-col items-center p-2 rounded-lg transition-colors ${currentScreen === screen ? 'bg-yellow-400 text-black' : 'hover:text-yellow-300'}`}
          onClick={() => changeScreen(screen)}
        >
          <Icon size={24} />
          <span className="text-xs mt-1">{label}</span>
        </button>
      ))}
    </nav>
  </div>
);
};

export default UrbanHikersPoster;