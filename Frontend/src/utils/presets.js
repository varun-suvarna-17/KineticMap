export const presets = {
  "Small City": {
    nodes: [
      { id: 'A', x: 10, y: 50 },
      { id: 'B', x: 30, y: 20 },
      { id: 'C', x: 30, y: 80 },
      { id: 'D', x: 50, y: 50 },
      { id: 'E', x: 70, y: 20 },
      { id: 'F', x: 70, y: 80 },
      { id: 'G', x: 90, y: 50 }
    ],
    edges: [
      { source: 'A', target: 'B', weight: 5 },
      { source: 'A', target: 'C', weight: 3 },
      { source: 'B', target: 'D', weight: 4 },
      { source: 'C', target: 'D', weight: 6 },
      { source: 'D', target: 'E', weight: 2 },
      { source: 'D', target: 'F', weight: 7 },
      { source: 'E', target: 'G', weight: 3 },
      { source: 'F', target: 'G', weight: 4 }
    ]
  },
  "Campus": {
    nodes: [
      { id: 'Gate', x: 5, y: 50 },
      { id: 'Library', x: 25, y: 30 },
      { id: 'Hostel', x: 25, y: 70 },
      { id: 'Admin', x: 50, y: 50 },
      { id: 'Café', x: 75, y: 30 },
      { id: 'Lab', x: 75, y: 70 },
      { id: 'Exit', x: 95, y: 50 }
    ],
    edges: [
      { source: 'Gate', target: 'Library', weight: 10 },
      { source: 'Gate', target: 'Hostel', weight: 12 },
      { source: 'Library', target: 'Admin', weight: 5 },
      { source: 'Hostel', target: 'Admin', weight: 8 },
      { source: 'Admin', target: 'Café', weight: 4 },
      { source: 'Admin', target: 'Lab', weight: 6 },
      { source: 'Café', target: 'Exit', weight: 3 },
      { source: 'Lab', target: 'Exit', weight: 5 }
    ]
  },
  "Delivery Network": {
    nodes: [
      { id: 'Hub', x: 50, y: 50 },
      { id: 'N1', x: 20, y: 20 },
      { id: 'N2', x: 80, y: 20 },
      { id: 'N3', x: 20, y: 80 },
      { id: 'N4', x: 80, y: 80 },
      { id: 'S1', x: 10, y: 50 },
      { id: 'S2', x: 90, y: 50 }
    ],
    edges: [
      { source: 'Hub', target: 'N1', weight: 15 },
      { source: 'Hub', target: 'N2', weight: 15 },
      { source: 'Hub', target: 'N3', weight: 15 },
      { source: 'Hub', target: 'N4', weight: 15 },
      { source: 'N1', target: 'S1', weight: 10 },
      { source: 'N3', target: 'S1', weight: 10 },
      { source: 'N2', target: 'S2', weight: 10 },
      { source: 'N4', target: 'S2', weight: 10 }
    ]
  }
};
