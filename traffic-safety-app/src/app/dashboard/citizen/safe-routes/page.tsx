'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGeolocation } from '@/hooks/useGeolocation';

export default function SafeRoutes() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { location, error, loading: geoLoading, getLocation } = useGeolocation();
  
  const [routes, setRoutes] = useState([
    { id: 1, name: 'Main Expressway (Fastest)', safety: '98%', time: '12 min', color: '#2ecc71', distance: '5.2 km' },
    { id: 2, name: 'Parkside Ave (Most Scenic)', safety: '95%', time: '18 min', color: '#3498db', distance: '6.8 km' },
    { id: 3, name: 'Old Town Rd (High Traffic)', safety: '72%', time: '25 min', color: '#e67e22', distance: '4.5 km' },
  ]);

  useEffect(() => {
    getLocation();
    // Simulate map loading
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="container animate-fade-in theme-citizen" style={{ maxWidth: '800px' }}>
      <header style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button className="btn btn-ghost" style={{ padding: '8px 12px' }} onClick={() => router.back()}>← Back</button>
        <h1 style={{ fontSize: '1.5rem' }}>Safe Route Planner</h1>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px' }}>
        {/* Map Simulation */}
        <div className="glass" style={{ 
          height: '500px', 
          position: 'relative', 
          overflow: 'hidden',
          background: '#1a1a1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {loading ? (
            <div style={{ textAlign: 'center' }}>
              <div className="animate-spin" style={{ 
                width: '40px', 
                height: '40px', 
                border: '4px solid var(--surface-border)', 
                borderTopColor: 'var(--accent)', 
                borderRadius: '50%',
                margin: '0 auto 16px'
              }}></div>
              <p style={{ opacity: 0.6 }}>Loading live traffic data...</p>
            </div>
          ) : (
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              {/* Mock Map Background (Dark Grid) */}
              <div style={{ 
                width: '100%', 
                height: '100%', 
                backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', 
                backgroundSize: '30px 30px',
                opacity: 0.3
              }}></div>

              {/* Simulated Routes */}
              <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
                {/* Route 1 */}
                <path d="M 50 450 Q 150 350 250 250 T 450 50" fill="none" stroke="#2ecc71" strokeWidth="6" strokeLinecap="round" strokeDasharray="1000" style={{ animation: 'dash 3s linear forwards' }} />
                {/* Route 2 */}
                <path d="M 50 450 Q 50 250 250 250 T 450 50" fill="none" stroke="#3498db" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
                {/* Route 3 */}
                <path d="M 50 450 Q 350 450 450 50" fill="none" stroke="#e67e22" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
                
                {/* Start/End Points */}
                <circle cx="50" cy="450" r="8" fill="#457B9D" />
                <circle cx="450" cy="50" r="8" fill="#E63946" />
              </svg>

              <div style={{ position: 'absolute', top: '20px', left: '20px', padding: '8px 16px', borderRadius: '8px', background: 'rgba(0,0,0,0.7)', fontSize: '0.8rem' }}>
                🟢 Starting from: {location ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}` : 'Detecting...'}
              </div>
            </div>
          )}
        </div>

        {/* Route Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Available Routes</h2>
          {routes.map(route => (
            <div key={route.id} className="glass" style={{ 
              padding: '16px', 
              cursor: 'pointer',
              borderLeft: `4px solid ${route.color}`,
              transition: 'transform 0.2s',
              opacity: loading ? 0.5 : 1
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
            >
              <h3 style={{ fontSize: '0.9rem', marginBottom: '4px' }}>{route.name}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>{route.time} • {route.distance}</span>
                <span style={{ fontSize: '0.8rem', color: route.color, fontWeight: 'bold' }}>{route.safety} Safe</span>
              </div>
            </div>
          ))}
          
          <div className="glass" style={{ padding: '16px', marginTop: 'auto', background: 'rgba(42, 157, 143, 0.1)' }}>
            <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>
              <strong>Safety Tip:</strong> Routes are calculated based on real-time incident reports from Police and other drivers.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </main>
  );
}
