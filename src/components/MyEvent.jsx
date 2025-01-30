import { useNavigate } from 'react-router-dom';
import EventCard from './EventCard';

const MyEvents = ({ events, onDelete, onEdit }) => {
  const navigate = useNavigate();

  const handleCreateEventClick = () => {
    navigate('/create-event');
  };


  return (
    <div className="my-events-container">
      {events.length === 0 ? (
        <div className="no-events-message">
          <p>🎉 Excuse me, don't miss your day that makes you memorable! 🎉</p>
          <p>Click below to add your event: ⬇️</p>
          <button 
        onClick={handleCreateEventClick} 
        className="add-event-button"
        aria-label="Add Your Event Now"
      >
        Add Your Event Now
      </button>
        </div>
      ) : (
        <div className="event-list">
          {events.map(event => (
            <EventCard 
              key={event.id} 
              event={event} 
              onDelete={onDelete} 
              onEdit={onEdit} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
