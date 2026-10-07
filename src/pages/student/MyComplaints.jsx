import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Filter, LayoutDashboard } from 'lucide-react';
import { complaintService } from '../../services/api';
import { ComplaintCard } from '../../components/ComplaintCard';
import { SearchBar, FilterDropdown, Loading, EmptyState } from '../../components/CommonComponents';
import { complaintCategories } from '../../data/mockData';

export const MyComplaints = () => {
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

  const filteredComplaints = complaints.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
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
    ...complaintCategories.map((cat) => ({ value: cat, label: cat }))
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">My Campus Complaints</h1>
          <p className="page-subtitle">
            Track and monitor resolution progress on your submitted complaints
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link to="/dashboard" className="btn btn-secondary">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          <Link to="/report-problem" className="btn btn-primary">
            <PlusCircle size={18} />
            Report a Problem
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
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
          placeholder="Search by title, location or ID..."
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
        <Loading text="Loading complaints..." />
      ) : filteredComplaints.length === 0 ? (
        <EmptyState
          title="No complaints found"
          description="We couldn't find any complaints matching your search query or filters."
          action={
            <Link to="/report-problem" className="btn btn-primary btn-sm">
              Report a Problem
            </Link>
          }
        />
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.25rem'
        }}>
          {filteredComplaints.map((item) => (
            <ComplaintCard key={item.id} complaint={item} />
          ))}
        </div>
      )}
    </div>
  );
};

