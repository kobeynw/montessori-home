import React, { useState, useEffect } from 'react';
import calendarService from '../services/calendarService';
import DayBox from '../components/calendar/DayBox';
import AddActivityModal from '../components/calendar/AddActivityModal';
import './Calendar.css';

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Calendar = () => {
    const [calendar, setCalendar] = useState({
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);

    useEffect(() => {
        fetchCalendar();
    }, []);

    const fetchCalendar = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await calendarService.getCalendar();
            setCalendar(response.data);
        } catch (err) {
            setError('Failed to load calendar. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddClick = (day) => {
        setSelectedDay(day);
        setModalOpen(true);
    };

    const handleActivityAdded = async (activityId, customActivityName) => {
        try {
            if (activityId) {
                await calendarService.addDatabaseActivity(activityId, selectedDay);
            } else {
                await calendarService.addCustomActivity(customActivityName, selectedDay);
            }
            await fetchCalendar();
        } catch (error) {
            throw error;
        }
    };

    const handleStatusChange = async (entryId, newStatus) => {
        try {
            await calendarService.updateStatus(entryId, newStatus);
            await fetchCalendar();
        } catch (error) {
            console.error('Failed to update status:', error);
            alert('Failed to update status. Please try again.');
        }
    };

    const handleDelete = async (entryId) => {
        try {
            await calendarService.deleteEntry(entryId);
            await fetchCalendar();
        } catch (error) {
            console.error('Failed to delete entry:', error);
            alert('Failed to delete entry. Please try again.');
        }
    };

    const handleClearAll = async () => {
        if (window.confirm('Are you sure you want to clear all activities from your calendar?')) {
            try {
                await calendarService.clearAll();
                await fetchCalendar();
            } catch (error) {
                console.error('Failed to clear calendar:', error);
                alert('Failed to clear calendar. Please try again.');
            }
        }
    };

    const getTotalActivities = () => {
        return Object.values(calendar).reduce((total, day) => total + day.length, 0);
    };

    const getCompletedActivities = () => {
        return Object.values(calendar).reduce((total, day) => {
            return total + day.filter(entry => entry.status === 'completed').length;
        }, 0);
    };

    if (loading) {
        return (
            <div className="calendar-page">
                <div className="loading">Loading your calendar...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="calendar-page">
                <div className="error">{error}</div>
            </div>
        );
    }

    return (
        <div className="calendar-page">
            <div className="calendar-container">
                <div className="calendar-header">
                    <div>
                        <h1>My Weekly Calendar</h1>
                        <p>Plan and track your Montessori activities for the week</p>
                    </div>
                    <button className="btn-clear-all" onClick={handleClearAll}>
                        Clear All Activities
                    </button>
                </div>

                <div className="calendar-stats">
                    <div className="stat">
                        <span className="stat-value">{getTotalActivities()}</span>
                        <span className="stat-label">Total Activities</span>
                    </div>
                    <div className="stat">
                        <span className="stat-value">{getCompletedActivities()}</span>
                        <span className="stat-label">Completed</span>
                    </div>
                    <div className="stat">
                        <span className="stat-value">
                            {getTotalActivities() > 0 
                                ? Math.round((getCompletedActivities() / getTotalActivities()) * 100) 
                                : 0}%
                        </span>
                        <span className="stat-label">Progress</span>
                    </div>
                </div>

                <div className="calendar-grid">
                    {DAYS_OF_WEEK.map(day => (
                        <DayBox
                            key={day}
                            day={day}
                            entries={calendar[day]}
                            onAddClick={handleAddClick}
                            onStatusChange={handleStatusChange}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            </div>

            <AddActivityModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                dayOfWeek={selectedDay}
                onActivityAdded={handleActivityAdded}
            />
        </div>
    );
};

export default Calendar;