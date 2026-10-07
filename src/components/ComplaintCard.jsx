import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, ArrowRight, MessageSquare, Tag } from 'lucide-react';
import { StatusBadge } from './CommonComponents';

export const ComplaintCard = ({ complaint, isAdmin = false }) => {
  const detailLink = isAdmin
    ? `/admin/complaints/${complaint.id}`
    : `/complaints/${complaint.id}`;

  return (
    <div style={{
      background: 'white',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-color)',
      padding: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: '1rem',
      transition: 'all 0.2s ease',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              fontFamily: 'monospace',
              color: 'var(--primary)',
              background: 'var(--primary-light)',
              padding: '0.2rem 0.5rem',
              borderRadius: 'var(--radius-sm)'
            }}>
              {complaint.id}
            </span>
            <span style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              background: 'var(--bg-subtle)',
              padding: '0.2rem 0.5rem',
              borderRadius: 'var(--radius-sm)'
            }}>
              <Tag size={12} />
              {complaint.category}
            </span>
          </div>
          <StatusBadge status={complaint.status} />
        </div>

        <h4 style={{
          fontSize: '1.05rem',
          fontWeight: 700,
          color: 'var(--text-main)',
          marginBottom: '0.5rem',
          lineHeight: 1.4
        }}>
          {complaint.title}
        </h4>

        <p style={{
          fontSize: '0.875rem',
          color: 'var(--text-muted)',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          marginBottom: '1rem',
          lineHeight: 1.5
        }}>
          {complaint.description}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--text-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <MapPin size={13} style={{ color: 'var(--text-muted)' }} />
            <span style={{ color: 'var(--text-muted)' }}>{complaint.location}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Calendar size={13} style={{ color: 'var(--text-muted)' }} />
            <span>Reported: {complaint.createdAt}</span>
          </div>
        </div>
      </div>

      <div style={{
        paddingTop: '0.85rem',
        borderTop: '1px solid var(--border-light)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <MessageSquare size={14} />
          <span>{complaint.comments ? complaint.comments.length : 0} notes</span>
        </div>

        <Link
          to={detailLink}
          className="btn btn-outline-primary btn-sm"
          style={{ textDecoration: 'none' }}
        >
          View Details
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};

