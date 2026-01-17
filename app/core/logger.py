from loguru import logger
import sys

logger.remove()

logger.add(
    sys.stdout,
    level="INFO",
    format="<green>{time}</green> | <level>{level}</level> | <cyan>{message}</cyan>"
)

logger.add(
    "logs/app.log",
    rotation="10 MB",
    level="DEBUG"
)
