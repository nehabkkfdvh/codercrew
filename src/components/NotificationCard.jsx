import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, AlertTriangle, Calendar, Info, Check } from 'lucide-react';

export const NotificationCard = ({ notification, onMarkRead }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'complaint':
        return <AlertTriangle size={18} style={{ color: '#d97706' }} />;
      case 'event':
        return <Calendar size={18} style={{ color: '#2563eb' }} />;
      default:
        return <Info size={18} style={{ color: '#7c3aed' }} />;
    }
  };

  return (
    <div style={{
      background: notification.read ? 'white' : '#f8faff',
      border: `1px solid ${notification.read ? 'var(--border-color)' : 'var(--primary-border)'}`,
      borderRadius: 'var(--radius-md)',
      padding: '1.25rem',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1rem',
      transition: 'all 0.2s ease',
      boxShadow: notification.read ? 'none' : 'var(--shadow-sm)'
    }}>
      <div style={{
        padding: '0.65rem',
        borderRadius: 'var(--radius-md)',
        background: notification.read ? 'var(--bg-subtle)' : '#e0e7ff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {getIcon()}
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
          <h4 style={{
            fontSize: '0.95rem',
            fontWeight: notification.read ? 600 : 700,
            color: 'var(--text-main)'
          }}>
            {notification.title}
          </h4>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
            {notification.time}
          </span>
        </div>

        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem', lineHeight: 1.45 }}>
          {notification.message}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {notification.link && notification.link !== '#' && (
            <Link
              to={notification.link}
              style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary)', textDecoration: 'none' }}
            >
              View Update &rarr;
            </Link>
          )}

          {!notification.read && (
            <button
              onClick={() => onMarkRead(notification.id)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              <Check size={13} /> Mark as read
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

