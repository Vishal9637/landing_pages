import React, { useState, useEffect } from 'react';

const ServiceCards = () => {
  const [services, setServices] = useState([
    {
      title: 'Web Development',
      description: 'We build scalable and robust web applications.',
      image: '',
    },
    {
      title: 'Mobile Apps',
      description: 'Cross-platform mobile applications with great UI/UX.',
      image: '',
    },
    {
      title: 'SEO Optimization',
      description: 'Improve your website ranking and visibility.',
      image: '',
    },
  ]);

  const [loading, setLoading] = useState(true);
  const UNSPLASH_API_KEY = 'HdtGUfoMVitCBQPmDGIP5piwA-fGt3aXSDtVafXYFqs';

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=technology&client_id=${UNSPLASH_API_KEY}&per_page=3`
        );
        const data = await response.json();

        setServices((prevServices) =>
          prevServices.map((service, index) => ({
            ...service,
            image:
              data.results[index]?.urls?.regular ||
              'https://via.placeholder.com/300?text=No+Image',
          }))
        );
      } catch (error) {
        console.error('Error fetching images from Unsplash:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Scroll to PricingTable section
  const handleCardClick = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="service-section" className="py-12 px-4 bg-gray-100">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-black">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {loading ? (
          <p className="text-center text-lg font-semibold text-gray-700">Loading services...</p>
        ) : (
          services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
              onClick={handleCardClick} // Click event to scroll
            >
              <img
                src={service.image}
                alt={service.title}
                loading="lazy"
                className="w-full h-56 object-cover rounded-xl mb-4"
              />
              <h3 className="text-2xl font-bold text-black mb-2">{service.title}</h3>
              <p className="text-gray-700">{service.description}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ServiceCards;
