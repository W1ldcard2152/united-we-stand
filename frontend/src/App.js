import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { colors } from './constants/theme';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MobileFloatingActions from './components/common/MobileFloatingActions';

// Section Components
import HeroSection from './components/sections/HeroSection';
import CalendarSection from './components/calendar/CalendarSection';

// Pages
import HomePage from './pages/HomePage';

// Utilities
import { useApi } from './hooks';

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

const LoadingScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: ${colors.neutral.white};
  
  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid ${colors.neutral.lightGray};
    border-top: 4px solid ${colors.primary.blue};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorScreen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: ${colors.neutral.white};
  padding: 2rem;
  text-align: center;
  
  h2 {
    color: ${colors.primary.navy};
    margin-bottom: 1rem;
  }
  
  p {
    color: ${colors.neutral.darkGray};
    margin-bottom: 2rem;
  }
  
  button {
    background: ${colors.primary.blue};
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    
    &:hover {
      background: ${colors.primary.navy};
    }
  }
`;

function App() {
  const { data: content, loading, error, refetch } = useApi('/content/home');

  if (loading) {
    return (
      <LoadingScreen>
        <div className="spinner"></div>
      </LoadingScreen>
    );
  }

  if (error) {
    return (
      <ErrorScreen>
        <h2>Something went wrong</h2>
        <p>We're having trouble loading the content. Please try again.</p>
        <button onClick={refetch}>
          Try Again
        </button>
      </ErrorScreen>
    );
  }

  if (!content) {
    return (
      <ErrorScreen>
        <h2>No content available</h2>
        <p>We couldn't find any content to display.</p>
        <button onClick={refetch}>
          Refresh
        </button>
      </ErrorScreen>
    );
  }

  return (
    <Router>
      <ThemeProvider theme={{}}>
        <GlobalStyles />
        <AppWrapper>
          <Header headerContent={content.header} />
          
          <MainContent>
            <Routes>
              <Route 
                path="/" 
                element={<HomePage content={content} />} 
              />
              <Route 
                path="/learn-about-uws" 
                element={<div>Learn About UWS Page - Coming Soon</div>} 
              />
              <Route 
                path="/blogs" 
                element={<div>Blogs Page - Coming Soon</div>} 
              />
              <Route 
                path="/how-we-support" 
                element={<div>How We Support Page - Coming Soon</div>} 
              />
              <Route 
                path="/partnerships" 
                element={<div>Partnerships Page - Coming Soon</div>} 
              />
              <Route 
                path="/wayne-county-bulletin-board" 
                element={<div>Wayne County Bulletin Board - Coming Soon</div>} 
              />
              <Route 
                path="/community-resources" 
                element={<div>Community Resources Page - Coming Soon</div>} 
              />
              <Route 
                path="/provider-professional-resources" 
                element={<div>Provider/Professional Resources Page - Coming Soon</div>} 
              />
            </Routes>
          </MainContent>
          
          <Footer footerContent={content.footer} />
          <MobileFloatingActions />
        </AppWrapper>
      </ThemeProvider>
    </Router>
  );
}

export default App;
