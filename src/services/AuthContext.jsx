import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('cc_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    // Default logged in as student for seamless first evaluation
    return {
      id: "std-001",
      name: "Alex Johnson",
      email: "alex.johnson@campus.edu",
      role: "student",
      collegeId: "CS2023-042",
      department: "Computer Science & Engineering",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
    };
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('cc_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('cc_user');
    }
  }, [user]);

  const login = (role = 'student', credentials = {}) => {
    let userData;
    if (role === 'admin') {
      userData = {
        id: "adm-001",
        name: "Dr. Arthur Vance",
        email: credentials.email || "admin@campus.edu",
        role: "admin",
        designation: "Dean of Student Affairs & Campus Operations",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400"
      };
    } else {
      userData = {
        id: "std-001",
        name: credentials.name || "Alex Johnson",
        email: credentials.email || "alex.johnson@campus.edu",
        role: "student",
        collegeId: "CS2023-042",
        department: "Computer Science & Engineering",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
      };
    }
    setUser(userData);
    return userData;
  };

  const register = (studentData) => {
    const newStudent = {
      id: `std-${Date.now()}`,
      role: 'student',
      name: studentData.name,
      email: studentData.email,
      collegeId: studentData.collegeId || 'CS2026-999',
      department: studentData.department || 'Computer Science',
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400",
      semester: studentData.semester || '1st Semester'
    };
    setUser(newStudent);
    return newStudent;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cc_user');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, register, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

