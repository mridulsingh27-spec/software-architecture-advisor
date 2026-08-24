def split_text(documents, chunk_size=500):

    chunks = []

    for doc in documents:

        text = doc["content"]

        for i in range(0, len(text), chunk_size):

            chunk = text[i:i + chunk_size]

            chunks.append({
                "filename": doc["filename"],
                "content": chunk
            })

    return chunks