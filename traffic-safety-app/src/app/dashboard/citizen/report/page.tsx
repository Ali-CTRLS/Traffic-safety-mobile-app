'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGeolocation } from '@/hooks/useGeolocation';

export default function ReportIncident() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { location, error, loading: geoLoading, getLocation } = useGeolocation();

  useEffect(() => {
    getLocation();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3); // Success step
    }, 1500);
  };

  return (
    <main className="container animate-fade-in">
      <header style={{ marginBottom: '32px' }}>
        <button className="btn btn-ghost" style={{ padding: '8px 12px', fontSize: '0.8rem' }} onClick={() => router.back()}>← Back</button>
        <h1 style={{ fontSize: '1.8rem', marginTop: '16px' }}>Report Incident</h1>
      </header>

      <div className="glass" style={{ padding: '30px' }}>
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>Step 1: Incident Type</h2>
            <div style={{ display: 'grid', gap: '12px' }}>
              {['Car Accident', 'Road Hazard', 'Traffic Jam', 'Medical Emergency'].map(type => (
                <button 
                  key={type} 
                  className="input" 
                  style={{ textAlign: 'left', cursor: 'pointer', marginBottom: '0' }}
                  onClick={() => setStep(2)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="animate-fade-in">
            <h2 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>Step 2: Details & Location</h2>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Description</label>
              <textarea className="input" rows={4} placeholder="Describe what happened..." required />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div className="glass" style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', marginBottom: '12px' }}>
                <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>📍 Current Location</p>
                <p style={{ fontSize: '0.9rem' }}>
                  {geoLoading ? '🛰️ Capturing GPS...' : error ? `❌ ${error}` : location ? `${location.latitude.toFixed(6)}° N, ${location.longitude.toFixed(6)}° W` : 'Location pending'}
                </p>
              </div>
              <button type="button" className="btn btn-ghost" style={{ width: '100%', borderStyle: 'dashed' }}>
                📸 Add Photos (Optional)
              </button>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Report'}
            </button>
          </form>
        )}

        {step === 3 && (
          <div className="animate-fade-in" style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>✅</div>
            <h2 style={{ marginBottom: '10px' }}>Report Submitted!</h2>
            <p style={{ opacity: 0.7, marginBottom: '30px' }}>Authorities have been notified and help is on the way.</p>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => router.push('/dashboard/citizen')}>
              Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
