// Notification service for real-time alerts
export interface NotificationPayload {
  title: string;
  message: string;
  type: 'incident' | 'alert' | 'info' | 'warning';
  driverId?: string;
  incidentId?: string;
  timestamp: Date;
  priority: 'low' | 'medium' | 'high' | 'critical';
  data?: any;
}

export class NotificationService {
  private hubConnectionString: string;
  private hubName: string = 'driveguard-notifications';
  private isInitialized: boolean = false;
  private subscribers: Map<string, (notification: NotificationPayload) => void> = new Map();

  constructor() {
    this.hubConnectionString = process.env.NEXT_PUBLIC_NOTIFICATION_HUB_CONNECTION_STRING || '';
  }

  async initialize(): Promise<boolean> {
    try {
      // In production, this would initialize Azure Notification Hubs
      console.log('Initializing Notification Service...');
      
      // Request notification permission
      if ('Notification' in window && Notification.permission === 'default') {
        await Notification.requestPermission();
      }

      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize Notification Service:', error);
      return false;
    }
  }

  // Send push notification to specific driver
  async sendToDriver(driverId: string, notification: NotificationPayload): Promise<boolean> {
    try {
      console.log('Sending notification to driver:', driverId, notification);

      // In production, this would use Azure Notification Hubs
      // For now, we'll use browser notifications
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(notification.title, {
          body: notification.message,
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          tag: notification.incidentId || 'general',
          requireInteraction: notification.priority === 'critical',
          data: notification.data
        });
      }

      // Notify subscribers
      const subscriber = this.subscribers.get(driverId);
      if (subscriber) {
        subscriber(notification);
      }

      return true;
    } catch (error) {
      console.error('Failed to send notification to driver:', error);
      return false;
    }
  }

  // Send notification to all admins
  async sendToAdmins(notification: NotificationPayload): Promise<boolean> {
    try {
      console.log('Sending notification to admins:', notification);

      // In production, this would send to all admin devices
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(notification.title, {
          body: notification.message,
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          tag: notification.incidentId || 'admin-alert',
          requireInteraction: notification.priority === 'critical',
          data: notification.data
        });
      }

      // Notify all admin subscribers
      this.subscribers.forEach((subscriber, subscriberId) => {
        if (subscriberId.startsWith('admin_')) {
          subscriber(notification);
        }
      });

      return true;
    } catch (error) {
      console.error('Failed to send notification to admins:', error);
      return false;
    }
  }

  // Send incident alert
  async sendIncidentAlert(incident: any, driverId: string): Promise<void> {
    const notification: NotificationPayload = {
      title: this.getIncidentTitle(incident.type),
      message: this.getIncidentMessage(incident),
      type: 'incident',
      driverId,
      incidentId: incident.id,
      timestamp: new Date(),
      priority: this.getIncidentPriority(incident.type),
      data: incident
    };

    // Send to driver
    await this.sendToDriver(driverId, notification);

    // Send to admins
    await this.sendToAdmins({
      ...notification,
      title: `Driver Alert: ${notification.title}`,
      message: `Driver ${driverId}: ${notification.message}`
    });
  }

  // Subscribe to notifications
  subscribe(subscriberId: string, callback: (notification: NotificationPayload) => void): void {
    this.subscribers.set(subscriberId, callback);
  }

  // Unsubscribe from notifications
  unsubscribe(subscriberId: string): void {
    this.subscribers.delete(subscriberId);
  }

  // Send emergency alert
  async sendEmergencyAlert(driverId: string, location: { lat: number; lng: number }): Promise<void> {
    const notification: NotificationPayload = {
      title: '🚨 EMERGENCY ALERT',
      message: `Driver ${driverId} may need immediate assistance`,
      type: 'alert',
      driverId,
      timestamp: new Date(),
      priority: 'critical',
      data: { location, emergency: true }
    };

    await this.sendToAdmins(notification);

    // In production, this could also alert emergency services
    console.log('Emergency alert sent for driver:', driverId, 'at location:', location);
  }

  // Send system notification
  async sendSystemNotification(message: string, type: 'info' | 'warning' = 'info'): Promise<void> {
    const notification: NotificationPayload = {
      title: type === 'warning' ? '⚠️ System Warning' : 'ℹ️ System Info',
      message,
      type,
      timestamp: new Date(),
      priority: type === 'warning' ? 'medium' : 'low'
    };

    await this.sendToAdmins(notification);
  }

  private getIncidentTitle(type: string): string {
    switch (type) {
      case 'drowsiness': return '😴 Drowsiness Detected';
      case 'phone': return '📱 Phone Usage Alert';
      case 'overspeed': return '🚨 Speed Limit Exceeded';
      default: return '⚠️ Safety Alert';
    }
  }

  private getIncidentMessage(incident: any): string {
    switch (incident.type) {
      case 'drowsiness':
        return `Driver appears drowsy (${(incident.confidence * 100).toFixed(1)}% confidence). Please take a break.`;
      case 'phone':
        return `Phone usage detected (${(incident.confidence * 100).toFixed(1)}% confidence). Please focus on driving.`;
      case 'overspeed':
        return `Speed: ${incident.details?.speed}km/h in ${incident.details?.speedLimit}km/h zone.`;
      default:
        return 'Safety incident detected. Please drive carefully.';
    }
  }

  private getIncidentPriority(type: string): 'low' | 'medium' | 'high' | 'critical' {
    switch (type) {
      case 'drowsiness': return 'high';
      case 'phone': return 'medium';
      case 'overspeed': return 'high';
      default: return 'medium';
    }
  }
}

// Singleton instance
export const notificationService = new NotificationService();