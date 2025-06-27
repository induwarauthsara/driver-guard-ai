#!/usr/bin/env python3
"""
Production wrapper for DriverGuard AI Flask app
Handles Azure-specific configurations and error handling
"""

import os
import sys
import logging

# Configure logging for Azure
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)

logger = logging.getLogger(__name__)

def setup_azure_environment():
    """Setup environment variables for Azure deployment"""
    # Set default port
    if 'PORT' not in os.environ:
        os.environ['PORT'] = '8000'
    
    # Set Python path
    current_dir = os.path.dirname(os.path.abspath(__file__))
    if current_dir not in sys.path:
        sys.path.insert(0, current_dir)
    
    logger.info(f"Python path: {sys.path}")
    logger.info(f"Current directory: {current_dir}")
    logger.info(f"Port: {os.environ.get('PORT')}")

def main():
    """Main entry point for production deployment"""
    try:
        logger.info("🚀 Starting DriverGuard AI Flask App...")
        
        # Setup Azure environment
        setup_azure_environment()
        
        # Import and run the main app
        from app import app
        
        port = int(os.environ.get('PORT', 8000))
        logger.info(f"🌐 Starting Flask app on port {port}...")
        
        # Run in production mode
        app.run(
            host='0.0.0.0',
            port=port,
            debug=False,
            threaded=True
        )
        
    except Exception as e:
        logger.error(f"❌ Failed to start app: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
