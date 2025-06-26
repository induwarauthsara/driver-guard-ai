# DriverGuard AI - Drowsiness Detection API

A real-time drowsiness detection system built with Flask, OpenCV, and MediaPipe. Deployed on Azure App Service for high performance and scalability.

## 🚀 Features

- **Real-time Drowsiness Detection**: Uses advanced computer vision algorithms to detect driver fatigue
- **RESTful API**: Easy integration with external applications and websites
- **Cross-Origin Support**: CORS enabled for web applications
- **High Accuracy**: MediaPipe Face Mesh for precise facial landmark detection
- **Cloud-Ready**: Optimized for Azure App Service deployment
- **Health Monitoring**: Built-in health check endpoints

## 📋 API Endpoints

### Main Detection API
- **POST** `/api/detect` - Detect drowsiness from base64 image
- **GET** `/health` - Health check endpoint
- **GET** `/` - Web interface for testing

### API Request Format

```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
}
```

### API Response Format

```json
{
  "sleepy": true,
  "ear": 0.2145,
  "confidence": 0.8234,
  "threshold": 0.25,
  "timestamp": "2025-06-26T10:30:00"
}
```

## 🌐 Live Demo

- **API Base URL**: `https://your-app-name.azurewebsites.net`
- **Web Interface**: `https://your-app-name.azurewebsites.net/`
- **API Endpoint**: `https://your-app-name.azurewebsites.net/api/detect`

## 💻 Local Development

### Prerequisites
- Python 3.8+
- pip package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/driverguard-ai.git
cd driverguard-ai
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the application:
```bash
python app.py
```

The app will be available at `http://localhost:5000`

## ☁️ Azure Deployment

### Step-by-Step Deployment Guide

#### 1. Create Azure Account
- Go to [Azure Portal](https://portal.azure.com)
- Sign up for free account (includes $200 credit)

#### 2. Create Resource Group
```bash
az group create --name driverguard-rg --location "East US"
```

#### 3. Create App Service Plan (Basic B1 - $13.14/month)
```bash
az appservice plan create --name driverguard-plan --resource-group driverguard-rg --sku B1 --is-linux
```

#### 4. Create Web App
```bash
az webapp create --resource-group driverguard-rg --plan driverguard-plan --name your-unique-app-name --runtime "PYTHON|3.9"
```

#### 5. Configure Deployment
```bash
# Set startup command
az webapp config set --resource-group driverguard-rg --name your-unique-app-name --startup-file "startup.sh"

# Deploy code
az webapp deployment source config-zip --resource-group driverguard-rg --name your-unique-app-name --src deployment.zip
```

### Environment Configuration

Set these application settings in Azure Portal:

```
SCM_DO_BUILD_DURING_DEPLOYMENT = true
WEBSITES_ENABLE_APP_SERVICE_STORAGE = false
PORT = 8000
```

## 💰 Cost Optimization ($50/month budget)

### Recommended Azure Configuration:
- **App Service Plan**: Basic B1 (~$13.14/month)
- **Storage Account**: Standard LRS (~$2/month)
- **Application Insights**: Free tier
- **Total Estimated Cost**: ~$15-20/month

### Performance Optimizations:
- Uses `opencv-python-headless` for smaller footprint
- Gunicorn with 2 workers for concurrent processing
- Efficient memory management for image processing
- Caching enabled for static assets

## 🔧 Integration Examples

### JavaScript (Frontend)
```javascript
async function detectDrowsiness(imageBase64) {
    const response = await fetch('https://your-app-name.azurewebsites.net/api/detect', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image: imageBase64
        })
    });
    
    const result = await response.json();
    return result;
}
```

### Python (Backend Integration)
```python
import requests
import base64

def check_drowsiness(image_path):
    with open(image_path, "rb") as image_file:
        image_base64 = base64.b64encode(image_file.read()).decode()
    
    response = requests.post(
        'https://your-app-name.azurewebsites.net/api/detect',
        json={'image': f'data:image/jpeg;base64,{image_base64}'}
    )
    
    return response.json()
```

### cURL Example
```bash
curl -X POST https://your-app-name.azurewebsites.net/api/detect \
  -H "Content-Type: application/json" \
  -d '{"image": "data:image/jpeg;base64,YOUR_BASE64_IMAGE_HERE"}'
```

## 📊 Monitoring & Analytics

### Built-in Monitoring
- Application Insights integration
- Request/response logging
- Error tracking and alerting
- Performance metrics

### Custom Metrics
- Detection accuracy tracking
- Response time monitoring
- API usage analytics

## 🔒 Security Features

- CORS protection
- Request validation
- Error handling
- Rate limiting (configurable)
- HTTPS encryption

## 🚨 Error Handling

The API returns appropriate HTTP status codes:
- `200`: Successful detection
- `400`: Invalid request/image format
- `500`: Server processing error

## 📈 Scaling Options

### Horizontal Scaling
- Scale out to multiple instances during high traffic
- Load balancer automatically distributes requests

### Vertical Scaling
- Upgrade to higher SKU tiers for more CPU/memory
- Premium plans offer auto-scaling capabilities

## 🛠️ Troubleshooting

### Common Issues

1. **Deployment Fails**
   - Check requirements.txt compatibility
   - Verify Python version in runtime settings

2. **High Response Times**
   - Consider upgrading to Standard tier
   - Implement caching for repeated requests

3. **Memory Issues**
   - Monitor memory usage in Azure Portal
   - Optimize image processing pipeline

### Debug Mode
```bash
# Enable debug logging
az webapp log config --resource-group driverguard-rg --name your-app-name --application-logging true
```

## 📞 Support

For technical support and feature requests:
- Create an issue in the GitHub repository
- Email: support@yourcompany.com

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- MediaPipe by Google for face detection
- OpenCV community for computer vision tools
- Flask team for the web framework

---

**Built with ❤️ for safer driving**
