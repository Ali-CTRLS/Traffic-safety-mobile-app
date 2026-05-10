'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useGeolocation } from '@/hooks/useGeolocation';

export default function CitizenDashboard() {
  const router = useRouter();
  const [sosActive, setSosActive] = useState(false);
  const [sosSuccess, setSosSuccess] = useState(false);
  const { location, error, loading: geoLoading, getLocation } = useGeolocation();

  useEffect(() => {
    getLocation();
  }, []);

  const triggerSos = () => {
    setSosActive(true);
    setTimeout(() => {
      setSosActive(false);
      setSosSuccess(true);
      setTimeout(() => setSosSuccess(false), 5000);
    }, 2000);
  };

  return (
    <main className="container animate-fade-in">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem' }}>Guardian Terminal</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
            <span className="badge badge-success" style={{ padding: '2px 8px' }}>Online</span>
            <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>
              {geoLoading ? '🛰️ Syncing GPS...' : error ? `❌ ${error}` : location ? `📍 ${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}` : '📍 GPS Pending'}
            </span>
          </div>
        </div>
        <button className="btn btn-ghost" onClick={() => router.push('/')} style={{ padding: '8px 16px' }}>Logout</button>
      </header>

      {sosSuccess && (
        <div className="glass animate-fade-in" style={{ padding: '20px', marginBottom: '32px', background: 'rgba(52, 199, 89, 0.1)', border: '1px solid var(--success)', textAlign: 'center' }}>
          <strong style={{ color: 'var(--success)' }}>EMERGENCY BROADCAST SENT</strong>
          <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>Units dispatched to your current coordinates.</p>
        </div>
      )}

      <div style={{ display: 'grid', gap: '40px' }}>
        {/* SOS Interface */}
        <section style={{ textAlign: 'center' }}>
          <div className="sos-outer" onClick={!sosActive ? triggerSos : undefined}>
            {!sosActive && <div className="sos-ring"></div>}
            {!sosActive && <div className="sos-ring"></div>}
            <button 
              className="sos-button"
              disabled={sosActive}
              style={{ background: sosActive ? '#111' : undefined }}
            >
              {sosActive ? '...' : 'SOS'}
              <span>{sosActive ? 'BROADCASTING' : 'HOLD TO ALERT'}</span>
            </button>
          </div>
          <p style={{ marginTop: '24px', fontSize: '0.9rem', opacity: 0.6 }}>Tap the center for immediate emergency dispatch.</p>
        </section>

        <div className="grid-2">
          <Link href="/dashboard/citizen/report" style={{ textDecoration: 'none' }}>
            <div className="glass card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>⚠️</div>
              <h3 style={{ fontSize: '1.1rem' }}>Report Hazard</h3>
              <p style={{ fontSize: '0.8rem' }}>Accidents, obstacles, or malfunctions.</p>
            </div>
          </Link>
          <Link href="/dashboard/citizen/safe-routes" style={{ textDecoration: 'none' }}>
            <div className="glass card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🗺️</div>
              <h3 style={{ fontSize: '1.1rem' }}>Safe Routes</h3>
              <p style={{ fontSize: '0.8rem' }}>AI-powered risk-averse navigation.</p>
            </div>
          </Link>
        </div>

        <section className="glass" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.1rem' }}>Live Safety Intelligence</h3>
            <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', fontSize: '0.7rem' }}>Updated 2m ago</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '4px', height: 'auto', background: 'var(--warning)', borderRadius: '2px' }}></div>
              <div>
                <p style={{ color: 'var(--foreground)', fontSize: '0.95rem', fontWeight: 500 }}>Congestion Warning</p>
                <p style={{ fontSize: '0.85rem' }}>Heavy traffic detected on 5th Avenue. Delay: 12 mins.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '4px', height: 'auto', background: 'var(--success)', borderRadius: '2px' }}></div>
              <div>
                <p style={{ color: 'var(--foreground)', fontSize: '0.95rem', fontWeight: 500 }}>Road Status: Clear</p>
                <p style={{ fontSize: '0.85rem' }}>Expressway construction completed. All lanes open.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
