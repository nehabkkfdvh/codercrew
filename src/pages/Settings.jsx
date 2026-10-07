import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Settings as SettingsIcon,
  Bell,
  Lock,
  Eye,
  Shield,
  Save,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Moon,
  Laptop
} from 'lucide-react';
import { useAuth } from '../services/AuthContext';

export const Settings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [notificationSettings, setNotificationSettings] = useState({
    statusChangeAlerts: true,
    eventReminders: true,
    campusBroadcasts: true,
    emailDigest: false
  });

  const [privacySettings, setPrivacySettings] = useState({
    anonymousByDefault: false,
    showRollInDiscussions: true
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const [toast, setToast] = useState(null);
  const [passwordError, setPasswordError] = useState('');

  const handleToggleNotification = (key) => {
    setNotificationSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTogglePrivacy = (key) => {
    setPrivacySettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!passwordForm.newPassword || passwordForm.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }
    setPasswordError('');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    setToast('Security password updated successfully!');
    setTimeout(() => setToast(null), 3000);
  };

  const handleSavePreferences = () => {
    setToast('Preferences saved successfully!');
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
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

      {/* Header */}
      <div className="page-header" style={{ marginBottom: '0.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <Link
              to="/dashboard"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.825rem',
                fontWeight: 600,
                color: 'var(--primary)',
                textDecoration: 'none'
              }}
            >
              <ArrowLeft size={14} /> Back to Dashboard
            </Link>
          </div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <SettingsIcon size={26} color="var(--primary)" />
            Account & System Settings
          </h1>
          <p className="page-subtitle">
            Manage your notifications, security credentials, and grievance preferences
          </p>
        </div>

        <button
          onClick={handleSavePreferences}
          className="btn btn-primary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <Save size={16} /> Save Changes
        </button>
      </div>

      {/* 1. Notification Preferences Card */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Bell size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Notification Alerts
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Choose how you want to be alerted on campus developments
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            {
              id: 'statusChangeAlerts',
              title: 'Complaint Status Updates',
              desc: 'Receive alerts when your problem moves from Pending to In Progress or Resolved.'
            },
            {
              id: 'eventReminders',
              title: 'Event & Hackathon Reminders',
              desc: 'Get notified 24 hours before events for which you hold entry passes.'
            },
            {
              id: 'campusBroadcasts',
              title: 'Emergency Campus Broadcasts',
              desc: 'Urgent announcements regarding power outages, water cuts, or exam schedules.'
            },
            {
              id: 'emailDigest',
              title: 'Weekly Campus Digest Email',
              desc: 'A weekly summary of campus complaints resolved and newly announced fests.'
            }
          ].map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 0',
                borderBottom: '1px solid var(--border-light)'
              }}
            >
              <div>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  {item.title}
                </p>
                <p style={{ fontSize: '0.785rem', color: 'var(--text-muted)' }}>
                  {item.desc}
                </p>
              </div>

              <input
                type="checkbox"
                checked={notificationSettings[item.id]}
                onChange={() => handleToggleNotification(item.id)}
                style={{
                  width: '18px',
                  height: '18px',
                  accentColor: 'var(--primary)',
                  cursor: 'pointer'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 2. Grievance & Privacy Settings */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: '#f5f3ff',
            color: 'var(--secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Shield size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Grievance Privacy & Security
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Control your identity visibility when reporting campus defects
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 0',
            borderBottom: '1px solid var(--border-light)'
          }}>
            <div>
              <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>
                Default to Anonymous Reporting
              </p>
              <p style={{ fontSize: '0.785rem', color: 'var(--text-muted)' }}>
                Automatically hide your name and roll number when creating new complaints.
              </p>
            </div>
            <input
              type="checkbox"
              checked={privacySettings.anonymousByDefault}
              onChange={() => handleTogglePrivacy('anonymousByDefault')}
              style={{ width: '18px', height: '18px', accentColor: 'var(--primary)', cursor: 'pointer' }}
            />
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 0'
          }}>
            <div>
              <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>
                Show Student Roll ID in Discussion Threads
              </p>
              <p style={{ fontSize: '0.785rem', color: 'var(--text-muted)' }}>
                Allow fellow hostelers and students to see your department verification badge.
              </p>
            </div>
            <input
              type="checkbox"
              checked={privacySettings.showRollInDiscussions}
              onChange={() => handleTogglePrivacy('showRollInDiscussions')}
              style={{ width: '18px', height: '18px', accentColor: 'var(--primary)', cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>

      {/* 3. Password & Security Form */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Lock size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Update Security Password
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Change your portal authentication credentials
            </p>
          </div>
        </div>

        {passwordError && (
          <div style={{
            padding: '0.65rem 0.85rem',
            backgroundColor: '#fee2e2',
            border: '1px solid #fca5a5',
            borderRadius: 'var(--radius-sm)',
            color: '#b91c1c',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            marginBottom: '1rem'
          }}>
            <AlertCircle size={15} />
            <span>{passwordError}</span>
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                Current Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                New Password
              </label>
              <input
                type="password"
                placeholder="At least 6 characters"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Repeat new password"
                value={passwordForm.confirmNewPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmNewPassword: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
            <button type="submit" className="btn btn-secondary btn-sm">
              Update Password
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

