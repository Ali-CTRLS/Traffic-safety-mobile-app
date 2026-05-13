'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useGeolocation } from '@/hooks/useGeolocation';

export default function CitizenDashboard() {
  const router = useRouter();
  const [sosActive, setSosActive] = useState(false);
  const [sosSuccess, setSosSuccess] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [loggingOut, setLoggingOut] = useState(false);
  const { location, error, loading: geoLoading, getLocation } = useGeolocation();

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (sosActive && holdProgress < 100) {
      interval = setInterval(() => {
        setHoldProgress(prev => {
          if (prev >= 100) {
            triggerSos();
            return 100;
          }
          return prev + 5;
        });
      }, 50);
    } else if (!sosActive) {
      setHoldProgress(0);
    }
    return () => clearInterval(interval);
  }, [sosActive]);

  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      router.push('/');
    }, 800);
  };

  const triggerSos = () => {
    setSosActive(false);
    setSosSuccess(true);
    // Simple feedback vibration if supported
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate([100, 50, 100]);
    setTimeout(() => setSosSuccess(false), 5000);
  };

  return (
    <main className="container animate-fade-in theme-citizen">
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
        <button className="btn btn-ghost" onClick={handleLogout} disabled={loggingOut} style={{ padding: '8px 16px' }}>
          {loggingOut ? 'Signing out...' : 'Logout'}
        </button>
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
          <div 
            className="sos-outer" 
            onMouseDown={() => setSosActive(true)}
            onMouseUp={() => setSosActive(false)}
            onMouseLeave={() => setSosActive(false)}
            onTouchStart={() => setSosActive(true)}
            onTouchEnd={() => setSosActive(false)}
          >
            {holdProgress > 0 && (
              <svg style={{ position: 'absolute', width: '100%', height: '100%', transform: 'rotate(-90deg)', zIndex: 1 }}>
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="8"
                  strokeDasharray={`${(holdProgress / 100) * 502} 502`}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dasharray 0.05s linear' }}
                />
              </svg>
            )}
            <div className="sos-ring"></div>
            <div className="sos-ring" style={{ animationDelay: '0.5s' }}></div>
            <button 
              className="sos-button"
              style={{ 
                background: holdProgress > 0 ? `radial-gradient(circle, var(--primary) ${holdProgress}%, #B91C1C 100%)` : undefined,
                transform: holdProgress > 0 ? `scale(${1 + holdProgress/1000})` : undefined
              }}
            >
              {holdProgress >= 100 ? '✅' : 'SOS'}
              <span>{holdProgress > 0 ? `HOLDING ${holdProgress}%` : 'HOLD TO ALERT'}</span>
            </button>
          </div>
          <p style={{ marginTop: '24px', fontSize: '0.9rem', opacity: 0.6 }}>Hold the center for 2 seconds for emergency dispatch.</p>
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
      {/* Loading Overlay */}
      {loggingOut && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          backdropFilter: 'blur(8px)'
        }}>
          <div className="sos-ring" style={{ width: '100px', height: '100px', opacity: 1 }}></div>
          <div style={{ position: 'absolute', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.1em' }}>
            SECURELY LOGGING OUT...
          </div>
        </div>
      )}
    </main>
  );
}
