from pydantic import BaseModel

class RecommendRequest(BaseModel):
    query: str
    type: str
    top_k: int