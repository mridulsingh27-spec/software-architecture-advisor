import json

from app.llm_client import client
from app.rag.retriever import retrieve


def security_agent(state):

    question = f"""
Recommend authentication and security considerations.

Application:
{state["application_type"]}

Features:
{state["features"]}

Architecture:
{state["architecture"]}
"""

    chunks = retrieve(question, top_k=5)

    context = "\n\n".join(chunks)

    prompt = f"""
You are the Security Agent.

Your ONLY responsibility is authentication and security.

Use ONLY the supplied knowledge base.

Return ONLY JSON.

Format:

{{
    "authentication": "...",
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
            "authentication": "not specified",
            "reason": "Unable to generate security recommendation."
        }

    return {
        "security": recommendation
    }