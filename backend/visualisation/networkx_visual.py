# backend/visualization/networkx_visual.py

import os
import sys
import networkx as nx
import matplotlib.pyplot as plt

sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from graphs.graph_data import graph
from algorithm.dijkstra import dijkstra

def visualize_graph(shortest_path=None):

    # Create graph
    G = nx.Graph()

    # Add edges from graph data
    # Add edges from graph data
    for node in graph:

        for neighbor, weight in graph[node].items():

            G.add_edge(node, neighbor, weight=weight)

    # Generate node positions
    pos = nx.spring_layout(G, seed=42)

    # Draw nodes
    nx.draw_networkx_nodes(
        G,
        pos,
        node_color="skyblue",
        node_size=1500
    )

    # Draw edges
    nx.draw_networkx_edges(
        G,
        pos,
        width=2
    )

    # Draw node labels
    nx.draw_networkx_labels(
        G,
        pos,
        font_size=12,
        font_weight="bold"
    )

    # Draw edge weights
    edge_labels = nx.get_edge_attributes(G, "weight")

    nx.draw_networkx_edge_labels(
        G,
        pos,
        edge_labels=edge_labels
    )

    # Highlight shortest path
    if shortest_path:

        path_edges = list(
            zip(shortest_path, shortest_path[1:])
        )

        nx.draw_networkx_edges(
            G,
            pos,
            edgelist=path_edges,
            edge_color="red",
            width=4
        )

    plt.title("NetworkX Graph Visualization")
    plt.axis("off")
    plt.show()


if __name__ == "__main__":

    start = "A"
    end = "C"

    result, path = dijkstra(graph, start, end)

    print("Dijkstra Result:", result)
    print("Dijkstra Path:", path)

    visualize_graph(path)