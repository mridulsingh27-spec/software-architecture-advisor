from langgraph.graph import StateGraph, END

from app.agents.state import ArchitectureState

from app.agents.architecture_agent import architecture_agent
from app.agents.database_agent import database_agent
from app.agents.scaling_agent import scaling_agent
from app.agents.deployment_agent import deployment_agent
from app.agents.security_agent import security_agent
from app.agents.review_agent import review_agent


def build_graph():

    graph = StateGraph(ArchitectureState)

    # Add agents
    graph.add_node(
        "architecture",
        architecture_agent
    )

    graph.add_node(
        "database",
        database_agent
    )

    graph.add_node(
        "scaling",
        scaling_agent
    )

    graph.add_node(
        "deployment",
        deployment_agent
    )

    graph.add_node(
        "security",
        security_agent
    )

    graph.add_node(
        "review",
        review_agent
    )

    # Starting point
    graph.set_entry_point("architecture")

    # Sequential flow
    graph.add_edge(
        "architecture",
        "database"
    )

    graph.add_edge(
        "database",
        "scaling"
    )

    graph.add_edge(
        "scaling",
        "deployment"
    )

    graph.add_edge(
        "deployment",
        "security"
    )

    graph.add_edge(
        "security",
        "review"
    )

    graph.add_edge(
        "review",
        END
    )

    return graph.compile()


architecture_graph = build_graph()