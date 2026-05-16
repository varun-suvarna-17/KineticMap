import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Predefined mock graph
const mockGraph = {
  nodes: [
    { id: 'A', x: 20, y: 50 },
    { id: 'B', x: 40, y: 20 },
    { id: 'C', x: 40, y: 80 },
    { id: 'D', x: 70, y: 35 },
    { id: 'E', x: 85, y: 70 },
  ],
  edges: [
    { source: 'A', target: 'B', weight: 4 },
    { source: 'A', target: 'C', weight: 2 },
    { source: 'B', target: 'C', weight: 5 },
    { source: 'B', target: 'D', weight: 10 },
    { source: 'C', target: 'D', weight: 3 },
    { source: 'C', target: 'E', weight: 8 },
    { source: 'D', target: 'E', weight: 2 },
  ]
};

const GraphContainer = ({ isAnimating, pathFound, resetTrigger, pathData }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    // Initial entrance animation
    const nodes = svgRef.current.querySelectorAll('.graph-node');
    const edges = svgRef.current.querySelectorAll('.graph-edge');
    
    gsap.fromTo(nodes, 
      { scale: 0, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.5)' }
    );
    
    gsap.fromTo(edges, 
      { strokeDashoffset: 1000 }, 
      { strokeDashoffset: 0, duration: 1, ease: 'power2.out', delay: 0.3 }
    );
  }, []);

  useEffect(() => {
    if (resetTrigger > 0) {
      // Reset animations
      gsap.to('.path-highlight', { strokeDashoffset: 1000, duration: 0.5 });
      gsap.to('.node-highlight', { fill: 'white', scale: 1, duration: 0.3 });
      gsap.to('.graph-node text', { fill: '#334155', duration: 0.3 }); // Reset text color
    }
  }, [resetTrigger]);

  useEffect(() => {
    if (isAnimating && pathFound && pathData && pathData.path) {
      const tl = gsap.timeline();
      const path = pathData.path;
      
      for (let i = 0; i < path.length; i++) {
        const node = path[i];
        const isLastNode = i === path.length - 1;
        
        // Highlight Node
        if (isLastNode) {
          tl.to(`#node-${node} circle`, { fill: '#10b981', stroke: '#059669', scale: 1.3, duration: 0.4, ease: 'back.out' });
          tl.to(`#node-${node} text`, { fill: 'white', duration: 0.1 }, "<");
        } else {
          tl.to(`#node-${node} circle`, { fill: '#d1fae5', stroke: '#10b981', scale: 1.2, duration: 0.3 });
        }
        
        // Highlight Edge
        if (!isLastNode) {
          const nextNode = path[i+1];
          // Find the correct edge in our mockGraph to get the right ID
          const edgeObj = mockGraph.edges.find(e => 
            (e.source === node && e.target === nextNode) || 
            (e.source === nextNode && e.target === node)
          );
          
          if (edgeObj) {
            tl.to(`#edge-${edgeObj.source}-${edgeObj.target}-highlight`, { strokeDashoffset: 0, duration: 0.5 });
          }
        }
      }
    }
  }, [isAnimating, pathFound, pathData]);

  return (
    <div className="w-full h-full bg-slate-50 relative overflow-hidden flex items-center justify-center p-8">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="w-full max-w-4xl aspect-video bg-white rounded-3xl shadow-soft border border-slate-100 relative p-4">
        <svg 
          ref={svgRef}
          className="w-full h-full drop-shadow-sm" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="25" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#cbd5e1" />
            </marker>
            <marker id="arrowhead-active" markerWidth="10" markerHeight="7" refX="25" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
            </marker>
          </defs>

          {/* Base Edges */}
          {mockGraph.edges.map((edge, idx) => {
            const source = mockGraph.nodes.find(n => n.id === edge.source);
            const target = mockGraph.nodes.find(n => n.id === edge.target);
            return (
              <g key={`edge-${idx}`} className="graph-edge" strokeDasharray="1000" strokeDashoffset="0">
                {/* Highlight line (hidden initially) */}
                <line 
                  id={`edge-${edge.source}-${edge.target}-highlight`}
                  x1={source.x} y1={source.y} x2={target.x} y2={target.y} 
                  stroke="#10b981" strokeWidth="1.5" 
                  className="path-highlight"
                  strokeDasharray="100" strokeDashoffset="100"
                />
                
                {/* Base line */}
                <line 
                  x1={source.x} y1={source.y} x2={target.x} y2={target.y} 
                  stroke="#cbd5e1" strokeWidth="0.5" 
                />
                
                {/* Weight Label */}
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

          {/* Nodes */}
          {mockGraph.nodes.map((node) => (
            <g key={node.id} id={`node-${node.id}`} className="graph-node" transform={`translate(${node.x}, ${node.y})`}>
              <circle 
                r="4" 
                fill="white" 
                stroke="#94a3b8" 
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
            </g>
          ))}
        </svg>
      </div>
      
      {!pathFound && !isAnimating && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur px-6 py-2 rounded-full shadow-sm text-sm text-slate-500 font-medium border border-slate-200">
          Enter Source (A) and Destination (D) to see the visualization.
        </div>
      )}
    </div>
  );
};

export default GraphContainer;
