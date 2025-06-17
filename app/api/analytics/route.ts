import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const driverId = searchParams.get('driverId');
    const days = parseInt(searchParams.get('days') || '30');

    // Mock analytics data
    const analytics = {
      totalDrivers: 15,
      activeDrivers: 8,
      totalIncidents: 47,
      incidentsByType: [
        { type: 'Drowsiness', count: 18, color: '#ff9800' },
        { type: 'Phone Usage', count: 15, color: '#f44336' },
        { type: 'Overspeed', count: 14, color: '#9c27b0' }
      ],
      incidentsTrend: Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return {
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          incidents: Math.floor(Math.random() * 20) + 5
        };
      }),
      driverScores: Array.from({ length: 10 }, (_, i) => ({
        name: `Driver ${i + 1}`,
        score: Math.floor(Math.random() * 40) + 60
      })),
      safetyMetrics: {
        averageResponseTime: 2.3,
        falsePositiveRate: 1.5,
        incidentsPrevented: 847,
        systemUptime: 99.8
      }
    };

    if (driverId) {
      // Return driver-specific analytics
      const driverAnalytics = {
        driverId,
        totalTrips: Math.floor(Math.random() * 100) + 20,
        totalDistance: Math.floor(Math.random() * 5000) + 1000,
        totalIncidents: Math.floor(Math.random() * 20) + 5,
        safetyScore: Math.floor(Math.random() * 40) + 60,
        incidentsByType: analytics.incidentsByType.map(item => ({
          ...item,
          count: Math.floor(Math.random() * 10) + 1
        })),
        recentTrend: analytics.incidentsTrend
      };

      return NextResponse.json({
        success: true,
        data: driverAnalytics
      });
    }

    return NextResponse.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error('Failed to get analytics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get analytics' },
      { status: 500 }
    );
  }
}