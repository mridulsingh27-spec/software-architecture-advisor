import json

from app.llm_client import client
from app.rag.retriever import retrieve


def database_agent(state):

    question = f"""
Recommend a database for this project.

Application:
{state["application_type"]}

Expected users:
{state["expected_users"]}

Features:
{state["features"]}

Budget:
{state["budget"]}

Selected architecture:
{state["architecture"]}
"""

    chunks = retrieve(question, top_k=5)

    context = "\n\n".join(chunks)

    prompt = f"""
You are the Database Agent.

Your ONLY responsibility is recommending the database.

Use ONLY information supported by the knowledge base.

Return ONLY JSON.

Format:

{{
    "database": "...",
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
            "database": "not specified",
            "reason": "Unable to generate database recommendation."
        }

    return {
        "database": recommendation
    }