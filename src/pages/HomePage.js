import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Navigation
import { useAuth } from '../context/AuthContext'; // Auth Context
import { useLanguage } from '../context/LanguageContext'; // Language Context
import SecondaryButton from '../components/SecondaryButton'; // Import SecondaryButton
import Navbar from '../components/Navbar'; // Import the Navbar component
import { useTranslation } from 'react-i18next';

const HomePage: React.FC = () => {
  const { user, logout } = useAuth(); // Auth Context
  const { language, switchLanguage } = useLanguage(); // Language Context
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state
  const [showGreeting, setShowGreeting] = useState(true); // Greeting visibility
  const { t } = useTranslation(); // Initialize translation

  // Texts based on selected language
  const texts = {
    eng: {
      greeting: 'Welcome to Our App',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      openDash: 'Open Dashboard',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      me: 'Hello, I’m Nasr Ibrahim',
      employee: 'Company Manager',
      description:
        'I’m from Singapore and I have been working as a Product Designer for more than 7 years. I’ve worked for a Hanziree company called Pabloo as a Product Designer and Front-end Developer for 3 years.',
    },
    fr: {
      greeting: 'Welcome to Our App',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      openDash: 'Open Dashboard',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      me: 'Hello, I’m Nasr Ibrahim',
      employee: 'Company Manager',
      description:
        'I’m from Singapore and I have been working as a Product Designer for more than 7 years. I’ve worked for a Hanziree company called Pabloo as a Product Designer and Front-end Developer for 3 years.',
    },
    ar: {
      greeting: 'مرحبًا بك ',
      login: 'تسجيل الدخول',
      register: 'التسجيل',
      logout: 'تسجيل الخروج',
      openDash: 'لوحة التحكم',
      terms: 'شروط الخدمة',
      privacy: 'سياسة الخصوصية',
      me: 'مرحبًا، أنا نصر ابراهيم',
      employee: 'مدير الشركة',
      description:
        'أنا من سنغافورة وأعمل كـ Designer في المنتجات منذ أكثر من 7 سنوات. عملت في شركة Hanziree تُدعى Pabloo كـ Designer للمنتجات و Front-end Developer لمدة 3 سنوات.',
    },
  };

  const currentTexts = texts[language] || texts.eng; // Default to English if language is not found

  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => setShowGreeting(false), 3000); // Hide greeting after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [user]);

  // Handle logout
  const handleLogout = () => {
    logout();
    window.location.href = '/'; // Redirect to homepage
  };

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  // Example function for handling QR scanner
  const handleQRScannerClick = () => {
    console.log('QR Code Scanner opened'); // Replace with actual implementation
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-dark text-light">
      <Navbar />
      
      {/* First Section */}
      <section
        id="first-section"
        className="relative w-full px-4 py-6 sm:px-6 lg:px-8 lg:py-12"
      >
        <div className="flex flex-col gap-6 lg:gap-12">
          <div className="text-center lg:text-left">
            <h1 className="text-[#079211] text-2xl sm:text-3xl lg:text-[38px] font-bold leading-tight">
              {currentTexts.me}
            </h1>
            <h2 className="text-light text-4xl sm:text-5xl lg:text-[88px] font-bold leading-tight">
              {currentTexts.employee}
            </h2>
          </div>
          <p className="text-center lg:text-left text-light text-sm sm:text-base lg:text-lg">
            {currentTexts.description}
          </p>

          {/* Buttons Section */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 lg:gap-6">
            <button className="px-4 py-2 sm:px-6 sm:py-3 bg- text-light text-sm sm:text-lg font-bold rounded-md">
              {currentTexts.greeting}
            </button>
            <SecondaryButton route='/dashboard' text={currentTexts.openDash} onClick={handleQRScannerClick} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
