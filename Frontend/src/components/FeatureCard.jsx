import React from 'react';

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="glass-card p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-premium group">
      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
        <Icon className="text-primary group-hover:text-white transition-colors duration-300" size={28} />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
