
from math import log
import joblib
import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel, Field
from sklearn.metrics.pairwise import cosine_similarity
from loguru import logger
import warnings

# Suppress scikit-learn version warning for model loading
warnings.filterwarnings('ignore', category=UserWarning)



# Get the directory where this script is located
MODEL_PATH = "app/models/recommender.joblib"

# artifact = joblib.load(MODEL_PATH)
# vectorizer = artifact["vectorizer"]
# X = artifact["X"]
# meta = artifact["meta"]

def search_predict(query, top_k=5, content_type=None):
    logger.info(f"MODEL_PATH: {MODEL_PATH}")
    logger.info(f"Received query: {query}, top_k: {top_k}, content_type: {content_type}")

    artifact = joblib.load(MODEL_PATH)
    vectorizer = artifact["vectorizer"]
    X = artifact["X"]
    meta = artifact["meta"]

    logger.info("Model artifacts loaded successfully.")

    q_vec = vectorizer.transform([query.lower()])
    scores = cosine_similarity(q_vec, X).flatten()

    idx = np.argsort(scores)[::-1]

    results = []
    for i in idx:
        row = meta.iloc[i]
        if content_type and row["type"].lower() != content_type.lower():
            continue

        results.append({
            "show_id": row["show_id"],
            "type": row["type"],
            "title": row["title"],
            "country": row["country"],
            "release_year": int(row["release_year"]),
            "rating": row["rating"],
            "duration": row["duration"],
            "listed_in": row["listed_in"],
            "score": float(scores[i])
        })
        if len(results) == top_k:
            break
    return results