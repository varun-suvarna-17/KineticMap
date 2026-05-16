import React, { useEffect, useRef } from 'react';
import { Activity, Clock, Route } from 'lucide-react';
import gsap from 'gsap';

const RouteInfoCard = ({ algorithm, cost, isVisible }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      gsap.fromTo(cardRef.current,
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.2)' }
      );
    } else {
      gsap.to(cardRef.current, {
        y: 20, opacity: 0, scale: 0.95, duration: 0.3
      });
    }
  }, [isVisible]);

  return (
    <div 
      ref={cardRef}
      className={`absolute bottom-8 right-8 w-80 bg-white/90 backdrop-blur-xl border border-white/40 shadow-premium rounded-2xl p-6 transition-opacity ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
        <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
          <Activity size={18} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-800">Route Computed</h4>
          <p className="text-xs text-slate-500">{algorithm}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-600">
            <Route size={16} />
            <span className="text-sm font-medium">Path Cost</span>
          </div>
          <span className="text-lg font-bold text-primary">{cost}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-600">
            <Clock size={16} />
            <span className="text-sm font-medium">Est. Time</span>
          </div>
          <span className="text-sm font-semibold text-slate-800">Fastest</span>
        </div>
      </div>
    </div>
  );
};

export default RouteInfoCard;
