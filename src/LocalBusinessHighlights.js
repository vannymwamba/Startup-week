import React from 'react';

const LocalBusinessHighlights = () => {
  const businesses = [
    { name: "1215 Coffee", offer: "10% off for Urban Hikers" },
    { name: "Historic Bookstore", offer: "Free bookmark with purchase" },
    { name: "Artisan Ice Cream", offer: "Buy one, get one free scoop" },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-center">Local Business Highlights</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {businesses.map((business, index) => (
          <div key={index} className="border p-3 rounded-lg text-center">
            <h4 className="font-bold">{business.name}</h4>
            <p className="text-sm text-green-600">{business.offer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocalBusinessHighlights;