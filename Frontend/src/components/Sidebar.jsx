import React from 'react';
import { Route, RotateCcw, MapPin, Search, Layers, Play, Settings2 } from 'lucide-react';
import { presets } from '../utils/presets';

const Sidebar = ({ 
  algorithm, setAlgorithm, 
  source, setSource, 
  destination, setDestination,
  onFindRoute, onCompare, onReset,
  onLoadPreset,
  editMode, setEditMode
}) => {
  return (
    <aside className="w-full md:w-80 lg:w-96 bg-white border-r border-slate-200 h-full flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 overflow-y-auto">
      <div className="p-6 border-b border-slate-100 flex-shrink-0 bg-primary/5">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Search size={22} className="text-primary" />
          Route Settings
        </h2>
        <p className="text-sm text-slate-500 mt-1">Configure your pathfinding parameters</p>
      </div>

      <div className="p-6 flex-grow space-y-6">
        {/* Preset Selection */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Map Preset</label>
          <div className="relative">
            <select
              onChange={(e) => onLoadPreset(e.target.value)}
              defaultValue="Small City"
              className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none cursor-pointer text-slate-700 font-medium"
            >
              {Object.keys(presets).map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
              <Layers size={16} className="text-slate-400" />
            </div>
          </div>
        </div>

        {/* Nodes Selection */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Source Node</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin size={16} className="text-slate-400" />
              </div>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="e.g. Gate"
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Destination Node</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin size={16} className="text-slate-400" />
              </div>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Lab"
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>
          </div>
        </div>

        {/* Algorithm Selection */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Algorithm</label>
          <div className="relative">
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none cursor-pointer text-slate-700 font-medium"
            >
              <option value="Dijkstra">Dijkstra's Algorithm</option>
              <option value="A*">A* Search</option>
              <option value="Greedy">Greedy Best-First</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
              <Play size={16} className="text-slate-400" />
            </div>
          </div>
        </div>

        {/* Settings Toggles */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Advanced</h3>
          
          <label className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg transition-colors ${editMode ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-500'}`}>
                <Settings2 size={18} />
              </div>
              <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">Interactive Edit Mode</span>
            </div>
            <div className={`relative w-11 h-6 rounded-full transition-colors ${editMode ? 'bg-primary' : 'bg-slate-300'}`}>
              <input type="checkbox" className="sr-only" checked={editMode} onChange={(e) => setEditMode(e.target.checked)} />
              <div className={`absolute top-[2px] left-[2px] bg-white border-slate-300 border w-5 h-5 rounded-full transition-transform ${editMode ? 'translate-x-full border-white' : ''}`}></div>
            </div>
          </label>
        </div>
      </div>

      <div className="p-6 border-t border-slate-100 bg-slate-50/80 flex flex-col gap-3 flex-shrink-0">
        <button
          onClick={onFindRoute}
          disabled={!source || !destination}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-primary/20"
        >
          <Route size={18} />
          Find Route
        </button>
        <button
          onClick={onCompare}
          disabled={!source || !destination}
          className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-100 text-primary py-3 rounded-xl font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Layers size={18} />
          Compare All
        </button>
        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 py-3 rounded-xl font-semibold transition-colors mt-1"
        >
          <RotateCcw size={18} />
          Reset Map
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

