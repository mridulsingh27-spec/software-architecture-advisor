import json
import os

from dotenv import load_dotenv
from groq import Groq

from app.rag.retriever import retrieve


load_dotenv()


client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def ask_rag(question: str):

    # ==========================================
    # 1. Retrieve relevant knowledge
    # ==========================================

    chunks = retrieve(question, top_k=12)

    # ==========================================
    # 2. Build RAG context
    # ==========================================

    context = "\n\n".join(chunks)

    print("\n===== RAG CONTEXT =====")
    print(context)

    # ==========================================
    # 3. Build prompt
    # ==========================================

    prompt = f"""
You are an expert Software Architecture Advisor.

Your task is to recommend an architecture for the user's project using
ONLY the provided knowledge base.

IMPORTANT DECISION RULES:

1. Analyze ALL requirements:
   - expected users
   - scalability requirements
   - budget
   - application type
   - features

2. Do NOT automatically choose Microservices.
   Choose Microservices only when the requirements and knowledge base
   justify the additional operational complexity.

3. For a limited/low budget:
   prefer simpler architectures when they can satisfy the requirements.

4. If a Modular Monolith is supported by the knowledge base and provides
   a reasonable balance between scalability and operational simplicity,
   consider it.

5. For high scalability:
   consider horizontal scaling, caching, load balancing, sharding,
   or distributed services ONLY when supported by the knowledge base.

6. Every recommendation must be supported by the retrieved knowledge base.

7. Do NOT invent technologies that are not mentioned in the knowledge base.

8. If the knowledge base does not provide enough information for a field,
   return exactly:
   "not specified"

9. "monitoring" must refer to application/system monitoring.
   Do not use cloud cost-management tools as monitoring.

10. "database" should identify a database technology only when the
    knowledge base supports it.

11. "deployment" should describe the deployment approach only when
    supported by the knowledge base.

12. "cloud" should identify a cloud provider only when supported by
    the knowledge base.

13. Return ONLY valid JSON.
14. Do NOT use Markdown code fences.
15. Do NOT include explanations outside the JSON.

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
    "authentication": "..."
}}

KNOWLEDGE BASE:

{context}

USER REQUIREMENT:

{question}
"""
    # ==========================================
    # 4. Call Groq
    # ==========================================

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

    # ==========================================
    # 5. Get AI response
    # ==========================================

    ai_response = response.choices[0].message.content.strip()

    print("\n===== AI RAW RESPONSE =====")
    print(ai_response)

    # ==========================================
    # 6. Remove Markdown fences if present
    # ==========================================

    ai_response = (
        ai_response
        .replace("```json", "")
        .replace("```", "")
        .strip()
    )

    # ==========================================
    # 7. Convert JSON → Python dictionary
    # ==========================================

    try:
        recommendation = json.loads(ai_response)

    except json.JSONDecodeError:

        print("\n===== INVALID JSON =====")
        print(ai_response)

        recommendation = {
            "architecture": "not specified",
            "database": "not specified",
            "deployment": "not specified",
            "scaling": "not specified",
            "cache": "not specified",
            "message_queue": "not specified",
            "cloud": "not specified",
            "monitoring": "not specified",
            "authentication": "not specified"
        }

    return recommendation