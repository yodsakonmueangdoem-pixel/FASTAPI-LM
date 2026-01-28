from fastapi import APIRouter
from .schema import FlightRequest
from .service import predict_price

router = APIRouter()

@router.post('/predict', tags=['Flight Price Prediction'])
def get_flight_price_prediction(data: FlightRequest):
    prediction = predict_price(data)
    return prediction