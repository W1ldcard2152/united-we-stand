import { useState, useEffect } from 'react';
import { getViewportWidth, isMobileView, isSmallMobile } from '../utils/mobileUtils';

export const useResponsive = () => {
  const [windowWidth, setWindowWidth] = useState(getViewportWidth());
  const [isMobile, setIsMobile] = useState(isMobileView());
  const [isSmall, setIsSmall] = useState(isSmallMobile());

  useEffect(() => {
    const handleResize = () => {
      const width = getViewportWidth();
      setWindowWidth(width);
      setIsMobile(width < 1024);
      setIsSmall(width < 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    windowWidth,
    isMobile,
    isSmall,
    isTablet: windowWidth >= 640 && windowWidth < 1024,
    isDesktop: windowWidth >= 1024
  };
};