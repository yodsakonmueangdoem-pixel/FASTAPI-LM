from .schema import FlightRequest
import pandas as pd
import joblib
from loguru import logger


   
def predict_price(req: FlightRequest) -> pd.DataFrame:
    MODEL_PATH = "app/models/flight_price_model.joblib"
    artifact = joblib.load(MODEL_PATH)
    model = artifact["model"]
    features = artifact["features"]
    logger.info(f"Load model successfully from {MODEL_PATH}")

    x = pd.DataFrame([req.model_dump()], columns=features)
    price = float(model.predict(x)[0])
    return {
        "predicted_price": price,
    }