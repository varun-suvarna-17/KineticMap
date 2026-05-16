import os
import sys
import heapq

sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from graphs.graph_data import graph

def dijkstra(graph, start, end):
    if start not in graph or end not in graph:
        return {"path": [], "cost": -1}

    # Priority queue stores (cost, current_node, path)
    queue = [(0, start, [start])]
    visited = set()

    while queue:
        cost, node, path = heapq.heappop(queue)

        if node in visited:
            continue
            
        visited.add(node)

        if node == end:
            return {"path": path, "cost": cost}

        for neighbor, weight in graph[node].items():
            if neighbor not in visited:
                heapq.heappush(queue, (cost + weight, neighbor, path + [neighbor]))

    return {"path": [], "cost": -1}

if __name__ == "__main__":
    print(dijkstra(graph, "A", "D"))