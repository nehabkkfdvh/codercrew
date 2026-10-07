import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './services/AuthContext';
import { AppLayout } from './layouts/AppLayout';

// Public Auth & Marketing Pages
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { NotFound } from './pages/NotFound';

// Core Student & Platform Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { CreateComplaint } from './pages/student/CreateComplaint';
import { MyComplaints } from './pages/student/MyComplaints';
import { ComplaintDetails } from './pages/student/ComplaintDetails';
import { Events } from './pages/student/Events';
import { EventDetails } from './pages/student/EventDetails';
import { Notifications } from './pages/student/Notifications';
import { Profile } from './pages/student/Profile';
import { Settings } from './pages/Settings';

// Admin Portal Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminComplaints } from './pages/admin/AdminComplaints';
import { AdminComplaintDetails } from './pages/admin/AdminComplaintDetails';
import { ManageEvents } from './pages/admin/ManageEvents';
import { CreateEvent } from './pages/admin/CreateEvent';
import { RegisteredStudents } from './pages/admin/RegisteredStudents';

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Standalone Pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Authenticated / Core Platform Layout Routes */}
          <Route element={<AppLayout />}>
            {/* 1. Student Dashboard */}
            <Route path="/dashboard" element={<StudentDashboard />} />

            {/* 2. Report a Problem */}
            <Route path="/report-problem" element={<CreateComplaint />} />

            {/* 3. My Complaints / Track Problems */}
            <Route path="/complaints" element={<MyComplaints />} />
            <Route path="/complaints/:id" element={<ComplaintDetails />} />

            {/* 4. Events & Details */}
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} />

            {/* 5. Notifications */}
            <Route path="/notifications" element={<Notifications />} />

            {/* 6. Profile */}
            <Route path="/profile" element={<Profile />} />

            {/* 7. Settings */}
            <Route path="/settings" element={<Settings />} />

            {/* 8. Admin Dashboard & Operations */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/complaints" element={<AdminComplaints />} />
            <Route path="/admin/complaints/:id" element={<AdminComplaintDetails />} />
            <Route path="/admin/events" element={<ManageEvents />} />
            <Route path="/admin/events/create" element={<CreateEvent />} />
            <Route path="/admin/students" element={<RegisteredStudents />} />

            {/* Legacy Sub-routes redirects for seamless backwards compatibility */}
            <Route path="/student/dashboard" element={<Navigate to="/dashboard" replace />} />
            <Route path="/student/complaints" element={<Navigate to="/complaints" replace />} />
            <Route path="/student/complaints/create" element={<Navigate to="/report-problem" replace />} />
            <Route path="/student/complaints/:id" element={<ComplaintDetails />} />
            <Route path="/student/events" element={<Navigate to="/events" replace />} />
            <Route path="/student/events/:id" element={<EventDetails />} />
            <Route path="/student/notifications" element={<Navigate to="/notifications" replace />} />
            <Route path="/student/profile" element={<Navigate to="/profile" replace />} />
            <Route path="/student/settings" element={<Navigate to="/settings" replace />} />
          </Route>

          {/* 404 Not Found Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
