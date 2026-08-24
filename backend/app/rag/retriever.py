import chromadb
from sentence_transformers import SentenceTransformer

# Load embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Connect to ChromaDB
client = chromadb.PersistentClient(path="./chroma_db")


def retrieve(query, top_k=12):
    collection = client.get_collection(name="architecture_docs")

    query_embedding = model.encode(query).tolist()

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k,
        include=["documents", "distances", "metadatas"]
    )

    print("\n===== QUERY =====")
    print(query)

    print("\n===== RETRIEVED CHUNKS =====")

    for i, chunk in enumerate(results["documents"][0]):
        print(f"\nChunk {i + 1}")
        print("Distance:", results["distances"][0][i])
        print(chunk[:500])
        print("--------------------")

    return results["documents"][0]