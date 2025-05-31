// Mobile touch utility functions
export const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

export const getViewportWidth = () => {
  return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
};

export const isMobileView = () => {
  return getViewportWidth() < 1024; // lg breakpoint
};

export const isSmallMobile = () => {
  return getViewportWidth() < 640; // sm breakpoint
};

// Touch-friendly event handlers
export const createTouchHandler = (onClick, onTouchStart) => {
  return {
    onClick: onClick,
    onTouchStart: onTouchStart || onClick,
    style: {
      WebkitTapHighlightColor: 'transparent',
      touchAction: 'manipulation'
    }
  };
};

// Prevent zoom on double tap for specific elements
export const preventZoom = {
  onTouchStart: (e) => {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  },
  style: {
    touchAction: 'pan-x pan-y',
    WebkitUserSelect: 'none',
    userSelect: 'none'
  }
};

// Smooth scroll utility
export const smoothScrollTo = (elementId, offset = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const top = element.offsetTop - offset;
    window.scrollTo({
      top,
      behavior: 'smooth'
    });
  }
};