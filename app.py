from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import cv2
import mediapipe as mp
import math
import numpy as np
import base64
import threading
import os
import logging
from datetime import datetime

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure logging for production
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize MediaPipe Face Mesh
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(
    static_image_mode=False, 
    max_num_faces=1, 
    refine_landmarks=True,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
)

# Eye landmark indices for MediaPipe Face Mesh
LEFT_EYE = [362, 385, 387, 263, 373, 380]
RIGHT_EYE = [33, 160, 158, 133, 153, 144]

# Drowsiness detection parameters
sleep_frames = 0
SLEEP_FRAMES_THRESHOLD = 15
EAR_THRESHOLD = 0.25

def calculate_ear(landmarks, eye_indices):
    """Calculate Eye Aspect Ratio (EAR) using MediaPipe landmarks"""
    try:
        # Convert landmarks to numpy array for easier calculation
        points = []
        for idx in eye_indices:
            x = landmarks[idx].x
            y = landmarks[idx].y
            points.append([x, y])
        
        points = np.array(points)
        
        # Calculate EAR using the 6-point eye landmark formula
        # EAR = (|p2-p6| + |p3-p5|) / (2 * |p1-p4|)
        A = np.linalg.norm(points[1] - points[5])  # Vertical distance 1
        B = np.linalg.norm(points[2] - points[4])  # Vertical distance 2  
        C = np.linalg.norm(points[0] - points[3])  # Horizontal distance
        
        if C == 0:
            return 0.3  # Default value to avoid division by zero
            
        ear = (A + B) / (2.0 * C)
        return ear
        
    except Exception as e:
        logger.error(f"Error calculating EAR: {e}")
        return 0.3  # Default safe value

@app.route('/')
def index():
    """Home page"""
    return render_template('index.html')

@app.route('/health')
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '1.0.0',
        'service': 'DriverGuard AI'
    })

@app.route('/api/detect', methods=['POST'])
def detect_drowsiness():
    """Main drowsiness detection endpoint"""
    global sleep_frames
    
    try:
        # Get image data from request
        data = request.get_json()
        if not data or 'image' not in data:
            return jsonify({'error': 'No image data provided'}), 400
        
        # Decode base64 image
        image_data = data['image']
        if ',' in image_data:
            image_data = image_data.split(',')[1]  # Remove data:image/jpeg;base64,
        
        image_bytes = base64.b64decode(image_data)
        
        # Convert to numpy array
        nparr = np.frombuffer(image_bytes, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if frame is None:
            return jsonify({'error': 'Invalid image data'}), 400
        
        # Convert BGR to RGB for MediaPipe
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        
        # Process the frame
        results = face_mesh.process(rgb_frame)
        
        response_data = {
            'drowsy': False,
            'ear_left': 0.0,
            'ear_right': 0.0,
            'confidence': 0.0,
            'message': 'No face detected',
            'timestamp': datetime.now().isoformat()
        }
        
        if results.multi_face_landmarks:
            for face_landmarks in results.multi_face_landmarks:
                landmarks = face_landmarks.landmark
                
                # Calculate EAR for both eyes
                left_ear = calculate_ear(landmarks, LEFT_EYE)
                right_ear = calculate_ear(landmarks, RIGHT_EYE)
                avg_ear = (left_ear + right_ear) / 2.0
                
                response_data.update({
                    'ear_left': round(left_ear, 3),
                    'ear_right': round(right_ear, 3),
                    'confidence': 1.0,
                    'message': 'Face detected successfully'
                })
                
                # Check for drowsiness
                if avg_ear < EAR_THRESHOLD:
                    sleep_frames += 1
                    if sleep_frames >= SLEEP_FRAMES_THRESHOLD:
                        response_data.update({
                            'drowsy': True,
                            'message': f'DROWSINESS DETECTED! Eyes closed for {sleep_frames} frames'
                        })
                        logger.warning(f"Drowsiness detected - EAR: {avg_ear:.3f}")
                else:
                    sleep_frames = 0
                    response_data['message'] = f'Alert - EAR: {avg_ear:.3f}'
                
                break  # Process only the first face
        
        return jsonify(response_data)
    
    except Exception as e:
        logger.error(f"Error in drowsiness detection: {e}")
        return jsonify({'error': f'Processing error: {str(e)}'}), 500

@app.route('/api/status')
def status():
    """API status endpoint"""
    return jsonify({
        'api_version': '1.0.0',
        'status': 'active',
        'endpoints': {
            'detect': '/api/detect',
            'health': '/health',
            'status': '/api/status'
        },
        'features': {
            'face_detection': True,
            'drowsiness_detection': True,
            'real_time_processing': True
        }
    })

# Legacy endpoint for backward compatibility
@app.route('/detect', methods=['POST'])
def detect_legacy():
    """Legacy endpoint - redirects to /api/detect"""
    return detect_drowsiness()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port, debug=False)
