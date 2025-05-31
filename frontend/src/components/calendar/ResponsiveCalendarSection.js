import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, 
  FaCalendarAlt, 
  FaClock, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaHeart,
  FaHandsHelping,
  FaGraduationCap,
  FaBoxOpen,
  FaUserPlus,
  FaList,
  FaCalendar,
  FaFilter
} from 'react-icons/fa';
import { colors, typography, spacing, breakpoints, shadows, borderRadius } from '../../constants/theme';
import { Container, Button, Card } from '../../styles/GlobalStyles';
import { mockEvents } from '../../mockData';
import { MobileCalendar, EventListView, MobileEventModal } from './mobile';

// Import required CSS for react-big-calendar
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Set up the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

const CalendarWrapper = styled.section`
  padding: ${spacing.xl} 0 ${spacing['4xl']} 0;
  background: ${colors.neutral.white};
  position: relative;
`;

const CalendarContainer = styled(Container)`
  max-width: 1200px;
`;

const CalendarHeader = styled.div`
  text-align: center;
  margin-bottom: ${spacing['2xl']};
  
  h2 {
    font-size: ${typography.fontSize['3xl']};
    color: ${colors.primary.navy};
    margin-bottom: ${spacing.md};
    font-weight: ${typography.fontWeight.bold};
    
    @media (max-width: ${breakpoints.md}) {
      font-size: ${typography.fontSize['2xl']};
    }
  }
  
  p {
    font-size: ${typography.fontSize.lg};
    color: ${colors.neutral.darkGray};
    max-width: 600px;
    margin: 0 auto;
    line-height: ${typography.lineHeight.relaxed};
    
    @media (max-width: ${breakpoints.md}) {
      font-size: ${typography.fontSize.base};
    }
  }
`;

const StatsSection = styled.div`
  display: flex;
  justify-content: center;
  gap: ${spacing['2xl']};
  margin-bottom: ${spacing['2xl']};
  padding: ${spacing.lg} 0;
  background: ${colors.neutral.lightGray};
  border-radius: ${borderRadius.lg};
  
  @media (max-width: ${breakpoints.md}) {
    flex-wrap: wrap;
    gap: ${spacing.lg};
  }
  
  @media (max-width: ${breakpoints.sm}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${spacing.md};
    padding: ${spacing.lg};
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const QuickStat = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  
  @media (max-width: ${breakpoints.sm}) {
    background: ${colors.neutral.white};
    padding: ${spacing.md};
    border-radius: ${borderRadius.md};
    box-shadow: ${shadows.sm};
    border: 1px solid ${colors.neutral.lightGray};
    flex-direction: column;
    text-align: center;
    gap: ${spacing.xs};
    min-height: 100px;
    justify-content: center;
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: ${shadows.md};
      transform: translateY(-2px);
      border-color: ${colors.primary.blue};
    }
  }
  
  .stat-icon {
    font-size: ${typography.fontSize.xl};
    color: ${colors.primary.blue};
    
    @media (max-width: ${breakpoints.sm}) {
      font-size: ${typography.fontSize['2xl']};
    }
  }
  
  .stat-content {
    @media (max-width: ${breakpoints.sm}) {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: ${spacing.xs};
    }
    
    .stat-number {
      font-size: ${typography.fontSize.lg};
      font-weight: ${typography.fontWeight.bold};
      color: ${colors.primary.navy};
      line-height: 1;
      margin: 0;
      
      @media (max-width: ${breakpoints.sm}) {
        font-size: ${typography.fontSize.xl};
      }
    }
    
    .stat-label {
      font-size: ${typography.fontSize.sm};
      color: ${colors.neutral.gray};
      margin: 0;
      
      @media (max-width: ${breakpoints.sm}) {
        font-size: ${typography.fontSize.xs};
        text-align: center;
        white-space: nowrap;
      }
    }
  }
`;

// Mobile-first responsive container
const ResponsiveCalendarContainer = styled.div`
  @media (max-width: ${breakpoints.lg}) {
    .desktop-calendar {
      display: none;
    }
    
    .mobile-calendar {
      display: block;
    }
  }
  
  @media (min-width: ${breakpoints.lg}) {
    .desktop-calendar {
      display: block;
    }
    
    .mobile-calendar {
      display: none;
    }
  }
`;

const MobileViewControls = styled.div`
  display: none;
  
  @media (max-width: ${breakpoints.lg}) {
    display: flex;
    justify-content: center;
    gap: ${spacing.sm};
    margin-bottom: ${spacing.xl};
    background: ${colors.neutral.white};
    padding: ${spacing.xs};
    border-radius: ${borderRadius.lg};
    box-shadow: ${shadows.sm};
  }
`;

