import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Clock,
  CheckCircle2,
  Calendar,
  Users,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  BarChart3,
  ShieldCheck
} from 'lucide-react';
import { complaintService, eventService, studentService } from '../../services/api';
import { StatCard, Loading } from '../../components/CommonComponents';
import { ComplaintCard } from '../../components/ComplaintCard';

export const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [events, setEvents] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [complaintsData, eventsData, studentsData] = await Promise.all([
          complaintService.getAll(),
          eventService.getAll(),
          studentService.getAllStudents()
        ]);
        setComplaints(complaintsData);
        setEvents(eventsData);
        setStudents(studentsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loading text="Loading administrator metrics..." />;

  const totalComplaints = complaints.length;
  const pendingComplaints = complaints.filter((c) => c.status === 'Pending').length;
  const inProgressComplaints = complaints.filter((c) => c.status === 'In Progress').length;
  const resolvedComplaints = complaints.filter((c) => c.status === 'Resolved').length;
  const totalRegistrations = events.reduce((acc, curr) => acc + (curr.registeredCount || 0), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
        borderRadius: 'var(--radius-xl)',
        padding: '2rem 2.5rem',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{ maxWidth: '640px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(255, 255, 255, 0.12)',
            padding: '0.3rem 0.8rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.8rem',
            fontWeight: 600,
            marginBottom: '0.75rem',
            backdropFilter: 'blur(4px)'
          }}>
            <ShieldCheck size={14} /> Campus Operations & Facilities Command Center
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.2 }}>
            University Admin Control Center
          </h2>
          <p style={{ marginTop: '0.5rem', fontSize: '0.95rem', opacity: 0.9, lineHeight: 1.5 }}>
            Monitor campus infrastructure reports, dispatch engineering & IT staff, and oversee collegiate hackathon schedules.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link to="/admin/complaints" className="btn btn-primary" style={{ backgroundColor: '#ffffff', color: '#312e81' }}>
            Review Tickets ({pendingComplaints})
          </Link>
          <Link
            to="/admin/events/create"
            className="btn"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
          >
            Create New Event
          </Link>
        </div>
      </div>

      {/* Primary Analytics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.25rem'
      }}>
        <StatCard
          title="Total Complaints"
          value={totalComplaints}
          icon={FileText}
          color="blue"
          subtitle="All recorded tickets"
        />
        <StatCard
          title="Pending Action"
          value={pendingComplaints}
          icon={AlertTriangle}
          color="amber"
          subtitle="Immediate review needed"
        />
        <StatCard
          title="In Progress"
          value={inProgressComplaints}
          icon={Clock}
          color="purple"
          subtitle="Assigned to engineers"
        />
        <StatCard
          title="Resolved"
          value={resolvedComplaints}
          icon={CheckCircle2}
          color="emerald"
          subtitle="Repairs verified"
        />
        <StatCard
          title="Live Events"
          value={events.length}
          icon={Calendar}
          color="blue"
          subtitle="Published campus activities"
        />
        <StatCard
          title="Student Registrations"
          value={totalRegistrations}
          icon={Users}
          color="rose"
          subtitle="Total attendee signups"
        />
      </div>

      {/* Analytics Visualization Card */}
      <div style={{
        background: '#fff',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        padding: '1.75rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BarChart3 size={20} style={{ color: 'var(--primary)' }} />
              Resolution Rate by Category
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Breakdown of high-volume campus complaint categories
            </p>
          </div>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#16a34a', backgroundColor: '#dcfce7', padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)' }}>
            Overall Clearance: {Math.round((resolvedComplaints / (totalComplaints || 1)) * 100)}%
          </span>
        </div>

        {/* CSS Chart Representation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { name: 'Wi-Fi & Network', count: 8, percentage: 75, color: '#4f46e5' },
            { name: 'Electrical & Facilities', count: 12, percentage: 60, color: '#7c3aed' },
            { name: 'Sanitation & Water', count: 5, percentage: 90, color: '#06b6d4' },
            { name: 'Furniture & Maintenance', count: 4, percentage: 50, color: '#f59e0b' }
          ].map((bar, i) => (
            <div key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{bar.name}</span>
                <span style={{ color: 'var(--text-muted)' }}>{bar.percentage}% Resolved</span>
              </div>
              <div style={{ height: '10px', backgroundColor: 'var(--bg-subtle)', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${bar.percentage}%`,
                  backgroundColor: bar.color,
                  borderRadius: '999px',
                  transition: 'width 0.6s ease'
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout: Recent Complaints Requiring Action & Events List */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '2rem'
      }}>
        {/* Recent Complaints */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Recent Complaints
            </h3>
            <Link to="/admin/complaints" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              Manage All <ArrowRight size={15} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {complaints.slice(0, 3).map((item) => (
              <ComplaintCard key={item.id} complaint={item} isAdmin={true} />
            ))}
          </div>
        </div>

        {/* Recent Events & Registrations */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Managed Campus Events
            </h3>
            <Link to="/admin/events" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              Event Catalog <ArrowRight size={15} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {events.slice(0, 3).map((evt) => (
              <div
                key={evt.id}
                style={{
                  background: '#fff',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                    {evt.title}
                  </h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {evt.date} • {evt.venue}
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    backgroundColor: 'var(--primary-light)',
                    color: 'var(--primary)',
                    padding: '0.25rem 0.6rem',
                    borderRadius: 'var(--radius-full)'
                  }}>
                    {evt.registeredCount} Students
                  </span>
                </div>
              </div>
            ))}

            <Link
              to="/admin/students"
              className="btn btn-secondary"
              style={{ width: '100%', marginTop: '0.5rem', fontSize: '0.85rem' }}
            >
              View Registered Student Directory &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

