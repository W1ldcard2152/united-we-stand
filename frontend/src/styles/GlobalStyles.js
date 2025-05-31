import styled, { createGlobalStyle } from 'styled-components';
import { colors, typography, spacing, shadows, borderRadius } from '../constants/theme';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Global Styles
export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${typography.fontFamily.primary};
    font-size: ${typography.fontSize.base};
    line-height: ${typography.lineHeight.normal};
    color: ${colors.neutral.darkGray};
    background-color: ${colors.neutral.white};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${colors.primary.navy};
    font-weight: ${typography.fontWeight.bold};
    line-height: ${typography.lineHeight.tight};
    margin-bottom: ${spacing.md};
  }

  h1 {
    font-size: ${typography.fontSize['4xl']};
  }

  h2 {
    font-size: ${typography.fontSize['3xl']};
  }

  h3 {
    font-size: ${typography.fontSize['2xl']};
  }

  h4 {
    font-size: ${typography.fontSize.xl};
  }

  h5 {
    font-size: ${typography.fontSize.lg};
  }

  h6 {
    font-size: ${typography.fontSize.base};
  }

  p {
    margin-bottom: ${spacing.md};
  }

  a {
    color: ${colors.primary.blue};
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${colors.primary.navy};
    }
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  ul, ol {
    margin-left: ${spacing.lg};
    margin-bottom: ${spacing.md};
  }

  // Focus styles for accessibility
  button:focus,
  a:focus,
  input:focus,
  textarea:focus,
  select:focus {
    outline: 2px solid ${colors.primary.blue};
    outline-offset: 2px;
  }

  // Screen reader only class
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  // Mobile-specific optimizations
  html, body {
    overflow-x: hidden;
    max-width: 100vw;
  }

  // Improve touch targets
  button, a, input, textarea, select {
    min-height: 44px;
    min-width: 44px;
  }

  // Smooth scrolling for mobile
  html {
    -webkit-overflow-scrolling: touch;
  }

  // Prevent zoom on form inputs on iOS
  input, textarea, select {
    font-size: 16px !important;
  }

  // Remove tap highlight on iOS
  * {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
  }

  // Prevent text selection on UI elements
  button, .no-select {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  // Mobile-specific animations
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  // Touch-friendly spacing for mobile
  @media (max-width: 768px) {
    .mobile-touch-spacing > * + * {
      margin-top: 1rem;
    }
    
    .mobile-card {
      padding: 1.5rem;
    }
    
    .mobile-modal {
      margin: 0;
      min-height: 100vh;
      border-radius: 0;
    }
  }
`;

// Common styled components
export const Container = styled.div`
  max-width: ${props => props.maxWidth || '1200px'};
  margin: 0 auto;
  padding: 0 ${spacing.lg};
  
  @media (max-width: 768px) {
    padding: 0 ${spacing.md};
  }
`;

export const Section = styled.section`
  padding: ${props => props.padding || `${spacing['3xl']} 0`};
  background-color: ${props => props.background || 'transparent'};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || 'repeat(auto-fit, minmax(300px, 1fr))'};
  gap: ${props => props.gap || spacing.xl};
  align-items: ${props => props.align || 'stretch'};
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  align-items: ${props => props.align || 'center'};
  justify-content: ${props => props.justify || 'flex-start'};
  gap: ${props => props.gap || spacing.md};
  flex-wrap: ${props => props.wrap || 'nowrap'};
`;

export const Card = styled.div`
  background: ${colors.neutral.white};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.md};
  padding: ${spacing.xl};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${shadows.xl};
  }
`;

export const Button = styled.button`
  background: ${props => {
    if (props.variant === 'primary') return colors.gradients.originalGreen;
    if (props.variant === 'secondary') return colors.neutral.white;
    if (props.variant === 'outline') return 'transparent';
    return colors.gradients.originalGreen;
  }};
  
  color: ${props => {
    if (props.variant === 'secondary') return colors.primary.navy;
    if (props.variant === 'outline') return colors.primary.blue;
    return colors.neutral.white;
  }};
  
  border: ${props => {
    if (props.variant === 'outline') return `2px solid ${colors.primary.blue}`;
    if (props.variant === 'secondary') return `1px solid ${colors.neutral.gray}`;
    return 'none';
  }};
  
  padding: ${props => props.size === 'large' ? `${spacing.lg} ${spacing['2xl']}` : `${spacing.md} ${spacing.xl}`};
  border-radius: ${borderRadius.full};
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${props => props.size === 'large' ? typography.fontSize.lg : typography.fontSize.base};
  transition: all 0.3s ease;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: ${spacing.sm};
  
  &:hover {
    background: ${props => {
      if (props.variant === 'primary') return colors.gradients.originalGreenHover;
      if (props.variant === 'secondary') return colors.neutral.lightGray;
      if (props.variant === 'outline') return colors.primary.blue;
      return colors.gradients.originalGreenHover;
    }};
    
    color: ${props => {
      if (props.variant === 'outline') return colors.neutral.white;
      return props.variant === 'secondary' ? colors.primary.navy : colors.neutral.white;
    }};
    
    transform: translateY(-2px);
    box-shadow: ${shadows.lg};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: ${spacing.md};
  border: 2px solid ${colors.neutral.gray};
  border-radius: ${borderRadius.md};
  font-size: ${typography.fontSize.base};
  transition: border-color 0.3s ease;
  
  &:focus {
    border-color: ${colors.primary.blue};
    outline: none;
  }
  
  &::placeholder {
    color: ${colors.neutral.gray};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: ${spacing.md};
  border: 2px solid ${colors.neutral.gray};
  border-radius: ${borderRadius.md};
  font-size: ${typography.fontSize.base};
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.3s ease;
  
  &:focus {
    border-color: ${colors.primary.blue};
    outline: none;
  }
  
  &::placeholder {
    color: ${colors.neutral.gray};
  }
`;
