import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Plus, Trash2, Settings2 } from 'lucide-react';

const GraphContainer = ({ 
  nodes, edges, setNodes, setEdges,
  isAnimating, pathFound, resetTrigger, pathData,
  editMode 
}) => {
  const svgRef = useRef(null);
  const [draggingNode, setDraggingNode] = useState(null);
  const [connectingNode, setConnectingNode] = useState(null);

  useEffect(() => {
    // Initial entrance animation
    const nodesElements = svgRef.current.querySelectorAll('.graph-node');
    const edgesElements = svgRef.current.querySelectorAll('.graph-edge');
    
    gsap.fromTo(nodesElements, 
      { scale: 0, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.5)' }
    );
    
    gsap.fromTo(edgesElements, 
      { strokeDashoffset: 1000 }, 
      { strokeDashoffset: 0, duration: 1, ease: 'power2.out', delay: 0.3 }
    );
  }, [nodes.length]); // Re-run when nodes are added

  useEffect(() => {
    if (resetTrigger > 0) {
      gsap.to('.path-highlight', { strokeDashoffset: 100, duration: 0.5 });
      gsap.to('.node-highlight', { fill: 'white', scale: 1, duration: 0.3 });
      gsap.to('.graph-node text', { fill: '#334155', duration: 0.3 });
    }
  }, [resetTrigger]);

  useEffect(() => {
    if (isAnimating && pathFound && pathData && pathData.path) {
      const tl = gsap.timeline();
      const path = pathData.path;
      
      for (let i = 0; i < path.length; i++) {
        const node = path[i];
        const isLastNode = i === path.length - 1;
        
        if (isLastNode) {
          tl.to(`#node-${node} circle`, { fill: '#10b981', stroke: '#059669', scale: 1.3, duration: 0.4, ease: 'back.out' });
          tl.to(`#node-${node} text`, { fill: 'white', duration: 0.1 }, "<");
        } else {
          tl.to(`#node-${node} circle`, { fill: '#d1fae5', stroke: '#10b981', scale: 1.2, duration: 0.3 });
        }
        
        if (!isLastNode) {
          const nextNode = path[i+1];
          // Find the edge between current and next node
          const edgeId = `edge-${node}-${nextNode}-highlight`;
          const altEdgeId = `edge-${nextNode}-${node}-highlight`;
          
          tl.to([`#${edgeId}`, `#${altEdgeId}`], { strokeDashoffset: 0, duration: 0.5 });
        }
      }
    }
  }, [isAnimating, pathFound, pathData]);

  const handleMouseDown = (nodeId, e) => {
    if (!editMode) return;
    e.stopPropagation();
    if (e.shiftKey) {
      // Start connecting
      setConnectingNode(nodeId);
    } else {
      setDraggingNode(nodeId);
    }
  };

  const handleMouseMove = (e) => {
    if (!editMode || !draggingNode) return;
    
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
    
    setNodes(prev => prev.map(n => 
      n.id === draggingNode ? { ...n, x: Math.max(5, Math.min(95, svgP.x)), y: Math.max(5, Math.min(95, svgP.y)) } : n
    ));
  };

  const handleMouseUp = () => {
    setDraggingNode(null);
  };

  const handleNodeClick = (nodeId, e) => {
    if (!editMode || !connectingNode || connectingNode === nodeId) {
      if (editMode && e.shiftKey) setConnectingNode(nodeId);
      return;
    }

    
    // Create edge
    const weight = parseInt(prompt("Enter edge weight:", "5")) || 5;
    setEdges(prev => [...prev, { source: connectingNode, target: nodeId, weight }]);
    setConnectingNode(null);
  };

  const addNode = () => {
    const id = String.fromCharCode(65 + nodes.length); // Next letter
    setNodes(prev => [...prev, { id, x: 50, y: 50 }]);
  };

  const deleteNode = (id, e) => {
    e.stopPropagation();
    setNodes(prev => prev.filter(n => n.id !== id));
    setEdges(prev => prev.filter(e => e.source !== id && e.target !== id));
  };

  return (
    <div className="w-full h-full bg-slate-50 relative overflow-hidden flex items-center justify-center p-8"
         onMouseMove={handleMouseMove}
         onMouseUp={handleMouseUp}
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="w-full max-w-4xl aspect-video bg-white rounded-3xl shadow-soft border border-slate-100 relative p-4">
        <svg 
          ref={svgRef}
          className="w-full h-full drop-shadow-sm" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="xMidYMid meet"
          onClick={() => setConnectingNode(null)}
        >
          {/* Base Edges */}
          {edges.map((edge, idx) => {
            const source = nodes.find(n => n.id === edge.source);
            const target = nodes.find(n => n.id === edge.target);
            if (!source || !target) return null;

            return (
              <g key={`edge-${edge.source}-${edge.target}-${idx}`} className="graph-edge">
                <line 
                  id={`edge-${edge.source}-${edge.target}-highlight`}
                  x1={source.x} y1={source.y} x2={target.x} y2={target.y} 
                  stroke="#10b981" strokeWidth="1.5" 
                  className="path-highlight"
                  strokeDasharray="100" strokeDashoffset="100"
                />
                <line 
                  x1={source.x} y1={source.y} x2={target.x} y2={target.y} 
                  stroke="#cbd5e1" strokeWidth="0.5" 
                />
                <rect 
                  x={(source.x + target.x) / 2 - 3} 
                  y={(source.y + target.y) / 2 - 2} 
                  width="6" height="4" 
                  fill="white" rx="1" 
                />
                <text 
                  x={(source.x + target.x) / 2} 
                  y={(source.y + target.y) / 2 + 1} 
                  fontSize="3" fill="#64748b" 
                  textAnchor="middle" dominantBaseline="middle"
                  className="font-medium"
                >
                  {edge.weight}
                </text>
              </g>
            );
          })}

          {/* Connection Line (Preview) */}
          {connectingNode && (
            <line 
              x1={nodes.find(n => n.id === connectingNode).x} 
              y1={nodes.find(n => n.id === connectingNode).y} 
              x2="50" y2="50" // Placeholder, should follow mouse if I had mouse coords
              stroke="#10b981" strokeWidth="0.5" strokeDasharray="2"
              className="pointer-events-none"
            />
          )}

          {/* Nodes */}
          {nodes.map((node) => (
            <g 
              key={node.id} 
              id={`node-${node.id}`} 
              className={`graph-node ${editMode ? 'cursor-move' : 'cursor-pointer'}`}
              transform={`translate(${node.x}, ${node.y})`}
              onMouseDown={(e) => handleMouseDown(node.id, e)}
              onClick={() => handleNodeClick(node.id)}
            >
              <circle 
                r="4" 
                fill={connectingNode === node.id ? '#d1fae5' : 'white'} 
                stroke={connectingNode === node.id ? '#10b981' : '#94a3b8'} 
                strokeWidth="0.5"
                className="node-highlight transition-colors duration-300 shadow-sm"
              />
              <text 
                y="0.5" 
                fontSize="3.5" 
                fill="#334155" 
                textAnchor="middle" 
                dominantBaseline="middle"
                className="font-bold pointer-events-none"
              >
                {node.id}
              </text>
              {editMode && (
                <g onClick={(e) => deleteNode(node.id, e)} className="opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                  <circle cx="4" cy="-4" r="2" fill="#fee2e2" stroke="#ef4444" strokeWidth="0.2" />
                  <text x="4" y="-3.5" fontSize="2" textAnchor="middle" fill="#ef4444">×</text>
                </g>
              )}
            </g>
          ))}
        </svg>

        {editMode && (
          <button 
            onClick={addNode}
            className="absolute bottom-6 right-6 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-colors flex items-center gap-2 font-bold text-sm"
          >
            <Plus size={20} />
            Add Node
          </button>
        )}
      </div>
      
      {!pathFound && !isAnimating && !editMode && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur px-6 py-2 rounded-full shadow-sm text-sm text-slate-500 font-medium border border-slate-200">
          Enter Source and Destination to see the visualization.
        </div>
      )}
      {editMode && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-primary/10 text-primary px-6 py-2 rounded-full shadow-sm text-sm font-bold border border-primary/20 flex items-center gap-2">
          <Settings2 size={16} />
          Edit Mode Active: Drag nodes or Shift+Click to connect
        </div>
      )}
    </div>
  );
};

export default GraphContainer;

