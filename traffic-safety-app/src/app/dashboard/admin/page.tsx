'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      router.push('/');
    }, 800);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowModal(true);
    }, 1200);
  };

  return (
    <main className="container animate-fade-in theme-admin" style={{ maxWidth: '1200px', padding: '40px 24px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: 'var(--primary)', letterSpacing: '-0.03em' }}>Infrastructure Control</h1>
          <p style={{ opacity: 0.6, fontSize: '0.95rem' }}>Global Traffic Safety & Network Management</p>
        </div>
        <button className="btn btn-ghost" onClick={handleLogout} disabled={loggingOut}>
          {loggingOut ? 'Signing out...' : 'Logout'}
        </button>
      </header>

      {/* Analytics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        <div className="glass" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, opacity: 0.6, letterSpacing: '0.05em' }}>MONTHLY INCIDENTS</span>
            <span style={{ color: 'var(--error)', fontSize: '0.75rem', fontWeight: 700 }}>↑ 12%</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>1,284</h2>
          <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', marginTop: '20px', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ width: '70%', height: '100%', background: 'var(--error)' }}></div>
          </div>
        </div>
        
        <div className="glass" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, opacity: 0.6, letterSpacing: '0.05em' }}>AVG RESPONSE</span>
            <span style={{ color: 'var(--success)', fontSize: '0.75rem', fontWeight: 700 }}>↓ 0.8m</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>4.2m</h2>
          <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', marginTop: '20px', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ width: '85%', height: '100%', background: 'var(--success)' }}></div>
          </div>
        </div>

        <div className="glass" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, opacity: 0.6, letterSpacing: '0.05em' }}>ACTIVE NODES</span>
            <span style={{ color: 'var(--secondary)', fontSize: '0.75rem', fontWeight: 700 }}>↑ 5.2k</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>42.5k</h2>
          <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', marginTop: '20px', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ width: '60%', height: '100%', background: 'var(--secondary)' }}></div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '32px' }}>
        {/* User Table */}
        <section className="glass" style={{ padding: '32px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.25rem' }}>Network Authorization</h3>
            <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>Export Logs</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--foreground-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '0 12px' }}>Identity</th>
                <th style={{ padding: '0 12px' }}>Classification</th>
                <th style={{ padding: '0 12px' }}>Security Status</th>
                <th style={{ padding: '0 12px', textAlign: 'right' }}>Management</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'John Doe', role: 'Citizen', status: 'Verfied' },
                { name: 'Sgt. Miller', role: 'Police', status: 'Authorized' },
                { name: 'Unit 42 Dispatch', role: 'Emergency', status: 'Active' },
              ].map((user, i) => (
                <tr key={i} style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <td style={{ padding: '16px 12px', fontSize: '0.9rem', fontWeight: 500, borderRadius: '8px 0 0 8px' }}>{user.name}</td>
                  <td style={{ padding: '16px 12px', fontSize: '0.85rem', color: 'var(--foreground-muted)' }}>{user.role}</td>
                  <td style={{ padding: '16px 12px' }}>
                    <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>{user.status}</span>
                  </td>
                  <td style={{ padding: '16px 12px', textAlign: 'right', borderRadius: '0 8px 8px 0' }}>
                    <button className="btn btn-ghost" style={{ padding: '4px 8px', fontSize: '0.8rem' }}>Modify</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Config Panel */}
        <aside className="glass" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '32px' }}>Global Parameters</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="input-group">
              <label className="label">Intelligent Alert Radius (KM)</label>
              <input type="number" className="input" defaultValue={5} />
            </div>
            <div className="input-group">
              <label className="label">Response Priority Protocol</label>
              <select className="input" style={{ appearance: 'none' }}>
                <option>Protocol Omega (Highest)</option>
                <option>Protocol Delta (Standard)</option>
                <option>Protocol Gamma (Low)</option>
              </select>
            </div>
            <button 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '8px' }} 
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? 'Synchronizing...' : 'Update Global State'}
            </button>
          </div>
        </aside>
      </div>

      {/* Persistence Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(20px)'
        }}>
          <div className="glass animate-fade-in" style={{ padding: '48px', maxWidth: '440px', textAlign: 'center', border: '1px solid var(--success)' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(52, 199, 89, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <div style={{ color: 'var(--success)', fontSize: '2.5rem' }}>✓</div>
            </div>
            <h2 style={{ marginBottom: '16px', fontSize: '1.5rem' }}>State Synchronized</h2>
            <p style={{ opacity: 0.6, marginBottom: '32px', fontSize: '0.95rem' }}>The new infrastructure parameters have been broadcasted to all active nodes in the network.</p>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setShowModal(false)}>
              Return to Terminal
            </button>
          </div>
        </div>
      )}
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
