import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SecondaryButtonProps {
  text: string; // Button text
  title?: string; // Optional title (tooltip)
  onClick?: () => void; // Optional custom click handler
  route?: string; // Optional navigation route
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ text, title, onClick, route }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(); // Execute the custom onClick handler if provided
    }
    if (route) {
      navigate(route); // Navigate to the specified route if provided
    }
  };

  return (
    <button
      onClick={handleClick}
      title={title} // Tooltip for the button
      className="px-6 py-3 bg-accent text-light font-semibold rounded-md hover:bg-yellow-600 transition-colors"
    >
      {text}
    </button>
  );
};

export default SecondaryButton;
