from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from collections import defaultdict, deque

app = FastAPI(
    title="VectorShift Pipeline API",
    description="API for parsing and validating pipeline graphs",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Node(BaseModel):
    id: str
    type: Optional[str] = None
    data: Optional[Dict[str, Any]] = None
    position: Optional[Dict[str, float]] = None


class Edge(BaseModel):
    id: Optional[str] = None
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None


class PipelineRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]


class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool
    message: str


def check_dag(nodes: List[Node], edges: List[Edge]) -> bool:

    if not nodes:
        return True
    
    node_ids = {node.id for node in nodes}
    adj_list = defaultdict(list)
    in_degree = defaultdict(int)
    
    for node_id in node_ids:
        in_degree[node_id] = 0
    
    for edge in edges:
        if edge.source in node_ids and edge.target in node_ids:
            adj_list[edge.source].append(edge.target)
            in_degree[edge.target] += 1
    
    queue = deque([node_id for node_id in node_ids if in_degree[node_id] == 0])
    processed_count = 0
    
    while queue:
        current = queue.popleft()
        processed_count += 1
        
        for neighbor in adj_list[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    return processed_count == len(node_ids)


@app.get('/')
def read_root():
    """Health check endpoint"""
    return {'status': 'healthy', 'service': 'VectorShift Pipeline API'}


@app.post('/pipelines/parse', response_model=PipelineResponse)
def parse_pipeline(pipeline: PipelineRequest):

    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag = check_dag(pipeline.nodes, pipeline.edges)
    
    if is_dag:
        message = f"Pipeline is valid! Contains {num_nodes} nodes and {num_edges} edges forming a valid DAG."
    else:
        message = f"Pipeline contains a cycle! Please remove circular dependencies to create a valid DAG."
    
    return PipelineResponse(
        num_nodes=num_nodes,
        num_edges=num_edges,
        is_dag=is_dag,
        message=message
    )
