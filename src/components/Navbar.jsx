import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bell,
  LogOut,
  User,
  Settings,
  Sparkles,
  Shield,
  GraduationCap,
  Menu,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../services/AuthContext';

export const Navbar = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  const isAdmin = user?.role === 'admin';
  const homeLink = isAdmin ? '/admin' : '/dashboard';

  return (
    <header style={{
      height: 'var(--header-height)',
      backgroundColor: 'white',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.03)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={onToggleSidebar}
          className="btn btn-secondary"
          style={{
            padding: '0.45rem',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title="Toggle Navigation Menu"
        >
          <Menu size={20} />
        </button>

        <Link to={homeLink} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 800,
            boxShadow: '0 4px 10px rgba(79, 70, 229, 0.3)'
          }}>
            <Sparkles size={20} />
          </div>
          <div>
            <span style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #1e293b, #4f46e5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              CampusConnect
            </span>
            <span style={{
              display: 'block',
              fontSize: '0.65rem',
              fontWeight: 600,
              color: 'var(--text-light)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              {isAdmin ? 'Administration Portal' : 'Student Hub'}
            </span>
          </div>
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        
        {/* Notifications Icon (links to /notifications) */}
        <Link
          to="/notifications"
          style={{
            position: 'relative',
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            backgroundColor: 'var(--bg-main)',
            textDecoration: 'none'
          }}
          title="Notifications"
        >
          <Bell size={18} />
          <span style={{
            position: 'absolute',
            top: '7px',
            right: '7px',
            width: '8px',
            height: '8px',
            backgroundColor: 'var(--primary)',
            borderRadius: '50%',
            border: '2px solid white'
          }} />
        </Link>

        {/* User Profile Menu */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.35rem 0.6rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"}
              alt={user?.name || "User"}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--primary-border)'
              }}
            />
            <div style={{ textAlign: 'left', display: 'none', '@media (min-width: 640px)': { display: 'block' } }}>
              <div style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.2 }}>
                {user?.name || 'Alex Johnson'}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {isAdmin ? 'Administrator' : 'Student'}
              </div>
            </div>
            <ChevronDown size={14} color="var(--text-muted)" />
          </button>

          {/* User Dropdown */}
          {dropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '200px',
                backgroundColor: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-xl)',
                border: '1px solid var(--border-color)',
                padding: '0.5rem',
                zIndex: 60,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem'
              }}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link
                to="/profile"
                onClick={() => setDropdownOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.6rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                  textDecoration: 'none',
                  transition: 'background-color 0.15s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-subtle)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <User size={16} /> My Profile
              </Link>

              <Link
                to="/settings"
                onClick={() => setDropdownOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.6rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                  textDecoration: 'none',
                  transition: 'background-color 0.15s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-subtle)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <Settings size={16} /> Settings
              </Link>

              <div style={{ height: '1px', backgroundColor: 'var(--border-light)', margin: '0.25rem 0' }} />

              <button
                type="button"
                onClick={handleLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  width: '100%',
                  padding: '0.6rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--danger)',
                  backgroundColor: 'transparent',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
