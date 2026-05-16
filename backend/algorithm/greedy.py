# backend/algorithms/greedy.py


import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from graphs.graph_data import graph


def greedy(graph, start, end):

    current = start
    path = [current]
    total_cost = 0

    while current != end:

        # If no neighbors exist
        if not graph[current]:
            return "No path found"

        # Choose the neighbor with minimum cost
        next_node = min(graph[current], key=graph[current].get)

        # Add cost
        total_cost += graph[current][next_node]

        # Move to next node
        current = next_node

        # Store path
        path.append(current)

    return {
        "Path": path,
        "Total Cost": total_cost
    }


if __name__ == "__main__":

    start = "A"
    end = "D"

    result = greedy(graph, start, end)

    print("Greedy Result:", result)