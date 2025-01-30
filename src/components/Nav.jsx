import { Link, useNavigate } from 'react-router-dom';

function Nav({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    setIsAuthenticated(false); 
    navigate('/'); 
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        {isAuthenticated ? (
          <>
            <li><Link to="/home" className="nav-link">Home</Link></li>
            <li><Link to="/my-events" className="nav-link">My Events</Link></li>
            <li><Link to="/create-event" className="nav-link">Create Event</Link></li>
            <li><Link to="/profile" className="nav-link">Profile</Link></li>
            <li><Link to="/groups" className="nav-link">Groups</Link></li>
            <li><span className="nav-link" onClick={handleLogout}>Logout</span></li>
          </>
        ) : (
          <>
            <li><Link to="/login" className="nav-link">Login</Link></li>
            <li><Link to="/register" className="nav-link">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
