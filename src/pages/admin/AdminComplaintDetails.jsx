import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Tag,
  ShieldCheck,
  Send,
  CheckCircle,
  Clock,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { complaintService } from '../../services/api';
import { StatusBadge, Loading } from '../../components/CommonComponents';

export const AdminComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('Pending');
  const [statusNote, setStatusNote] = useState('');
  const [adminComment, setAdminComment] = useState('');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await complaintService.getById(id);
        setComplaint(data);
        setSelectedStatus(data.status);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    try {
      const updated = await complaintService.updateStatus(
        id,
        selectedStatus,
        statusNote || `Status updated to ${selectedStatus} by Campus Admin Office.`
      );
      setComplaint(updated);
      setStatusNote('');
      setToast(`Status updated to ${selectedStatus}!`);
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  const handlePostAdminComment = async (e) => {
    e.preventDefault();
    if (!adminComment.trim()) return;

    try {
      const updated = await complaintService.addComment(id, {
        author: 'Campus Operations Admin',
        role: 'Admin',
        text: adminComment
      });
      setComplaint(updated);
      setAdminComment('');
      setToast('Official remark posted.');
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      alert('Failed to post remark.');
    }
  };

  if (loading) return <Loading text="Loading ticket details..." />;
  if (!complaint) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h3>Complaint not found</h3>
        <button onClick={() => navigate('/admin/complaints')} className="btn btn-secondary">
          Back to List
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

      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <button
          onClick={() => navigate('/admin/complaints')}
          className="btn btn-secondary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <ArrowLeft size={16} /> Back to Complaints List
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Ticket:</span>
          <span style={{
            fontSize: '0.85rem',
            fontWeight: 800,
            fontFamily: 'monospace',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            padding: '0.2rem 0.6rem',
            borderRadius: 'var(--radius-sm)'
          }}>
            {complaint.id}
          </span>
          <StatusBadge status={complaint.status} />
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.75rem',
        alignItems: 'start'
      }}>
        {/* Left: Complaint Information */}
        <div style={{
          background: '#fff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          padding: '1.75rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
            {complaint.title}
          </h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
            <span style={{ backgroundColor: 'var(--bg-subtle)', padding: '0.35rem 0.65rem', borderRadius: 'var(--radius-sm)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)' }}>
              <Tag size={14} /> {complaint.category}
            </span>
            <span style={{ backgroundColor: 'var(--bg-subtle)', padding: '0.35rem 0.65rem', borderRadius: 'var(--radius-sm)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)' }}>
              <MapPin size={14} /> {complaint.location}
            </span>
            <span style={{ backgroundColor: 'var(--bg-subtle)', padding: '0.35rem 0.65rem', borderRadius: 'var(--radius-sm)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)' }}>
              <Calendar size={14} /> {complaint.createdAt}
            </span>
          </div>

          <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Student Statement & Evidence
            </h4>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
              {complaint.description}
            </p>
          </div>

          {complaint.image && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Attached Photograph
              </h4>
              <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)', maxHeight: '350px' }}>
                <img src={complaint.image} alt={complaint.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          )}

          {/* Student Profile Info */}
          <div style={{
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <img
              src={complaint.studentAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
              alt={complaint.studentName}
              style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block' }}>
                Student: {complaint.studentName}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {complaint.department} • Priority Tag: <strong>{complaint.priority}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Admin Action Console & History */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Admin Workflow Control */}
          <div style={{
            background: '#fff',
            borderRadius: 'var(--radius-lg)',
            border: '2px solid var(--secondary)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-md)'
          }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={20} style={{ color: 'var(--secondary)' }} />
              Admin Status Control
            </h3>

            <form onSubmit={handleUpdateStatus} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Update Current Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    backgroundColor: '#fff',
                    fontWeight: 600
                  }}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Action / Dispatch Reason (Appended to Timeline)
                </label>
                <input
                  type="text"
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  placeholder="e.g. Electrician assigned. Repair scheduled for 2 PM."
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', background: 'var(--secondary)' }}>
                Apply Status Change
              </button>
            </form>
          </div>

          {/* Timeline History */}
          <div style={{
            background: '#fff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
              Resolution Audit Trail
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {complaint.timeline?.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '0.75rem' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-muted)'
                  }}>
                    {step.status === 'Resolved' ? <CheckCircle size={14} /> : <Clock size={14} />}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                      {step.status} <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 400 }}>• {step.time}</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {step.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admin Internal Discussion */}
          <div style={{
            background: '#fff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Official Comments & Notes
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '200px', overflowY: 'auto', marginBottom: '1rem' }}>
              {complaint.comments?.map((c) => (
                <div key={c.id} style={{ background: 'var(--bg-subtle)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                    <strong>{c.author}</strong>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>{c.time}</span>
                  </div>
                  <p>{c.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handlePostAdminComment} style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={adminComment}
                onChange={(e) => setAdminComment(e.target.value)}
                placeholder="Add official administrative comment..."
                style={{
                  flex: 1,
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
              <button type="submit" disabled={!adminComment.trim()} className="btn btn-primary btn-sm">
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

