import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Hash,
  BookOpen,
  Calendar,
  Phone,
  Edit2,
  Check,
  CheckCircle2,
  Camera
} from 'lucide-react';
import { useAuth } from '../../services/AuthContext';
import { studentService } from '../../services/api';
import { Loading } from '../../components/CommonComponents';

export const Profile = () => {
  const { user, setUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await studentService.getProfile();
        setProfile(data);
        setFormData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const updated = await studentService.updateProfile(formData);
      setProfile(updated);
      setUser({ ...user, ...updated });
      setIsEditing(false);
      setToast('Profile details updated successfully!');
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      alert('Failed to update profile.');
    }
  };

  if (loading) return <Loading text="Loading profile details..." />;

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
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
          <h1 className="page-title">Student Profile</h1>
          <p className="page-subtitle">
            Manage your official collegiate information, contact details, and preferences
          </p>
        </div>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Edit2 size={16} /> Edit Profile
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => {
                setFormData(profile);
                setIsEditing(false);
              }}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button onClick={handleSave} className="btn btn-primary">
              <Check size={16} /> Save Changes
            </button>
          </div>
        )}
      </div>

      <div style={{
        background: '#fff',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-color)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* Profile Header Banner */}
        <div style={{
          height: '140px',
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
          position: 'relative'
        }} />

        <div style={{ padding: '0 2rem 2rem', position: 'relative' }}>
          {/* Avatar positioning */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginTop: '-60px',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ position: 'relative' }}>
              <img
                src={profile?.avatar || formData.avatar}
                alt={profile?.name}
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '4px solid #fff',
                  boxShadow: 'var(--shadow-md)',
                  backgroundColor: '#fff'
                }}
              />
              {isEditing && (
                <div style={{
                  position: 'absolute',
                  bottom: '6px',
                  right: '6px',
                  backgroundColor: 'var(--primary)',
                  color: '#fff',
                  borderRadius: '50%',
                  padding: '6px',
                  cursor: 'pointer'
                }}>
                  <Camera size={16} />
                </div>
              )}
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'var(--primary-light)',
              color: 'var(--primary)',
              padding: '0.4rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: 700
            }}>
              Active Student Status
            </div>
          </div>

          {!isEditing ? (
            /* View Mode */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {profile?.name}
                </h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                  {profile?.bio || 'Campus student and active learner'}
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.25rem',
                borderTop: '1px solid var(--border-light)',
                paddingTop: '1.5rem'
              }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{ background: 'var(--bg-subtle)', padding: '0.6rem', borderRadius: 'var(--radius-md)', color: 'var(--primary)' }}>
                    <Hash size={18} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', display: 'block' }}>College ID / Roll</span>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>{profile?.collegeId}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{ background: 'var(--bg-subtle)', padding: '0.6rem', borderRadius: 'var(--radius-md)', color: 'var(--secondary)' }}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', display: 'block' }}>Official Email</span>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>{profile?.email}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{ background: 'var(--bg-subtle)', padding: '0.6rem', borderRadius: 'var(--radius-md)', color: '#06b6d4' }}>
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', display: 'block' }}>Department</span>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>{profile?.department}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{ background: 'var(--bg-subtle)', padding: '0.6rem', borderRadius: 'var(--radius-md)', color: '#10b981' }}>
                    <Calendar size={18} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', display: 'block' }}>Current Semester</span>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>{profile?.semester}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{ background: 'var(--bg-subtle)', padding: '0.6rem', borderRadius: 'var(--radius-md)', color: '#f59e0b' }}>
                    <Phone size={18} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', display: 'block' }}>Phone Contact</span>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>{profile?.phone}</strong>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Edit Mode */
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>College Roll No</label>
                  <input
                    type="text"
                    name="collegeId"
                    value={formData.collegeId || ''}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Academic Department</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department || ''}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Current Semester</label>
                  <input
                    type="text"
                    name="semester"
                    value={formData.semester || ''}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Contact Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Short Bio</label>
                <textarea
                  rows={3}
                  name="bio"
                  value={formData.bio || ''}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none' }}
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

