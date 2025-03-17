import React from 'react';

const plans = [
  {
    name: 'Basic',
    price: '$9.99/mo',
    features: ['Access to basic features', 'Email support', '1GB Cloud Storage'],
  },
  {
    name: 'Standard',
    price: '$19.99/mo',
    features: ['All Basic features', 'Priority email support', '10GB Cloud Storage'],
  },
  {
    name: 'Premium',
    price: '$49.99/mo',
    features: ['All Standard features', '24/7 Support', 'Unlimited Cloud Storage'],
  },
];

const PricingTable = ({ setSelectedPlan }) => {
  // Smooth Scroll to ContactForm
  const handleChoosePlan = (plan) => {
    setSelectedPlan(plan); // Pass full plan details

    setTimeout(() => {
      const contactSection = document.getElementById('contact-section');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300); // Short delay for better UX
  };

  return (
    <section id="pricing-section" className="py-12 px-6 bg-black">
      <h2 className="text-4xl font-bold text-center text-white mb-10">Choose Your Plan</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-lg shadow-lg p-6 text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl border border-gray-700"
          >
            <h3 className="text-2xl font-semibold text-white mb-3">{plan.name}</h3>
            <p className="text-3xl font-bold text-blue-400 mb-4">{plan.price}</p>
            <ul className="text-gray-300 mb-6 space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="text-lg">✅ {feature}</li>
              ))}
            </ul>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-md"
              onClick={() => handleChoosePlan(plan)}
            >
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingTable;
