import json

from app.llm_client import client
from app.rag.retriever import retrieve


def deployment_agent(state):

    question = f"""
Recommend a deployment strategy.

Application:
{state["application_type"]}

Expected users:
{state["expected_users"]}

Budget:
{state["budget"]}

Architecture:
{state["architecture"]}
"""

    chunks = retrieve(question, top_k=5)

    context = "\n\n".join(chunks)

    prompt = f"""
You are the Deployment Agent.

Your ONLY responsibility is deployment.

Use ONLY the knowledge base.

Return ONLY JSON.

Format:

{{
    "deployment": "...",
    "cloud": "...",
    "reason": "..."
}}

KNOWLEDGE BASE:

{context}

PROJECT:

{question}
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

    result = response.choices[0].message.content.strip()

    result = (
        result
        .replace("```json", "")
        .replace("```", "")
        .strip()
    )

    try:
        recommendation = json.loads(result)
    except json.JSONDecodeError:
        recommendation = {
            "deployment": "not specified",
            "cloud": "not specified",
            "reason": "Unable to generate deployment recommendation."
        }

    return {
        "deployment": recommendation
    }