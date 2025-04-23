import os
from pymongo import MongoClient

try:
    client = MongoClient(f"mongodb://{os.getenv('DB_USER')}:{os.getenv('DB_PASS')}@{os.getenv('DB_HOST')}:27017/")
    client.admin.command('ping')
    print("✅ Connexion MongoDB réussie")
except Exception as e:
    print("❌ Connexion échouée :", e)
