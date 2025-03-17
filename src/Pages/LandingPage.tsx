import React, { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection.jsx';
import ServiceCards from '../components/ServiceCards.jsx';
import PricingTable from '../components/PricingTable.jsx';
import ContactForm from '../components/ContactForm.jsx';
import SearchBar from '../components/SearchBar.jsx';
import { buildTrie } from '../utils/Trie.js';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  [key: string]: any;
}

const LandingPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [trie, setTrie] = useState<any>(null);
  const [backgroundUrl, setBackgroundUrl] = useState<string>('');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loadingHero, setLoadingHero] = useState(true);

  const UNSPLASH_API_KEY = 'HdtGUfoMVitCBQPmDGIP5piwA-fGt3aXSDtVafXYFqs';

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
        const newTrie = buildTrie(data.map((user: User) => user.name));
        setTrie(newTrie);
      })
      .catch((err) => console.error('Error fetching users:', err));
  }, []);

  useEffect(() => {
    const fetchBackground = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/random?query=technology&client_id=${UNSPLASH_API_KEY}`
        );
        const data = await response.json();
        setBackgroundUrl(data.urls.full);
      } catch (error) {
        console.error('Error fetching background image:', error);
      }
    };
    fetchBackground();
  }, []);

  const handleSearch = (query: string) => {
    if (!trie) return;
    const matchedNames = trie.search(query);
    const matchedUsers = users.filter((user) => matchedNames.includes(user.name.toLowerCase()));
    setFilteredUsers(matchedUsers);
  };

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
    setTimeout(() => {
      const contactSection = document.getElementById('contact-form');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  return (
    <div className="relative min-h-screen bg-black">
      {/* Hero Section */}
      {loadingHero && <HeroSection onLoaded={() => setLoadingHero(false)} />}

      {!loadingHero && (
        <div
          className="relative min-h-screen"
          style={{
            backgroundImage: `url(${backgroundUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="bg-black/50 min-h-screen">
            {/* Search Bar + Filtered Users */}
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
              <SearchBar onSearch={handleSearch} />
              <div className="mt-4">
                <h2 className="text-xl font-bold">Filtered Users</h2>
                <ul className="mt-2 text-gray-800">
                  {filteredUsers.map((user) => (
                    <li key={user.id} className="py-1 border-b border-gray-300 last:border-none">
                      {user.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Service Cards */}
            <div className="py-12">
              <ServiceCards />
            </div>

            {/* Pricing Table */}
            <div className="py-12 bg-white">
              <PricingTable setSelectedPlan={handleSelectPlan} />
            </div>

            {/* Contact Form */}
            <div className="py-12">
              <ContactForm selectedPlan={selectedPlan} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
