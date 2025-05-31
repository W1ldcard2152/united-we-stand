// Design System Constants for United We Stand CAC

export const colors = {
  // Primary Colors - Light Beige Theme
  primary: {
    beige: '#e0e0db',       // Main header background
    darkBeige: '#d0d0cb',   // Darker beige for contrast
    lightBeige: '#f0f0eb',  // Lighter beige for hover states
    navy: '#2c3e50',        // Keep navy for text
    blue: '#3498db',        // Keep blue for accents
    green: '#27ae60',       // Keep original green
    lightGreen: '#2ecc71',  // Keep original light green
  },
  
  // Neutral Colors
  neutral: {
    white: '#ffffff',
    lightGray: '#f8f9fa',
    gray: '#7f8c8d',
    darkGray: '#34495e',
    black: '#2c3e50',
  },
  
  // Accent Colors
  accent: {
    success: '#27ae60',
    warning: '#f39c12',
    error: '#e74c3c',
    info: '#3498db',
  },
  
  // Gradients
  gradients: {
    primary: 'linear-gradient(45deg, #5a9a8a, #4a8a7a)',
    primaryHover: 'linear-gradient(45deg, #4a8a7a, #5a9a8a)',
    hero: 'linear-gradient(135deg, #5a9a8a 0%, #7ab3a7 100%)',
    originalGreen: 'linear-gradient(45deg, #2ecc71, #27ae60)',
    originalGreenHover: 'linear-gradient(45deg, #27ae60, #2ecc71)',
  }
};

export const typography = {
  fontFamily: {
    primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    secondary: 'Georgia, "Times New Roman", serif',
  },
  
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '4rem',     // 64px
  },
  
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  }
};

export const spacing = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
  '4xl': '6rem',    // 96px
  '5xl': '8rem',    // 128px
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
};

export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
};

export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

// Animation easing
export const easing = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
};

export const transitions = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
};
