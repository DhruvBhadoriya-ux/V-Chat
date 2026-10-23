import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

db = client["vchat_db"]

users_collection = db["users"]
documents_collection = db["documents"]
chat_history_collection = db["chat_history"]

try:
    client.admin.command("ping")
    print("MongoDB connected successfully!")
except Exception as e:
    print("MongoDB connection failed:", e)