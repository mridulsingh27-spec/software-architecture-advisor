import json

from app.llm_client import client
from app.rag.retriever import retrieve


def architecture_agent(state):

    question = f"""
Recommend the most appropriate software architecture.

Project:
{state["project_name"]}

Application type:
{state["application_type"]}

Expected users:
{state["expected_users"]}

Features:
{state["features"]}

Budget:
{state["budget"]}
"""

    chunks = retrieve(question, top_k=5)

    context = "\n\n".join(chunks)

    prompt = f"""
You are the Architecture Agent.

Your ONLY responsibility is selecting the software architecture.

Use ONLY the supplied knowledge base.

Consider:
- application type
- expected users
- scalability
- budget
- features

Do not automatically choose microservices.

Return ONLY JSON.

Format:

{{
    "architecture": "...",
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
            "architecture": "not specified",
            "reason": "Unable to generate architecture recommendation."
        }

    return {
        "architecture": recommendation
    }