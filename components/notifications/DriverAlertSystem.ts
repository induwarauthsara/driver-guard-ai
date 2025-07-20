// Enhanced Driver Alert System with Custom Notifications and Audio Alerts
export interface AlertSuggestion {
  message: string;
  icon: string;
  action?: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  duration: number; // in milliseconds
}

export interface AudioPattern {
  frequency: number;
  duration: number;
  type: 'sine' | 'square' | 'sawtooth' | 'triangle';
  volume: number;
  beeps: number;
  interval: number;
}

export class DriverAlertSystem {
  private audioContext: AudioContext | null = null;
  private isAudioEnabled: boolean = true;
  private alertQueue: AlertSuggestion[] = [];
  private currentAlert: AlertSuggestion | null = null;
  private alertTimeout: NodeJS.Timeout | null = null;

  // Custom alert suggestions for different scenarios
  private alertSuggestions = {
    drowsiness: [
      { message: "💧 Drink some water to stay hydrated", icon: "💧", action: "hydrate", urgency: "medium" as const, duration: 8000 },
      { message: "☕ Consider taking a coffee break", icon: "☕", action: "break", urgency: "medium" as const, duration: 8000 },
      { message: "🛌 Pull over for a 15-20 minute power nap", icon: "🛌", action: "rest", urgency: "high" as const, duration: 10000 },
      { message: "🎵 Turn on some energizing music", icon: "🎵", action: "music", urgency: "medium" as const, duration: 7000 },
      { message: "🚗 Find a safe place to stop and rest", icon: "🚗", action: "stop", urgency: "high" as const, duration: 12000 },
      { message: "🌬️ Open windows for fresh air circulation", icon: "🌬️", action: "ventilate", urgency: "low" as const, duration: 6000 },
      { message: "🏃 Do some quick stretches at next stop", icon: "🏃", action: "exercise", urgency: "medium" as const, duration: 8000 },
      { message: "😴 You've been driving for too long - take a break!", icon: "😴", action: "mandatory_break", urgency: "critical" as const, duration: 15000 },
      { message: "💤 Microsleep detected - IMMEDIATE REST NEEDED", icon: "💤", action: "emergency_stop", urgency: "critical" as const, duration: 20000 }
  ],
    phone: [
      { message: "📱 Please put your phone away while driving", icon: "📱", action: "phone_away", urgency: "high" as const, duration: 8000 },
      { message: "🔇 Use hands-free mode if you need to talk", icon: "🔇", action: "hands_free", urgency: "medium" as const, duration: 7000 },
      { message: "🚫 Phone usage while driving is dangerous", icon: "🚫", action: "safety_reminder", urgency: "high" as const, duration: 10000 },
      { message: "🎯 Focus on the road ahead", icon: "🎯", action: "focus", urgency: "medium" as const, duration: 6000 },
      { message: "⏰ Pull over safely to use your phone", icon: "⏰", action: "pullover", urgency: "high" as const, duration: 12000 },
      { message: "👀 Keep your eyes on the road at all times", icon: "👀", action: "attention", urgency: "high" as const, duration: 8000 },
      { message: "🔴 Emergency calls only while driving", icon: "🔴", action: "emergency_only", urgency: "medium" as const, duration: 9000 }
    ],
    overspeed: [
      { message: "🐌 Slow down - you're exceeding the speed limit", icon: "🐌", action: "reduce_speed", urgency: "high" as const, duration: 10000 },
      { message: "⚠️ Maintain safe following distance", icon: "⚠️", action: "safe_distance", urgency: "medium" as const, duration: 8000 },
      { message: "🚦 Observe traffic signs and signals", icon: "🚦", action: "observe_signs", urgency: "medium" as const, duration: 7000 },
      { message: "🛣️ Adjust speed for road conditions", icon: "🛣️", action: "road_conditions", urgency: "medium" as const, duration: 8000 },
      { message: "⏱️ Arrive safely, not just quickly", icon: "⏱️", action: "safety_first", urgency: "high" as const, duration: 9000 },
      { message: "🚙 Speed kills - drive responsibly", icon: "🚙", action: "responsibility", urgency: "high" as const, duration: 12000 },
      { message: "👥 Think about other road users", icon: "👥", action: "consider_others", urgency: "medium" as const, duration: 8000 },
      { message: "⛽ Speeding wastes fuel", icon: "⛽", action: "economy", urgency: "low" as const, duration: 6000 }
    ],
    distraction: [
      { message: "👁️ Keep your eyes on the road", icon: "👁️", action: "eyes_road", urgency: "high" as const, duration: 8000 },
      { message: "🎯 Minimize distractions around you", icon: "🎯", action: "minimize_distractions", urgency: "medium" as const, duration: 7000 },
      { message: "📍 Set GPS before starting your journey", icon: "📍", action: "preset_gps", urgency: "medium" as const, duration: 8000 }
    ],
    aggressive_driving: [
      { message: "😌 Stay calm and patient while driving", icon: "😌", action: "stay_calm", urgency: "medium" as const, duration: 8000 },
      { message: "🧘 Take deep breaths to reduce stress", icon: "🧘", action: "breathe", urgency: "medium" as const, duration: 7000 },
      { message: "🕐 Allow extra time for your journey", icon: "🕐", action: "extra_time", urgency: "low" as const, duration: 6000 },
      { message: "🤝 Be courteous to other drivers", icon: "🤝", action: "be_courteous", urgency: "medium" as const, duration: 8000 },
      { message: "⚖️ Aggressive driving increases accident risk", icon: "⚖️", action: "risk_awareness", urgency: "high" as const, duration: 10000 }
    ],
    lane_departure: [
      { message: "↔️ Stay within your lane", icon: "↔️", action: "stay_in_lane", urgency: "high" as const, duration: 8000 }
    ],
    weather_alert: [
      { message: "🌧️ Reduce speed in wet conditions", icon: "🌧️", action: "wet_driving", urgency: "medium" as const, duration: 8000 },
      { message: "🌫️ Use headlights in foggy conditions", icon: "🌫️", action: "fog_lights", urgency: "medium" as const, duration: 8000 },
      { message: "☀️ Use sunglasses to reduce glare", icon: "☀️", action: "sun_protection", urgency: "low" as const, duration: 6000 }
    ],
    fatigue: [
      { message: "🥱 Fatigue detected - consider resting", icon: "🥱", action: "rest_fatigue", urgency: "high" as const, duration: 10000 },
      { message: "⏰ Take a break every 2 hours", icon: "⏰", action: "regular_breaks", urgency: "medium" as const, duration: 8000 },
      { message: "🍎 Have a healthy snack for energy", icon: "🍎", action: "healthy_snack", urgency: "low" as const, duration: 6000 },
      { message: "🚶 Walk around during breaks", icon: "🚶", action: "walk_break", urgency: "medium" as const, duration: 7000 }
    ]
  };

