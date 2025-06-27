#!/usr/bin/env python3
"""
Azure-compatible startup script for DriverGuard AI Flask app.
This wrapper ensures the app binds to the correct port and host for Azure App Service.
"""
import os
from app import app

if __name__ == '__main__':
    # Azure App Service provides the PORT environment variable
    port = int(os.environ.get('PORT', 8000))
    
    # Azure App Service requires binding to 0.0.0.0
    host = '0.0.0.0'
    
    print(f"Starting DriverGuard AI on {host}:{port}")
    app.run(host=host, port=port, debug=False)
