import React from 'react';
import './ActivityFilters.css';

const ActivityFilters = ({ filters, onFilterChange, onClearFilters }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onFilterChange(name, value);
    };

    return (
        <div className="activity-filters">
            <div className="filters-row">
                <div className="filter-group">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={filters.category}
                        onChange={handleChange}
                    >
                        <option value="">All Categories</option>
                        <option value="Practical Life">Practical Life</option>
                        <option value="Sensorial">Sensorial</option>
                        <option value="Math">Math</option>
                        <option value="Language">Language</option>
                        <option value="Culture">Culture</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="age">Age</label>
                    <select
                        id="age"
                        name="age"
                        value={filters.age}
                        onChange={handleChange}
                    >
                        <option value="">Any Age</option>
                        <option value="2+">2+</option>
                        <option value="3+">3+</option>
                        <option value="4+">4+</option>
                        <option value="5+">5+</option>
                        <option value="6+">6+</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="duration">Duration</label>
                    <select
                        id="duration"
                        name="duration"
                        value={filters.duration}
                        onChange={handleChange}
                    >
                        <option value="">Any Duration</option>
                        <option value="0-15">0-15 minutes</option>
                        <option value="15-30">15-30 minutes</option>
                        <option value="30+">30+ minutes</option>
                    </select>
                </div>

                <div className="filter-group filter-search">
                    <label htmlFor="search">Search</label>
                    <input
                        type="text"
                        id="search"
                        name="search"
                        placeholder="Search activities..."
                        value={filters.search}
                        onChange={handleChange}
                    />
                </div>

                <div className="filter-group filter-actions">
                    <button 
                        className="btn-clear-filters"
                        onClick={onClearFilters}
                    >
                        Clear Filters
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ActivityFilters;