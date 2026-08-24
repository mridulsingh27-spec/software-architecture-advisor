import chromadb
from sentence_transformers import SentenceTransformer

# Load embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Create ChromaDB client
client = chromadb.PersistentClient(path="./chroma_db")

# Create collection
collection = client.get_or_create_collection(
    name="architecture_docs"
)


def store_chunks(chunks):
    ids = []
    embeddings = []
    documents = []
    metadatas = []

    for i, chunk in enumerate(chunks):
        embedding = model.encode(chunk["content"]).tolist()

        ids.append(str(i))
        embeddings.append(embedding)
        documents.append(chunk["content"])
        metadatas.append({
            "filename": chunk["filename"]
        })

    collection.add(
        ids=ids,
        embeddings=embeddings,
        documents=documents,
        metadatas=metadatas
    )

    print(f"Stored {len(chunks)} chunks.")
    print("Total chunks in collection:", collection.count())