# FastAPI ML Project

A FastAPI project with machine learning capabilities for serving ML models via REST APIs.

## Features

- **FastAPI** - Modern, fast web framework for building APIs
- **Machine Learning Support** - TensorFlow and scikit-learn integration
- **Type Safety** - Pydantic models for request/response validation
- **High Performance** - ASGI server with Uvicorn

## Requirements

- Python 3.13+
- Virtual environment (venv/)

## Installation

1. **Clone and navigate to the project:**
   ```bash
   cd fastapi-lm
   ```

2. **Activate the virtual environment:**
   ```bash
   source venv/bin/activate  # On macOS/Linux
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

## Running the Application

### Development Mode

Start the development server with auto-reload:

```bash
uvicorn app.main:app --reload
```

### Production Mode

Run with specific host and port:

```bash
python -m uvicorn main:app --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

## Project Structure

```
fastapi-lm/
|
├── app/
│   ├── main.py
│   ├── core/
│   │   ├── config.py
│   │   ├── logger.py
│   │   └── security.py
│   │
│   ├── api/
│   │   ├── v1/
│   │   │   ├── router.py
│   │   │   ├── flight/
│   │   │   │   ├── route.py
│   │   │   │   ├── schema.py
│   │   │   │   └── service.py
│   │   │   ├── depression/
│   │   │   │   ├── route.py
│   │   │   │   ├── schema.py
│   │   │   │   └── service.py
│   │   │   ├── animal/
│   │   │   │   ├── route.py
│   │   │   │   ├── schema.py
│   │   │   │   └── service.py
│   │   │   └── recommend/
│   │   │       ├── route.py
│   │   │       ├── schema.py
│   │   │       └── service.py
│
│   ├── models/
│   │   ├── flight_price.pkl
│   │   ├── depression_model.pt
│   │   ├── animal_cnn.pt
│   │   └── movie_embedding.faiss
│
│   └── utils/
│       ├── preprocess.py
│       └── inference.py
│
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## API Documentation

Once the server is running, access the interactive API documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Dependencies

Key dependencies include:

- FastAPI 0.115.0 - Web framework
- Uvicorn 0.30.6 - ASGI server
- TensorFlow ≥2.20.0 - Deep learning
- scikit-learn ≥1.6.0 - Machine learning
- pandas ≥2.2.2 - Data processing
- numpy ≥2.1.0 - Numerical computing

## Development

### Project Status

This is a scaffold project set up for ML model serving. The architecture follows FastAPI's routing system with:

- Single entry point (`main.py`)
- Modular routers for different API endpoints
- Pydantic models for data validation
- ML models loaded and served via TensorFlow/scikit-learn

## License

MIT License
