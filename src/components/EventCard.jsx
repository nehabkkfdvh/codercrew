import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Check, ArrowRight } from 'lucide-react';

export const EventCard = ({ event, onToggleRegister, isAdmin = false, onDelete }) => {
  const detailLink = `/events/${event.id}`;

  return (
    <div style={{
      background: 'white',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-color)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: 'var(--shadow-sm)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    }}>
      <Link to={detailLink} style={{ position: 'relative', height: '180px', overflow: 'hidden', display: 'block' }}>
        <img
          src={event.image}
          alt={event.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          top: '0.75rem',
          right: '0.75rem',
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(4px)',
          color: '#fff',
          fontSize: '0.75rem',
          fontWeight: 600,
          padding: '0.25rem 0.65rem',
          borderRadius: 'var(--radius-full)'
        }}>
          {event.category}
        </div>
      </Link>

      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <Link to={detailLink} style={{ textDecoration: 'none' }}>
            <h4 style={{
              fontSize: '1.15rem',
              fontWeight: 700,
              marginBottom: '0.5rem',
              color: 'var(--text-main)',
              lineHeight: 1.35
            }}>
              {event.title}
            </h4>
          </Link>

          <p style={{
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            marginBottom: '1rem',
            lineHeight: 1.5
          }}>
            {event.description}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={14} style={{ color: 'var(--primary)' }} />
              <span>{event.date}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={14} style={{ color: 'var(--secondary)' }} />
              <span>{event.time}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={14} style={{ color: 'var(--accent)' }} />
              <span>{event.venue}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={14} style={{ color: '#10b981' }} />
              <span>{event.registeredCount} / {event.capacity} Registered</span>
            </div>
          </div>
        </div>

        <div style={{
          paddingTop: '0.85rem',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.5rem'
        }}>
          {isAdmin ? (
            <div style={{ display: 'flex', gap: '0.5rem', width: '100%', justifyContent: 'space-between' }}>
              <Link to={`/admin/students`} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                Registrations
              </Link>
              <button
                onClick={() => onDelete(event.id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => onToggleRegister(event.id)}
                className={`btn btn-sm ${event.isRegistered ? 'btn-secondary' : 'btn-primary'}`}
                style={{
                  flex: 1,
                  backgroundColor: event.isRegistered ? '#ecfdf5' : undefined,
                  color: event.isRegistered ? '#047857' : undefined,
                  borderColor: event.isRegistered ? '#a7f3d0' : undefined
                }}
              >
                {event.isRegistered ? (
                  <>
                    <Check size={14} /> Registered
                  </>
                ) : (
                  'Register Now'
                )}
              </button>
              <Link to={detailLink} className="btn btn-secondary btn-sm" style={{ padding: '0.4rem 0.6rem' }}>
                <ArrowRight size={15} />
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

