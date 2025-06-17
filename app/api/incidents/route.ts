import { NextRequest, NextResponse } from 'next/server';

// Mock database for demonstration
let incidents: any[] = [];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const driverId = searchParams.get('driverId');
    const type = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '50');

    let filteredIncidents = incidents;

    if (driverId) {
      filteredIncidents = filteredIncidents.filter(i => i.driverId === driverId);
    }

    if (type && type !== 'all') {
      filteredIncidents = filteredIncidents.filter(i => i.type === type);
    }

    const result = filteredIncidents
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);

    return NextResponse.json({
      success: true,
      data: result,
      total: filteredIncidents.length
    });
  } catch (error) {
    console.error('Failed to get incidents:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get incidents' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const incident = {
      id: `incident_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...body,
      timestamp: new Date().toISOString(),
      resolved: false
    };

    incidents.push(incident);

    // In production, this would save to Cosmos DB
    console.log('Incident created:', incident);

    return NextResponse.json({
      success: true,
      data: incident
    });
  } catch (error) {
    console.error('Failed to create incident:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create incident' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, resolved, resolvedBy } = body;

    const incidentIndex = incidents.findIndex(i => i.id === id);
    if (incidentIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Incident not found' },
        { status: 404 }
      );
    }

    incidents[incidentIndex] = {
      ...incidents[incidentIndex],
      resolved,
      resolvedBy,
      resolvedAt: resolved ? new Date().toISOString() : null
    };

    return NextResponse.json({
      success: true,
      data: incidents[incidentIndex]
    });
  } catch (error) {
    console.error('Failed to update incident:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update incident' },
      { status: 500 }
    );
  }
}