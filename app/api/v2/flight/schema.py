from pydantic import BaseModel, Field

class FlightRequest(BaseModel):
    Airline: str
    Source: str
    Destination: str
    Total_Stops: int = Field(..., ge=0)
    Month: int = Field(..., ge=1, le=12)
    Year: int
    Duration_hours: int = Field(..., ge=0)
    Duration_min: int = Field(..., ge=0, le=59)