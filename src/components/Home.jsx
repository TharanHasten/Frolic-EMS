import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleCreateEventClick = () => {
    navigate('/create-event');
  };

  return (
    <div className="home-container">
      <div className="welcome-message">
        <h1>Welcome to Your Personal Event Management System!</h1>
        <p>
          🌟 Take control of your events, big or small, with ease and efficiency. 
          Our platform lets you personalize each event, ensuring that no important moment is ever missed.
        </p>
        <p>
          📅 Whether it's a special celebration or a crucial business event, we help you manage everything with simplicity and style.
        </p>
        <p>
          ✨ Don't let your valuable moments slip away—start organizing today and make each event memorable!
        </p>
      </div>
      <div className="cta">
        <p>Ready to make your events unforgettable? Let's get started!</p>
        <button 
          onClick={handleCreateEventClick} 
          className="cta-button"
          aria-label="Add Your Event Now"
        >
          Add Your Event Now
        </button>
      </div>
    </div>
  );
};

export default Home;
