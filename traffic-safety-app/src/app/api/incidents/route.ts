import { NextResponse } from 'next/server';

// In-memory store for demo
let incidents: any[] = [
  { id: '1', type: 'Car Accident', location: 'Main St & 5th', time: new Date().toISOString(), priority: 'High', status: 'Pending' }
];

export async function GET() {
  return NextResponse.json(incidents);
}

export async function POST(request: Request) {
  const data = await request.json();
  const newIncident = {
    id: Math.random().toString(36).substr(2, 9),
    time: new Date().toISOString(),
    status: 'Pending',
    ...data
  };
  incidents.unshift(newIncident);
  return NextResponse.json(newIncident, { status: 201 });
}
