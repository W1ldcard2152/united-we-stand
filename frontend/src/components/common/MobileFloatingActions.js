import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, 
  FaCalendarPlus, 
  FaHandsHelping, 
  FaEnvelope, 
  FaPhone,
  FaTimes
} from 'react-icons/fa';
import { colors, typography, spacing, shadows, borderRadius, zIndex } from '../../constants/theme';
import { useResponsive } from '../../hooks';

const FloatingButtonWrapper = styled.div`
  position: fixed;
  bottom: ${spacing.xl};
  right: ${spacing.xl};
  z-index: ${zIndex.fixed};
  
  @media (min-width: 1024px) {
    display: none;
  }
`;

const MainButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(45deg, ${colors.primary.green}, ${colors.primary.lightGreen});
  border: none;
  color: ${colors.neutral.white};
  font-size: ${typography.fontSize.xl};
  cursor: pointer;
  box-shadow: ${shadows.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: ${shadows['2xl']};
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const ActionMenu = styled(motion.div)`
  position: absolute;
  bottom: 70px;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  align-items: flex-end;
`;

const ActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  background: ${colors.neutral.white};
  border: none;
  padding: ${spacing.md} ${spacing.lg};
  border-radius: ${borderRadius.full};
  box-shadow: ${shadows.lg};
  cursor: pointer;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.neutral.darkGray};
  transition: all 0.3s ease;
  white-space: nowrap;
  
  svg {
    color: ${props => props.iconColor || colors.primary.blue};
    font-size: ${typography.fontSize.base};
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${shadows.xl};
    background: ${props => props.iconColor || colors.primary.blue};
    color: ${colors.neutral.white};
    
    svg {
      color: ${colors.neutral.white};
    }
  }
`;

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: ${zIndex.modalBackdrop};
`;

const actions = [
  {
    icon: FaCalendarPlus,
    label: 'View Calendar',
    color: colors.primary.blue,
    action: () => {
      const calendarElement = document.getElementById('calendar');
      if (calendarElement) {
        calendarElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  },
  {
    icon: FaHandsHelping,
    label: 'Volunteer',
    color: colors.accent.success,
    action: () => {
      window.open('mailto:volunteers@unitedwestandcac.org?subject=Volunteer Interest', '_blank');
    }
  },
  {
    icon: FaEnvelope,
    label: 'Contact Us',
    color: colors.primary.green,
    action: () => {
      window.open('mailto:info@unitedwestandcac.org', '_blank');
    }
  },
  {
    icon: FaPhone,
    label: 'Call Us',
    color: colors.accent.warning,
    action: () => {
      window.open('tel:+13159463373', '_blank');
    }
  }
];

function MobileFloatingActions() {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useResponsive();

  if (!isMobile) {
    return null;
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleActionClick = (action) => {
    action.action();
    setIsOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <Backdrop
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
      
      <FloatingButtonWrapper>
        <AnimatePresence>
          {isOpen && (
            <ActionMenu
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {actions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <ActionButton
                    key={action.label}
                    iconColor={action.color}
                    onClick={() => handleActionClick(action)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent />
                    {action.label}
                  </ActionButton>
                );
              })}
            </ActionMenu>
          )}
        </AnimatePresence>
        
        <MainButton
          onClick={toggleMenu}
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {isOpen ? <FaTimes /> : <FaPlus />}
        </MainButton>
      </FloatingButtonWrapper>
    </>
  );
}

export default MobileFloatingActions;