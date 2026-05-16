import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Map, MapPinned } from 'lucide-react';
import gsap from 'gsap';

const Navbar = () => {
  const navRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  const isMapPage = location.pathname === '/map';

  if (isMapPage) return null; // We hide the navbar on the map page

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 glass-card mx-4 mt-4 px-6 py-4 flex items-center justify-between"
    >
      <Link to="/" className="flex items-center gap-2 text-primary">
        <MapPinned size={28} className="text-primary" />
        <span className="text-xl font-bold tracking-tight text-slate-800">
          KineticMap
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8 text-slate-600 font-medium">
        <a href="#about" className="hover:text-primary transition-colors">
          About
        </a>
        <a href="#features" className="hover:text-primary transition-colors">
          Features
        </a>
        <a href="#algorithms" className="hover:text-primary transition-colors">
          Algorithms
        </a>
      </div>

      <Link
        to="/map"
        className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
      >
        <Map size={18} />
        Launch System
      </Link>
    </nav>
  );
};

export default Navbar;
