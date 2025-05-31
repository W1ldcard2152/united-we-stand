import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import moment from 'moment';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaMapMarkerAlt, 
  FaUsers,
  FaHeart,
  FaHandsHelping,
  FaGraduationCap,
  FaBoxOpen,
  FaChevronRight
} from 'react-icons/fa';
import { colors, typography, spacing, borderRadius, shadows, breakpoints } from '../../../constants/theme';

const EventListWrapper = styled.div`
  background: ${colors.neutral.white};
  border-radius: ${borderRadius.xl};
  box-shadow: ${shadows.lg};
  overflow: hidden;
  width: 100%;
`;

const EventListHeader = styled.div`
  background: ${colors.primary.blue};
  color: ${colors.neutral.white};
  padding: ${spacing.lg};
  text-align: center;
  
  h3 {
    margin: 0;
    font-size: ${typography.fontSize.xl};
    font-weight: ${typography.fontWeight.bold};
  }
  
  p {
    margin: ${spacing.sm} 0 0 0;
    opacity: 0.9;
    font-size: ${typography.fontSize.sm};
  }
`;

const EventList = styled.div`
  max-height: 500px;
  overflow-y: auto;
  
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

const EventCard = styled(motion.div)`
  padding: ${spacing.lg};
  border-bottom: 1px solid ${colors.neutral.lightGray};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${colors.neutral.lightGray};
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const EventHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${spacing.md};
  gap: ${spacing.md};
`;

const EventTitle = styled.h4`
  margin: 0;
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.primary.navy};
  line-height: ${typography.lineHeight.tight};
  flex: 1;
`;

const EventCategory = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  background: ${props => props.color || colors.primary.blue};
  color: ${colors.neutral.white};
  padding: ${spacing.xs} ${spacing.sm};
  border-radius: ${borderRadius.full};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
  flex-shrink: 0;
  
  svg {
    font-size: ${typography.fontSize.xs};
  }
`;

const EventDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  margin-bottom: ${spacing.md};
`;

const EventDetail = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  font-size: ${typography.fontSize.sm};
  color: ${colors.neutral.darkGray};
  
  svg {
    color: ${colors.primary.blue};
    font-size: ${typography.fontSize.base};
    min-width: 16px;
  }
`;

const EventDescription = styled.p`
  font-size: ${typography.fontSize.sm};
  color: ${colors.neutral.gray};
  line-height: ${typography.lineHeight.relaxed};
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const EventAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${spacing.md};
  padding-top: ${spacing.md};
  border-top: 1px solid ${colors.neutral.lightGray};
`;

const AttendanceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  font-size: ${typography.fontSize.xs};
  color: ${colors.neutral.gray};
  
  .attendance-bar {
    width: 60px;
    height: 4px;
    background: ${colors.neutral.lightGray};
    border-radius: 2px;
    overflow: hidden;
    
    .fill {
      height: 100%;
      background: ${colors.primary.green};
      border-radius: 2px;
      transition: width 0.3s ease;
    }
  }
`;

const ViewMoreButton = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  color: ${colors.primary.blue};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  
  svg {
    font-size: ${typography.fontSize.xs};
    transition: transform 0.3s ease;
  }
  
  ${EventCard}:hover & svg {
    transform: translateX(2px);
  }
`;

const NoEventsMessage = styled.div`
  text-align: center;
  padding: ${spacing['2xl']};
  color: ${colors.neutral.gray};
  
  svg {
    font-size: ${typography.fontSize['3xl']};
    margin-bottom: ${spacing.lg};
    opacity: 0.5;
  }
  
  h4 {
    color: ${colors.neutral.darkGray};
    margin-bottom: ${spacing.sm};
  }
  
  p {
    margin: 0;
    font-style: italic;
  }
`;

