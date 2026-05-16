import React from 'react';
import { MapPinned } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const isMapPage = location.pathname === '/map';

  if (isMapPage) return null; // Hide footer on map page

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2 space-y-4">
          <Link to="/" className="flex items-center gap-2 text-primary">
            <MapPinned size={28} />
            <span className="text-xl font-bold tracking-tight text-white">
              KineticMap
            </span>
          </Link>
          <p className="text-sm text-slate-400 max-w-sm">
            AI-Powered Smart Route Planning System. Experience dynamic network visualization and find the absolute shortest paths with advanced algorithms.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
            <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
            <li><a href="#algorithms" className="hover:text-primary transition-colors">Algorithms</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Tech Stack</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>React & Tailwind CSS</li>
            <li>GSAP Animations</li>
            <li>FastAPI (Backend Ready)</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800 text-sm text-slate-500 flex flex-col md:flex-row items-center justify-between">
        <p>&copy; {new Date().getFullYear()} KineticMap. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Designed for optimal routing.</p>
      </div>
    </footer>
  );
};

export default Footer;
