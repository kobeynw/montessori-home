import React from 'react';
import CalendarEntry from './CalendarEntry';
import './DayBox.css';

const DayBox = ({ day, entries, onAddClick, onStatusChange, onDelete }) => {
    return (
        <div className="day-box">
            <div className="day-header">
                <h3>{day}</h3>
                <button className="btn-add-day" onClick={() => onAddClick(day)}>
                    + Add Activity
                </button>
            </div>
            <div className="day-entries">
                {entries.length === 0 ? (
                    <div className="no-entries">No activities planned</div>
                ) : (
                    entries.map(entry => (
                        <CalendarEntry
                            key={entry.id}
                            entry={entry}
                            onStatusChange={onStatusChange}
                            onDelete={onDelete}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default DayBox;