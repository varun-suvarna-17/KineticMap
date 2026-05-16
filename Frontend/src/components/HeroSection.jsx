import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Route, Activity, Globe } from 'lucide-react';
import gsap from 'gsap';

const HeroSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-element', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });
      
      gsap.from('.hero-illustration', {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.2)',
        delay: 0.6
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="pt-40 pb-20 px-6 min-h-[90vh] flex items-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4"></div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm hero-element">
            <Activity size={16} />
            <span>v1.0 is now live</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-slate-900 hero-element">
            AI-Powered <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Smart Route
            </span> <br />
            Planning System
          </h1>
          
          <p className="text-lg text-slate-600 max-w-xl hero-element leading-relaxed">
            KineticMap uses advanced AI algorithms to find the absolute shortest and most optimized paths across complex networks. Experience dynamic route visualization in real-time.
          </p>
          
          <div className="flex items-center gap-4 hero-element pt-4">
            <Link to="/map" className="btn-primary flex items-center gap-2">
              Launch Map System
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        <div className="relative hero-illustration hidden lg:block h-[500px] w-full bg-white/50 backdrop-blur-xl border border-white rounded-3xl shadow-premium overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-slate-50/50 flex items-center justify-center overflow-hidden">
              {/* Map Grid */}
              <div className="absolute w-full h-full opacity-20" style={{ backgroundSize: '40px 40px', backgroundImage: 'linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)'}}></div>
              
              {/* SVG Map Network */}
              <svg className="relative w-full h-full max-w-sm" viewBox="0 0 200 200">
                {/* Edges */}
                <path d="M40 160 L100 40 L160 120" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M40 160 L140 180 L160 120" fill="none" stroke="#cbd5e1" strokeWidth="2" />
                <path d="M100 40 L140 180" fill="none" stroke="#cbd5e1" strokeWidth="2" />
                
                {/* Active Route Path */}
                <path 
                  d="M40 160 L100 40 L160 120" 
                  fill="none" 
                  stroke="#10b981" 
                  strokeWidth="3"
                  strokeDasharray="300"
                  className="animate-[dash_3s_ease-in-out_infinite]"
                />

                {/* Nodes */}
                <circle cx="40" cy="160" r="8" fill="white" stroke="#10b981" strokeWidth="3" />
                <circle cx="100" cy="40" r="6" fill="white" stroke="#94a3b8" strokeWidth="2" />
                <circle cx="160" cy="120" r="8" fill="white" stroke="#0ea5e9" strokeWidth="3" />
                <circle cx="140" cy="180" r="6" fill="white" stroke="#94a3b8" strokeWidth="2" />

                {/* Ping Animations on Main Nodes */}
                <circle cx="40" cy="160" r="8" fill="#10b981" className="animate-ping opacity-20" />
                <circle cx="160" cy="120" r="8" fill="#0ea5e9" className="animate-ping opacity-20" />
                
                {/* Moving dot along the path */}
                <circle r="4" fill="#10b981">
                  <animateMotion dur="3s" repeatCount="indefinite" path="M40 160 L100 40 L160 120" />
                </circle>
              </svg>

              {/* Inline keyframes for dash animation */}
              <style>{`
                @keyframes dash {
                  0% { stroke-dashoffset: 300; }
                  50% { stroke-dashoffset: 0; }
                  100% { stroke-dashoffset: -300; }
                }
              `}</style>
            </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
