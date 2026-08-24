from fastapi import APIRouter
from pydantic import BaseModel
from app.rag.rag_pipeline import ask_rag

router = APIRouter()

class QuestionRequest(BaseModel):
    question: str

@router.post("/ask")
def ask_question(request: QuestionRequest):

    answer = ask_rag(request.question)

    return {
        "question": request.question,
        "answer": answer
    }