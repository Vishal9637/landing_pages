import React, { useState } from 'react';
import HeroSection from './components/HeroSection.jsx';
import LandingPage from './Pages/LandingPage.tsx';

function App() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <div className="font-sans">
      <HeroSection />
      <LandingPage selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />
    </div>
  );
}

export default App;
