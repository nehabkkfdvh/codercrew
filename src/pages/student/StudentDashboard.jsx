import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  Clock,
  CheckCircle2,
  Calendar,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  BellRing,
  FileQuestion,
  User,
  Settings,
  LogOut,
  Bell
} from 'lucide-react';
import { useAuth } from '../../services/AuthContext';
import { complaintService, eventService, notificationService } from '../../services/api';
import { StatCard, Loading } from '../../components/CommonComponents';
import { ComplaintCard } from '../../components/ComplaintCard';
import { EventCard } from '../../components/EventCard';

export const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [complaintsData, eventsData, notifData] = await Promise.all([
          complaintService.getAll(),
          eventService.getAll(),
          notificationService.getAll()
        ]);
        setComplaints(complaintsData);
        setEvents(eventsData);
        setNotifications(notifData.slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleToggleRegister = async (eventId) => {
    const updated = await eventService.toggleRegister(eventId);
    setEvents((prev) => prev.map((e) => (e.id === eventId ? updated : e)));
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) return <Loading text="Loading your dashboard..." />;

  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === 'Pending').length;
  const inProgress = complaints.filter((c) => c.status === 'In Progress').length;
  const resolved = complaints.filter((c) => c.status === 'Resolved').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
        borderRadius: 'var(--radius-xl)',
        padding: '2rem 2.5rem',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem',
        boxShadow: 'var(--shadow-glow)'
      }}>
        <div style={{ maxWidth: '600px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(255, 255, 255, 0.15)',
            padding: '0.3rem 0.8rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.8rem',
            fontWeight: 600,
            marginBottom: '0.75rem',
            backdropFilter: 'blur(4px)'
          }}>
            <TrendingUp size={14} /> Spring Semester 2026 Portal Active
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.2 }}>
            Welcome back, {user?.name || 'Student'}! 👋
          </h2>
          <p style={{ marginTop: '0.5rem', fontSize: '0.95rem', opacity: 0.9, lineHeight: 1.5 }}>
            Stay connected with campus facilities, track real-time resolution updates, and explore upcoming university hackathons and events.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link
            to="/report-problem"
            className="btn"
            style={{
              backgroundColor: '#ffffff',
              color: 'var(--primary)',
              fontWeight: 700,
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <PlusCircle size={18} />
            Report a Problem
          </Link>
          <Link
            to="/complaints"
            className="btn"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
          >
            <FileQuestion size={18} />
            Track Complaints
          </Link>
          <Link
            to="/events"
            className="btn"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
          >
            <Calendar size={18} />
            Browse Events
          </Link>
        </div>
      </div>

      {/* Quick Access Navigation Bar (Connecting All Requested Dashboard Buttons) */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        padding: '0.75rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-muted)' }}>
          <span>Quick Access:</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
          <Link
            to="/report-problem"
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem' }}
          >
            <PlusCircle size={15} color="var(--primary)" />
            <span>Report a Problem</span>
          </Link>

          <Link
            to="/complaints"
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem' }}
          >
            <FileQuestion size={15} color="#0284c7" />
            <span>Track Complaints</span>
          </Link>

          <Link
            to="/events"
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem' }}
          >
            <Calendar size={15} color="#7c3aed" />
            <span>Browse Events</span>
          </Link>

          <Link
            to="/notifications"
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem' }}
          >
            <Bell size={15} color="#d97706" />
            <span>Notifications</span>
          </Link>

          <Link
            to="/profile"
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem' }}
          >
            <User size={15} color="#16a34a" />
            <span>Profile</span>
          </Link>

          <Link
            to="/settings"
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem' }}
          >
            <Settings size={15} color="var(--text-muted)" />
            <span>Settings</span>
          </Link>

          <button
            onClick={handleLogout}
            className="btn btn-secondary btn-sm"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.8rem',
              color: 'var(--danger)',
              backgroundColor: '#fff5f5',
              borderColor: '#fee2e2'
            }}
          >
            <LogOut size={15} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem'
      }}>
        <StatCard
          title="Total Complaints"
          value={total}
          icon={FileText}
          color="blue"
          subtitle="Submitted campus tickets"
        />
        <StatCard
          title="Pending Review"
          value={pending}
          icon={AlertCircle}
          color="amber"
          subtitle="Awaiting staff assignment"
        />
        <StatCard
          title="In Progress"
          value={inProgress}
          icon={Clock}
          color="purple"
          subtitle="Under active maintenance"
        />
        <StatCard
          title="Resolved"
          value={resolved}
          icon={CheckCircle2}
          color="emerald"
          subtitle="Successfully fixed"
        />
      </div>

      {/* Main Grid: Recent Complaints & Notifications Sidebar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem'
      }}>
        {/* Recent Complaints Section */}
        <div style={{ gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Recent Complaints
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Track latest updates on university infrastructure issues
              </p>
            </div>
            <Link
              to="/complaints"
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                textDecoration: 'none'
              }}
            >
              Track All Complaints ({complaints.length}) <ArrowRight size={15} />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem'
          }}>
            {complaints.slice(0, 4).map((complaint) => (
              <ComplaintCard key={complaint.id} complaint={complaint} />
            ))}
          </div>
        </div>

        {/* Quick Notifications / Broadcasts */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BellRing size={20} style={{ color: 'var(--primary)' }} />
              Notifications
            </h3>
            <Link
              to="/notifications"
              style={{ fontSize: '0.825rem', color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}
            >
              See all
            </Link>
          </div>

          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            {notifications.map((notif) => (
              <div
                key={notif.id}
                style={{
                  paddingBottom: '0.85rem',
                  borderBottom: '1px solid var(--border-light)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {notif.title}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-light)' }}>
                    {notif.time}
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  {notif.message}
                </p>
                <Link
                  to="/notifications"
                  style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)', textDecoration: 'none', alignSelf: 'flex-start' }}
                >
                  View Details &rarr;
                </Link>
              </div>
            ))}
          </div>

          {/* Featured Upcoming Events Snippet */}
          <div style={{ marginTop: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Upcoming Events
              </h3>
              <Link
                to="/events"
                style={{ fontSize: '0.825rem', color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}
              >
                View all ({events.length})
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {events.slice(0, 2).map((event) => (
                <EventCard key={event.id} event={event} onToggleRegister={handleToggleRegister} />
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
