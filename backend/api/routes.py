from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Union

from algorithm.dijkstra import dijkstra
from algorithm.astar import astar
from algorithm.greedy import greedy
from graphs.graph_data import graph

router = APIRouter(prefix="/api")

class RouteRequest(BaseModel):
    source: str
    destination: str
    algorithm: str

class RouteResponse(BaseModel):
    algorithm: str
    path: List[str]
    cost: Union[float, int, str]

@router.post("/find-route", response_model=RouteResponse)
def find_route(request: RouteRequest):
    source = request.source.upper()
    destination = request.destination.upper()
    
    if source not in graph or destination not in graph:
        raise HTTPException(status_code=400, detail="Source or destination not in graph")

    algo_name = request.algorithm.lower()
    
    if "dijkstra" in algo_name:
        result = dijkstra(graph, source, destination)
        algo_label = "Dijkstra"
        
    elif "a*" in algo_name or "astar" in algo_name:
        result = astar(graph, source, destination)
        algo_label = "A*"
        
    elif "greedy" in algo_name:
        result = greedy(graph, source, destination)
        algo_label = "Greedy"
        
    else:
        raise HTTPException(status_code=400, detail="Invalid algorithm selected")
        
    if not result["path"] or result["cost"] == -1:
        raise HTTPException(status_code=404, detail="No path found")
        
    return RouteResponse(algorithm=algo_label, path=result["path"], cost=result["cost"])

# Keep individual endpoints just in case, mapped to GET with query params
@router.get("/dijkstra")
def run_dijkstra(source: str, destination: str):
    return find_route(RouteRequest(source=source, destination=destination, algorithm="dijkstra"))

@router.get("/astar")
def run_astar(source: str, destination: str):
    return find_route(RouteRequest(source=source, destination=destination, algorithm="astar"))

@router.get("/greedy")
def run_greedy(source: str, destination: str):
    return find_route(RouteRequest(source=source, destination=destination, algorithm="greedy"))