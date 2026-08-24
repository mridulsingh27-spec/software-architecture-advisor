from typing import TypedDict


class ArchitectureState(TypedDict, total=False):

    # User requirements
    project_name: str
    application_type: str
    expected_users: int
    features: str
    budget: str

    # RAG
    context: str

    # Agent outputs
    architecture: dict
    database: dict
    scaling: dict
    deployment: dict
    security: dict

    # Final result
    final_recommendation: dict