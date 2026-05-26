import React, { useEffect, useRef } from 'react';
import { Activity, Clock, Route, Zap } from 'lucide-react';
import gsap from 'gsap';

const RouteInfoCard = ({ algorithm, cost, isVisible, comparisonData }) => {
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

  if (!comparisonData) {
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
              <span className="text-sm font-medium">Processing Time</span>
            </div>
            <span className="text-sm font-semibold text-slate-800">Fastest</span>
          </div>
        </div>
      </div>
    );
  }

  // Comparison View
  const algos = Object.entries(comparisonData);
  const minCost = Math.min(...algos.map(([_, data]) => data.cost === -1 ? Infinity : data.cost));
  const minTime = Math.min(...algos.map(([_, data]) => data.time_ms || Infinity));

  return (
    <div 
      ref={cardRef}
      className={`absolute bottom-8 right-8 w-[400px] bg-white/95 backdrop-blur-xl border border-white/50 shadow-premium rounded-2xl p-6 transition-opacity ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
        <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
          <Zap size={18} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-800">Algorithm Comparison</h4>
          <p className="text-xs text-slate-500">Side-by-side analysis</p>
        </div>
      </div>

      <div className="overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              <th className="pb-3">Algorithm</th>
              <th className="pb-3 text-right">Cost</th>
              <th className="pb-3 text-right">Time (ms)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {algos.map(([name, data]) => (
              <tr key={name} className="text-sm">
                <td className="py-3 font-semibold text-slate-700 capitalize">{name === 'astar' ? 'A*' : name}</td>
                <td className={`py-3 text-right font-bold ${data.cost === minCost ? 'text-primary' : 'text-slate-600'}`}>
                  {data.cost === -1 ? 'N/A' : data.cost}
                </td>
                <td className={`py-3 text-right font-medium ${data.time_ms === minTime ? 'text-orange-500' : 'text-slate-500'}`}>
                  {data.time_ms?.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-100 flex justify-center">
        <p className="text-[10px] text-slate-400 font-medium">Path visualization defaults to Dijkstra for comparison.</p>
      </div>
    </div>
  );
};

export default RouteInfoCard;

