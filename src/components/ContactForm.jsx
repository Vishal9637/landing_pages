import React, { useState, useEffect } from 'react';

const ContactForm = ({ selectedPlan }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: selectedPlan ? `I'm interested in the ${selectedPlan.name} plan (${selectedPlan.price}).` : '',
  });

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (selectedPlan) {
      setFormData((prev) => ({
        ...prev,
        message: `I'm interested in the ${selectedPlan.name} plan (${selectedPlan.price}).`,
      }));
    }
  }, [selectedPlan]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact Form Data:', formData);

    // Show popup
    setShowPopup(true);

    // Reset form after submission
    setFormData({ name: '', email: '', message: '' });

    // Hide popup after 3 seconds
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <section id="contact-section" className="py-12 px-6 bg-gray-900 flex justify-center items-center min-h-screen">
      <div className="max-w-lg w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-300">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-900">Contact Us</h2>

        {/* Selected Plan Display */}
        {selectedPlan && (
          <div className="mb-6 p-4 bg-blue-100 border border-blue-300 rounded-lg text-center">
            <h3 className="text-2xl font-semibold text-blue-800">{selectedPlan.name} Plan</h3>
            <p className="text-xl font-bold text-blue-600">{selectedPlan.price}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium text-gray-700 mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
              id="name"
              name="name"
              type="text"
              onChange={handleChange}
              value={formData.name}
              required
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
              id="email"
              name="email"
              type="email"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
              id="message"
              name="message"
              rows="5"
              onChange={handleChange}
              value={formData.message}
              required
            />
          </div>
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center">
            <h3 className="text-2xl font-bold text-green-600">Success!</h3>
            <p className="text-gray-800 mt-2">Your message has been sent.</p>
            <button
              className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
              onClick={() => setShowPopup(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactForm;
