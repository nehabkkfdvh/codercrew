import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Frontend Validation
  const validateForm = () => {
    const errs = {};
    const { fullName, email, phoneNumber, password, confirmPassword } = formData;

    if (!fullName.trim()) {
      errs.fullName = 'Full Name is required.';
    } else if (fullName.trim().length < 2) {
      errs.fullName = 'Full Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!emailRegex.test(email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    // Phone number validation: digits with optional +, length between 10 and 15
    const cleanPhone = phoneNumber.replace(/[\s-]/g, '');
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!phoneNumber.trim()) {
      errs.phoneNumber = 'Phone number is required.';
    } else if (!phoneRegex.test(cleanPhone)) {
      errs.phoneNumber = 'Enter a valid phone number (at least 10 digits).';
    }

    if (!password) {
      errs.password = 'Password is required.';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }

    if (!confirmPassword) {
      errs.confirmPassword = 'Confirm your password.';
    } else if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    // Pure frontend simulation (Do NOT connect to backend / Do NOT store sensitive info)
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg('Account registered successfully! Redirecting...');

      if (register) {
        register({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phoneNumber
        });
      }

      setTimeout(() => {
        // Smooth navigation to student dashboard
        navigate('/dashboard');
      }, 600);
    }, 450);
  };

  const handleDemoFill = () => {
    setFormData({
      fullName: 'Jordan Miller',
      email: 'jordan.miller@campus.edu',
      phoneNumber: '9876543210',
      password: 'password123',
      confirmPassword: 'password123'
    });
    setErrors({});
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
        maxWidth: '500px',
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-xl)',
        border: '1px solid var(--border-color)',
        padding: '2.5rem 2rem',
        position: 'relative'
      }}>
        
        {/* Back to Home Link */}
        <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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

          <button
            type="button"
            onClick={handleDemoFill}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary)',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            ✨ Quick Auto-Fill
          </button>
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
            Create Student Account
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Join CampusConnect to report issues and explore events
          </p>
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

        {/* Registration Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.05rem' }}>
          
          {/* Full Name */}
          <div>
            <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              Full Name *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Jordan Miller"
                style={{
                  width: '100%',
                  padding: '0.72rem 1rem 0.72rem 2.4rem',
                  borderRadius: 'var(--radius-md)',
                  border: errors.fullName ? '1px solid #ef4444' : '1px solid var(--border-color)',
                  outline: 'none',
                  fontSize: '0.875rem',
                  backgroundColor: '#ffffff'
                }}
              />
              <User size={15} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
            </div>
            {errors.fullName && (
              <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <AlertCircle size={12} /> {errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              College Email *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jordan.miller@campus.edu"
                style={{
                  width: '100%',
                  padding: '0.72rem 1rem 0.72rem 2.4rem',
                  borderRadius: 'var(--radius-md)',
                  border: errors.email ? '1px solid #ef4444' : '1px solid var(--border-color)',
                  outline: 'none',
                  fontSize: '0.875rem',
                  backgroundColor: '#ffffff'
                }}
              />
              <Mail size={15} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
            </div>
            {errors.email && (
              <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <AlertCircle size={12} /> {errors.email}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              Phone Number *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="e.g. +91 98765 43210"
                style={{
                  width: '100%',
                  padding: '0.72rem 1rem 0.72rem 2.4rem',
                  borderRadius: 'var(--radius-md)',
                  border: errors.phoneNumber ? '1px solid #ef4444' : '1px solid var(--border-color)',
                  outline: 'none',
                  fontSize: '0.875rem',
                  backgroundColor: '#ffffff'
                }}
              />
              <Phone size={15} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
            </div>
            {errors.phoneNumber && (
              <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <AlertCircle size={12} /> {errors.phoneNumber}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              Password *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                style={{
                  width: '100%',
                  padding: '0.72rem 2.6rem 0.72rem 2.4rem',
                  borderRadius: 'var(--radius-md)',
                  border: errors.password ? '1px solid #ef4444' : '1px solid var(--border-color)',
                  outline: 'none',
                  fontSize: '0.875rem',
                  backgroundColor: '#ffffff'
                }}
              />
              <Lock size={15} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
              
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
                  padding: '0.2rem',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {errors.password && (
              <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <AlertCircle size={12} /> {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              Confirm Password *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                style={{
                  width: '100%',
                  padding: '0.72rem 2.6rem 0.72rem 2.4rem',
                  borderRadius: 'var(--radius-md)',
                  border: errors.confirmPassword ? '1px solid #ef4444' : '1px solid var(--border-color)',
                  outline: 'none',
                  fontSize: '0.875rem',
                  backgroundColor: '#ffffff'
                }}
              />
              <Lock size={15} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
              
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-light)',
                  cursor: 'pointer',
                  padding: '0.2rem',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <AlertCircle size={12} /> {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.85rem', marginTop: '0.4rem', fontSize: '0.95rem' }}
            disabled={loading}
          >
            {loading ? 'Creating Student Profile...' : 'Register'}
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Already have an account link */}
        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>
            Login
          </Link>
        </div>

      </div>
    </div>
  );
};
