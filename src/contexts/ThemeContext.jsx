/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Dark/Light mode detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleThemeChange = (e) => {
      setIsDarkMode(e.matches);
    };

    // Set initial value
    setIsDarkMode(mediaQuery.matches);
    
    // Listen for changes
    mediaQuery.addEventListener('change', handleThemeChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, []);

  // Mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 450);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Get computed CSS variables
  const getThemeColors = useCallback(() => {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    
    return {
      textColor: computedStyle.getPropertyValue('--text-color').trim() || (isDarkMode ? 'rgba(255, 255, 255, 0.87)' : '#213547'),
      bgColor: computedStyle.getPropertyValue('--bg-color').trim() || (isDarkMode ? '#242424' : '#ffffff'),
      headerBg: computedStyle.getPropertyValue('--header-bg').trim() || (isDarkMode ? '#1a1a1a' : '#f8f9fa'),
      borderColor: computedStyle.getPropertyValue('--border-color').trim() || (isDarkMode ? '#404040' : '#e0e0e0'),
      linkColor: computedStyle.getPropertyValue('--link-color').trim() || '#646cff',
      linkHover: computedStyle.getPropertyValue('--link-hover').trim() || (isDarkMode ? '#535bf2' : '#747bff'),
    };
  }, [isDarkMode]);

  const value = {
    isDarkMode,
    isMobile,
    getThemeColors,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};