from fastapi import APIRouter
from .service import assess_depression_service
from .schema import DepressionRequest

router = APIRouter()

@router.post('/depression', tags=['Depression'])
def assess_depression(data: DepressionRequest):
    return assess_depression_service()