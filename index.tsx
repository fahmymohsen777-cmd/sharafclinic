import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { LangProvider } from './src/context/LangContext';
import { Navbar } from './src/components/Navbar';
import HeroSection from './src/components/HeroSection';
import LiveCounter from './src/components/LiveCounter';
import { LiveNewsFeed } from './src/components/LiveNewsFeed';
import TimelineSection from './src/components/TimelineSection';
import WorldMap from './src/components/WorldMap';
import MediaGallery from './src/components/MediaGallery';
import Footer from './src/components/Footer';

const App = () => {
  return (
    <LangProvider>
      <div className="bg-[#0a0a0a] min-h-screen text-white font-body selection:bg-blood selection:text-white overflow-x-hidden">
        <Navbar />
        <main>
          <HeroSection />
          <LiveCounter />
          <LiveNewsFeed />
          <TimelineSection />
          <WorldMap />
          <MediaGallery />
        </main>
        <Footer />
      </div>
    </LangProvider>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}