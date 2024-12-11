# Use the official Python 3.10 slim image as the base image
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /app

# Install system dependencies needed for the application and OpenCV
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    libgl1 \
    libglib2.0-0 \
    --no-install-recommends && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*


# Copy requirements file to the container
COPY requirements.txt ./

# Install Python dependencies
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Copy the application code to the container
COPY . ./

# Expose the port on which the FastAPI app runs
EXPOSE 8080

# Command to run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]