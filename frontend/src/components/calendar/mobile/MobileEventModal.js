import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import moment from 'moment';
import { 
  FaTimes, 
  FaCalendarAlt, 
  FaClock, 
  FaMapMarkerAlt, 
  FaUsers,
  FaEnvelope,
  FaPhone,
  FaShare,
  FaHeart,
  FaHandsHelping,
  FaGraduationCap,
  FaBoxOpen
} from 'react-icons/fa';
import { colors, typography, spacing, borderRadius, shadows, zIndex } from '../../../constants/theme';
import { Button } from '../../../styles/GlobalStyles';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: ${zIndex.modal};
  padding: 0;
  backdrop-filter: blur(4px);
  
  @media (min-width: 768px) {
    align-items: center;
    padding: ${spacing.lg};
  }
`;

const ModalContent = styled(motion.div)`
  background: ${colors.neutral.white};
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: ${borderRadius.xl} ${borderRadius.xl} 0 0;
  box-shadow: ${shadows['2xl']};
  
  @media (min-width: 768px) {
    max-width: 600px;
    max-height: 85vh;
    border-radius: ${borderRadius.xl};
  }
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${colors.neutral.lightGray};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${colors.primary.blue};
    border-radius: 3px;
  }
`;

const ModalHeader = styled.div`
  position: sticky;
  top: 0;
  background: ${colors.neutral.white};
  padding: ${spacing.lg};
  border-bottom: 1px solid ${colors.neutral.lightGray};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${spacing.md};
  z-index: 10;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: ${typography.fontSize['2xl']};
  color: ${colors.primary.navy};
  font-weight: ${typography.fontWeight.bold};
  line-height: ${typography.lineHeight.tight};
  flex: 1;
`;

const CloseButton = styled.button`
  background: ${colors.neutral.lightGray};
  border: none;
  color: ${colors.neutral.gray};
  cursor: pointer;
  padding: ${spacing.sm};
  border-radius: ${borderRadius.full};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  
  &:hover {
    background: ${colors.accent.error};
    color: ${colors.neutral.white};
    transform: scale(1.1);
  }
`;

const ModalBody = styled.div`
  padding: 0 ${spacing.lg} ${spacing.lg} ${spacing.lg};
`;

const EventCategory = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.sm};
  background: ${props => props.color || colors.primary.blue};
  color: ${colors.neutral.white};
  padding: ${spacing.sm} ${spacing.lg};
  border-radius: ${borderRadius.full};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  margin-bottom: ${spacing.xl};
`;

const EventDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
  margin-bottom: ${spacing.xl};
`;

const EventDetail = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${spacing.lg};
  
  svg {
    color: ${colors.primary.blue};
    font-size: ${typography.fontSize.xl};
    min-width: 24px;
    margin-top: 2px;
    flex-shrink: 0;
  }
  
  .detail-content {
    flex: 1;
    
    .detail-label {
      font-size: ${typography.fontSize.sm};
      color: ${colors.neutral.gray};
      font-weight: ${typography.fontWeight.medium};
      margin-bottom: ${spacing.xs};
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .detail-value {
      font-size: ${typography.fontSize.lg};
      color: ${colors.neutral.darkGray};
      font-weight: ${typography.fontWeight.medium};
      line-height: ${typography.lineHeight.tight};
    }
  }
`;

const EventDescription = styled.div`
  background: ${colors.neutral.lightGray};
  padding: ${spacing.xl};
  border-radius: ${borderRadius.lg};
  margin-bottom: ${spacing.xl};
  
  p {
    color: ${colors.neutral.darkGray};
    line-height: ${typography.lineHeight.relaxed};
    margin: 0;
    font-size: ${typography.fontSize.base};
  }
`;

const AttendanceSection = styled.div`
  background: rgba(46, 204, 113, 0.1);
  padding: ${spacing.lg};
  border-radius: ${borderRadius.lg};
  margin-bottom: ${spacing.xl};
  border-left: 4px solid ${colors.primary.green};
  
  .attendance-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${spacing.md};
    
    .attendance-title {
      font-size: ${typography.fontSize.base};
      font-weight: ${typography.fontWeight.semibold};
      color: ${colors.neutral.darkGray};
    }
    
    .attendance-count {
      font-size: ${typography.fontSize.lg};
      font-weight: ${typography.fontWeight.bold};
      color: ${colors.primary.green};
    }
  }
  
  .progress-bar {
    background: ${colors.neutral.white};
    border-radius: ${borderRadius.full};
    height: 8px;
    overflow: hidden;
    margin-bottom: ${spacing.sm};
    
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, ${colors.primary.green}, ${colors.primary.lightGreen});
      border-radius: ${borderRadius.full};
      transition: width 0.3s ease;
    }
  }
  
  .attendance-percentage {
    font-size: ${typography.fontSize.sm};
    color: ${colors.neutral.gray};
    text-align: center;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  padding-top: ${spacing.xl};
  border-top: 1px solid ${colors.neutral.lightGray};
  
  @media (min-width: 480px) {
    flex-direction: row;
  }
`;

