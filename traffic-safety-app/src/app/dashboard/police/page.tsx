'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const MOCK_INCIDENTS = [
  { id: '1', type: 'Car Accident', location: 'Main St & 5th', time: '2 mins ago', priority: 'High', status: 'Pending' },
  { id: '2', type: 'Road Hazard', location: 'Highway 101 North', time: '10 mins ago', priority: 'Medium', status: 'In Progress' },
  { id: '3', type: 'SOS Alert', location: 'Sunset Blvd', time: 'Just now', priority: 'Critical', status: 'Pending' },
];

export default function PoliceDashboard() {
  const router = useRouter();
  const [incidents, setIncidents] = useState(MOCK_INCIDENTS);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [toolLoading, setToolLoading] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [confirmDispatch, setConfirmDispatch] = useState<string | null>(null);

  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      router.push('/');
    }, 800);
  };

  const handleDispatch = (id: string) => {
    setIncidents(prev => prev.map(inc => 
      inc.id === id ? { ...inc, status: 'Dispatched' } : inc
    ));
    setConfirmDispatch(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'var(--primary)';
      case 'High': return 'var(--warning)';
      default: return 'var(--secondary)';
    }
  };

  const openTool = (tool: string) => {
    setToolLoading(true);
    setTimeout(() => {
      setActiveTool(tool);
      setToolLoading(false);
    }, 600);
  };

  return (
    <main className="container animate-fade-in theme-police" style={{ maxWidth: '1000px', padding: '40px 24px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)', animation: 'pulse 1.5s infinite' }}></div>
            <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em' }}>Central Command</h1>
          </div>
          <p style={{ opacity: 0.6, fontSize: '0.95rem' }}>Active Road Intelligence & Dispatch Terminal</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary" style={{ padding: '10px 20px' }}>
            📡 Live Feed
          </button>
          <button className="btn btn-ghost" onClick={handleLogout} disabled={loggingOut}>
            {loggingOut ? 'Signing out...' : 'Logout'}
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px' }}>
        {/* Incident Stream */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.25rem' }}>Active Incident Stream</h2>
            <span className="badge" style={{ background: 'rgba(255,255,255,0.05)' }}>{incidents.length} Events</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {incidents.map(inc => (
              <div key={inc.id} className="glass" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: getPriorityColor(inc.priority) }}></div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                      <h3 style={{ fontSize: '1.1rem' }}>{inc.type}</h3>
                      <span className="badge" style={{ background: `${getPriorityColor(inc.priority)}22`, color: getPriorityColor(inc.priority), fontSize: '0.65rem' }}>
                        {inc.priority}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>📍 {inc.location}</p>
                  </div>
                  <span style={{ fontSize: '0.75rem', opacity: 0.5 }}>{inc.time}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: inc.status === 'Pending' ? 'var(--primary)' : 'var(--success)' }}></div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: inc.status === 'Pending' ? 'var(--primary)' : 'var(--success)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {inc.status}
                    </span>
                  </div>
                  
                  {inc.status === 'Pending' && (
                    <button className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }} onClick={() => setConfirmDispatch(inc.id)}>
                      Initiate Dispatch
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tactical Sidebar */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass" style={{ padding: '24px' }}>
            <h3 style={{ marginBottom: '20px', fontSize: '1rem', color: 'var(--foreground-muted)' }}>Tactical Tools</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button 
                className="btn btn-secondary" 
                style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.9rem' }}
                onClick={() => openTool('fine')}
                disabled={toolLoading}
              >
                📝 Issue Digital Fine
              </button>
              <button 
                className="btn btn-secondary" 
                style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.9rem' }}
                onClick={() => openTool('tracking')}
                disabled={toolLoading}
              >
                🚔 Patrol Unit Tracking
              </button>
              <button 
                className="btn btn-secondary" 
                style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.9rem' }}
                onClick={() => openTool('analytics')}
                disabled={toolLoading}
              >
                📊 Analytics Engine
              </button>
            </div>
          </div>

          <div className="glass" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(88, 86, 214, 0.1) 100%)' }}>
            <h3 style={{ marginBottom: '16px', fontSize: '1rem' }}>Unit Readiness</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ textAlign: 'center', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>14</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>AVAILABLE</div>
              </div>
              <div style={{ textAlign: 'center', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>03</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>ACTIVE</div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Tactical Tool Modals */}
      {activeTool && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(20px)',
          padding: '24px'
        }}>
          <div className="glass animate-fade-in" style={{ padding: '40px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.5rem' }}>
                {activeTool === 'fine' && 'Digital Fine Issuance'}
                {activeTool === 'tracking' && 'Live Patrol Tracking'}
                {activeTool === 'analytics' && 'Operational Analytics'}
              </h2>
              <button className="btn btn-ghost" style={{ padding: '8px' }} onClick={() => setActiveTool(null)}>✕</button>
            </div>

            {activeTool === 'fine' && (
              <form onSubmit={(e) => { e.preventDefault(); setActiveTool(null); alert('Fine issued successfully'); }}>
                <div className="input-group">
                  <label className="label">Vehicle Plate Number</label>
                  <input type="text" className="input" placeholder="ABC-1234" required />
                </div>
                <div className="input-group">
                  <label className="label">Violation Type</label>
                  <select className="input">
                    <option>Speeding (&gt; 20km/h)</option>
                    <option>Illegal Parking</option>
                    <option>Red Light Violation</option>
                    <option>Reckless Driving</option>
                  </select>
                </div>
                <div className="input-group">
                  <label className="label">Fine Amount ($)</label>
                  <input type="number" className="input" defaultValue={150} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>Generate Digital Summons</button>
              </form>
            )}

            {activeTool === 'tracking' && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  height: '350px', 
                  background: '#050505', 
                  borderRadius: '16px', 
                  border: '1px solid var(--glass-border)',
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: 'inset 0 0 50px rgba(0,0,0,1)'
                }}>
                  {/* Tactical Grid */}
                  <div style={{ position: 'absolute', inset: 0, opacity: 0.15, background: 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0, 122, 255, 0.3) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(0, 122, 255, 0.3) 40px)' }}></div>
                  <div style={{ position: 'absolute', inset: 0, opacity: 0.05, background: 'repeating-linear-gradient(0deg, transparent, transparent 9px, rgba(255, 255, 255, 0.1) 10px), repeating-linear-gradient(90deg, transparent, transparent 9px, rgba(255, 255, 255, 0.1) 10px)' }}></div>
                  
                  {/* Radar Sweep Effect */}
                  <div style={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: '50%', 
                    width: '150%', 
                    height: '150%', 
                    background: 'conic-gradient(from 0deg, transparent 0%, rgba(0, 122, 255, 0.1) 10%, transparent 20%)',
                    transform: 'translate(-50%, -50%)',
                    animation: 'radar-spin 4s linear infinite',
                    zIndex: 0
                  }}></div>

                  <div style={{ zIndex: 1 }}>
                    <div className="animate-pulse" style={{ fontSize: '3rem', marginBottom: '16px', filter: 'drop-shadow(0 0 10px var(--primary))' }}>📡</div>
                    <p style={{ opacity: 0.8, fontSize: '0.85rem', letterSpacing: '0.05em' }}>SCANNING SECTOR 7-G...</p>
                  </div>

                  {/* Mock Units with labels */}
                  <div style={{ position: 'absolute', top: '30%', left: '40%', zIndex: 2 }}>
                    <div style={{ width: '12px', height: '12px', background: 'var(--primary)', borderRadius: '50%', boxShadow: '0 0 15px var(--primary)', animation: 'pulse 2s infinite' }}></div>
                    <div style={{ position: 'absolute', top: '-20px', left: '16px', background: 'rgba(0,0,0,0.8)', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', whiteSpace: 'nowrap', border: '1px solid var(--primary)' }}>UNIT P-42 [EN ROUTE]</div>
                  </div>
                  <div style={{ position: 'absolute', bottom: '25%', right: '35%', zIndex: 2 }}>
                    <div style={{ width: '12px', height: '12px', background: 'var(--success)', borderRadius: '50%', boxShadow: '0 0 15px var(--success)' }}></div>
                    <div style={{ position: 'absolute', top: '16px', left: '-10px', background: 'rgba(0,0,0,0.8)', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', whiteSpace: 'nowrap', border: '1px solid var(--success)' }}>UNIT P-19 [STANDBY]</div>
                  </div>
                  <div style={{ position: 'absolute', top: '60%', left: '20%', zIndex: 2 }}>
                    <div style={{ width: '10px', height: '10px', background: 'var(--warning)', borderRadius: '50%', boxShadow: '0 0 10px var(--warning)', opacity: 0.7 }}></div>
                    <div style={{ position: 'absolute', top: '14px', left: '10px', background: 'rgba(0,0,0,0.8)', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', whiteSpace: 'nowrap', opacity: 0.8 }}>HAZARD #1092</div>
                  </div>
                </div>
                <div className="grid-2">
                  <div className="glass" style={{ padding: '16px', textAlign: 'left' }}>
                    <div style={{ fontSize: '0.7rem', opacity: 0.5, marginBottom: '4px' }}>OPERATIONAL UNITS</div>
                    <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>14 <span style={{ fontSize: '0.7rem', fontWeight: 400, opacity: 0.6 }}>ACTIVE</span></div>
                  </div>
                  <div className="glass" style={{ padding: '16px', textAlign: 'left' }}>
                    <div style={{ fontSize: '0.7rem', opacity: 0.5, marginBottom: '4px' }}>RESPONSE TIME</div>
                    <div style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--success)' }}>3.4m <span style={{ fontSize: '0.7rem', fontWeight: 400, opacity: 0.6 }}>AVG</span></div>
                  </div>
                </div>
              </div>
            )}

            {activeTool === 'analytics' && (
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="glass" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.9rem' }}>Incident Density</span>
                      <span style={{ color: 'var(--primary)' }}>+14%</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                      <div style={{ width: '75%', height: '100%', background: 'var(--primary)', borderRadius: '4px' }}></div>
                    </div>
                  </div>
                  <div className="glass" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.9rem' }}>Resource Efficiency</span>
                      <span style={{ color: 'var(--success)' }}>+22%</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                      <div style={{ width: '90%', height: '100%', background: 'var(--success)', borderRadius: '4px' }}></div>
                    </div>
                  </div>
                </div>
                <button className="btn btn-secondary" style={{ width: '100%', marginTop: '32px' }} onClick={() => setActiveTool(null)}>Generate Full Report (PDF)</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Dispatch Confirmation Modal */}
      {confirmDispatch && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1500,
          backdropFilter: 'blur(10px)'
        }}>
          <div className="glass animate-fade-in" style={{ padding: '40px', maxWidth: '400px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🚨</div>
            <h2 style={{ marginBottom: '12px' }}>Confirm Dispatch</h2>
            <p style={{ opacity: 0.7, marginBottom: '32px' }}>Are you sure you want to authorize emergency unit deployment to this location?</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <button className="btn btn-ghost" onClick={() => setConfirmDispatch(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => handleDispatch(confirmDispatch)}>Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {(toolLoading || loggingOut) && (
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
            {loggingOut ? 'SECURELY LOGGING OUT...' : 'INITIALIZING...'}
          </div>
        </div>
      )}
    </main>
  );
}
