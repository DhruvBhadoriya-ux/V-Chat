from starlette import responses
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import joblib
import requests


import os

# Load embeddings only once when the server starts
EMBEDDINGS_FILE = os.path.join(os.path.dirname(__file__), "embeddings.joblib")
df = joblib.load(EMBEDDINGS_FILE)


def create_embedding(text_list):
    r = requests.post(
        "http://localhost:11434/api/embed",
        json={
            "model": "bge-m3",
            "input": text_list
        }
    )

    r.raise_for_status()
    return r.json()["embeddings"]


def inference(prompt):
    r = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "llama3",
            "prompt": prompt,
            "stream": False
        }
    )

    r.raise_for_status()
    return r.json()["response"]


def format_time(seconds):
    seconds = int(seconds)

    hours = seconds // 3600
    minutes = (seconds % 3600) // 60
    secs = seconds % 60

    if hours > 0:
        return f"{hours:02d}:{minutes:02d}:{secs:02d}"
    else:
        return f"{minutes:02d}:{secs:02d}"


def ask_rag(incoming_query):

    # Create embedding for student's question
    question_embedding = create_embedding([incoming_query])[0]

    # Compare question with stored lecture embeddings
    embeddings_matrix = np.array(df["embedding"].tolist())

    similarities = cosine_similarity(
        embeddings_matrix,
        [question_embedding]
    ).flatten()

    # Get top 5 relevant chunks
    max_indx = similarities.argsort()[-5:][::-1]

    new_df = df.loc[max_indx].copy()

    # Format timestamps
    new_df["start_time"] = new_df["start"].apply(format_time)
    new_df["end_time"] = new_df["end"].apply(format_time)

    # Create prompt for Llama
    prompt = f"""
You are an AI assistant helping students navigate an HTML course.

Below are subtitle chunks from course videos including:
video title, video number, start time, end time, and text.

Context:
{new_df[["title", "number", "start_time", "end_time", "text"]].to_json(orient="records")}

Student Question:
{incoming_query}

Instructions:
- Answer naturally like a helpful AI tutor.
- Tell the student which video contains the answer.
- Mention the approximate timestamp where the topic is discussed.
- Explain briefly what is taught there.
- If the question is unrelated to the course, politely say you can only answer course-related questions.
- Do not mention that you are looking at retrieved chunks.
- Keep the answer clear and useful.
"""

    response = inference(prompt)

    sources = []

    for _, row in new_df.iterrows():
        sources.append({
            "title": row["title"],
            "video_number": int(row["number"]),
            "start": float(row["start"]),
            "end": float(row["end"]),
            "start_time": row["start_time"],
            "end_time": row["end_time"]
        })

    return {
        "answer": response,
        "sources": sources
    }