from app.rag.pdf_loader import load_pdfs
from app.rag.text_splitter import split_text

documents = load_pdfs()
chunks = split_text(documents)

print("Total Chunks:", len(chunks))
print(chunks[0]["content"])