  // Audio patterns for different alert types
  private audioPatterns: Record<string, AudioPattern> = {
    drowsiness: {
      frequency: 800,
      duration: 0.8,
      type: 'sine',
      volume: 0.4,
      beeps: 3,
      interval: 0.3
    },
    phone: {
      frequency: 1000,
      duration: 0.5,
      type: 'square',
      volume: 0.5,
      beeps: 4,
      interval: 0.2
    },
    overspeed: {
      frequency: 1200,
      duration: 1.0,
      type: 'sawtooth',
      volume: 0.6,
      beeps: 2,
      interval: 0.5
    },
    distraction: {
      frequency: 900,
      duration: 0.6,
      type: 'triangle',
      volume: 0.3,
      beeps: 2,
      interval: 0.4
    },
    aggressive_driving: {
      frequency: 600,
      duration: 1.2,
      type: 'sine',
      volume: 0.4,
      beeps: 1,
      interval: 0
    },
    lane_departure: {
      frequency: 1100,
      duration: 0.4,
      type: 'square',
      volume: 0.5,
      beeps: 5,
      interval: 0.15
    },
    weather_alert: {
      frequency: 700,
      duration: 0.7,
      type: 'sine',
      volume: 0.3,
      beeps: 2,
      interval: 0.6
    },
    fatigue: {
      frequency: 750,
      duration: 1.0,
      type: 'sine',
      volume: 0.4,
      beeps: 3,
      interval: 0.4
    },
    emergency: {
      frequency: 1500,
      duration: 0.3,
      type: 'square',
      volume: 0.8,
      beeps: 10,
      interval: 0.1
    }
  };

  constructor() {
    this.initializeAudioContext();
  }

