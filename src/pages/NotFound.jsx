import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HelpCircle, Home, LayoutDashboard, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--bg-main)',
      padding: '2rem 1.5rem',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: '520px',
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-xl)',
        padding: '3rem 2rem'
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: '#fee2e2',
          color: '#ef4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          boxShadow: '0 8px 16px rgba(239, 68, 68, 0.15)'
        }}>
          <HelpCircle size={36} />
        </div>

        <span style={{
          fontSize: '0.8rem',
          fontWeight: 800,
          color: '#ef4444',
          textTransform: 'uppercase',
          letterSpacing: '0.075em',
          backgroundColor: '#fff1f2',
          padding: '0.3rem 0.8rem',
          borderRadius: 'var(--radius-full)'
        }}>
          Error 404
        </span>

        <h1 style={{
          fontSize: '2rem',
          fontWeight: 800,
          color: 'var(--text-main)',
          marginTop: '1rem',
          marginBottom: '0.5rem',
          letterSpacing: '-0.025em'
        }}>
          Page Not Found
        </h1>

        <p style={{
          fontSize: '0.925rem',
          color: 'var(--text-muted)',
          lineHeight: 1.6,
          marginBottom: '2rem'
        }}>
          The campus page or URL you are trying to visit does not exist, has been relocated, or is temporarily unavailable.
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.85rem',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => navigate(-1)}
            className="btn btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <ArrowLeft size={16} /> Go Back
          </button>

          <Link
            to="/dashboard"
            className="btn btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <LayoutDashboard size={16} /> Dashboard
          </Link>

          <Link
            to="/"
            className="btn btn-outline-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Home size={16} /> Home
          </Link>
        </div>
      </div>
    </div>
  );
};

