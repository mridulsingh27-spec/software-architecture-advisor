from fastapi import APIRouter
from pydantic import BaseModel

from app.agents.graph import architecture_graph

router = APIRouter()


class ProjectRequest(BaseModel):
    project_name: str
    application_type: str
    expected_users: int
    features: str
    budget: str


@router.post("/analyze")
def analyze_project(project: ProjectRequest):

    result = architecture_graph.invoke({
        "project_name": project.project_name,
        "application_type": project.application_type,
        "expected_users": str(project.expected_users),
        "features": project.features,
        "budget": project.budget,
    })

    return {
    "message": "Architecture Generated Successfully",

    # Final recommendation — KEEPING your existing logic
    "recommendation": result.get("final_recommendation", {}),

    # Individual agent results
    "agents": {
        "architecture": result.get("architecture", {}),
        "database": result.get("database", {}),
        "scaling": result.get("scaling", {}),
        "deployment": result.get("deployment", {}),
        "security": result.get("security", {}),
        "review": result.get("final_recommendation", {})
    }
}