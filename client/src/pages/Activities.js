import React, { useState, useEffect } from 'react';
import activityService from '../services/activityService';
import ActivityFilters from '../components/activities/ActivityFilters';
import ActivityCard from '../components/activities/ActivityCard';
import Pagination from '../components/activities/Pagination';
import './Activities.css';

const Activities = () => {
    const [activities, setActivities] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    });
    const [filters, setFilters] = useState({
        category: '',
        age: '',
        duration: '',
        search: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch activities when filters or page changes
    useEffect(() => {
        fetchActivities();
    }, [filters, pagination.page]);

    const fetchActivities = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await activityService.getActivities({
                ...filters,
                page: pagination.page,
                limit: pagination.limit
            });
            
            setActivities(response.data);
            setPagination(prev => ({
                ...prev,
                ...response.pagination
            }));
        } catch (err) {
            setError('Failed to load activities. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (name, value) => {
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
        // Reset to page 1 when filters change
        setPagination(prev => ({
            ...prev,
            page: 1
        }));
    };

    const handleClearFilters = () => {
        setFilters({
            category: '',
            age: '',
            duration: '',
            search: ''
        });
        setPagination(prev => ({
            ...prev,
            page: 1
        }));
    };

    const handlePageChange = (newPage) => {
        setPagination(prev => ({
            ...prev,
            page: newPage
        }));
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="activities-page">
            <div className="activities-container">
                <div className="activities-header">
                    <h1>Activity Library</h1>
                    <p>Explore our collection of Montessori-inspired activities for your child</p>
                </div>

                <ActivityFilters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                />

                {loading ? (
                    <div className="loading">Loading activities...</div>
                ) : error ? (
                    <div className="error">{error}</div>
                ) : activities.length === 0 ? (
                    <div className="no-results">
                        <p>No activities found matching your filters.</p>
                        <button onClick={handleClearFilters}>Clear Filters</button>
                    </div>
                ) : (
                    <>
                        <div className="activities-info">
                            Showing {((pagination.page - 1) * pagination.limit) + 1}-
                            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} activities
                        </div>

                        <div className="activities-list">
                            {activities.map(activity => (
                                <ActivityCard key={activity.id} activity={activity} />
                            ))}
                        </div>

                        <Pagination
                            currentPage={pagination.page}
                            totalPages={pagination.totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default Activities;