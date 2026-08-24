import json

from app.llm_client import client
from app.rag.retriever import retrieve


def scaling_agent(state):

    question = f"""
Determine the scaling strategy for this application.

Expected users:
{state["expected_users"]}

Application:
{state["application_type"]}

Features:
{state["features"]}

Budget:
{state["budget"]}

Architecture:
{state["architecture"]}
"""

    chunks = retrieve(question, top_k=5)

    context = "\n\n".join(chunks)

    prompt = f"""
You are the Scaling Agent.

Your ONLY responsibility is recommending a scaling strategy.

Consider:
- expected users
- scalability requirements
- budget
- selected architecture

Use ONLY the knowledge base.

Return ONLY JSON.

Format:

{{
    "scaling": "...",
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
            "scaling": "not specified",
            "reason": "Unable to generate scaling recommendation."
        }

    return {
        "scaling": recommendation
    }