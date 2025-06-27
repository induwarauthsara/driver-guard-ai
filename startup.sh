#!/bin/bash
# Azure App Service startup script for DriverGuard AI

echo "🚀 Starting DriverGuard AI Flask App..."

# Set environment variables for Azure
export PYTHONPATH="/home/site/wwwroot:$PYTHONPATH"
export PORT=${PORT:-8000}

# Install any missing system packages for OpenCV
echo "📦 Installing system dependencies..."
apt-get update -qq >/dev/null 2>&1
# Install system dependencies for audio support as well
apt-get install -y -qq \
    libgl1-mesa-glx \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    libgomp1 \
    ffmpeg \
    libasound2-dev \
    libportaudio2 >/dev/null 2>&1

echo "✅ System dependencies installed"

# Change to app directory
cd /home/site/wwwroot

# Start the application with Azure-compatible startup script
echo "🌐 Starting Flask app on port $PORT..."
exec python azure_startup.py
