// src/components/Navbar.js

import React, { useState,useEffect  } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext'; // Language Context
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LanguageIcon from '@mui/icons-material/Language'; // Language Icon
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { IconButton, Menu, MenuItem } from '@mui/material'; // MUI components for dropdown
import { useAuth } from '../context/AuthContext'; // Auth Context
const Navbar = () => {
  const { language, switchLanguage } = useLanguage(); // Language context
  const { user, logout } = useAuth(); // Context for user and logout
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state
  const [anchorEl, setAnchorEl] = useState(null); // State for dropdown menu anchor
  const [langMenuAnchor, setLangMenuAnchor] = useState(null); // Language dropdown anchor

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLangMenuClick = (event) => {
    setLangMenuAnchor(event.currentTarget); // Open the dropdown menu for language
  };
  const handleLogout = () => {
    logout();
    handleClose(); // Close the dropdown after logout
  };
  const handleUserMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // Open the dropdown menu for user
  };
  const handleClose = () => {
    setAnchorEl(null); // Close the user dropdown menu
    setLangMenuAnchor(null); // Close the language dropdown menu
  };

  // Texts based on language
  const texts = {
    en: {
      home: 'Home',
      about: 'About',
      contact: 'Contact',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      login: 'Login',
      logout: 'Logout',
      profile: 'Profile',
    },
    fr: {
      home: 'Accueil',
      about: 'À propos',
      contact: 'Contact',
      terms: 'Conditions d\'utilisation',
      privacy: 'Politique de confidentialité',
      login: 'Se connecter',
      logout: 'Se déconnecter',
      profile: 'Profil',
    },
    ar: {
      home: 'الرئيسية',
      about: 'معلومات عنا',
      contact: 'اتصل بنا',
      terms: 'الشروط والأحكام',
      privacy: 'سياسة الخصوصية',
      login: 'تسجيل الدخول',
      logout: 'تسجيل الخروج',
      profile: 'الملف الشخصي',
    },
  };
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (language === 'ar') {
      htmlElement.setAttribute('dir', 'rtl'); // Set right-to-left direction for Arabic
    } else {
      htmlElement.setAttribute('dir', 'ltr'); // Set left-to-right direction for other languages
    }
  }, [language]);
  return (
    <nav className="bg-[#334B35] text-white shadow-md fixed top-0 left-0 right-0 z-50">
      {/* Mobile Hamburger Menu */}
      <div className="absolute top-4 right-4 md:hidden">
        <button onClick={toggleMenu} className="text-white text-3xl">
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Navbar Content */}
      <div className="container mx-auto flex items-center justify-between px-8 py-4 md:px-16 md:py-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
          <span className="text-2xl font-semibold text-white">Eng-Nasr Ibrahim</span>
        </div>

        {/* Navbar Links */}
        <div className={`flex items-center space-x-6 md:flex-row ${isMenuOpen ? 'flex flex-col space-y-4' : 'hidden'} md:block`}>
          {/* Language Dropdown */}
          <div className="relative flex">
            <IconButton onClick={handleLangMenuClick} className="text-white hover:text-indigo-500 transition duration-200">
              <LanguageIcon />
            </IconButton>
            <Menu
              id="language-menu"
              anchorEl={langMenuAnchor}
              open={Boolean(langMenuAnchor)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => switchLanguage('en')} className="text-black hover:bg-indigo-200">EN</MenuItem>
              <MenuItem onClick={() => switchLanguage('fr')} className="text-black hover:bg-indigo-200">FR</MenuItem>
              <MenuItem onClick={() => switchLanguage('ar')} className="text-black hover:bg-indigo-200">AR</MenuItem>
            </Menu>
          <div className="mt-4 md:mt-0">
            {user ? (
              <div>
                <IconButton onClick={handleUserMenuClick} className="text-white" aria-controls="user-menu" aria-haspopup="true">
                  <AccountCircleIcon />
                </IconButton>

                <Menu
                  id="user-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem component={Link} to="/profile" onClick={handleClose}>
                    <AccountCircleIcon className="mr-2 text-white" />
                    {texts[language].profile}
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ExitToAppIcon className="mr-2 text-white" />
                    {texts[language].logout}
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Link to="/login" className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full flex items-center gap-2 transition duration-300 ease-in-out transform hover:scale-105">
                <span>{texts[language].login}</span>
              </Link>
            )}
          </div>
          </div>

          {/* User Dropdown (Profile, Logout) */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
