import Link from 'next/link';

export default function Home() {
  return (
    <main className="container animate-fade-in" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: '60px' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <div style={{ 
          display: 'inline-flex', 
          padding: '8px 16px', 
          borderRadius: 'var(--radius-full)', 
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid var(--glass-border)',
          fontSize: '0.8rem',
          fontWeight: 600,
          color: 'var(--secondary)',
          marginBottom: '24px',
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}>
          Next-Gen Safety System
        </div>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '16px', lineHeight: 1.1 }}>
          Traffic <span style={{ color: 'var(--primary)' }}>Safety</span>
        </h1>
        <p style={{ fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
          An intelligent ecosystem connecting citizens, emergency responders, and administrators for a safer urban environment.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        <Link href="/login?role=citizen" style={{ textDecoration: 'none' }}>
          <div className="glass card">
            <div className="card-title">
              <span style={{ fontSize: '1.5rem' }}>🛡️</span>
              Citizen Portal
            </div>
            <p className="card-desc">Report hazards, request emergency assistance, and access safe route planning.</p>
          </div>
        </Link>

        <Link href="/login?role=police" style={{ textDecoration: 'none' }}>
          <div className="glass card">
            <div className="card-title">
              <span style={{ fontSize: '1.5rem' }}>🚔</span>
              Officer Terminal
            </div>
            <p className="card-desc">Monitor live incidents, manage dispatch logs, and process traffic violations.</p>
          </div>
        </Link>

        <Link href="/login?role=admin" style={{ textDecoration: 'none' }}>
          <div className="glass card">
            <div className="card-title">
              <span style={{ fontSize: '1.5rem' }}>⚙️</span>
              Admin Control
            </div>
            <p className="card-desc">System analytics, hardware integration settings, and user authorization management.</p>
          </div>
        </Link>
      </div>

      <footer style={{ marginTop: '60px', textAlign: 'center', opacity: 0.5, fontSize: '0.8rem' }}>
        &copy; 2026 Traffic Safety Department. Secure & Encrypted Connection.
      </footer>
    </main>
  );
}
