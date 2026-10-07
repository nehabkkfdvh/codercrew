import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Eye, MessageSquare, ArrowRight } from 'lucide-react';
import { complaintService } from '../../services/api';
import { StatusBadge, SearchBar, FilterDropdown, Loading, EmptyState } from '../../components/CommonComponents';
import { complaintCategories } from '../../data/mockData';

export const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const data = await complaintService.getAll();
        setComplaints(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const handleQuickStatusChange = async (id, newStatus) => {
    try {
      const updated = await complaintService.updateStatus(id, newStatus, `Admin fast-updated status to ${newStatus}`);
      setComplaints((prev) => prev.map((c) => (c.id === id ? updated : c)));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const filtered = complaints.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.studentName.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || c.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const statusOptions = [
    { value: 'All', label: 'All Statuses' },
    { value: 'Pending', label: 'Pending' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Resolved', label: 'Resolved' },
  ];

  const categoryOptions = [
    { value: 'All', label: 'All Categories' },
    ...complaintCategories.map((c) => ({ value: c, label: c }))
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">University Complaints Moderation</h1>
          <p className="page-subtitle">
            Review student tickets, assign priority, dispatch campus maintenance, and post resolution updates
          </p>
        </div>
      </div>

      {/* Control / Filter Bar */}
      <div style={{
        background: '#fff',
        padding: '1rem 1.25rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by title, student name, location, ID..."
        />

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <FilterDropdown
            label="Status"
            value={statusFilter}
            onChange={setStatusFilter}
            options={statusOptions}
          />
          <FilterDropdown
            label="Category"
            value={categoryFilter}
            onChange={setCategoryFilter}
            options={categoryOptions}
          />
        </div>
      </div>

      {loading ? (
        <Loading text="Loading complaints database..." />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No complaints matching criteria"
          description="Try broadening your status or category filters."
        />
      ) : (
        <div style={{
          background: '#fff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          overflowX: 'auto',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '750px' }}>
            <thead>
              <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-color)', fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.85rem 1.25rem' }}>Ticket & Reporter</th>
                <th style={{ padding: '0.85rem 1rem' }}>Category & Location</th>
                <th style={{ padding: '0.85rem 1rem' }}>Date</th>
                <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                <th style={{ padding: '0.85rem 1rem' }}>Quick Action</th>
                <th style={{ padding: '0.85rem 1.25rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--border-light)', fontSize: '0.875rem' }}>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img
                        src={item.studentAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                        alt={item.studentName}
                        style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <span style={{ fontWeight: 700, fontFamily: 'monospace', color: 'var(--primary)', fontSize: '0.8rem' }}>
                            {item.id}
                          </span>
                        </div>
                        <div style={{ fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          by {item.studentName} ({item.department})
                        </div>
                      </div>
                    </div>
                  </td>

                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      display: 'inline-block',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backgroundColor: 'var(--bg-subtle)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      marginBottom: '0.25rem'
                    }}>
                      {item.category}
                    </span>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {item.location}
                    </div>
                  </td>

                  <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                    {item.createdAt}
                  </td>

                  <td style={{ padding: '1rem' }}>
                    <StatusBadge status={item.status} />
                  </td>

                  <td style={{ padding: '1rem' }}>
                    <select
                      value={item.status}
                      onChange={(e) => handleQuickStatusChange(item.id, e.target.value)}
                      style={{
                        padding: '0.35rem 0.65rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.8rem',
                        outline: 'none',
                        cursor: 'pointer',
                        backgroundColor: '#fff'
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>

                  <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                    <Link
                      to={`/admin/complaints/${item.id}`}
                      className="btn btn-outline-primary btn-sm"
                      style={{ textDecoration: 'none' }}
                    >
                      Inspect <ArrowRight size={13} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

