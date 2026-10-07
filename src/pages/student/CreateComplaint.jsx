import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, UploadCloud, MapPin, Tag, CheckCircle2, AlertCircle } from 'lucide-react';
import { complaintService } from '../../services/api';
import { complaintCategories } from '../../data/mockData';
import { useAuth } from '../../services/AuthContext';

export const CreateComplaint = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(complaintCategories[0]);
  const [location, setLocation] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [imagePreview, setImagePreview] = useState(
    'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800'
  );
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  // Smart AI Category Suggestion Engine based on keywords
  const triggerAiSuggestion = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('wifi') || lower.includes('internet') || lower.includes('router') || lower.includes('network')) {
      setAiSuggestion({ category: 'Wi-Fi & Network', reason: 'Keywords "wifi/network" detected' });
    } else if (lower.includes('fan') || lower.includes('light') || lower.includes('switch') || lower.includes('socket') || lower.includes('wire')) {
      setAiSuggestion({ category: 'Electrical & Facilities', reason: 'Electrical keywords detected' });
    } else if (lower.includes('water') || lower.includes('leak') || lower.includes('tap') || lower.includes('cooler') || lower.includes('washroom')) {
      setAiSuggestion({ category: 'Sanitation & Water', reason: 'Sanitation or plumbing keywords detected' });
    } else if (lower.includes('desk') || lower.includes('chair') || lower.includes('table') || lower.includes('bench') || lower.includes('podium')) {
      setAiSuggestion({ category: 'Furniture & Maintenance', reason: 'Classroom furniture keywords detected' });
    } else if (lower.includes('food') || lower.includes('canteen') || lower.includes('lunch') || lower.includes('mess')) {
      setAiSuggestion({ category: 'Cafeteria & Food Quality', reason: 'Cafeteria keywords detected' });
    } else {
      setAiSuggestion(null);
    }
  };

  const handleDescriptionChange = (e) => {
    const val = e.target.value;
    setDescription(val);
    triggerAiSuggestion(val + ' ' + title);
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    triggerAiSuggestion(description + ' ' + val);
  };

  const handleApplyAiSuggestion = () => {
    if (aiSuggestion) {
      setCategory(aiSuggestion.category);
      setToast(`Applied AI category: ${aiSuggestion.category}`);
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !location) {
      alert('Please fill out all mandatory fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await complaintService.create({
        studentId: user?.id || 'std-001',
        studentName: user?.name || 'Alex Johnson',
        studentAvatar: user?.avatar,
        department: user?.department || 'Computer Science',
        title,
        description,
        category,
        location,
        priority,
        image: imagePreview
      });

      setToast('Complaint lodged successfully! Redirecting to complaints...');
      setTimeout(() => {
        navigate('/complaints');
      }, 900);
    } catch (err) {
      alert('Failed to submit complaint.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Toast Alert */}
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
          <h1 className="page-title">File a Campus Complaint</h1>
          <p className="page-subtitle">
            Report maintenance issues, broken laboratory instruments, electrical faults, or hygiene concerns
          </p>
        </div>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Title */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              Complaint Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={handleTitleChange}
              placeholder="e.g. Wi-Fi router malfunctioning on 3rd floor CSE Lab"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                outline: 'none',
                fontSize: '0.95rem'
              }}
            />
          </div>

          {/* AI Category Suggestion Banner */}
          {aiSuggestion && (
            <div style={{
              background: 'linear-gradient(135deg, #eef2ff, #f5f3ff)',
              border: '1px solid var(--primary-border)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{
                  background: 'var(--primary)',
                  color: '#fff',
                  padding: '0.35rem',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Sparkles size={16} />
                </div>
                <div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)' }}>
                    AI Recommendation: {aiSuggestion.category}
                  </span>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {aiSuggestion.reason}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleApplyAiSuggestion}
                className="btn btn-outline-primary btn-sm"
              >
                Apply Suggestion
              </button>
            </div>
          )}

          {/* Category & Priority Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                Issue Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  outline: 'none',
                  fontSize: '0.9rem',
                  backgroundColor: '#fff'
                }}
              >
                {complaintCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                Severity / Priority Level
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  outline: 'none',
                  fontSize: '0.9rem',
                  backgroundColor: '#fff'
                }}
              >
                <option value="Low">Low - Minor inconvenience</option>
                <option value="Medium">Medium - Regular classroom/lab issue</option>
                <option value="High">High - Urgent safety or infrastructure failure</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              Specific Campus Location *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Science Block 4, Lab 204 or Girls Hostel Block B, Floor 2"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.4rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  outline: 'none',
                  fontSize: '0.9rem'
                }}
              />
              <MapPin size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              Detailed Description *
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Describe the issue in detail (e.g. what happened, how many students are affected, since when)..."
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                outline: 'none',
                fontSize: '0.9rem',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Image Upload UI */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              Upload Photo of the Issue (Optional)
            </label>

            <div style={{
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              <div style={{
                border: '2px dashed var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                textAlign: 'center',
                flex: 1,
                minWidth: '220px',
                cursor: 'pointer',
                position: 'relative'
              }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0,
                    cursor: 'pointer',
                    width: '100%'
                  }}
                />
                <UploadCloud size={32} style={{ color: 'var(--primary)', margin: '0 auto 0.5rem' }} />
                <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  Click to choose or drop image
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Supports PNG, JPG, WEBP up to 5MB
                </p>
              </div>

              {imagePreview && (
                <div style={{ position: 'relative', width: '130px', height: '110px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                  <img
                    src={imagePreview}
                    alt="Upload preview"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    insetInline: 0,
                    background: 'rgba(0,0,0,0.6)',
                    color: '#fff',
                    fontSize: '0.7rem',
                    textAlign: 'center',
                    padding: '2px'
                  }}>
                    Attached
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Action */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              {isSubmitting ? 'Registering Ticket...' : 'Submit Complaint'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

