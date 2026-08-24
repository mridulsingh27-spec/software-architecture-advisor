from app.rag.rag_pipeline import ask_rag

question = """
Recommend a software architecture for a web application
with 10000 expected users, high scalability requirements,
and a limited budget.
"""

answer = ask_rag(question)

print("\nAI Answer:\n")
print(answer)