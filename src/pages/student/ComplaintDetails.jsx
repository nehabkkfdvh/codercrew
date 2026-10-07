import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  Tag,
  ArrowLeft,
  Send,
  User,
  ShieldCheck,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { complaintService } from '../../services/api';
import { StatusBadge, Loading } from '../../components/CommonComponents';
import { useAuth } from '../../services/AuthContext';

export const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await complaintService.getById(id);
        setComplaint(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setSubmittingComment(true);
    try {
      const updated = await complaintService.addComment(id, {
        author: user?.name || 'Alex Johnson',
        role: user?.role === 'admin' ? 'Admin' : 'Student',
        text: commentText
      });
      setComplaint(updated);
      setCommentText('');
    } catch (err) {
      alert('Failed to post comment.');
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) return <Loading text="Loading complaint details..." />;
  if (!complaint) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h3>Complaint record not found</h3>
        <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ marginTop: '1rem' }}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top back button & id */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <button
          onClick={() => navigate('/complaints')}
          className="btn btn-secondary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <ArrowLeft size={16} /> Back to complaints
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Ticket ID:</span>
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
        gap: '1.5rem',
        alignItems: 'start'
      }}>
        {/* Main Details Card */}
        <div style={{
          background: '#fff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          padding: '1.75rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem', lineHeight: 1.3 }}>
            {complaint.title}
          </h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              backgroundColor: 'var(--bg-subtle)',
              padding: '0.35rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-muted)'
            }}>
              <Tag size={14} />
              {complaint.category}
            </div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              backgroundColor: 'var(--bg-subtle)',
              padding: '0.35rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-muted)'
            }}>
              <MapPin size={14} />
              {complaint.location}
            </div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              backgroundColor: 'var(--bg-subtle)',
              padding: '0.35rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-muted)'
            }}>
              <Calendar size={14} />
              {complaint.createdAt}
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Issue Description
            </h4>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
              {complaint.description}
            </p>
          </div>

          {/* Uploaded Evidence Image */}
          {complaint.image && (
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Attached Media / Photo Proof
              </h4>
              <div style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                maxHeight: '360px',
                border: '1px solid var(--border-color)'
              }}>
                <img
                  src={complaint.image}
                  alt={complaint.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          )}

          {/* Student Reporter Card */}
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <img
              src={complaint.studentAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
              alt="Reporter"
              style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block' }}>
                Reported by {complaint.studentName}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {complaint.department} • Priority: <strong>{complaint.priority}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Timeline & Comments */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Status Timeline */}
          <div style={{
            background: '#fff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.25rem' }}>
              Resolution Timeline
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
              {complaint.timeline?.map((step, idx) => {
                const isLatest = idx === complaint.timeline.length - 1;
                return (
                  <div key={idx} style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}>
                      <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: isLatest ? 'var(--primary)' : '#e2e8f0',
                        color: isLatest ? '#fff' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2
                      }}>
                        {step.status === 'Resolved' ? (
                          <CheckCircle size={15} />
                        ) : step.status === 'In Progress' ? (
                          <Clock size={15} />
                        ) : (
                          <AlertTriangle size={15} />
                        )}
                      </div>
                      {idx !== complaint.timeline.length - 1 && (
                        <div style={{ width: '2px', flex: 1, backgroundColor: '#e2e8f0', marginTop: '4px', marginBottom: '4px' }} />
                      )}
                    </div>

                    <div style={{ paddingBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)' }}>
                          {step.status}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
                          {step.time}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '0.2rem', lineHeight: 1.4 }}>
                        {step.note}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Comments & Discussion */}
          <div style={{
            background: '#fff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem' }}>
              Official Activity & Remarks ({complaint.comments?.length || 0})
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '280px', overflowY: 'auto', marginBottom: '1.25rem' }}>
              {complaint.comments && complaint.comments.length > 0 ? (
                complaint.comments.map((c) => (
                  <div
                    key={c.id}
                    style={{
                      padding: '0.85rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: c.role === 'Admin' ? '#f5f3ff' : 'var(--bg-subtle)',
                      border: `1px solid ${c.role === 'Admin' ? '#ddd6fe' : 'var(--border-light)'}`
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: c.role === 'Admin' ? 'var(--secondary)' : 'var(--text-main)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}>
                        {c.role === 'Admin' && <ShieldCheck size={14} />}
                        {c.author} ({c.role})
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>
                        {c.time}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.4 }}>
                      {c.text}
                    </p>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontStyle: 'italic' }}>
                  No messages posted yet.
                </p>
              )}
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleAddComment} style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a message or status query..."
                style={{
                  flex: 1,
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  outline: 'none',
                  fontSize: '0.85rem'
                }}
              />
              <button
                type="submit"
                disabled={submittingComment || !commentText.trim()}
                className="btn btn-primary"
                style={{ padding: '0.65rem 1rem' }}
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

