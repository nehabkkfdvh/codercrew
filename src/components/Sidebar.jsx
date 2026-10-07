import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  AlertTriangle,
  FileQuestion,
  PlusCircle,
  Calendar,
  Bell,
  User,
  Settings,
  LogOut,
  ShieldAlert,
  CalendarRange,
  Users,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../services/AuthContext';

export const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === 'admin';

  const handleLogout = () => {
    logout();
    navigate('/');
    if (onClose) onClose();
  };

  const studentLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Report Problem', path: '/report-problem', icon: PlusCircle },
    { name: 'My Complaints', path: '/complaints', icon: FileQuestion },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'Notifications', path: '/notifications', icon: Bell },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const adminLinks = [
    { name: 'Admin Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Manage Complaints', path: '/admin/complaints', icon: ShieldAlert },
    { name: 'Manage Events', path: '/admin/events', icon: CalendarRange },
    { name: 'Create Event', path: '/admin/events/create', icon: PlusCircle },
    { name: 'Registered Students', path: '/admin/students', icon: Users },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const links = isAdmin ? adminLinks : studentLinks;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(2px)',
            zIndex: 40,
            display: 'block'
          }}
        />
      )}

      <aside style={{
        position: 'fixed',
        top: 'var(--header-height)',
        bottom: 0,
        left: 0,
        width: 'var(--sidebar-width)',
        backgroundColor: '#ffffff',
        borderRight: '1px solid var(--border-color)',
        zIndex: 45,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.25rem 1rem',
        transition: 'transform 0.25s ease-in-out',
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        overflowY: 'auto'
      }}>
        <div>
          {/* Active Session Info Pill */}
          <div style={{
            padding: '0.75rem 1rem',
            marginBottom: '1rem',
            borderRadius: 'var(--radius-md)',
            background: isAdmin ? 'linear-gradient(135deg, #f5f3ff, #ede9fe)' : 'linear-gradient(135deg, #eef2ff, #e0e7ff)',
            border: `1px solid ${isAdmin ? '#ddd6fe' : '#c7d2fe'}`,
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: isAdmin ? '#7c3aed' : '#4f46e5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              shrink: 0
            }}>
              <Sparkles size={16} />
            </div>
            <div>
              <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                Active Session
              </div>
              <div style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.2 }}>
                {isAdmin ? 'Staff / Admin' : 'Student Portal'}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <span style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'var(--text-light)',
              letterSpacing: '0.08em',
              padding: '0 0.75rem',
              marginBottom: '0.35rem'
            }}>
              Navigation Menu
            </span>

            {links.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/dashboard' || link.path === '/admin'}
                  onClick={() => {
                    if (window.innerWidth < 1024 && onClose) onClose();
                  }}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.9rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                    backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                    borderLeft: isActive ? '4px solid var(--primary)' : '4px solid transparent',
                    boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                    textDecoration: 'none',
                    transition: 'all 0.15s ease'
                  })}
                >
                  <Icon size={19} />
                  <span>{link.name}</span>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions: Role Switch & Logout */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
          
          {/* Quick Role Switcher for Hackathon Demonstration */}
          <div style={{
            padding: '0.75rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-main)',
            border: '1px solid var(--border-color)',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
              Switch View Mode
            </span>
            <NavLink
              to={isAdmin ? '/dashboard' : '/admin'}
              className="btn btn-secondary btn-sm"
              style={{ width: '100%', fontSize: '0.75rem', padding: '0.4rem 0.5rem' }}
            >
              Switch to {isAdmin ? 'Student' : 'Admin'}
            </NavLink>
          </div>

          {/* Logout Button (Requested: Logout -> /) */}
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              width: '100%',
              padding: '0.65rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #fee2e2',
              backgroundColor: '#fff5f5',
              color: 'var(--danger)',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