  private initializeAudioContext(): void {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('Audio context not available:', error);
    }
  }

  // Get random suggestion for a specific incident type
  getRandomSuggestion(incidentType: string): AlertSuggestion {
    const suggestions = this.alertSuggestions[incidentType as keyof typeof this.alertSuggestions] || this.alertSuggestions.distraction;
    const randomIndex = Math.floor(Math.random() * suggestions.length);
    return suggestions[randomIndex];
  }

  // Play attention-grabbing audio alert
  async playAudioAlert(incidentType: string, urgency: string = 'medium'): Promise<void> {
    if (!this.isAudioEnabled || !this.audioContext) return;

    try {
      // Resume audio context if suspended (required by some browsers)
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      const pattern = this.audioPatterns[incidentType] || this.audioPatterns.distraction;
      
      // Adjust volume based on urgency
      let volumeMultiplier = 1;
      switch (urgency) {
        case 'low': volumeMultiplier = 0.5; break;
        case 'medium': volumeMultiplier = 0.8; break;
        case 'high': volumeMultiplier = 1.2; break;
        case 'critical': volumeMultiplier = 1.5; break;
      }

      await this.playBeepSequence(pattern, volumeMultiplier);
    } catch (error) {
      console.error('Error playing audio alert:', error);
    }
  }

  private async playBeepSequence(pattern: AudioPattern, volumeMultiplier: number): Promise<void> {
    if (!this.audioContext) return;

    for (let i = 0; i < pattern.beeps; i++) {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      const filterNode = this.audioContext.createBiquadFilter();

      // Connect nodes
      oscillator.connect(filterNode);
      filterNode.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      // Configure oscillator
      oscillator.type = pattern.type;
      oscillator.frequency.setValueAtTime(pattern.frequency, this.audioContext.currentTime);

      // Configure filter for better sound quality
      filterNode.type = 'lowpass';
      filterNode.frequency.setValueAtTime(pattern.frequency * 2, this.audioContext.currentTime);

      // Configure gain with envelope
      const volume = Math.min(pattern.volume * volumeMultiplier, 1.0);
      const startTime = this.audioContext.currentTime + (i * (pattern.duration + pattern.interval));
      const endTime = startTime + pattern.duration;

      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, endTime - 0.01);

      // Start and stop oscillator
      oscillator.start(startTime);
      oscillator.stop(endTime);

      // Add frequency modulation for urgency
      if (pattern.type === 'sine' && volumeMultiplier > 1) {
        oscillator.frequency.exponentialRampToValueAtTime(
          pattern.frequency * 1.5,
          startTime + pattern.duration / 2
        );
        oscillator.frequency.exponentialRampToValueAtTime(
          pattern.frequency,
          endTime
        );
      }
    }
  }

  // Show visual alert with custom suggestion
  showAlert(incidentType: string, confidence: number = 0.85): AlertSuggestion {
    const suggestion = this.getRandomSuggestion(incidentType);
    
    // Add confidence and timing information to the message
    const enhancedSuggestion = {
      ...suggestion,
      message: `${suggestion.message} (${(confidence * 100).toFixed(0)}% confidence)`
    };

    // Clear existing alert
    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
    }

    this.currentAlert = enhancedSuggestion;

    // Play audio alert
    this.playAudioAlert(incidentType, suggestion.urgency);

    // Auto-clear alert after duration
    this.alertTimeout = setTimeout(() => {
      this.currentAlert = null;
    }, suggestion.duration);

    return enhancedSuggestion;
  }

  // Handle emergency situations with maximum attention
  showEmergencyAlert(message: string): AlertSuggestion {
    const emergencyAlert: AlertSuggestion = {
      message: `🚨 EMERGENCY: ${message}`,
      icon: "🚨",
      action: "emergency",
      urgency: "critical",
      duration: 30000 // 30 seconds
    };

    this.currentAlert = emergencyAlert;
    this.playAudioAlert('emergency', 'critical');

    // Emergency alerts don't auto-clear
    return emergencyAlert;
  }

  // Dismiss current alert
  dismissAlert(): void {
    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
      this.alertTimeout = null;
    }
    this.currentAlert = null;
  }

  // Get current alert
  getCurrentAlert(): AlertSuggestion | null {
    return this.currentAlert;
  }

  // Enable/disable audio alerts
  setAudioEnabled(enabled: boolean): void {
    this.isAudioEnabled = enabled;
  }

  // Test audio system
  async testAudio(): Promise<void> {
    await this.playAudioAlert('phone', 'medium');
  }

  // Get all available alert types
  getAvailableAlertTypes(): string[] {
    return Object.keys(this.alertSuggestions);
  }

  // Add custom alert suggestion
  addCustomSuggestion(incidentType: string, suggestion: Omit<AlertSuggestion, 'duration'>): void {
    if (!this.alertSuggestions[incidentType as keyof typeof this.alertSuggestions]) {
      (this.alertSuggestions as any)[incidentType] = [];
    }
    
    const fullSuggestion = {
      ...suggestion,
      duration: suggestion.urgency === 'critical' ? 15000 : 
               suggestion.urgency === 'high' ? 10000 : 
               suggestion.urgency === 'medium' ? 8000 : 6000
    };
    
    (this.alertSuggestions as any)[incidentType].push(fullSuggestion);
  }
}

// Singleton instance
export const driverAlertSystem = new DriverAlertSystem();
