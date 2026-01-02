import React, { useState } from 'react';
import './ActivityCard.css';

const ActivityCard = ({ activity }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    // Parse materials into a list
    const materialsList = activity.materials 
        ? activity.materials.split(',').map(m => m.trim())
        : [];

    return (
        <div className="activity-card">
            <div className="activity-card-header">
                <h3 className="activity-title">{activity.title}</h3>
                <div className="activity-meta">
                    <span className="activity-category">{activity.category}</span>
                    <span className="activity-age">Age {activity.age_min}+</span>
                    <span className="activity-duration">{activity.duration} min</span>
                </div>
            </div>

            <div className="activity-card-body">
                <p className="activity-description">
                    {isExpanded 
                        ? activity.description 
                        : `${activity.description.substring(0, 150)}${activity.description.length > 150 ? '...' : ''}`
                    }
                </p>

                {isExpanded && (
                    <div className="activity-details">
                        <div className="activity-materials">
                            <h4>Materials Needed:</h4>
                            <ul>
                                {materialsList.map((material, index) => (
                                    <li key={index}>{material}</li>
                                ))}
                            </ul>
                        </div>

                        <button className="btn-add-calendar" disabled>
                            Add to Calendar
                        </button>
                        <span className="calendar-note">(Coming soon)</span>
                    </div>
                )}
            </div>

            <div className="activity-card-footer">
                <button 
                    className="btn-toggle"
                    onClick={toggleExpand}
                >
                    {isExpanded ? 'Show Less ▲' : 'Show More ▼'}
                </button>
            </div>
        </div>
    );
};

export default ActivityCard;