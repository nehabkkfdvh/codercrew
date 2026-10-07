import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Award,
  Check,
  ArrowLeft,
  Share2,
  CheckCircle2
} from 'lucide-react';
import { eventService } from '../../services/api';
import { Loading } from '../../components/CommonComponents';

export const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await eventService.getById(id);
        setEvent(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    const updated = await eventService.toggleRegister(event.id);
    setEvent(updated);
    setToast(
      updated.isRegistered
        ? 'Successfully registered for this event! Check your email for badge details.'
        : 'Cancelled your event registration.'
    );
    setTimeout(() => setToast(null), 3500);
  };

  if (loading) return <Loading text="Loading event details..." />;
  if (!event) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h3>Event not found</h3>
        <button onClick={() => navigate('/events')} className="btn btn-secondary" style={{ marginTop: '1rem' }}>
          Back to Events
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {toast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: '#10b981',
          color: '#fff',
          padding: '0.85rem 1.5rem',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 9999,
          fontWeight: 600
        }}>
          <CheckCircle2 size={18} />
          {toast}
        </div>
      )}

      <div>
        <button
          onClick={() => navigate('/events')}
          className="btn btn-secondary btn-sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem' }}
        >
          <ArrowLeft size={16} /> Back to Events
        </button>
      </div>

      {/* Hero Banner */}
      <div style={{
        position: 'relative',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        height: '320px',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <img
          src={event.image}
          alt={event.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.2) 60%, transparent 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '2rem'
        }}>
          <div style={{
            display: 'inline-block',
            alignSelf: 'flex-start',
            background: 'var(--primary)',
            color: '#fff',
            fontSize: '0.75rem',
            fontWeight: 700,
            padding: '0.35rem 0.75rem',
            borderRadius: 'var(--radius-full)',
            marginBottom: '0.75rem'
          }}>
            {event.category}
          </div>
          <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 800, lineHeight: 1.25, maxWidth: '800px' }}>
            {event.title}
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '0.4rem' }}>
            Organized by <strong>{event.organizer}</strong>
          </p>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        alignItems: 'start'
      }}>
        {/* Main Content */}
        <div style={{
          background: '#fff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          padding: '1.75rem',
          boxShadow: 'var(--shadow-sm)',
          gridColumn: 'span 2'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
            About This Event
          </h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem', whiteSpace: 'pre-wrap' }}>
            {event.description}
          </p>

          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            Topics & Highlights
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {event.tags?.map((tag, idx) => (
              <span
                key={idx}
                style={{
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: 600
                }}
              >
                #{tag}
              </span>
            ))}
          </div>

          {event.speakers && (
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                Featured Mentors & Speakers
              </h4>
              <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {event.speakers.map((sp, idx) => (
                  <li key={idx}>{sp}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar Info & Action Box */}
        <div style={{
          background: '#fff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          padding: '1.75rem',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Schedule & Venue
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <Calendar size={18} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ display: 'block', color: 'var(--text-main)' }}>Date</strong>
                <span style={{ color: 'var(--text-muted)' }}>{event.date}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <Clock size={18} style={{ color: 'var(--secondary)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ display: 'block', color: 'var(--text-main)' }}>Timing</strong>
                <span style={{ color: 'var(--text-muted)' }}>{event.time}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <MapPin size={18} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ display: 'block', color: 'var(--text-main)' }}>Location</strong>
                <span style={{ color: 'var(--text-muted)' }}>{event.venue}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <Users size={18} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ display: 'block', color: 'var(--text-main)' }}>Attendance Status</strong>
                <span style={{ color: 'var(--text-muted)' }}>{event.registeredCount} of {event.capacity} seats taken</span>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem' }}>
            <button
              onClick={handleRegister}
              className={`btn ${event.isRegistered ? 'btn-secondary' : 'btn-primary'}`}
              style={{
                width: '100%',
                padding: '0.85rem',
                backgroundColor: event.isRegistered ? '#ecfdf5' : undefined,
                color: event.isRegistered ? '#047857' : undefined,
                borderColor: event.isRegistered ? '#a7f3d0' : undefined
              }}
            >
              {event.isRegistered ? (
                <>
                  <Check size={18} /> Registered (Click to Cancel)
                </>
              ) : (
                'Register for Event'
              )}
            </button>

            {event.isRegistered && (
              <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#047857', marginTop: '0.5rem', fontWeight: 600 }}>
                ✓ Pass verified for Alex Johnson
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