const MobileViewButton = styled.button`
  padding: ${spacing.sm} ${spacing.lg};
  border: none;
  background: ${props => props.$active ? colors.primary.blue : 'transparent'};
  color: ${props => props.$active ? colors.neutral.white : colors.neutral.darkGray};
  border-radius: ${borderRadius.md};
  font-weight: ${typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: ${typography.fontSize.sm};
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  
  &:hover {
    background: ${props => props.$active ? colors.primary.blue : colors.neutral.lightGray};
  }
`;

const MobileCalendarSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.xl};
  
  @media (min-width: ${breakpoints.sm}) {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
  
  @media (max-width: ${breakpoints.sm}) {
    .mobile-calendar-view {
      order: ${props => props.$listFirst ? 2 : 1};
    }
    
    .mobile-list-view {
      order: ${props => props.$listFirst ? 1 : 2};
    }
  }
`;

const CalendarControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing['2xl']};
  flex-wrap: wrap;
  gap: ${spacing.lg};
  
  @media (max-width: ${breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ViewSelector = styled.div`
  display: flex;
  gap: ${spacing.sm};
  background: ${colors.neutral.white};
  padding: ${spacing.xs};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.sm};
  
  @media (max-width: ${breakpoints.md}) {
    justify-content: center;
  }
`;

const ViewButton = styled.button`
  padding: ${spacing.sm} ${spacing.lg};
  border: none;
  background: ${props => props.$active ? colors.primary.blue : 'transparent'};
  color: ${props => props.$active ? colors.neutral.white : colors.neutral.darkGray};
  border-radius: ${borderRadius.md};
  font-weight: ${typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: ${typography.fontSize.sm};
  
  &:hover {
    background: ${props => props.$active ? colors.primary.blue : colors.neutral.lightGray};
  }
`;

const FilterButtons = styled.div`
  display: flex;
  gap: ${spacing.sm};
  flex-wrap: wrap;
  
  @media (max-width: ${breakpoints.md}) {
    justify-content: center;
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  padding: ${spacing.sm} ${spacing.md};
  border: 2px solid ${props => props.color || colors.primary.blue};
  background: ${props => props.$active ? props.color || colors.primary.blue : colors.neutral.white};
  color: ${props => props.$active ? colors.neutral.white : props.color || colors.primary.blue};
  border-radius: ${borderRadius.full};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.color || colors.primary.blue};
    color: ${colors.neutral.white};
    transform: translateY(-1px);
    box-shadow: ${shadows.md};
  }
