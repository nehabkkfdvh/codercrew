import React, { useState, useEffect } from 'react';
import { Bell, CheckCheck, Filter } from 'lucide-react';
import { notificationService } from '../../services/api';
import { NotificationCard } from '../../components/NotificationCard';
import { Loading, EmptyState } from '../../components/CommonComponents';

export const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all' | 'unread' | 'complaints' | 'events'

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await notificationService.getAll();
        setNotifications(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const handleMarkRead = async (id) => {
    const updated = await notificationService.markAsRead(id);
    setNotifications(updated);
  };

  const handleMarkAllRead = async () => {
    const updated = await notificationService.markAllAsRead();
    setNotifications(updated);
  };

  const filtered = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    if (filter === 'complaints') return n.type === 'complaint';
    if (filter === 'events') return n.type === 'event';
    return true;
  });

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Notification Center</h1>
          <p className="page-subtitle">
            Stay notified on complaint workflow updates, college advisories, and event confirmations
          </p>
        </div>

        <button
          onClick={handleMarkAllRead}
          className="btn btn-secondary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <CheckCheck size={16} /> Mark all read
        </button>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1.5rem',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '0.75rem',
        flexWrap: 'wrap'
      }}>
        {[
          { id: 'all', label: 'All Alerts' },
          { id: 'unread', label: 'Unread Only' },
          { id: 'complaints', label: 'Complaints' },
          { id: 'events', label: 'Events' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              backgroundColor: filter === tab.id ? 'var(--primary-light)' : 'transparent',
              color: filter === tab.id ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: filter === tab.id ? 700 : 500,
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <Loading text="Loading notifications..." />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No notifications in this view"
          description="You are completely caught up with campus announcements."
          icon={Bell}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {filtered.map((item) => (
            <NotificationCard
              key={item.id}
              notification={item}
              onMarkRead={handleMarkRead}
            />
          ))}
        </div>
      )}
    </div>
  );
};

