import React from 'react';
import { Clock, CheckCircle } from 'lucide-react';

const AlgorithmCard = ({ title, description, timeEfficiency, useCase }) => {
  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-soft hover:shadow-premium transition-all duration-300 flex flex-col h-full">
      <h3 className="text-2xl font-bold text-slate-900 mb-4">{title}</h3>
      <p className="text-slate-600 mb-8 flex-grow">{description}</p>
      
      <div className="space-y-4 mt-auto">
        <div className="flex items-start gap-3">
          <Clock className="text-primary mt-1 shrink-0" size={18} />
          <div>
            <h4 className="text-sm font-semibold text-slate-800">Time Efficiency</h4>
            <p className="text-sm text-slate-500">{timeEfficiency}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <CheckCircle className="text-primary mt-1 shrink-0" size={18} />
          <div>
            <h4 className="text-sm font-semibold text-slate-800">Best Use Case</h4>
            <p className="text-sm text-slate-500">{useCase}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmCard;
