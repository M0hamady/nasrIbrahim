import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase-config'; // Import your Firebase auth instance

// Create a Context for Authentication
const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap around app and provide context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Check localStorage for saved user data and token when app loads
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const storedToken = localStorage.getItem('token');

      if (storedUser && storedToken) {
        setUser(storedUser);
        setToken(storedToken);
      }
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      // Clear potentially corrupted data
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, []);

  // Function to handle login and save user data and token to localStorage
  const login = async (email, password) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/accounts/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token, user } = data;

        // Save user data and token to localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);

        // Update state
        setUser(user);
        setToken(token);

        // Redirect after successful login
        navigate('/'); // Use navigate instead of reloading the page
      } else {
        throw new Error('Invalid email or password!');
      }
    } catch (error) {
      throw new Error('Login failed: ' + error.message);
    }
  };

  // Function to handle Google login via Firebase
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const idToken = await user.getIdToken();

      const response = await fetch('http://127.0.0.1:8000/google/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: idToken }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token, user } = data;

        // Save user data and token to localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);

        // Update state
        setUser(user);
        setToken(token);

        // Redirect after successful Google login
        navigate('/'); // Use navigate instead of reloading the page
      } else {
        throw new Error('Google login failed!');
      }
    } catch (error) {
      throw new Error('Google login failed: ' + error.message);
    }
  };

  // Function to handle logout and remove user data and token from localStorage
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    // Redirect to login page after logout
    navigate('/login'); // Use navigate instead of reloading the page
  };

  return (
    <AuthContext.Provider value={{ user, token, login, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
