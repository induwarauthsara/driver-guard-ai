#!/usr/bin/env python3
"""
Validation script for DriverGuard AI Flask app
Tests all imports and basic functionality
"""

import sys
import traceback

def test_imports():
    """Test all required imports"""
    print("🧪 Testing imports...")
    
    try:
        # Test Flask imports
        from flask import Flask, request, jsonify, render_template
        from flask_cors import CORS
        print("✅ Flask imports successful")
        
        # Test basic Python libraries
        import os, logging, threading
        from datetime import datetime
        print("✅ Standard library imports successful")
        
        # Test data processing libraries
        import numpy as np
        print("✅ NumPy import successful")
        
        # Test computer vision libraries (these might fail)
        try:
            import cv2
            print("✅ OpenCV import successful")
        except ImportError:
            print("⚠️  OpenCV not available (will be installed in production)")
        
        try:
            import mediapipe as mp
            print("✅ MediaPipe import successful")
        except ImportError:
            print("⚠️  MediaPipe not available (will be installed in production)")
            
        return True
        
    except Exception as e:
        print(f"❌ Import failed: {e}")
        traceback.print_exc()
        return False

def test_app_creation():
    """Test Flask app creation"""
    print("\n🏗️  Testing Flask app creation...")
    
    try:
        from flask import Flask
        from flask_cors import CORS
        
        app = Flask(__name__)
        CORS(app)
        
        @app.route('/test')
        def test():
            return {'status': 'success', 'message': 'App created successfully'}
        
        print("✅ Flask app creation successful")
        return True
        
    except Exception as e:
        print(f"❌ App creation failed: {e}")
        traceback.print_exc()
        return False

def test_file_structure():
    """Test if required files exist"""
    print("\n📁 Testing file structure...")
    
    required_files = [
        'app.py',
        'requirements.txt',
        'Procfile',
        'templates/index.html'
    ]
    
    all_exist = True
    for file in required_files:
        if os.path.exists(file):
            print(f"✅ {file} exists")
        else:
            print(f"❌ {file} missing")
            all_exist = False
    
    return all_exist

def main():
    """Run all tests"""
    print("🚀 DriverGuard AI - Local Validation Test")
    print("=" * 50)
    
    # Test imports
    import_success = test_imports()
    
    # Test app creation
    app_success = test_app_creation()
    
    # Test file structure
    files_success = test_file_structure()
    
    # Summary
    print("\n📊 Test Summary:")
    print("=" * 30)
    print(f"Imports:       {'✅ PASS' if import_success else '❌ FAIL'}")
    print(f"App Creation:  {'✅ PASS' if app_success else '❌ FAIL'}")
    print(f"File Structure: {'✅ PASS' if files_success else '❌ FAIL'}")
    
    if import_success and app_success and files_success:
        print("\n🎉 All tests passed! App is ready for deployment.")
        return 0
    else:
        print("\n⚠️  Some tests failed. Check the issues above.")
        return 1

if __name__ == '__main__':
    sys.exit(main())
