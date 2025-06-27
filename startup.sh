#!/bin/bash
# Azure App Service startup script

echo "🚀 Starting DriverGuard AI Flask App..."

# Set environment variables for Azure
export PYTHONPATH="/home/site/wwwroot:$PYTHONPATH"
export PORT=${PORT:-8000}

# Install any missing system packages
apt-get update -qq
apt-get install -y -qq \
    libgl1-mesa-glx \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    libgomp1 \
    ffmpeg

echo "📦 System dependencies installed"

# Start the application
echo "🌐 Starting Flask app on port $PORT..."
exec gunicorn --bind 0.0.0.0:$PORT --workers 1 --timeout 600 --worker-class sync app:app
