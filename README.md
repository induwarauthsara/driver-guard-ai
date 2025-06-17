# DriveGuard AI - Real-Time Driver Monitoring Platform

🚗 **AI-Powered Driver Safety Monitoring System** built with Next.js, Azure AI, and real-time analytics.

## 🎯 Features

### 🌐 Public Website
- Modern landing page with hero section, features, pricing, team, and contact
- Dark/Light theme toggle
- Responsive design with smooth animations
- Call-to-action buttons for demo access

### 🔐 Authentication
- Dual login portals (Admin & Driver)
- Role-based access control
- Demo credentials provided
- Azure AD B2C integration ready

### 🎥 Driver Interface
- **Real-time camera monitoring** with webcam access
- **AI-powered detection** for drowsiness, phone usage, and overspeed
- **Live trip tracking** with duration, distance, and incident counting
- **Audio alerts** with customizable settings
- **Battery optimization** and low-data modes
- **Offline recording** with auto-sync when online
- **GPS location tracking** and status monitoring

### 📊 Admin Dashboard
- **Real-time incident monitoring** with live feeds
- **Driver management** with status tracking
- **Advanced analytics** with charts and graphs
- **Incident filtering** and export capabilities
- **Fleet overview** with driver locations
- **Performance metrics** and safety scores
- **Responsive design** with dark theme

### 🧠 AI Integration
- **Azure Computer Vision** integration for behavior analysis
- **Confidence scoring** for detection accuracy
- **Real-time processing** of video frames
- **Multiple detection types**: drowsiness, phone usage, overspeed
- **Customizable thresholds** for different alert levels

### 💾 Data Management
- **Cosmos DB** integration for scalable data storage
- **Azure Blob Storage** for video/image storage
- **Real-time WebSocket** connections
- **RESTful APIs** for data operations
- **Automatic cleanup** of old data

### 🔔 Notifications
- **Real-time push notifications** for incidents
- **Azure Notification Hubs** integration
- **Multi-channel alerts** (browser, email, SMS ready)
- **Priority-based notifications** (low, medium, high, critical)
- **Emergency alert system** for critical situations

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Azure subscription (for production)
- Modern web browser with camera access

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/driveguard-ai.git
   cd driveguard-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Azure credentials
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Demo Credentials
- **Driver**: `driver@demo.com` / `password123`
- **Admin**: `admin@demo.com` / `password123`

## 🏗️ Architecture

### Frontend
- **Next.js 13** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Material-UI Icons** for consistent iconography
- **Framer Motion** for animations
- **Recharts** for data visualization

### Backend Services
- **Azure Computer Vision** for AI detection
- **Azure Cosmos DB** for data storage
- **Azure Blob Storage** for media files
- **Azure Notification Hubs** for push notifications
- **WebSocket** for real-time communication

### Key Components
- `AIDetectionService` - Handles AI analysis and detection
- `WebSocketService` - Manages real-time connections
- `CosmosDBService` - Database operations
- `BlobStorageService` - File storage management
- `NotificationService` - Alert and notification system

## 📱 Usage

### For Drivers
1. Login with driver credentials
2. Allow camera and location permissions
3. Click "Start Trip" to begin monitoring
4. Drive safely - the system will alert you of any incidents
5. View trip summary and incident history

### For Administrators
1. Login with admin credentials
2. Monitor real-time driver status on dashboard
3. View incident feeds and analytics
4. Export reports and manage fleet
5. Configure alert settings and thresholds

## 🔧 Configuration

### Azure Services Setup
1. **Computer Vision**: Create a Computer Vision resource in Azure
2. **Cosmos DB**: Set up a Cosmos DB account with SQL API
3. **Storage Account**: Create a storage account for blob storage
4. **Notification Hubs**: Set up notification hub for push alerts

### Environment Variables
Update `.env.local` with your Azure service credentials:
- `NEXT_PUBLIC_AZURE_CV_ENDPOINT` - Computer Vision endpoint
- `NEXT_PUBLIC_AZURE_CV_KEY` - Computer Vision API key
- `NEXT_PUBLIC_COSMOS_ENDPOINT` - Cosmos DB endpoint
- `NEXT_PUBLIC_COSMOS_KEY` - Cosmos DB key
- `NEXT_PUBLIC_AZURE_STORAGE_CONNECTION_STRING` - Storage connection string

## 📊 API Endpoints

### Incidents
- `GET /api/incidents` - Get incidents with filtering
- `POST /api/incidents` - Create new incident
- `PATCH /api/incidents` - Update incident status

### Analytics
- `GET /api/analytics` - Get dashboard analytics
- `GET /api/analytics?driverId=xxx` - Get driver-specific analytics

### Drivers
- `GET /api/drivers` - Get driver list
- `POST /api/drivers` - Create new driver

## 🛡️ Security Features

- **Encrypted data transmission** with HTTPS
- **JWT authentication** for API access
- **Role-based access control** (RBAC)
- **Azure-managed encryption** for stored data
- **CORS protection** for API endpoints
- **Input validation** and sanitization

## 🎨 UI/UX Features

- **Responsive design** for all screen sizes
- **Dark/Light theme** toggle
- **Smooth animations** and transitions
- **Loading states** and error handling
- **Accessibility** compliance
- **Progressive Web App** capabilities

## 📈 Performance Optimizations

- **Image optimization** with Next.js
- **Code splitting** and lazy loading
- **Caching strategies** for API responses
- **WebSocket connection pooling**
- **Battery-optimized** video processing
- **Offline-first** architecture

## 🧪 Testing

```bash
# Run tests
npm test

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Azure Static Web Apps
```bash
npm run build
# Deploy using Azure CLI or GitHub Actions
```

### Docker
```bash
docker build -t driveguard-ai .
docker run -p 3000:3000 driveguard-ai
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@driveguard.ai
- 📞 Phone: +1 (555) 123-4567
- 💬 Discord: [Join our community](https://discord.gg/driveguard)
- 📖 Documentation: [docs.driveguard.ai](https://docs.driveguard.ai)

## 🙏 Acknowledgments

- Azure AI Services for computer vision capabilities
- Next.js team for the amazing framework
- Material-UI for the icon library
- Recharts for data visualization components
- All contributors and beta testers

---

**Built with ❤️ for safer roads** 🛣️