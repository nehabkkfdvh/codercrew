import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';

export const AppLayout = () => {
  // Open by default on wide desktop screens
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
      <Navbar onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main style={{
        flex: 1,
        padding: '2rem 1.5rem',
        marginLeft: isSidebarOpen && window.innerWidth >= 1024 ? 'var(--sidebar-width)' : '0',
        transition: 'margin-left 0.25s ease-in-out',
        width: '100%',
        maxWidth: isSidebarOpen && window.innerWidth >= 1024 ? 'calc(100% - var(--sidebar-width))' : '100%'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

