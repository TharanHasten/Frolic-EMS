import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Logo from './components/Logo';
import Nav from './components/Nav';
import CreateEvent from './components/CreateEvent';
import EventCard from './components/EventCard';
import AlertMessage from './components/AlertMessage';
import EditEventModal from './components/EditEventModal';
import FlashPage from './components/FlashPage';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';

function App() {
  const [events, setEvents] = useState([]);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: '', type: '' }), 3000);
  };

  const addEvent = (newEvent) => {
    newEvent.id = Date.now();
    setEvents([...events, newEvent]);
    showAlert('🎉 Event created successfully!', 'success');
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
    showAlert('🗑️ Event deleted successfully!', 'error');
  };

  const updateEvent = (updatedEvent) => {
    setEvents(events.map(event => (event.id === updatedEvent.id ? updatedEvent : event)));
    setEventToEdit(null);
    showAlert('✏️ Event updated successfully!', 'info');
  };

  const openModal = (event) => {
    setEventToEdit(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEventToEdit(null);
  };

  const handleLogin = (formData) => {
   
    setIsAuthenticated(true); 
  };

  const handleRegister = (formData) => {
   
    console.log(formData);
  };

  return (
    <Router>
      <div className="header-container">
        <Logo />
        <Nav isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      </div>

      <Routes>
        <Route path="/" element={<FlashPage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={handleRegister} />} />
        <Route path="/home" element={<Home />} />
        
        <Route
          path="/my-events"
          element={
            <div className="my-events-container">
              {events.length === 0 ? (
                <div className="no-events-message">
                  <p>🎉 Excuse me, don't miss your day that makes you memorable! 🎉</p>
                  <p>Click below to add your event: ⬇️</p>
                  <button
                    className="add-event-btn"
                    onClick={() => window.location.href = '/create-event'}
                  >
                    Add Your Event
                  </button>
                </div>
              ) : (
                <div className="event-list">
                  {events.map(event => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onDelete={deleteEvent}
                      onEdit={() => openModal(event)}
                    />
                  ))}
                </div>
              )}
            </div>
          }
        />
        <Route
          path="/create-event"
          element={<CreateEvent onAddEvent={addEvent} />}
        />
      </Routes>

      {alert.message && <AlertMessage message={alert.message} type={alert.type} />}

      {isModalOpen && (
        <EditEventModal
          eventToEdit={eventToEdit}
          onUpdateEvent={updateEvent}
          onClose={closeModal}
        />
      )}
    </Router>
  );
}

export default App;
