import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import GraphContainer from '../components/GraphContainer';
import RouteInfoCard from '../components/RouteInfoCard';

const MapPage = () => {
  const [algorithm, setAlgorithm] = useState('Dijkstra');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [trafficEnabled, setTrafficEnabled] = useState(false);
  const [blockedEnabled, setBlockedEnabled] = useState(false);
  
  const [isAnimating, setIsAnimating] = useState(false);
  const [pathFound, setPathFound] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [pathData, setPathData] = useState(null);
  const [error, setError] = useState(null);

  const handleFindRoute = async () => {
    setResetTrigger(prev => prev + 1); // Reset before finding new
    setIsAnimating(false);
    setPathFound(false);
    setError(null);
    setPathData(null);

    try {
      const response = await fetch('http://localhost:8000/api/find-route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: source,
          destination: destination,
          algorithm: algorithm,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to find route');
      }

      const data = await response.json();
      setPathData(data);
      
      setTimeout(() => {
        setIsAnimating(true);
        setPathFound(true);
      }, 100);
      
    } catch (err) {
      console.error("Error finding route:", err);
      setError(err.message);
      alert(`Error: ${err.message}`); // Simple alert for error feedback
    }
  };

  const handleReset = () => {
    setSource('');
    setDestination('');
    setIsAnimating(false);
    setPathFound(false);
    setPathData(null);
    setError(null);
    setResetTrigger(prev => prev + 1);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-50 overflow-hidden">
      {/* Top minimalistic header for map page */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0 z-20 shadow-sm">
        <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors font-medium">
          <ArrowLeft size={18} />
          Back to Home
        </Link>
        <div className="font-bold text-slate-800 tracking-tight">
          Kinetic<span className="text-primary">Map</span> Workspace
        </div>
        <div className="w-24"></div> {/* Spacer for centering */}
      </header>

      <div className="flex flex-col md:flex-row flex-grow overflow-hidden relative">
        <Sidebar 
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
          source={source}
          setSource={setSource}
          destination={destination}
          setDestination={setDestination}
          onFindRoute={handleFindRoute}
          onReset={handleReset}
          trafficEnabled={trafficEnabled}
          setTrafficEnabled={setTrafficEnabled}
          blockedEnabled={blockedEnabled}
          setBlockedEnabled={setBlockedEnabled}
        />
        
        <main className="flex-grow relative h-full">
          <GraphContainer 
            isAnimating={isAnimating}
            pathFound={pathFound}
            resetTrigger={resetTrigger}
            pathData={pathData}
          />
          
          <RouteInfoCard 
            algorithm={algorithm}
            cost={pathFound && pathData ? `${pathData.cost} units` : "-"}
            isVisible={pathFound}
          />
        </main>
      </div>
    </div>
  );
};

export default MapPage;
