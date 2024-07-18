import React from 'react';
import { Twitter, Facebook, Instagram } from 'lucide-react';

const SocialShare = () => {
  const shareUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent("Join me for Urban Hikers: Discover Cincinnati at StartupCincy Week 2024!");

  return (
    <div className="flex justify-center space-x-4 my-4">
      <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
        <Twitter size={24} />
      </a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
        <Facebook size={24} />
      </a>
      <a href={`https://www.instagram.com/`} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700">
        <Instagram size={24} />
      </a>
    </div>
  );
};

export default SocialShare;