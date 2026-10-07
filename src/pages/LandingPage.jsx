import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  AlertTriangle,
  Clock,
  Wrench,
  CheckCircle2,
  ThumbsUp,
  MapPin,
  Lock,
  ChevronRight,
  Menu,
  X,
  Users,
  GraduationCap,
  Zap,
  Check,
  HelpCircle,
  ExternalLink,
  Laptop
} from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const features = [
    {
      icon: AlertTriangle,
      color: '#4f46e5',
      bgColor: '#eef2ff',
      title: 'Swift Problem Reporting',
      description: 'Report Wi-Fi issues, broken lab equipment, or hostel maintenance in under 60 seconds with location tagging and photo evidence.'
    },
    {
      icon: Clock,
      color: '#0284c7',
      bgColor: '#e0f2fe',
      title: 'Transparent 3-Stage Stepper',
      description: 'Watch your complaint visibly advance from Pending → In Progress → Resolved. No more wondering if anyone received your ticket.'
    },
    {
      icon: Calendar,
      color: '#7c3aed',
      bgColor: '#f5f3ff',
      title: 'Campus Events & Hackathons',
      description: 'Discover workshops, hackathons, and cultural fests. Reserve seats with 1-click and receive verified digital entry passes.'
    },
    {
      icon: ThumbsUp,
      color: '#16a34a',
      bgColor: '#dcfce7',
      title: 'Community Upvoting',
      description: 'Students experiencing the same problem can upvote issues. Higher vote counts dynamically escalate priority for administrative action.'
    },
    {
      icon: Lock,
      color: '#ea580c',
      bgColor: '#ffedd5',
      title: 'Anonymous Safety Reporting',
      description: 'Optionally conceal your student identity when reporting sensitive issues, protecting privacy while resolving concerns.'
    },
    {
      icon: ShieldCheck,
      color: '#dc2626',
      bgColor: '#fee2e2',
      title: 'Admin Operations Control',
      description: 'Dedicated administrative triage console for campus engineers, hostel wardens, and departmental coordinators.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Log Problem or Discover Event',
      desc: 'Submit maintenance defects with photos or browse upcoming university symposiums and guest lectures.'
    },
    {
      number: '02',
      title: 'Live Tracking & Crew Dispatch',
      desc: 'Campus administration reviews tickets, assigns work orders to technicians, and provides real-time progress remarks.'
    },
    {
      number: '03',
      title: 'Verified Resolution',
      desc: 'Receive immediate status updates once repairs are inspected. Confirm resolution and rate service quality.'
    }
  ];

  const faqs = [
    {
      q: 'Who can access the CampusConnect platform?',
      a: 'All verified university students, research scholars, teaching faculty, and facility maintenance administrators have dedicated role-based access.'
    },
    {
      q: 'Can I report problems anonymously?',
      a: 'Yes! When filing a complaint, simply toggle the "File Anonymously" option. Your name and roll number will be completely hidden from public view.'
    },
    {
      q: 'How does event registration work?',
      a: 'Browse the Events directory, select any workshop or hackathon, and click "Register Now". You immediately get a digital pass with QR verification.'
    },
    {
      q: 'How does the complaint status timeline work?',
      a: 'Every ticket features a live 3-stage progression (Pending ➔ In Progress ➔ Resolved) with timestamps and administrative inspection notes.'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', overflowX: 'hidden' }}>
      
      {/* Top Navigation Bar */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border-color)',
        transition: 'all 0.2s ease'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '72px'
        }}>
          
          {/* Logo & Project Title */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
            }}>
              <GraduationCap size={24} />
            </div>
            <div>
              <span style={{
                fontSize: '1.35rem',
                fontWeight: 800,
                letterSpacing: '-0.025em',
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Campus<span style={{ color: 'var(--text-main)', WebkitTextFillColor: 'var(--text-main)' }}>Connect</span>
              </span>
              <span style={{
                display: 'block',
                fontSize: '0.65rem',
                fontWeight: 700,
                color: 'var(--text-muted)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginTop: '-2px'
              }}>
                College Problem & Event Hub
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.75rem'
          }} className="desktop-nav-links">
            <a href="#features" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
              Features
            </a>
            <a href="#how-it-works" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
              How It Works
            </a>
            <a href="#impact" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
              Impact
            </a>
            <a href="#faq" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
              FAQ
            </a>
          </div>

          {/* Action Buttons: Login & Register */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="desktop-nav-buttons">
            <Link
              to="/login"
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn btn-primary btn-sm"
              style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}
            >
              Register
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-main)',
              padding: '0.5rem'
            }}
            className="mobile-hamburger"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div style={{
            backgroundColor: '#ffffff',
            borderTop: '1px solid var(--border-color)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}
            >
              How It Works
            </a>
            <a
              href="#impact"
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}
            >
              Impact
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}
            >
              FAQ
            </a>
            <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-secondary"
                style={{ flex: 1, textAlign: 'center', justifyContent: 'center' }}
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary"
                style={{ flex: 1, textAlign: 'center', justifyContent: 'center' }}
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        padding: '5rem 0 4rem',
        background: 'radial-gradient(circle at 10% 20%, #e0e7ff 0%, #f8fafc 40%), radial-gradient(circle at 90% 80%, #ede9fe 0%, #f8fafc 50%)',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            
            {/* Top Hackathon Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#ffffff',
              padding: '0.4rem 1rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--primary-border)',
              boxShadow: 'var(--shadow-sm)',
              fontSize: '0.825rem',
              fontWeight: 700,
              color: 'var(--primary)',
              marginBottom: '1.5rem'
            }}>
              <Sparkles size={16} />
              <span>College Hackathon 2026 Project • CampusConnect</span>
            </div>

            {/* Main Headline */}
            <h1 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.75rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              color: 'var(--text-main)',
              marginBottom: '1.25rem'
            }}>
              College Problem Reporting &{' '}
              <span style={{
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Event Management
              </span>{' '}
              Platform
            </h1>

            {/* Short Tagline */}
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              maxWidth: '680px',
              margin: '0 auto 2.25rem'
            }}>
              Empowering students to report campus facility defects with real-time visual tracking, and discover, register, and experience vibrant college events without bureaucratic delays.
            </p>

            {/* CTAs: "Get Started", "Login", "Register" */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '3rem'
            }}>
              <Link
                to="/login"
                className="btn btn-primary"
                style={{
                  padding: '0.85rem 1.75rem',
                  fontSize: '1rem',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <span>Get Started</span>
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/login"
                className="btn btn-secondary"
                style={{
                  padding: '0.85rem 1.5rem',
                  fontSize: '1rem',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <span>Login</span>
              </Link>

              <Link
                to="/register"
                className="btn btn-outline-primary"
                style={{
                  padding: '0.85rem 1.5rem',
                  fontSize: '1rem',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <span>Register</span>
              </Link>
            </div>

            {/* Trust Checklist */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
              fontSize: '0.825rem',
              color: 'var(--text-muted)',
              flexWrap: 'wrap'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Check size={16} color="var(--primary)" /> 100% Transparent Tracking
              </span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Check size={16} color="var(--primary)" /> Instant Ticket Tokens
              </span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Check size={16} color="var(--primary)" /> Digital Event Passes
              </span>
            </div>

          </div>

          {/* Interactive Hero Visual Showcase Card */}
          <div style={{
            maxWidth: '920px',
            margin: '3rem auto 0',
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-color)',
            boxShadow: '0 25px 50px -12px rgba(79, 70, 229, 0.15)',
            padding: '2rem',
            position: 'relative'
          }}>
            {/* Top Window Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '1rem',
              marginBottom: '1.5rem',
              borderBottom: '1px solid var(--border-light)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444', display: 'inline-block' }}></span>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f59e0b', display: 'inline-block' }}></span>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }}></span>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                  Live Campus Dashboard Preview
                </span>
              </div>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--primary)',
                backgroundColor: 'var(--primary-light)',
                padding: '0.2rem 0.65rem',
                borderRadius: 'var(--radius-full)'
              }}>
                Real-Time Sync Active
              </span>
            </div>

            {/* Split Preview Grid: Live Complaint Card + Live Event Card */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              
              {/* Card 1: Sample Problem Report with Stepper */}
              <div style={{
                backgroundColor: 'var(--bg-main)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span className="badge badge-inprogress">
                    In Progress
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                    #CC-1024
                  </span>
                </div>

                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                  High-Speed Wi-Fi Disruption in Block B Hostel
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
                  Wing B primary access point blinking red. Maintenance technician dispatched with replacement router.
                </p>

                {/* Status Stepper Preview */}
                <div style={{
                  backgroundColor: '#ffffff',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#16a34a' }}>
                      <CheckCircle2 size={14} /> <span>1. Pending</span>
                    </div>
                    <span style={{ color: 'var(--border-color)' }}>➔</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#0284c7' }}>
                      <Wrench size={14} /> <span>2. In Progress</span>
                    </div>
                    <span style={{ color: 'var(--border-color)' }}>➔</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-light)' }}>
                      <CheckCircle2 size={14} /> <span>3. Resolved</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <MapPin size={14} color="var(--primary)" /> Kaveri Hostel, 3rd Floor
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--primary)' }}>
                    👍 24 Upvotes
                  </span>
                </div>
              </div>

              {/* Card 2: Featured Event Preview */}
              <div style={{
                backgroundColor: 'var(--bg-main)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#7c3aed',
                    backgroundColor: '#f5f3ff',
                    padding: '0.2rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid #ddd6fe'
                  }}>
                    Featured Hackathon
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16a34a' }}>
                    Free Registration
                  </span>
                </div>

                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                  HackCampus 2026: 36-Hour National Hackathon
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
                  Over 500+ participants competing for ₹1,50,000 cash prizes and internship tracks.
                </p>

                <div style={{
                  backgroundColor: '#ffffff',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  marginBottom: '1rem',
                  fontSize: '0.775rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-main)' }}>
                    <Calendar size={14} color="var(--secondary)" />
                    <strong>October 24 - 25, 2026</strong>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)' }}>
                    <Clock size={14} color="var(--secondary)" />
                    <span>09:00 AM - 09:00 PM (IST)</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Seats remaining: <strong>52 / 400</strong>
                  </span>
                  <Link
                    to="/register"
                    className="btn btn-primary btn-sm"
                    style={{ fontSize: '0.75rem', padding: '0.35rem 0.85rem' }}
                  >
                    Claim Pass
                  </Link>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Metrics / Impact Ribbon */}
      <section id="impact" style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        padding: '3rem 0'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            textAlign: 'center'
          }}>
            <div>
              <p style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.03em' }}>
                24h
              </p>
              <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                Average Resolution SLA
              </p>
              <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                For high urgency campus issues
              </p>
            </div>

            <div>
              <p style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0284c7', letterSpacing: '-0.03em' }}>
                100%
              </p>
              <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                Transparent Tracking
              </p>
              <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                Zero hidden bureaucracy
              </p>
            </div>

            <div>
              <p style={{ fontSize: '2.5rem', fontWeight: 800, color: '#7c3aed', letterSpacing: '-0.03em' }}>
                50+
              </p>
              <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                Campus Events & Hackathons
              </p>
              <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                Active registrations supported
              </p>
            </div>

            <div>
              <p style={{ fontSize: '2.5rem', fontWeight: 800, color: '#16a34a', letterSpacing: '-0.03em' }}>
                5,000+
              </p>
              <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                Students & Faculty
              </p>
              <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                Connected across campus blocks
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Explanatory Cards Section */}
      <section id="features" style={{ padding: '5.5rem 0', backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3.5rem' }}>
            <span style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.075em',
              color: 'var(--primary)',
              backgroundColor: 'var(--primary-light)',
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius-full)'
            }}>
              Core Platform Capabilities
            </span>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              color: 'var(--text-main)',
              marginTop: '0.75rem'
            }}>
              Engineered For Modern Universities
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Everything students, staff, and administration need to maintain high-quality facilities and vibrant collegiate culture.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem'
          }}>
            {features.map((feat, index) => {
              const Icon = feat.icon;
              return (
                <div
                  key={index}
                  className="card"
                  style={{
                    padding: '2rem',
                    borderRadius: 'var(--radius-xl)',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
                    e.currentTarget.style.borderColor = 'var(--primary-border)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                  }}
                >
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: feat.bgColor,
                    color: feat.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem'
                  }}>
                    <Icon size={26} />
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
                    {feat.title}
                  </h3>

                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* How It Works (3 Steps) */}
      <section id="how-it-works" style={{
        padding: '5.5rem 0',
        backgroundColor: '#ffffff',
        borderTop: '1px solid var(--border-color)'
      }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3.5rem' }}>
            <span style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.075em',
              color: 'var(--secondary)',
              backgroundColor: 'var(--secondary-light)',
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius-full)'
            }}>
              Simple & Transparent
            </span>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              color: 'var(--text-main)',
              marginTop: '0.75rem'
            }}>
              How CampusConnect Works
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Resolving campus grievances in 3 frictionless stages without physical paperwork.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {steps.map((st, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--bg-main)',
                  padding: '2.25rem 1.75rem',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-color)',
                  position: 'relative'
                }}
              >
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 900,
                  color: 'var(--primary)',
                  opacity: 0.8,
                  marginBottom: '1rem',
                  fontFamily: 'monospace'
                }}>
                  {st.number}
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  {st.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {st.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" style={{ padding: '5rem 0', backgroundColor: 'var(--bg-main)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.075em',
              color: 'var(--primary)',
              backgroundColor: 'var(--primary-light)',
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius-full)'
            }}>
              Got Questions?
            </span>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: 'var(--text-main)',
              marginTop: '0.75rem'
            }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-color)',
                  overflow: 'hidden'
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    color: 'var(--text-main)',
                    cursor: 'pointer'
                  }}
                >
                  <span>{faq.q}</span>
                  <span style={{ color: 'var(--primary)', fontSize: '1.2rem', fontWeight: 700 }}>
                    {activeFaq === idx ? '−' : '+'}
                  </span>
                </button>
                {activeFaq === idx && (
                  <div style={{
                    padding: '0 1.5rem 1.25rem',
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.6,
                    borderTop: '1px solid var(--border-light)',
                    paddingTop: '0.75rem'
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Call To Action Banner */}
      <section style={{
        padding: '5rem 0',
        background: 'linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            marginBottom: '1rem'
          }}>
            Ready to Connect Your Campus?
          </h2>

          <p style={{
            fontSize: '1.1rem',
            color: '#c7d2fe',
            marginBottom: '2.5rem',
            lineHeight: 1.6
          }}>
            Join students and faculty who are streamlining problem resolution and elevating campus life today.
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <Link
              to="/login"
              className="btn btn-primary"
              style={{
                backgroundColor: '#ffffff',
                color: 'var(--primary)',
                background: '#ffffff',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                padding: '0.85rem 1.85rem',
                fontSize: '1rem'
              }}
            >
              Get Started Now
            </Link>

            <Link
              to="/login"
              className="btn btn-secondary"
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: '#ffffff',
                borderColor: 'rgba(255,255,255,0.25)',
                padding: '0.85rem 1.75rem',
                fontSize: '1rem'
              }}
            >
              Sign In to Portal
            </Link>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#0f172a',
        color: '#94a3b8',
        padding: '3.5rem 0 2rem',
        borderTop: '1px solid #1e293b'
      }}>
        <div className="container">
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>
                  <GraduationCap size={18} />
                </div>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white' }}>
                  CampusConnect
                </span>
              </div>
              <p style={{ fontSize: '0.825rem', lineHeight: 1.6 }}>
                Digital grievance redressal and campus event ecosystem engineered for college students and faculty.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
                Quick Navigation
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                <li><Link to="/" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Landing Home</Link></li>
                <li><Link to="/login" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Student & Admin Login</Link></li>
                <li><Link to="/register" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Register New Account</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
                Portals & Links
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                <li><a href="#features" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Features & Modules</a></li>
                <li><a href="#how-it-works" style={{ color: '#cbd5e1', textDecoration: 'none' }}>How It Works</a></li>
                <li><a href="#faq" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Frequently Asked Questions</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
                Emergency Support
              </h4>
              <p style={{ fontSize: '0.825rem', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                Campus Emergency Helpline: <strong>1800-425-CAMPUS</strong>
              </p>
              <p style={{ fontSize: '0.825rem', color: '#64748b' }}>
                Campus Operations Wing • Room 102
              </p>
            </div>
          </div>

          <div style={{
            paddingTop: '2rem',
            borderTop: '1px solid #1e293b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.775rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <p>© 2026 CampusConnect. Built for College Hackathon. All rights reserved.</p>
            <p style={{ color: 'var(--primary-light)' }}>
              Engineered with React + Vite
            </p>
          </div>

        </div>
      </footer>

      {/* Scoped CSS for responsive menu & subtle media queries */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav-links, .desktop-nav-buttons {
            display: none !important;
          }
          .mobile-hamburger {
            display: block !important;
          }
        }
      `}</style>

    </div>
  );
};

