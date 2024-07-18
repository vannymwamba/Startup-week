import React, { useState } from 'react';

const QuickRegister = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredWalk: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name.trim()) formErrors.name = "Name is required";
    if (!formData.email.trim()) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) formErrors.phone = "Phone number is required";
    if (!formData.preferredWalk) formErrors.preferredWalk = "Please select a preferred walk";
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      // Form is valid, proceed with submission
      console.log('Form submitted:', formData);
      // Here you would typically send the data to your server
      onSubmit(formData);
    } else {
      // Form has errors, update error state
      setErrors(formErrors);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Quick Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Your full name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="your@email.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block mb-1 font-medium">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Your phone number"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="preferredWalk" className="block mb-1 font-medium">Preferred Walk</label>
          <select
            id="preferredWalk"
            name="preferredWalk"
            value={formData.preferredWalk}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select a walk</option>
            <option value="morning">Morning Walk (10:00 AM)</option>
            <option value="afternoon">Afternoon Stroll (2:00 PM)</option>
            <option value="sunset">Sunset Explorer (6:00 PM)</option>
          </select>
          {errors.preferredWalk && <p className="text-red-500 text-sm mt-1">{errors.preferredWalk}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-500 transition duration-300"
        >
          Register Now
        </button>
      </form>
    </div>
  );
};

export default QuickRegister;