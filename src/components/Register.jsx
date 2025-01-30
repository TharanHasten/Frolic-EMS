import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/register', {
        username: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      alert(response.data.message);
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };
  
  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="input-field"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="input-field"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="input-field"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="input-field"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        <p className="register-footer">
          Already have an account?{' '}
          <Link to="/login" className="login-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
