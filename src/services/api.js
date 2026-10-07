// Mock API Service with LocalStorage persistence and Axios emulation
import axios from 'axios';
import {
  initialStudents,
  initialComplaints,
  initialEvents,
  initialNotifications
} from '../data/mockData';

// Helper to initialize LocalStorage if empty
const initStorage = (key, fallback) => {
  const existing = localStorage.getItem(key);
  if (!existing) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
  try {
    return JSON.parse(existing);
  } catch (e) {
    return fallback;
  }
};

// Initialize base collections
let currentComplaints = initStorage('cc_complaints', initialComplaints);
let currentEvents = initStorage('cc_events', initialEvents);
let currentNotifications = initStorage('cc_notifications', initialNotifications);
let currentStudents = initStorage('cc_students', initialStudents);

const saveState = () => {
  localStorage.setItem('cc_complaints', JSON.stringify(currentComplaints));
  localStorage.setItem('cc_events', JSON.stringify(currentEvents));
  localStorage.setItem('cc_notifications', JSON.stringify(currentNotifications));
  localStorage.setItem('cc_students', JSON.stringify(currentStudents));
};

// Simulated latency for realistic modern app feel
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const complaintService = {
  async getAll() {
    await delay();
    return [...currentComplaints];
  },

  async getById(id) {
    await delay();
    const found = currentComplaints.find((c) => c.id === id);
    if (!found) throw new Error('Complaint not found');
    return { ...found };
  },

  async create(complaintData) {
    await delay();
    const newComplaint = {
      id: `CMP-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'Pending',
      timeline: [
        {
          status: 'Pending',
          time: new Date().toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          note: 'Complaint registered by student.'
        }
      ],
      comments: [],
      priority: complaintData.priority || 'Medium',
      ...complaintData
    };
    currentComplaints = [newComplaint, ...currentComplaints];
    saveState();
    return newComplaint;
  },

  async updateStatus(id, newStatus, note = '') {
    await delay();
    currentComplaints = currentComplaints.map((c) => {
      if (c.id === id) {
        const updatedTimeline = [
          ...c.timeline,
          {
            status: newStatus,
            time: new Date().toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }),
            note: note || `Status updated to ${newStatus}.`
          }
        ];
        return { ...c, status: newStatus, timeline: updatedTimeline };
      }
      return c;
    });
    saveState();
    return currentComplaints.find((c) => c.id === id);
  },

  async addComment(id, comment) {
    await delay();
    currentComplaints = currentComplaints.map((c) => {
      if (c.id === id) {
        const newComments = [
          ...c.comments,
          {
            id: `c-${Date.now()}`,
            time: new Date().toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }),
            ...comment
          }
        ];
        return { ...c, comments: newComments };
      }
      return c;
    });
    saveState();
    return currentComplaints.find((c) => c.id === id);
  }
};

export const eventService = {
  async getAll() {
    await delay();
    return [...currentEvents];
  },

  async getById(id) {
    await delay();
    const found = currentEvents.find((e) => e.id === id);
    if (!found) throw new Error('Event not found');
    return { ...found };
  },

  async create(eventData) {
    await delay();
    const newEvent = {
      id: `EVT-${Math.floor(200 + Math.random() * 800)}`,
      registeredCount: 0,
      isRegistered: false,
      capacity: 300,
      tags: ['Campus', 'Student Activity'],
      ...eventData
    };
    currentEvents = [newEvent, ...currentEvents];
    saveState();
    return newEvent;
  },

  async toggleRegister(id) {
    await delay();
    let updatedEvent = null;
    currentEvents = currentEvents.map((evt) => {
      if (evt.id === id) {
        const nextState = !evt.isRegistered;
        updatedEvent = {
          ...evt,
          isRegistered: nextState,
          registeredCount: nextState ? evt.registeredCount + 1 : Math.max(0, evt.registeredCount - 1)
        };
        return updatedEvent;
      }
      return evt;
    });
    saveState();
    return updatedEvent;
  },

  async delete(id) {
    await delay();
    currentEvents = currentEvents.filter((e) => e.id !== id);
    saveState();
    return { success: true };
  }
};

export const notificationService = {
  async getAll() {
    await delay();
    return [...currentNotifications];
  },

  async markAsRead(id) {
    await delay();
    currentNotifications = currentNotifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    saveState();
    return currentNotifications;
  },

  async markAllAsRead() {
    await delay();
    currentNotifications = currentNotifications.map((n) => ({ ...n, read: true }));
    saveState();
    return currentNotifications;
  }
};

export const studentService = {
  async getProfile() {
    await delay();
    const user = JSON.parse(localStorage.getItem('cc_user') || '{}');
    const profile = currentStudents.find((s) => s.email === user.email) || currentStudents[0];
    return { ...profile };
  },

  async updateProfile(updatedData) {
    await delay();
    currentStudents = currentStudents.map((s) =>
      s.id === updatedData.id ? { ...s, ...updatedData } : s
    );
    saveState();
    return { ...updatedData };
  },

  async getAllStudents() {
    await delay();
    return [...currentStudents];
  }
};