const ShareButton = styled.button`
  background: ${colors.neutral.lightGray};
  border: none;
  color: ${colors.neutral.darkGray};
  padding: ${spacing.md} ${spacing.lg};
  border-radius: ${borderRadius.lg};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm};
  
  &:hover {
    background: ${colors.primary.blue};
    color: ${colors.neutral.white};
    transform: translateY(-1px);
  }
`;

// Event categories with colors and icons
const eventCategories = {
  'community-meeting': { 
    name: 'Community Meeting', 
    color: colors.primary.green,
    icon: FaUsers
  },
  'resource-distribution': { 
    name: 'Resource Distribution', 
    color: colors.accent.warning,
    icon: FaBoxOpen
  },
  'workshop': { 
    name: 'Workshop/Training', 
    color: colors.primary.blue,
    icon: FaGraduationCap
  },
  'volunteer-opportunity': { 
    name: 'Volunteer Opportunity', 
    color: colors.accent.success,
    icon: FaHandsHelping
  }
};

function MobileEventModal({ event, isOpen, onClose }) {
  const [isSharing, setIsSharing] = useState(false);
  
  if (!event || !isOpen) return null;

  const category = eventCategories[event.category];
  const IconComponent = category?.icon || FaUsers;
  
  const getAttendancePercentage = (current, max) => {
    return max > 0 ? Math.round((current / max) * 100) : 0;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        setIsSharing(true);
        await navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      } finally {
        setIsSharing(false);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Event link copied to clipboard!');
    }
  };

  const modalVariants = {
    hidden: { 
      y: '100%',
      opacity: 0
    },
    visible: { 
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 200
      }
    },
    exit: { 
      y: '100%',
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <ModalContent
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={e => e.stopPropagation()}
      >
        <ModalHeader>
          <ModalTitle>{event.title}</ModalTitle>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <EventCategory color={category?.color}>
            <IconComponent />
            {category?.name}
          </EventCategory>

          <EventDetails>
            <EventDetail>
              <FaCalendarAlt />
              <div className="detail-content">
                <div className="detail-label">Date</div>
                <div className="detail-value">
                  {moment(event.start).format('MMMM Do, YYYY')}
                </div>
              </div>
            </EventDetail>

            <EventDetail>
              <FaClock />
              <div className="detail-content">
                <div className="detail-label">Time</div>
                <div className="detail-value">
                  {moment(event.start).format('h:mm A')} - {moment(event.end).format('h:mm A')}
                </div>
              </div>
            </EventDetail>

            {event.location && (
              <EventDetail>
                <FaMapMarkerAlt />
                <div className="detail-content">
                  <div className="detail-label">Location</div>
                  <div className="detail-value">{event.location}</div>
                </div>
              </EventDetail>
            )}

            {(event.maxAttendees || event.currentAttendees) && (
              <EventDetail>
                <FaUsers />
                <div className="detail-content">
                  <div className="detail-label">Capacity</div>
                  <div className="detail-value">
                    {event.currentAttendees || 0} / {event.maxAttendees || 'Unlimited'} attendees
                  </div>
                </div>
              </EventDetail>
            )}
          </EventDetails>

          {event.description && (
            <EventDescription>
              <p>{event.description}</p>
            </EventDescription>
          )}

          {event.maxAttendees > 0 && (
            <AttendanceSection>
              <div className="attendance-header">
                <span className="attendance-title">Registration Status</span>
                <span className="attendance-count">
                  {getAttendancePercentage(event.currentAttendees, event.maxAttendees)}% Full
                </span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ 
                    width: `${getAttendancePercentage(event.currentAttendees, event.maxAttendees)}%` 
                  }}
                />
              </div>
              <div className="attendance-percentage">
                {event.currentAttendees || 0} of {event.maxAttendees} spots filled
              </div>
            </AttendanceSection>
          )}

          <ActionButtons>
            <Button 
              variant="primary"
              style={{ flex: 1 }}
            >
              Register / Learn More
            </Button>
            
            {event.contact && (
              <Button 
                variant="secondary" 
                as="a" 
                href={`mailto:${event.contact}`}
                style={{ flex: 1 }}
              >
                <FaEnvelope />
                Contact Organizer
              </Button>
            )}
            
            <ShareButton onClick={handleShare} disabled={isSharing}>
              <FaShare />
              {isSharing ? 'Sharing...' : 'Share Event'}
            </ShareButton>
          </ActionButtons>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
}

export default MobileEventModal;