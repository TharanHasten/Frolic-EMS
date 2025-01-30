import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EventList = ({ events, onDeleteEvent, onUpdateEvent }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedEvent, setEditedEvent] = useState(null);

  const handleDelete = async (eventId) => {
    try {
      const success = await onDeleteEvent(eventId);
      if (success) {
        setSelectedEvent(null);
      }
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  const handleEdit = (event) => {
    setEditMode(true);
    setEditedEvent({ ...event });
  };

  const handleUpdate = async () => {
    try {
      const success = await onUpdateEvent(editedEvent.id, editedEvent);
      if (success) {
        setEditMode(false);
        setEditedEvent(null);
      }
    } catch (error) {
      console.error('Failed to update event:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (events.length === 0) {
    return (
      <div className="no-events">
        <h2>No events found</h2>
        <p>Create your first event to get started!</p>
        <Link to="/create-event" className="create-event-btn">
          Create Event
        </Link>
      </div>
    );
  }

  return (
    <div className="event-list">
      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            {event.imageUrl && (
              <img
                src={event.imageUrl}
                alt={event.title}
                className="event-image"
              />
            )}
            <div className="event-details">
              <h3>{event.title}</h3>
              <p className="event-date">
                {new Date(event.date).toLocaleDateString()} at {event.time}
              </p>
              <p className="event-location">📍 {event.location}</p>
              {event.description && (
                <p className="event-description">{event.description}</p>
              )}
              <div className="event-actions">
                <button
                  onClick={() => handleEdit(event)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editMode && editedEvent && (
        <div className="edit-modal">
          <div className="modal-content">
            <h2>Edit Event</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}>
              <div className="input-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={editedEvent.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={editedEvent.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label>Time</label>
                <input
                  type="time"
                  name="time"
                  value={editedEvent.time}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={editedEvent.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={editedEvent.description}
                  onChange={handleChange}
                  rows="4"
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    setEditedEvent(null);
                  }}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventList;
