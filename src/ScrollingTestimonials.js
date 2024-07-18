import React, { useState, useEffect } from 'react';

const ScrollingTestimonials = () => {
  const testimonials = [
    { id: 1, text: "The Urban Hikers tour was an amazing way to explore Cincinnati!", author: "Jane D." },
    { id: 2, text: "I discovered so many hidden gems in my own city. Highly recommended!", author: "Mike R." },
    { id: 3, text: "The guides were knowledgeable and the pace was perfect. Can't wait for the next one!", author: "Sarah L." },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-center">What Our Hikers Say</h3>
      <div className="h-32 overflow-hidden">
        <div className="transition-transform duration-500 ease-in-out" style={{transform: `translateY(-${currentTestimonial * 100}%)`}}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="mb-4">
              <p className="italic">"{testimonial.text}"</p>
              <p className="text-right font-bold">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollingTestimonials;