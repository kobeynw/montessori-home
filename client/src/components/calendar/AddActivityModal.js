import React, { useState, useEffect } from 'react';
import activityService from '../../services/activityService';
import './AddActivityModal.css';

const AddActivityModal = ({ isOpen, onClose, dayOfWeek, onActivityAdded }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [customActivityName, setCustomActivityName] = useState('');
    const [addingActivity, setAddingActivity] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchActivities();
        }
    }, [isOpen, searchQuery]);

    const fetchActivities = async () => {
        setLoading(true);
        try {
            const response = await activityService.getActivities({
                search: searchQuery,
                limit: 10
            });
            setActivities(response.data);
        } catch (error) {
            console.error('Error fetching activities:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddDatabaseActivity = async (activityId) => {
        setAddingActivity(true);
        try {
            await onActivityAdded(activityId, null);
            handleClose();
        } catch (error) {
            console.error('Error adding activity:', error);
            alert('Failed to add activity. Please try again.');
        } finally {
            setAddingActivity(false);
        }
    };

    const handleAddCustomActivity = async () => {
        if (!customActivityName.trim()) {
            alert('Please enter an activity name');
            return;
        }

        setAddingActivity(true);
        try {
            await onActivityAdded(null, customActivityName);
            handleClose();
        } catch (error) {
            console.error('Error adding custom activity:', error);
            alert('Failed to add custom activity. Please try again.');
        } finally {
            setAddingActivity(false);
        }
    };

    const handleClose = () => {
        setSearchQuery('');
        setCustomActivityName('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Add Activity to {dayOfWeek}</h2>
                    <button className="modal-close" onClick={handleClose}>×</button>
                </div>

                <div className="modal-body">
                    <div className="search-section">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search activities..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="activities-list">
                        {loading ? (
                            <div className="loading">Loading activities...</div>
                        ) : activities.length === 0 ? (
                            <div className="no-results">No activities found</div>
                        ) : (
                            activities.map(activity => (
                                <div key={activity.id} className="activity-item">
                                    <div className="activity-info">
                                        <div className="activity-title">{activity.title}</div>
                                        <div className="activity-meta">
                                            {activity.category} • Age {activity.age_min}+ • {activity.duration} min
                                        </div>
                                    </div>
                                    <button
                                        className="btn-add-activity"
                                        onClick={() => handleAddDatabaseActivity(activity.id)}
                                        disabled={addingActivity}
                                    >
                                        Add
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="divider">
                        <span>OR</span>
                    </div>

                    <div className="custom-section">
                        <input
                            type="text"
                            className="custom-input"
                            placeholder="Enter custom activity name..."
                            value={customActivityName}
                            onChange={(e) => setCustomActivityName(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleAddCustomActivity();
                                }
                            }}
                        />
                        <button
                            className="btn-add-custom"
                            onClick={handleAddCustomActivity}
                            disabled={addingActivity || !customActivityName.trim()}
                        >
                            Add Custom
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddActivityModal;