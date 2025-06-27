#!/usr/bin/env python3
"""
Azure-compatible startup script for DriverGuard AI
This is used when Azure detects your app structure
"""

import os
import sys

# Ensure current directory is in Python path
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

# Set environment variables for Azure
os.environ.setdefault('PORT', '8000')

# Import and start the app
if __name__ == "__main__":
    from app import app
    port = int(os.environ.get('PORT', 8000))
    print(f"🚀 Starting DriverGuard AI on port {port}")
    app.run(host='0.0.0.0', port=port, debug=False)
