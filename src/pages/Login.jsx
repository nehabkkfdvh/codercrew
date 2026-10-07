import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import {
  GraduationCap,
  ShieldCheck,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export const Login = () => {
  const [role, setRole] = useState('student'); // 'student' | 'admin'
  const [identifier, setIdentifier] = useState('alex.johnson@campus.edu');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setErrors({});
    if (newRole === 'admin') {
      setIdentifier('admin@campus.edu');
    } else {
      setIdentifier('alex.johnson@campus.edu');
    }
  };

  // Frontend Form Validation (no backend connection)
  const validateForm = () => {
    const errs = {};
    const trimmedId = identifier.trim();

    if (!trimmedId) {
      errs.identifier = 'Email or Username is required.';
    } else if (trimmedId.includes('@')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedId)) {
        errs.identifier = 'Please enter a valid email address.';
      }
    } else if (trimmedId.length < 3) {
      errs.identifier = 'Username must be at least 3 characters long.';
    }

    if (!password) {
      errs.password = 'Password is required.';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    // Demo frontend navigation without backend connection
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg(`Welcome! Logged in as demo ${role === 'admin' ? 'Administrator' : 'Student'}.`);
      
      if (login) {
        login(role, { email: identifier.includes('@') ? identifier : `${identifier}@campus.edu` });
      }

      setTimeout(() => {
        if (role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }, 450);
    }, 400);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8fafc',
      padding: '2rem 1.5rem',
      background: 'radial-gradient(circle at 15% 20%, #e0e7ff 0%, #f8fafc 40%), radial-gradient(circle at 85% 80%, #ede9fe 0%, #f8fafc 40%)'
    }}>
      <div style={{
        maxWidth: '460px',
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-xl)',
        border: '1px solid var(--border-color)',
        padding: '2.5rem 2rem',
        position: 'relative'
      }}>
        
        {/* Back to Home Link */}
        <div style={{ marginBottom: '1.25rem' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.825rem',
              fontWeight: 700,
              color: 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.75rem',
            boxShadow: '0 8px 16px rgba(79, 70, 229, 0.25)'
          }}>
            <Sparkles size={26} />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.025em' }}>
            Welcome Back
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Sign in to CampusConnect Problem & Event Portal
          </p>
        </div>

        {/* Role Toggle Switch (Student vs Admin Demo) */}
        <div style={{
          display: 'flex',
          backgroundColor: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '0.3rem',
          marginBottom: '1.5rem',
          gap: '0.25rem'
        }}>
          <button
            type="button"
            onClick={() => handleRoleChange('student')}
            style={{
              flex: 1,
              padding: '0.6rem 0.5rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: role === 'student' ? '#ffffff' : 'transparent',
              color: role === 'student' ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              boxShadow: role === 'student' ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <GraduationCap size={16} />
            Student Login
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange('admin')}
            style={{
              flex: 1,
              padding: '0.6rem 0.5rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: role === 'admin' ? '#ffffff' : 'transparent',
              color: role === 'admin' ? 'var(--secondary)' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              boxShadow: role === 'admin' ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <ShieldCheck size={16} />
            Admin Login
          </button>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div style={{
            padding: '0.75rem 1rem',
            backgroundColor: '#dcfce7',
            border: '1px solid #bbf7d0',
            borderRadius: 'var(--radius-md)',
            color: '#15803d',
            fontSize: '0.825rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.25rem'
          }}>
            <CheckCircle2 size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
          
          {/* Email or Username Input */}
          <div>
            <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              Email or Username
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  if (errors.identifier) setErrors({ ...errors, identifier: '' });
                }}
                placeholder="you@campus.edu or username"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.5rem',
                  borderRadius: 'var(--radius-md)',
                  border: errors.identifier ? '1px solid #ef4444' : '1px solid var(--border-color)',
                  outline: 'none',
                  fontSize: '0.9rem',
                  backgroundColor: '#ffffff'
                }}
              />
              <Mail size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
            </div>
            {errors.identifier && (
              <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <AlertCircle size={12} /> {errors.identifier}
              </p>
            )}
          </div>

          {/* Password Input with Show/Hide Toggle */}
          <div>
            <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: '' });
                }}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '0.75rem 2.75rem 0.75rem 2.5rem',
                  borderRadius: 'var(--radius-md)',
                  border: errors.password ? '1px solid #ef4444' : '1px solid var(--border-color)',
                  outline: 'none',
                  fontSize: '0.9rem',
                  backgroundColor: '#ffffff'
                }}
              />
              <Lock size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
              
              {/* Show / Hide Password Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-light)',
                  cursor: 'pointer',
                  padding: '0.25rem',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <AlertCircle size={12} /> {errors.password}
              </p>
            )}
          </div>

          {/* Remember Me & Help */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.8rem',
            color: 'var(--text-muted)'
          }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked />
              Remember me
            </label>
            <span
              onClick={() => alert('Demo Note: For hackathon review, any credentials or the prefilled values work!')}
              style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}
            >
              Forgot password?
            </span>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.85rem', marginTop: '0.35rem', fontSize: '0.95rem' }}
            disabled={loading}
          >
            {loading ? 'Authenticating...' : `Sign In as ${role === 'admin' ? 'Administrator' : 'Student'}`}
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Link to Register */}
        <div style={{ marginTop: '1.75rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>
            Register
          </Link>
        </div>

        {/* Hackathon demo note */}
        <div style={{
          marginTop: '1.5rem',
          padding: '0.75rem',
          borderRadius: 'var(--radius-sm)',
          backgroundColor: 'var(--bg-subtle)',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          textAlign: 'center'
        }}>
          💡 <strong>Hackathon Demo Note:</strong> Pre-filled credentials allow instant one-click login testing.
        </div>

      </div>
    </div>
  );
};
