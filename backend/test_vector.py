import chromadb

from app.rag.pdf_loader import load_pdfs
from app.rag.text_splitter import split_text
from app.rag.vector_store import store_chunks


documents = load_pdfs()

print("Number of PDFs:", len(documents))

chunks = split_text(documents)

print("Number of chunks:", len(chunks))

store_chunks(chunks)


client = chromadb.PersistentClient(path="./chroma_db")

collection = client.get_collection("architecture_docs")

print("\n===== COLLECTION CONTENTS =====")

data = collection.get()

print("Number of stored documents:", len(data["documents"]))

for i, doc in enumerate(data["documents"][:10]):
    print(f"\nChunk {i + 1}:")
    print(doc[:200])

print("\n===== COLLECTIONS =====")
print(client.list_collections())