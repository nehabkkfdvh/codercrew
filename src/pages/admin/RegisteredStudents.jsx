import React, { useState, useEffect } from 'react';
import { Users, Mail, Hash, BookOpen, Search, CheckCircle2 } from 'lucide-react';
import { studentService, eventService } from '../../services/api';
import { SearchBar, Loading, EmptyState } from '../../components/CommonComponents';

export const RegisteredStudents = () => {
  const [students, setStudents] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedEventId, setSelectedEventId] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentData, eventData] = await Promise.all([
          studentService.getAllStudents(),
          eventService.getAll()
        ]);
        setStudents(studentData);
        setEvents(eventData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.collegeId.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());

    return matchesSearch;
  });

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Registered Students Directory</h1>
          <p className="page-subtitle">
            View student participation records, attendance eligibility, and campus departmental demographics
          </p>
        </div>
      </div>

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
          placeholder="Search students by name, ID or branch..."
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Filter by Event:</span>
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            style={{
              padding: '0.6rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              fontSize: '0.85rem',
              backgroundColor: '#fff',
              outline: 'none'
            }}
          >
            <option value="All">All Campus Events</option>
            {events.map((evt) => (
              <option key={evt.id} value={evt.id}>
                {evt.title.length > 35 ? evt.title.substring(0, 35) + '...' : evt.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <Loading text="Loading student participant directory..." />
      ) : filteredStudents.length === 0 ? (
        <EmptyState
          title="No student records found"
          description="Try modifying your search keywords."
          icon={Users}
        />
      ) : (
        <div style={{
          background: '#fff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          overflowX: 'auto',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
            <thead>
              <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-color)', fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.85rem 1.25rem' }}>Student Profile</th>
                <th style={{ padding: '0.85rem 1rem' }}>Roll Number</th>
                <th style={{ padding: '0.85rem 1rem' }}>Department & Semester</th>
                <th style={{ padding: '0.85rem 1rem' }}>Contact Email</th>
                <th style={{ padding: '0.85rem 1.25rem', textAlign: 'right' }}>Event Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((std) => (
                <tr key={std.id} style={{ borderBottom: '1px solid var(--border-light)', fontSize: '0.875rem' }}>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img
                        src={std.avatar}
                        alt={std.name}
                        style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <strong style={{ display: 'block', color: 'var(--text-main)', fontSize: '0.95rem' }}>
                          {std.name}
                        </strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Joined: {std.joinedYear || '2023'}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td style={{ padding: '1rem', fontFamily: 'monospace', fontWeight: 700, color: 'var(--primary)' }}>
                    {std.collegeId}
                  </td>

                  <td style={{ padding: '1rem' }}>
                    <div style={{ color: 'var(--text-main)', fontWeight: 600 }}>{std.department}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{std.semester}</div>
                  </td>

                  <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {std.email}
                  </td>

                  <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      backgroundColor: '#ecfdf5',
                      color: '#047857',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      padding: '0.25rem 0.65rem',
                      borderRadius: 'var(--radius-full)'
                    }}>
                      <CheckCircle2 size={13} /> Verified Attendee
                    </span>
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