const DateGroupHeader = styled.div`
  background: ${colors.neutral.lightGray};
  padding: ${spacing.md} ${spacing.lg};
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${typography.fontSize.sm};
  color: ${colors.primary.navy};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid ${colors.neutral.gray};
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

function EventListView({ events = [], onEventSelect, title = "Upcoming Events" }) {
  // Group events by date
  const eventsByDate = events.reduce((acc, event) => {
    const dateKey = moment(event.start).format('YYYY-MM-DD');
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {});

  // Sort dates
  const sortedDates = Object.keys(eventsByDate).sort();

  const getAttendancePercentage = (current, max) => {
    return max > 0 ? Math.round((current / max) * 100) : 0;
  };

  const formatEventTime = (start, end) => {
    const startTime = moment(start).format('h:mm A');
    const endTime = moment(end).format('h:mm A');
    return `${startTime} - ${endTime}`;
  };

  const formatEventDate = (date) => {
    const eventDate = moment(date);
    const today = moment();
    const tomorrow = moment().add(1, 'day');
    
    if (eventDate.isSame(today, 'day')) {
      return 'Today';
    } else if (eventDate.isSame(tomorrow, 'day')) {
      return 'Tomorrow';
    } else if (eventDate.isSame(today, 'week')) {
      return eventDate.format('dddd');
    } else {
      return eventDate.format('MMMM Do, YYYY');
    }
  };

  if (events.length === 0) {
    return (
      <EventListWrapper>
        <EventListHeader>
          <h3>{title}</h3>
          <p>Stay connected with community activities</p>
        </EventListHeader>
        <NoEventsMessage>
          <FaCalendarAlt />
          <h4>No events scheduled</h4>
          <p>Check back soon for upcoming community events and activities.</p>
        </NoEventsMessage>
      </EventListWrapper>
    );
  }

  return (
    <EventListWrapper>
      <EventListHeader>
        <h3>{title}</h3>
        <p>{events.length} event{events.length !== 1 ? 's' : ''} found</p>
      </EventListHeader>
      
      <EventList>
        {sortedDates.map(dateKey => (
          <div key={dateKey}>
            <DateGroupHeader>
              {formatEventDate(dateKey)}
            </DateGroupHeader>
            {eventsByDate[dateKey].map((event, index) => {
              const category = eventCategories[event.category];
              const IconComponent = category?.icon || FaCalendarAlt;
              
              return (
                <EventCard
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => onEventSelect?.(event)}
                  whileTap={{ scale: 0.98 }}
                >
                  <EventHeader>
                    <EventTitle>{event.title}</EventTitle>
                    <EventCategory color={category?.color}>
                      <IconComponent />
                      {category?.name}
                    </EventCategory>
                  </EventHeader>
                  
                  <EventDetails>
                    <EventDetail>
                      <FaClock />
                      {formatEventTime(event.start, event.end)}
                    </EventDetail>
                    
                    {event.location && (
                      <EventDetail>
                        <FaMapMarkerAlt />
                        {event.location}
                      </EventDetail>
                    )}
                    
                    {(event.maxAttendees || event.currentAttendees) && (
                      <EventDetail>
                        <FaUsers />
                        {event.currentAttendees || 0} / {event.maxAttendees || 'Unlimited'} attendees
                      </EventDetail>
                    )}
                  </EventDetails>
                  
                  {event.description && (
                    <EventDescription>
                      {event.description}
                    </EventDescription>
                  )}
                  
                  <EventAction>
                    {event.maxAttendees > 0 && (
                      <AttendanceInfo>
                        <span>{getAttendancePercentage(event.currentAttendees, event.maxAttendees)}% full</span>
                        <div className="attendance-bar">
                          <div 
                            className="fill" 
                            style={{ 
                              width: `${getAttendancePercentage(event.currentAttendees, event.maxAttendees)}%` 
                            }}
                          />
                        </div>
                      </AttendanceInfo>
                    )}
                    
                    <ViewMoreButton>
                      View Details
                      <FaChevronRight />
                    </ViewMoreButton>
                  </EventAction>
                </EventCard>
              );
            })}
          </div>
        ))}
      </EventList>
    </EventListWrapper>
  );
}

export default EventListView;