`;

const StyledCalendar = styled.div`
  background: ${colors.neutral.white};
  border-radius: ${borderRadius.xl};
  box-shadow: ${shadows.lg};
  padding: ${spacing['2xl']};
  overflow: hidden;
  
  .rbc-calendar {
    font-family: ${typography.fontFamily.primary};
    color: ${colors.neutral.darkGray};
    min-height: 500px;
  }
  
  .rbc-header {
    background: ${colors.neutral.lightGray};
    color: ${colors.primary.navy};
    font-weight: ${typography.fontWeight.semibold};
    padding: ${spacing.md};
    border-bottom: 2px solid ${colors.primary.blue};
    font-size: ${typography.fontSize.base};
  }
  
  .rbc-today {
    background-color: rgba(52, 152, 219, 0.08);
  }
  
  .rbc-event {
    border: none;
    border-radius: ${borderRadius.sm};
    color: ${colors.neutral.white};
    font-weight: ${typography.fontWeight.medium};
    font-size: ${typography.fontSize.xs};
    padding: 2px 4px;
    
    &.community-meeting {
      background: ${colors.primary.green};
    }
    
    &.resource-distribution {
      background: ${colors.accent.warning};
    }
    
    &.workshop {
      background: ${colors.primary.blue};
    }
    
    &.volunteer-opportunity {
      background: ${colors.accent.success};
    }
  }
  
  .rbc-event:focus,
  .rbc-event:hover {
    opacity: 0.9;
    cursor: pointer;
    transform: scale(1.02);
    transition: all 0.2s ease;
  }
  
  .rbc-date-cell {
    padding: ${spacing.sm};
    transition: background-color 0.2s ease;
    
    &:hover {
      background-color: rgba(52, 152, 219, 0.05);
    }
    
    &.rbc-off-range-bg {
      background-color: ${colors.neutral.lightGray};
    }
  }
  
  .rbc-button-link {
    color: ${colors.primary.blue};
    text-decoration: none;
    font-weight: ${typography.fontWeight.medium};
    
    &:hover {
      color: ${colors.primary.navy};
    }
  }
  
  .rbc-toolbar {
    margin-bottom: ${spacing.xl};
    padding-bottom: ${spacing.lg};
    border-bottom: 1px solid ${colors.neutral.lightGray};
    
    .rbc-toolbar-label {
      font-size: ${typography.fontSize['2xl']};
      font-weight: ${typography.fontWeight.bold};
      color: ${colors.primary.navy};
    }
    
    button {
      background: ${colors.neutral.white};
      border: 2px solid ${colors.primary.blue};
      color: ${colors.primary.blue};
      padding: ${spacing.sm} ${spacing.lg};
      border-radius: ${borderRadius.md};
      font-weight: ${typography.fontWeight.medium};
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: ${typography.fontSize.sm};
      
      &:hover {
        background: ${colors.primary.blue};
        color: ${colors.neutral.white};
        transform: translateY(-1px);
      }
      
      &:focus {
        outline: 2px solid ${colors.primary.blue};
        outline-offset: 2px;
      }
      
      &.rbc-active {
        background: ${colors.primary.blue};
        color: ${colors.neutral.white};
      }
    }
  }
  
  .rbc-month-view {
    border: 1px solid ${colors.neutral.lightGray};
    border-radius: ${borderRadius.md};
    overflow: hidden;
  }
  
  .rbc-day-bg {
    border-right: 1px solid ${colors.neutral.lightGray};
    
    &:hover {
      background-color: rgba(52, 152, 219, 0.02);
    }
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  
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

const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  text-align: center;
  
  h3 {
    color: ${colors.accent.error};
    margin-bottom: ${spacing.md};
    font-size: ${typography.fontSize.xl};
  }
  
  p {
    color: ${colors.neutral.darkGray};
    margin-bottom: ${spacing.lg};
    font-size: ${typography.fontSize.base};
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

function ResponsiveCalendarSection() {
  const [view, setView] = useState('month');
  const [mobileView, setMobileView] = useState('calendar'); // 'calendar' or 'list'
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredCategories, setFilteredCategories] = useState(Object.keys(eventCategories));
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Calculate stats from events
  const totalEvents = events.length;
  const upcomingEvents = events.filter(event => new Date(event.start) > new Date()).length;
  const totalVolunteerSpots = events
    .filter(event => event.category === 'volunteer-opportunity')
    .reduce((sum, event) => sum + (event.maxAttendees || 0), 0);
  const peopleHelped = 147; // This could come from your API

  // Load mock events data
  useEffect(() => {
    // Simulate loading time for better UX
    setLoading(true);
    
    setTimeout(() => {
      // Convert date strings to Date objects for react-big-calendar
      const formattedEvents = mockEvents.map(event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end)
      }));
      setEvents(formattedEvents);
      setLoading(false);
    }, 500); // Short delay to show loading state
  }, []);

  const filteredEvents = events.filter(event => 
    filteredCategories.includes(event.category)
  );

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const toggleCategory = (category) => {
    setFilteredCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const eventStyleGetter = (event) => {
    const category = eventCategories[event.category];
    return {
      style: {
        backgroundColor: category?.color || colors.primary.blue,
        borderRadius: '4px',
        opacity: 0.9,
        color: 'white',
        border: 'none',
        display: 'block'
      },
      className: event.category
    };
  };

  const getEventsForDate = (date) => {
    const dateStr = moment(date).format('YYYY-MM-DD');
    return filteredEvents.filter(event => 
      moment(event.start).format('YYYY-MM-DD') === dateStr
    );
  };

  const getUpcomingEvents = () => {
    return filteredEvents
      .filter(event => moment(event.start).isAfter(moment()))
      .sort((a, b) => new Date(a.start) - new Date(b.start))
      .slice(0, 10);
  };

  return (
    <CalendarWrapper id="calendar">
      <CalendarContainer>
        <CalendarHeader>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Community Events & Programs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Stay connected with upcoming community meetings, resource distributions, 
            workshops, and volunteer opportunities.
          </motion.p>
        </CalendarHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <StatsSection>
            <QuickStat
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaCalendarAlt className="stat-icon" />
              <div className="stat-content">
                <div className="stat-number">{totalEvents}</div>
                <div className="stat-label">Total Events</div>
              </div>
            </QuickStat>
            <QuickStat
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaClock className="stat-icon" />
              <div className="stat-content">
                <div className="stat-number">{upcomingEvents}</div>
                <div className="stat-label">Upcoming</div>
              </div>
            </QuickStat>
            <QuickStat
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaUserPlus className="stat-icon" />
              <div className="stat-content">
                <div className="stat-number">{totalVolunteerSpots}</div>
                <div className="stat-label">Volunteer Spots</div>
              </div>
            </QuickStat>
            <QuickStat
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaHeart className="stat-icon" />
              <div className="stat-content">
                <div className="stat-number">{peopleHelped}</div>
                <div className="stat-label">People Helped</div>
              </div>
            </QuickStat>
          </StatsSection>
        </motion.div>

        <ResponsiveCalendarContainer>
          {/* Mobile View Controls */}
          <MobileViewControls>
            <MobileViewButton
              $active={mobileView === 'calendar'}
              onClick={() => setMobileView('calendar')}
            >
              <FaCalendar />
              Calendar
            </MobileViewButton>
            <MobileViewButton
              $active={mobileView === 'list'}
              onClick={() => setMobileView('list')}
            >
              <FaList />
              List
            </MobileViewButton>
          </MobileViewControls>

          {/* Desktop Calendar */}
          <div className="desktop-calendar">
            <CalendarControls>
              <ViewSelector>
                {['month', 'week', 'day', 'agenda'].map(viewOption => (
                  <ViewButton
                    key={viewOption}
                    $active={view === viewOption}
                    onClick={() => setView(viewOption)}
                  >
                    {viewOption.charAt(0).toUpperCase() + viewOption.slice(1)}
                  </ViewButton>
                ))}
              </ViewSelector>

              <FilterButtons>
                {Object.entries(eventCategories).map(([key, category]) => {
                  const Icon = category.icon;
                  return (
                    <FilterButton
                      key={key}
                      $active={filteredCategories.includes(key)}
                      color={category.color}
                      onClick={() => toggleCategory(key)}
                    >
                      <Icon />
                      {category.name}
                    </FilterButton>
                  );
                })}
              </FilterButtons>
            </CalendarControls>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <StyledCalendar>
                {loading ? (
                  <LoadingSpinner>
                    <div className="spinner"></div>
                  </LoadingSpinner>
                ) : error ? (
                  <ErrorMessage>
                    <h3>Unable to Load Events</h3>
                    <p>{error}</p>
                    <Button 
                      variant="primary" 
                      onClick={() => window.location.reload()}
                    >
                      Try Again
                    </Button>
                  </ErrorMessage>
                ) : (
                  <Calendar
                    localizer={localizer}
                    events={filteredEvents}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    view={view}
                    onView={setView}
                    onSelectEvent={handleSelectEvent}
                    eventPropGetter={eventStyleGetter}
                    popup
                    tooltipAccessor="description"
                  />
                )}
              </StyledCalendar>
            </motion.div>
          </div>

          {/* Mobile Calendar */}
          <div className="mobile-calendar">
            {loading ? (
              <LoadingSpinner>
                <div className="spinner"></div>
              </LoadingSpinner>
            ) : error ? (
              <ErrorMessage>
                <h3>Unable to Load Events</h3>
                <p>{error}</p>
                <Button 
                  variant="primary" 
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              </ErrorMessage>
            ) : (
              <MobileCalendarSection $listFirst={mobileView === 'list'}>
                {mobileView === 'calendar' && (
                  <div className="mobile-calendar-view">
                    <MobileCalendar
                      events={filteredEvents}
                      selectedDate={selectedDate}
                      onDateSelect={handleDateSelect}
                      onMonthChange={handleDateSelect}
                    />
                  </div>
                )}
                
                <div className="mobile-list-view">
                  <EventListView
                    events={mobileView === 'list' ? getUpcomingEvents() : getEventsForDate(selectedDate)}
                    onEventSelect={handleSelectEvent}
                    title={mobileView === 'list' ? 'Upcoming Events' : `Events for ${moment(selectedDate).format('MMM Do')}`}
                  />
                </div>
              </MobileCalendarSection>
            )}
          </div>
        </ResponsiveCalendarContainer>
      </CalendarContainer>

      {/* Mobile Event Modal */}
      <AnimatePresence>
        <MobileEventModal
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={handleCloseModal}
        />
      </AnimatePresence>
    </CalendarWrapper>
  );
}

export default ResponsiveCalendarSection;