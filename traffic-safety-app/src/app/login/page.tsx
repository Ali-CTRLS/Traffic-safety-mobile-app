'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';

function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const role = searchParams.get('role') || 'citizen';
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Ensure we have a valid role, fallback to citizen if not
    const targetRole = role && ['citizen', 'police', 'admin'].includes(role) ? role : 'citizen';
    
    setTimeout(() => {
      router.push(`/dashboard/${targetRole}`);
    }, 1200);
  };

  const getRoleInfo = () => {
    switch (role) {
      case 'police': return { title: 'Officer Login', icon: '🚔', desc: 'Secure Law Enforcement Access' };
      case 'admin': return { title: 'Admin Login', icon: '⚙️', desc: 'System Infrastructure Management' };
      default: return { title: 'Citizen Access', icon: '🛡️', desc: 'Personal Safety & Reporting' };
    }
  };

  const info = getRoleInfo();

  return (
    <div className="container animate-fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div className="glass" style={{ padding: '40px', width: '100%', maxWidth: '440px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>{info.icon}</div>
          <h2 style={{ marginBottom: '8px' }}>{info.title}</h2>
          <p style={{ fontSize: '0.9rem' }}>{info.desc}</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label className="label">Identity Number / Email</label>
            <input type="text" className="input" placeholder="Enter credentials" required />
          </div>
          <div className="input-group">
            <label className="label">Security Password</label>
            <input type="password" className="input" placeholder="••••••••" required />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }} disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In Securely'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <button className="btn btn-ghost" style={{ width: '100%' }} onClick={() => router.push('/')}>
            ← Back to Role Selection
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="container" style={{ textAlign: 'center', marginTop: '100px' }}>Initializing Secure Terminal...</div>}>
      <LoginForm />
    </Suspense>
  );
}
