from pydantic import BaseModel

class ProjectRequest(BaseModel):
    project_name: str
    application_type: str
    expected_users: int
    features: str
    budget: str