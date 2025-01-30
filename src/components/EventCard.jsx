const EventCard = ({ event, onDelete, onEdit }) => {
  const getImageSrc = () => {
    if (event.image instanceof File) {
      return URL.createObjectURL(event.image);
    }
    return event.image || "assets/events_kids.jpg"; 
  };

  return (
    <div className="event-card">
      <img 
        src={getImageSrc()} 
        alt="Event Banner" 
        className="event-card-image" 
        onError={(e) => e.target.src = "src/assets/events_kids.jpg"} 
      />
      <div className="event-card-content">
        <p className="event-card-date">{event.date} at {event.time}</p>
        <h2 className="event-card-title">{event.title}</h2>
        <p className="event-card-location">{event.location}</p>
        <p className="event-card-description">{event.description}</p>
        <div className="event-card-actions">
          <button className="event-card-button" onClick={() => onEdit(event)}>✏️ Edit</button>
          <button className="event-card-button delete" onClick={() => onDelete(event.id)}>🗑️ Delete</button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
