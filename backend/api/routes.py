from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, List, Union, Optional

from algorithm.dijkstra import dijkstra
from algorithm.astar import astar
from algorithm.greedy import greedy
from graphs.graph_data import graph as default_graph

router = APIRouter(prefix="/api")

class RouteRequest(BaseModel):
    source: str
    destination: str
    algorithm: Optional[str] = "dijkstra"
    graph: Optional[Dict[str, Dict[str, float]]] = None
    nodes_data: Optional[dict] = None

class RouteResponse(BaseModel):
    algorithm: str
    path: List[str]
    cost: Union[float, int, str]

def run_algorithm(algo_name, graph_data, source, destination):
    algo_name = algo_name.lower()

    if "dijkstra" in algo_name:
        result = dijkstra(graph_data, source, destination)
        label = "Dijkstra"
    elif "a*" in algo_name or "astar" in algo_name:
        result = astar(graph_data, source, destination)
        label = "A*"
    elif "greedy" in algo_name:
        result = greedy(graph_data, source, destination)
        label = "Greedy"
    else:
        raise HTTPException(status_code=400, detail="Invalid algorithm selected")

    if not result["path"] or result["cost"] == -1:
        raise HTTPException(status_code=404, detail="No path found")

    return RouteResponse(
        algorithm=label,
        path=result["path"],
        cost=result["cost"]
    )

@router.post("/find-route", response_model=RouteResponse)
def find_route(request: RouteRequest):
    graph_data = request.graph if request.graph else default_graph

    source = request.source
    destination = request.destination

    if source not in graph_data or destination not in graph_data:
        raise HTTPException(status_code=400, detail="Source or destination not in graph")

    return run_algorithm(request.algorithm, graph_data, source, destination)

@router.post("/compare")
def compare_algorithms(request: RouteRequest):
    graph_data = request.graph if request.graph else default_graph

    source = request.source
    destination = request.destination

    if source not in graph_data or destination not in graph_data:
        raise HTTPException(status_code=400, detail="Source or destination not in graph")

    return {
        "dijkstra": run_algorithm("dijkstra", graph_data, source, destination),
        "astar": run_algorithm("astar", graph_data, source, destination),
        "greedy": run_algorithm("greedy", graph_data, source, destination),
    }