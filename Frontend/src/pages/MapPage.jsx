import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import GraphContainer from '../components/GraphContainer';
import RouteInfoCard from '../components/RouteInfoCard';
import { presets } from '../utils/presets';

const MapPage = () => {
  const [algorithm, setAlgorithm] = useState('Dijkstra');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  
  // Graph State
  const [nodes, setNodes] = useState(presets["Small City"].nodes);
  const [edges, setEdges] = useState(presets["Small City"].edges);
  const [editMode, setEditMode] = useState(false);
  
  const [isAnimating, setIsAnimating] = useState(false);
  const [pathFound, setPathFound] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [pathData, setPathData] = useState(null);
  const [comparisonData, setComparisonData] = useState(null);
  const [error, setError] = useState(null);

  // Helper to convert frontend graph state to backend adjacency list
  const getBackendGraph = () => {
    const adj = {};
    nodes.forEach(n => adj[n.id] = {});
    edges.forEach(e => {
      if (adj[e.source]) adj[e.source][e.target] = e.weight;
      // If undirected, add both ways. For now, we'll stick to what the user builds.
      // But typically these maps are undirected.
      if (adj[e.target]) adj[e.target][e.source] = e.weight;
    });
    return adj;
  };

  const getNodesData = () => {
    const data = {};
    nodes.forEach(n => data[n.id] = { x: n.x, y: n.y });
    return data;
  };

  const handleFindRoute = async () => {
    setResetTrigger(prev => prev + 1);
    setIsAnimating(false);
    setPathFound(false);
    setError(null);
    setPathData(null);
    setComparisonData(null);

    try {
      const response = await fetch('https://kineticmap-backend.onrender.com/api/find-route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source,
          destination,
          algorithm,
          graph: getBackendGraph(),
          nodes_data: getNodesData()
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
      setError(err.message);
      alert(`Error: ${err.message}`);
    }
  };

  const handleCompare = async () => {
    setResetTrigger(prev => prev + 1);
    setIsAnimating(false);
    setPathFound(false);
    setError(null);
    setPathData(null);

    try {
      const response = await fetch('https://kineticmap-backend.onrender.com/api/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source,
          destination,
          graph: getBackendGraph(),
          nodes_data: getNodesData()
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to compare algorithms');
      }

      const data = await response.json();
      setComparisonData(data);
      // For visualization, we'll default to Dijkstra's path from the comparison
      setPathData(data.dijkstra);
      
      setTimeout(() => {
        setIsAnimating(true);
        setPathFound(true);
      }, 100);
      
    } catch (err) {
      setError(err.message);
      alert(`Error: ${err.message}`);
    }
  };

  const handleReset = () => {
    setSource('');
    setDestination('');
    setIsAnimating(false);
    setPathFound(false);
    setPathData(null);
    setComparisonData(null);
    setError(null);
    setResetTrigger(prev => prev + 1);
  };

  const handleLoadPreset = (presetName) => {
    const preset = presets[presetName];
    if (preset) {
      setNodes(preset.nodes);
      setEdges(preset.edges);
      handleReset();
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-50 overflow-hidden">
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0 z-20 shadow-sm">
        <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors font-medium">
          <ArrowLeft size={18} />
          Back to Home
        </Link>
        <div className="font-bold text-slate-800 tracking-tight">
          Kinetic<span className="text-primary">Map</span> Workspace
        </div>
        <div className="w-24"></div>
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
          onCompare={handleCompare}
          onReset={handleReset}
          onLoadPreset={handleLoadPreset}
          editMode={editMode}
          setEditMode={setEditMode}
        />
        
        <main className="flex-grow relative h-full">
          <GraphContainer 
            nodes={nodes}
            edges={edges}
            setNodes={setNodes}
            setEdges={setEdges}
            isAnimating={isAnimating}
            pathFound={pathFound}
            resetTrigger={resetTrigger}
            pathData={pathData}
            editMode={editMode}
          />
          
          <RouteInfoCard 
            algorithm={algorithm}
            cost={pathFound && pathData ? `${pathData.cost} units` : "-"}
            isVisible={pathFound}
            comparisonData={comparisonData}
          />
        </main>
      </div>
    </div>
  );
};

export default MapPage;

