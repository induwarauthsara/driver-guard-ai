import { NextRequest, NextResponse } from 'next/server';

// Mock drivers data
const drivers = Array.from({ length: 15 }, (_, i) => ({
  id: `driver-${i + 1}`,
  name: `Driver ${i + 1}`,
  email: `driver${i + 1}@company.com`,
  status: Math.random() > 0.7 ? 'active' : Math.random() > 0.5 ? 'inactive' : 'incident',
  location: {
    lat: 6.9271 + (Math.random() - 0.5) * 0.1,
    lng: 79.8612 + (Math.random() - 0.5) * 0.1
  },
  lastSeen: new Date(Date.now() - Math.random() * 3600000).toISOString(),
  currentTrip: Math.random() > 0.6 ? {
    id: `trip-${i + 1}`,
    startTime: new Date(Date.now() - Math.random() * 7200000).toISOString(),
    duration: Math.random() * 7200000,
    incidents: Math.floor(Math.random() * 5),
    distance: Math.random() * 100
  } : null,
  profile: {
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=driver${i + 1}`,
    phone: `+1-555-${String(Math.floor(Math.random() * 9000) + 1000)}`,
    licenseNumber: `DL${String(Math.floor(Math.random() * 900000) + 100000)}`,
    vehicleId: `VH${String(Math.floor(Math.random() * 9000) + 1000)}`
  },
  safetyScore: Math.floor(Math.random() * 40) + 60,
  totalTrips: Math.floor(Math.random() * 100) + 20,
  totalIncidents: Math.floor(Math.random() * 20) + 1
}));

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');

    let filteredDrivers = drivers;

    if (status && status !== 'all') {
      filteredDrivers = filteredDrivers.filter(d => d.status === status);
    }

    const result = filteredDrivers.slice(0, limit);

    return NextResponse.json({
      success: true,
      data: result,
      total: filteredDrivers.length
    });
  } catch (error) {
    console.error('Failed to get drivers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get drivers' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const driver = {
      id: `driver_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...body,
      status: 'inactive',
      createdAt: new Date().toISOString(),
      lastSeen: new Date().toISOString(),
      safetyScore: 100,
      totalTrips: 0,
      totalIncidents: 0
    };

    drivers.push(driver);

    return NextResponse.json({
      success: true,
      data: driver
    });
  } catch (error) {
    console.error('Failed to create driver:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create driver' },
      { status: 500 }
    );
  }
}