import os
import sys
import heapq

sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from graphs.graph_data import graph

def astar(graph, start, end):
    if start not in graph or end not in graph:
        return {"path": [], "cost": -1}

    # Simple heuristic
    heuristic = {"A": 4, "B": 2, "C": 1, "D": 0, "E": 0}

    # Priority queue stores (f_cost, g_cost, current_node, path)
    queue = [(heuristic.get(start, 0), 0, start, [start])]
    visited = set()

    while queue:
        f_cost, g_cost, node, path = heapq.heappop(queue)

        if node in visited:
            continue
            
        visited.add(node)

        if node == end:
            return {"path": path, "cost": g_cost}

        for neighbor, weight in graph[node].items():
            if neighbor not in visited:
                new_g_cost = g_cost + weight
                new_f_cost = new_g_cost + heuristic.get(neighbor, 0)
                heapq.heappush(queue, (new_f_cost, new_g_cost, neighbor, path + [neighbor]))

    return {"path": [], "cost": -1}

if __name__ == "__main__":
    print(astar(graph, "A", "D"))