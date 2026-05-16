import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from graphs.graph_data import graph

def greedy(graph, start, end):
    if start not in graph or end not in graph:
        return {"path": [], "cost": -1}

    current = start
    path = [current]
    total_cost = 0
    visited = set([current])

    while current != end:

        # If no neighbors exist
        if not graph[current]:
            return {"path": [], "cost": -1}

        # Filter out visited neighbors
        unvisited_neighbors = {k: v for k, v in graph[current].items() if k not in visited}
        
        # If all neighbors are visited and destination is not reached, terminate gracefully
        if not unvisited_neighbors:
            return {"path": [], "cost": -1}

        # Choose the unvisited neighbor with minimum cost
        next_node = min(unvisited_neighbors, key=unvisited_neighbors.get)

        # Add cost
        total_cost += graph[current][next_node]

        # Move to next node
        current = next_node

        # Mark as visited
        visited.add(current)

        # Store path
        path.append(current)

    return {"path": path, "cost": total_cost}

if __name__ == "__main__":
    print(greedy(graph, "A", "D"))