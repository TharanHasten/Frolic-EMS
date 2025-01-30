import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateEvent = ({ onAddEvent }) => {
  const [event, setEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    image: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEvent((prevEvent) => ({ ...prevEvent, [id]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEvent((prevEvent) => ({ ...prevEvent, image: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, date, time, location } = event;

    if (!title || !date || !time || !location) {
      alert('Please fill in all required fields.');
      return;
    }

    onAddEvent(event);

    setEvent({ title: '', date: '', time: '', location: '', description: '', image: null });

    navigate('/my-events');
  };

  return (
    <div className="create-event-container">
      <h2 className="form-title">🎉 Create Event</h2>
      <form className="event-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="title">Event Title</label>
          <input id="title" type="text" placeholder="Enter event title" value={event.title} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="date">Event Date</label>
          <input id="date" type="date" value={event.date} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="time">Event Time</label>
          <input id="time" type="time" value={event.time} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="location">Event Location</label>
          <input id="location" type="text" placeholder="Enter event location" value={event.location} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="description">Event Description</label>
          <textarea id="description" placeholder="Describe your event" value={event.description} onChange={handleChange}></textarea>
        </div>
        <div className="input-group">
          <label htmlFor="image">Upload Event Image</label>
          <input id="image" type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        {event.image && (
          <div className="image-preview">
            <img src={event.image} alt="Event Preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} />
          </div>
        )}
        <button type="submit" className="submit-btn">🚀 Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
