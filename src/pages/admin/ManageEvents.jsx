import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Calendar, Users, Trash2, Edit, CheckCircle2 } from 'lucide-react';
import { eventService } from '../../services/api';
import { SearchBar, Loading, EmptyState } from '../../components/CommonComponents';

export const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventService.getAll();
        setEvents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this campus event?')) {
      await eventService.delete(id);
      setEvents((prev) => prev.filter((e) => e.id !== id));
      setToast('Event removed successfully.');
      setTimeout(() => setToast(null), 3000);
    }
  };

  const filtered = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.venue.toLowerCase().includes(search.toLowerCase()) ||
    e.organizer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
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

      <div className="page-header">
        <div>
          <h1 className="page-title">Campus Events Management</h1>
          <p className="page-subtitle">
            Publish hackathons, manage venue bookings, track student signups, and coordinate festivals
          </p>
        </div>
        <Link to="/admin/events/create" className="btn btn-primary">
          <PlusCircle size={18} /> Create New Event
        </Link>
      </div>

      <div style={{
        background: '#fff',
        padding: '1rem 1.25rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search events by title, organizer, or venue..."
        />

        <Link to="/admin/students" className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Users size={16} /> View All Registered Students
        </Link>
      </div>

      {loading ? (
        <Loading text="Loading event directory..." />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No events found"
          description="There are currently no events matching your search query."
          icon={Calendar}
          action={
            <Link to="/admin/events/create" className="btn btn-primary btn-sm">
              Publish an Event
            </Link>
          }
        />
      ) : (
        <div style={{
          background: '#fff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          overflowX: 'auto',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
            <thead>
              <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-color)', fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.85rem 1.25rem' }}>Event Details</th>
                <th style={{ padding: '0.85rem 1rem' }}>Category</th>
                <th style={{ padding: '0.85rem 1rem' }}>Date & Venue</th>
                <th style={{ padding: '0.85rem 1rem' }}>Attendance</th>
                <th style={{ padding: '0.85rem 1.25rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--border-light)', fontSize: '0.875rem' }}>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: '56px', height: '42px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                      />
                      <div>
                        <strong style={{ display: 'block', color: 'var(--text-main)', fontSize: '0.95rem' }}>
                          {item.title}
                        </strong>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          Organizer: {item.organizer}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      backgroundColor: 'var(--primary-light)',
                      color: 'var(--primary)',
                      padding: '0.25rem 0.6rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.78rem',
                      fontWeight: 600
                    }}>
                      {item.category}
                    </span>
                  </td>

                  <td style={{ padding: '1rem' }}>
                    <div style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '0.85rem' }}>{item.date}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{item.venue}</div>
                  </td>

                  <td style={{ padding: '1rem' }}>
                    <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{item.registeredCount}</span>
                    <span style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}> / {item.capacity}</span>
                  </td>

                  <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <Link to={`/student/events/${item.id}`} className="btn btn-secondary btn-sm" title="Preview Public Page">
                        Preview
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="btn btn-danger btn-sm"
                        title="Delete Event"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

