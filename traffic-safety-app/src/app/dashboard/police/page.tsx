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

  const handleDispatch = (id: string) => {
    setIncidents(prev => prev.map(inc => 
      inc.id === id ? { ...inc, status: 'Dispatched' } : inc
    ));
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
    <main className="container animate-fade-in" style={{ maxWidth: '1000px', padding: '40px 24px' }}>
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
          <button className="btn btn-ghost" onClick={() => router.push('/')}>Logout</button>
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
                    <button className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }} onClick={() => handleDispatch(inc.id)}>
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
                  height: '300px', 
                  background: 'rgba(255,255,255,0.02)', 
                  borderRadius: '12px', 
                  border: '1px solid var(--glass-border)',
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{ position: 'absolute', inset: 0, opacity: 0.1, background: 'repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(255,255,255,0.1) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(255,255,255,0.1) 20px)' }}></div>
                  <div style={{ zIndex: 1 }}>
                    <div className="animate-pulse" style={{ fontSize: '3rem', marginBottom: '16px' }}>📡</div>
                    <p style={{ opacity: 0.6 }}>Scanning Sector 7-G for Active Units...</p>
                  </div>
                  {/* Mock Units */}
                  <div style={{ position: 'absolute', top: '30%', left: '40%', width: '12px', height: '12px', background: 'var(--secondary)', borderRadius: '50%', boxShadow: '0 0 10px var(--secondary)' }}></div>
                  <div style={{ position: 'absolute', bottom: '20%', right: '30%', width: '12px', height: '12px', background: 'var(--success)', borderRadius: '50%', boxShadow: '0 0 10px var(--success)' }}></div>
                </div>
                <div className="grid-2">
                  <div className="glass" style={{ padding: '12px' }}>
                    <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>UNIT P-42</div>
                    <div style={{ fontWeight: 600 }}>MOVING</div>
                  </div>
                  <div className="glass" style={{ padding: '12px' }}>
                    <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>UNIT P-19</div>
                    <div style={{ fontWeight: 600 }}>STATIONARY</div>
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

      {/* Loading Overlay */}
      {toolLoading && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          backdropFilter: 'blur(4px)'
        }}>
          <div className="sos-ring" style={{ width: '100px', height: '100px', opacity: 1 }}></div>
          <div style={{ position: 'absolute', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.1em' }}>INITIALIZING...</div>
        </div>
      )}
    </main>
  );
}
