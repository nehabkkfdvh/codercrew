import React from 'react';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export const StatusBadge = ({ status }) => {
  let badgeClass = 'badge-pending';
  let Icon = AlertCircle;

  if (status === 'In Progress') {
    badgeClass = 'badge-in-progress';
    Icon = Clock;
  } else if (status === 'Resolved') {
    badgeClass = 'badge-resolved';
    Icon = CheckCircle2;
  }

  return (
    <span className={`badge ${badgeClass}`}>
      <Icon size={13} />
      {status}
    </span>
  );
};

export const StatCard = ({ title, value, icon: Icon, color = 'blue', subtitle, trend }) => {
  const colorMap = {
    blue: { bg: '#e0f2fe', text: '#0284c7', ring: '#bae6fd' },
    amber: { bg: '#fef3c7', text: '#d97706', ring: '#fde68a' },
    emerald: { bg: '#dcfce7', text: '#16a34a', ring: '#bbf7d0' },
    purple: { bg: '#f5f3ff', text: '#7c3aed', ring: '#ddd6fe' },
    rose: { bg: '#ffe4e6', text: '#e11d48', ring: '#fecdd3' },
  };

  const current = colorMap[color] || colorMap.blue;

  return (
    <div style={{
      background: 'white',
      borderRadius: 'var(--radius-lg)',
      padding: '1.25rem',
      border: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow-sm)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div>
        <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
          {title}
        </p>
        <h3 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
          {value}
        </h3>
        {subtitle && (
          <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>
            {subtitle}
          </p>
        )}
      </div>

      <div style={{
        backgroundColor: current.bg,
        color: current.text,
        padding: '0.75rem',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Icon size={24} />
      </div>
    </div>
  );
};

export const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '360px'
    }}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '0.65rem 1rem 0.65rem 2.5rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          fontSize: '0.875rem',
          outline: 'none',
          backgroundColor: '#fff',
          transition: 'border-color 0.15s ease'
        }}
        onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
        onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
      />
      <svg
        style={{
          position: 'absolute',
          left: '0.85rem',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--text-light)',
          pointerEvents: 'none'
        }}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </svg>
    </div>
  );
};

export const FilterDropdown = ({ value, onChange, options, label }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      {label && <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{label}:</span>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: '0.65rem 1rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          fontSize: '0.875rem',
          backgroundColor: '#fff',
          color: 'var(--text-main)',
          outline: 'none',
          cursor: 'pointer'
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.5)',
      backdropFilter: 'blur(3px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }} onClick={onClose}>
      <div style={{
        background: '#fff',
        borderRadius: 'var(--radius-lg)',
        width: '100%',
        maxWidth: '560px',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: 'var(--shadow-xl)',
        border: '1px solid var(--border-color)'
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{title}</h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.25rem',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              lineHeight: 1
            }}
          >
            &times;
          </button>
        </div>
        <div style={{ padding: '1.5rem' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export const Loading = ({ text = "Loading data..." }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 1rem',
      gap: '1rem',
      color: 'var(--text-muted)'
    }}>
      <div style={{
        width: '36px',
        height: '36px',
        border: '3px solid var(--primary-light)',
        borderTopColor: 'var(--primary)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      <p style={{ fontSize: '0.9rem' }}>{text}</p>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export const EmptyState = ({ title = "No records found", description = "Try adjusting your filters or search terms.", icon: Icon = AlertCircle, action }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 1.5rem',
      textAlign: 'center',
      background: 'white',
      borderRadius: 'var(--radius-lg)',
      border: '1px dashed var(--border-color)',
      margin: '1rem 0'
    }}>
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        backgroundColor: 'var(--bg-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-light)',
        marginBottom: '1rem'
      }}>
        <Icon size={28} />
      </div>
      <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
        {title}
      </h4>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: '380px', marginBottom: action ? '1.25rem' : '0' }}>
        {description}
      </p>
      {action}
    </div>
  );
};

