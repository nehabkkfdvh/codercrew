import React, { useState, useEffect } from 'react';
import { Calendar, Search, Filter, Sparkles } from 'lucide-react';
import { eventService } from '../../services/api';
import { EventCard } from '../../components/EventCard';
import { SearchBar, FilterDropdown, Loading, EmptyState } from '../../components/CommonComponents';

export const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventService.getAll();
        setEvents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleToggleRegister = async (id) => {
    const updated = await eventService.toggleRegister(id);
    setEvents((prev) => prev.map((e) => (e.id === id ? updated : e)));
  };

  const filteredEvents = events.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase()) ||
      e.venue.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = categoryFilter === 'All' || e.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Hackathon', 'Robotics', 'Workshop', 'Cultural', 'Career'];
  const categoryOptions = categories.map((c) => ({ value: c, label: c === 'All' ? 'All Event Types' : c }));

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Campus Events & Activities</h1>
          <p className="page-subtitle">
            Explore upcoming college hackathons, technical symposiums, guest workshops, and festivals
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        background: '#fff',
        padding: '1rem 1.25rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        marginBottom: '2rem',
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
          placeholder="Search events, workshops, or venues..."
        />

        <FilterDropdown
          label="Category"
          value={categoryFilter}
          onChange={setCategoryFilter}
          options={categoryOptions}
        />
      </div>

      {loading ? (
        <Loading text="Loading upcoming campus events..." />
      ) : filteredEvents.length === 0 ? (
        <EmptyState
          title="No events found"
          description="We couldn't find any campus events matching your criteria."
          icon={Calendar}
        />
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.75rem'
        }}>
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onToggleRegister={handleToggleRegister}
            />
          ))}
        </div>
      )}
    </div>
  );
};

