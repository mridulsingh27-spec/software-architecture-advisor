from app.rag.retriever import retrieve

question = """
I need to choose a software architecture for a web application.
The application has 10000 expected users, needs scalability,
and has a limited budget.
Compare suitable architectures such as monolithic,
microservices, and event-driven architecture.
"""

results = retrieve(question)

print("\n===== RETRIEVED CHUNKS =====")

for i, chunk in enumerate(results):
    print(f"\nChunk {i + 1}:")
    print(chunk)
    print("--------------------")