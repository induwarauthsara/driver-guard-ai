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

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(static_image_mode=False, max_num_faces=1, refine_landmarks=True)

RIGHT_EYE = [33, 160, 158, 133, 153, 144]

sleep_frames = 0
SLEEP_FRAMES_THRESHOLD = 15
EAR_THRESHOLD = 0.25

# Remove alarm functionality for cloud deployment
# alarm_playing = False
# alarm_wave_obj = None

# try:
#     alarm_wave_obj = sa.WaveObject.from_wave_file("Alarm.wav")
# except Exception as e:
#     print(f"Alarm sound loading failed: {e}")

def calculate_ear(landmarks, indices, w, h):
    left = [int(landmarks[indices[0]].x * w), int(landmarks[indices[0]].y * h)]
    right = [int(landmarks[indices[3]].x * w), int(landmarks[indices[3]].y * h)]

    top = [((landmarks[indices[1]].x + landmarks[indices[2]].x) / 2) * w,
           ((landmarks[indices[1]].y + landmarks[indices[2]].y) / 2) * h]
    bottom = [((landmarks[indices[4]].x + landmarks[indices[5]].x) / 2) * w,
              ((landmarks[indices[4]].y + landmarks[indices[5]].y) / 2) * h]

    eye_width = math.dist(left, right)
    eye_height = math.dist(top, bottom)

    return eye_height / eye_width if eye_width != 0 else 0

def play_alarm():
    # Alarm functionality removed for cloud deployment
    # Just log the alert instead
    logger.warning("DROWSINESS DETECTED - ALARM TRIGGERED")
    pass

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/health')
def health():
    """Health check endpoint for Azure App Service"""
    return jsonify({'status': 'healthy', 'service': 'drowsiness-detection-api'})

@app.route('/api/detect', methods=['POST'])
def api_detect():
    """API endpoint for external applications to detect drowsiness from image"""
    try:
        data = request.get_json()
        
        if not data or 'image' not in data:
            return jsonify({'error': 'No image data provided'}), 400
        
        # Process base64 image
        img_data = data.get('image')
        if ',' in img_data:
            img_data = img_data.split(',')[1]
        
        img_bytes = base64.b64decode(img_data)
        nparr = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if img is None:
            return jsonify({'error': 'Invalid image format'}), 400

        h, w, _ = img.shape
        rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        results = face_mesh.process(rgb_img)

        if results.multi_face_landmarks:
            face_landmarks = results.multi_face_landmarks[0].landmark
            ear = calculate_ear(face_landmarks, RIGHT_EYE, w, h)

            sleepy = ear < EAR_THRESHOLD
            confidence = max(0, (EAR_THRESHOLD - ear) / EAR_THRESHOLD) if sleepy else 0

            response = {
                'sleepy': sleepy,
                'ear': round(ear, 4),
                'confidence': round(confidence, 4),
                'threshold': EAR_THRESHOLD,
                'timestamp': datetime.now().isoformat()
            }
            
            if sleepy:
                logger.warning(f"Drowsiness detected - EAR: {ear:.4f}")
            
            return jsonify(response)
        else:
            return jsonify({
                'sleepy': False,
                'ear': 0,
                'confidence': 0,
                'error': 'No face detected',
                'timestamp': datetime.now().isoformat()
            })
            
    except Exception as e:
        logger.error(f"Error processing image: {str(e)}")
        return jsonify({'error': 'Image processing failed', 'details': str(e)}), 500

@app.route('/detect', methods=['POST'])
def detect():
    """Original endpoint for web interface"""
    global sleep_frames

    try:
        data = request.get_json()
        img_data = data.get('image').split(',')[1]
        img_bytes = base64.b64decode(img_data)
        nparr = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        h, w, _ = img.shape
        rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        results = face_mesh.process(rgb_img)

        if results.multi_face_landmarks:
            face_landmarks = results.multi_face_landmarks[0].landmark
            ear = calculate_ear(face_landmarks, RIGHT_EYE, w, h)

            if ear < EAR_THRESHOLD:
                sleep_frames += 1
            else:
                sleep_frames = 0

            sleepy = sleep_frames > SLEEP_FRAMES_THRESHOLD
            if sleepy:
                threading.Thread(target=play_alarm).start()

            return jsonify({'sleepy': sleepy, 'ear': ear})
        
        sleep_frames = 0
        return jsonify({'sleepy': False, 'ear': 0})
    
    except Exception as e:
        logger.error(f"Error in detect endpoint: {str(e)}")
        return jsonify({'error': 'Detection failed'}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
