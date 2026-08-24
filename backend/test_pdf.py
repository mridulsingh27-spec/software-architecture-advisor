from app.rag.pdf_loader import load_pdfs

documents = load_pdfs()

print("Number of PDFs:", len(documents))

for doc in documents:
    print(doc["filename"])
    print(doc["content"][:300])
    print("----------------------------")
    