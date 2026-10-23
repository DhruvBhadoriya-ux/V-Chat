from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from rag_engine import ask_rag

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Question(BaseModel):
    question: str


@app.get("/")
def home():
    return {
        "message": "V-CHAT API is running!"
    }


@app.post("/ask")
def ask_question(data: Question):
    result = ask_rag(data.question)

    return result


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api:app", host="127.0.0.1", port=8000, reload=True)