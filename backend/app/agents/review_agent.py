import json
import os

from groq import Groq

from app.rag.retriever import retrieve


client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def review_agent(state):

    # Get the information produced by the other agents
    architecture = state.get("architecture", "not specified")
    database = state.get("database", "not specified")
    deployment = state.get("deployment", "not specified")
    scaling = state.get("scaling", "not specified")
    cache = state.get("cache", "not specified")
    message_queue = state.get("message_queue", "not specified")
    cloud = state.get("cloud", "not specified")
    monitoring = state.get("monitoring", "not specified")
    authentication = state.get("authentication", "not specified")

    # Project requirements
    project_name = state.get("project_name", "")
    application_type = state.get("application_type", "")
    expected_users = state.get("expected_users", "")
    features = state.get("features", "")
    budget = state.get("budget", "")

    question = f"""
    Review the software architecture recommendation for this project.

    Project Name: {project_name}
    Application Type: {application_type}
    Expected Users: {expected_users}
    Features: {features}
    Budget: {budget}

    Agent Recommendations:

    Architecture: {architecture}
    Database: {database}
    Deployment: {deployment}
    Scaling: {scaling}
    Cache: {cache}
    Message Queue: {message_queue}
    Cloud: {cloud}
    Monitoring: {monitoring}
    Authentication: {authentication}
    """

    # Retrieve supporting knowledge from the RAG system
    chunks = retrieve(question, top_k=8)

    context = "\n\n".join(chunks)

    prompt = f"""
You are the final Software Architecture Review Agent.

Review the recommendations produced by the specialized architecture agents.

Use the provided knowledge base to make the final recommendation.

IMPORTANT RULES:

1. Consider the project requirements.
2. Consider expected users, scalability and budget.
3. Do not automatically choose Microservices.
4. Do not invent unsupported technologies.
5. Keep recommendations consistent with the knowledge base.
6. If information is unavailable, return "not specified".
7. Return ONLY valid JSON.
8. Do not use Markdown code fences.

Return exactly this structure:

{{
    "architecture": "...",
    "database": "...",
    "deployment": "...",
    "scaling": "...",
    "cache": "...",
    "message_queue": "...",
    "cloud": "...",
    "monitoring": "...",
    "authentication": "...",
    "reason": "..."
}}

PROJECT:

{question}

KNOWLEDGE BASE:

{context}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2
    )

    ai_response = response.choices[0].message.content.strip()

    # Remove accidental Markdown fences
    ai_response = (
        ai_response
        .replace("```json", "")
        .replace("```", "")
        .strip()
    )

    try:
        recommendation = json.loads(ai_response)

    except json.JSONDecodeError:

        print("Invalid JSON returned by Review Agent:")
        print(ai_response)

        recommendation = {
            "architecture": architecture,
            "database": database,
            "deployment": deployment,
            "scaling": scaling,
            "cache": cache,
            "message_queue": message_queue,
            "cloud": cloud,
            "monitoring": monitoring,
            "authentication": authentication,
            "reason": "Final review could not generate a detailed explanation."
        }

    # Store the final recommendation in LangGraph state
    return {
        "final_recommendation": recommendation 
    }