import { useState, useEffect } from "react";

const EditEventModal = ({ eventToEdit, onUpdateEvent, onClose }) => {
  const [event, setEvent] = useState({
    id: null,
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    if (eventToEdit) {
      setEvent({
        id: eventToEdit.id || null,
        title: eventToEdit.title || "",
        date: eventToEdit.date || "",
        time: eventToEdit.time || "",
        location: eventToEdit.location || "",
        description: eventToEdit.description || "",
        image: eventToEdit.image || null,
      });
    }
  }, [eventToEdit]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEvent((prevEvent) => ({ ...prevEvent, [id]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEvent((prevEvent) => ({ ...prevEvent, image: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!event.title || !event.date || !event.time || !event.location) {
      alert("Please fill in all required fields.");
      return;
    }

    // Prepare event data for submission
    const updatedEvent = { ...event };

    if (event.image instanceof File) {
      updatedEvent.image = URL.createObjectURL(event.image);
    }

    onUpdateEvent(updatedEvent);
    onClose();
  };

  return (
    <div className="edit-event-modal">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <h2>Edit Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="title">Event Title</label>
            <input
              id="title"
              type="text"
              value={event.title}
              onChange={handleChange}
              placeholder="Enter event title"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="date">Event Date</label>
            <input
              id="date"
              type="date"
              value={event.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="time">Event Time</label>
            <input
              id="time"
              type="time"
              value={event.time}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="location">Event Location</label>
            <input
              id="location"
              type="text"
              value={event.location}
              onChange={handleChange}
              placeholder="Enter event location"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="description">Event Description</label>
            <textarea
              id="description"
              value={event.description}
              onChange={handleChange}
              placeholder="Provide event details"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="input-group">
            <label htmlFor="image">Event Image</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {event.image && (
              <div className="image-preview-container">
                <img
                  src={
                    event.image instanceof File
                      ? URL.createObjectURL(event.image)
                      : event.image
                  }
                  alt="Preview"
                  className="image-preview"
                />
              </div>
            )}
          </div>
          <button type="submit" className="submit-btn">
            Update Event
          </button>
        </form>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default EditEventModal;
