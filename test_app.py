#!/usr/bin/env python3
"""
Simple test version of the DriverGuard AI Flask app
Tests core Flask functionality without heavy dependencies
"""

from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)

print("🚀 Starting DriverGuard AI Test Server...")

@app.route('/')
def index():
    """Home page"""
    return """
    <html>
        <head><title>DriverGuard AI - Test</title></head>
        <body>
            <h1>🚗 DriverGuard AI - Test Mode</h1>
            <p>Flask server is running successfully!</p>
            <ul>
                <li><a href="/health">Health Check</a></li>
                <li><a href="/api/status">API Status</a></li>
            </ul>
        </body>
    </html>
    """

@app.route('/health')
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '1.0.0-test',
        'service': 'DriverGuard AI Test'
    })

@app.route('/api/status')
def status():
    """API status endpoint"""
    return jsonify({
        'api_version': '1.0.0-test',
        'status': 'active',
        'mode': 'test',
        'endpoints': {
            'health': '/health',
            'status': '/api/status'
        },
        'message': 'Flask server running successfully'
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"🌐 Server starting on http://localhost:{port}")
    app.run(host='0.0.0.0', port=port, debug=True)
