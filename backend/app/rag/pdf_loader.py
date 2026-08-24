from pypdf import PdfReader
import os

KNOWLEDGE_BASE = "knowledge_base"


def load_pdfs():
    documents = []

    for root, dirs, files in os.walk(KNOWLEDGE_BASE):

        for file in files:

            if file.endswith(".pdf"):

                pdf_path = os.path.join(root, file)

                reader = PdfReader(pdf_path)

                text = ""

                for page in reader.pages:
                    if page.extract_text():
                        text += page.extract_text() + "\n"

                documents.append({
                    "filename": file,
                    "content": text
                })

    return documents