from database import documents_collection


test_document = {
    "filename": "python_test.pdf",
    "file_type": "pdf",
    "status": "processed",
    "chunk_count": 10
}

result = documents_collection.insert_one(test_document)

print("Document inserted successfully!")
print("Document ID:", result.inserted_id)