import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Import your custom authentication context
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase-config'; // Import the updated Firebase Auth instance

const LoginPage = () => {
  const { login, googleLogin } = useAuth(); // Access the login and googleLogin functions from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Handle standard login (email/password)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate('/'); // Navigate to the home page after successful login
    } catch (error) {
      alert('Login failed!');
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      navigate('/'); // Navigate to the home page after successful login
    } catch (error) {
      alert('Google login failed!');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200 w-full">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Login</h2>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Login
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>

        {/* Google login button */}
        <button 
          type="button"
          onClick={handleGoogleLogin} 
          className="w-full py-3 bg-red-600 text-white font-semibold rounded-md mt-4 hover:bg-red-700"
        >
          Sign in with Google
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
