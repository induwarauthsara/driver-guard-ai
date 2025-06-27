#!/usr/bin/env python3
"""
WSGI entry point for DriverGuard AI Flask app
Compatible with the existing app.py structure
"""

import os
import sys
import logging

# Configure logging for Azure
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger(__name__)

# Add current directory to Python path
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

try:
    # Import the Flask app from app.py
    from app import app
    
    # Make the app available to gunicorn
    application = app
    
    logger.info("✅ Flask app loaded successfully for WSGI")
    
    # Configure for production
    if hasattr(app, 'config'):
        app.config['DEBUG'] = False
        
except Exception as e:
    logger.error(f"❌ Failed to load Flask app: {e}")
    raise

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 8000))
    logger.info(f"🌐 Starting Flask app on port {port}...")
    app.run(host='0.0.0.0', port=port, debug=False)
