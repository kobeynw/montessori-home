import React, { useState } from 'react';
import './CalendarEntry.css';

const CalendarEntry = ({ entry, onStatusChange, onDelete }) => {
    const [isUpdating, setIsUpdating] = useState(false);

    const handleCheckboxChange = async () => {
        setIsUpdating(true);
        const newStatus = entry.status === 'completed' ? 'planned' : 'completed';
        await onStatusChange(entry.id, newStatus);
        setIsUpdating(false);
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to remove this activity?')) {
            await onDelete(entry.id);
        }
    };

    return (
        <div className={`calendar-entry ${entry.status}`}>
            <input
                type="checkbox"
                className="entry-checkbox"
                checked={entry.status === 'completed'}
                onChange={handleCheckboxChange}
                disabled={isUpdating}
            />
            <span className={`entry-title ${entry.status === 'completed' ? 'completed' : ''}`}>
                {entry.activity_type === 'custom' && '📝 '}
                {entry.activity_title}
            </span>
            <button
                className="entry-delete"
                onClick={handleDelete}
                aria-label="Remove activity"
            >
                ×
            </button>
        </div>
    );
};

export default CalendarEntry;