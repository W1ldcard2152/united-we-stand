import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import moment from 'moment';
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaCircle,
  FaCalendarDay 
} from 'react-icons/fa';
import { colors, typography, spacing, breakpoints, borderRadius, shadows } from '../../../constants/theme';

const MobileCalendarWrapper = styled.div`
  background: ${colors.neutral.white};
  border-radius: ${borderRadius.xl};
  box-shadow: ${shadows.lg};
  overflow: hidden;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const CalendarHeader = styled.div`
  background: ${colors.primary.blue};
  color: ${colors.neutral.white};
  padding: ${spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MonthNavButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: ${colors.neutral.white};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const MonthYear = styled.h3`
  margin: 0;
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.bold};
  text-align: center;
  flex: 1;
`;

const WeekDaysHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: ${colors.neutral.lightGray};
  padding: ${spacing.sm} 0;
`;

const WeekDay = styled.div`
  text-align: center;
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.neutral.darkGray};
  padding: ${spacing.sm};
  text-transform: uppercase;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: ${colors.neutral.white};
`;

const DateCell = styled(motion.button)`
  background: none;
  border: none;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  border: 1px solid ${colors.neutral.lightGray};
  transition: all 0.2s ease;
  min-height: 50px;
  
  &:hover {
    background: ${colors.neutral.lightGray};
  }
  
  &.today {
    background: rgba(52, 152, 219, 0.1);
    color: ${colors.primary.blue};
    font-weight: ${typography.fontWeight.bold};
  }
  
  &.selected {
    background: ${colors.primary.blue};
    color: ${colors.neutral.white};
  }
  
  &.other-month {
    color: ${colors.neutral.gray};
    opacity: 0.5;
  }
  
  &.has-events {
    background: rgba(46, 204, 113, 0.1);
    
    &:hover {
      background: rgba(46, 204, 113, 0.2);
    }
  }
`;

const DateNumber = styled.span`
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
`;

const EventIndicators = styled.div`
  display: flex;
  gap: 2px;
  margin-top: 2px;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
`;

const EventDot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${props => props.color || colors.primary.blue};
  flex-shrink: 0;
`;

const NoEventsMessage = styled.div`
  text-align: center;
  padding: ${spacing.xl};
  color: ${colors.neutral.gray};
  font-style: italic;
  
  svg {
    font-size: ${typography.fontSize['2xl']};
    margin-bottom: ${spacing.md};
    opacity: 0.5;
  }
`;

// Event categories with colors
const eventCategories = {
  'community-meeting': { color: colors.primary.green },
  'resource-distribution': { color: colors.accent.warning },
  'workshop': { color: colors.primary.blue },
  'volunteer-opportunity': { color: colors.accent.success }
};

function MobileCalendar({ events = [], selectedDate, onDateSelect, onMonthChange }) {
  const [currentMonth, setCurrentMonth] = useState(moment(selectedDate));

  const handlePrevMonth = () => {
    const prevMonth = currentMonth.clone().subtract(1, 'month');
    setCurrentMonth(prevMonth);
    onMonthChange?.(prevMonth.toDate());
  };

  const handleNextMonth = () => {
    const nextMonth = currentMonth.clone().add(1, 'month');
    setCurrentMonth(nextMonth);
    onMonthChange?.(nextMonth.toDate());
  };

  const handleDateClick = (date) => {
    onDateSelect?.(date.toDate());
  };

  // Generate calendar dates
  const startOfMonth = currentMonth.clone().startOf('month');
  const endOfMonth = currentMonth.clone().endOf('month');
  const startDate = startOfMonth.clone().startOf('week');
  const endDate = endOfMonth.clone().endOf('week');

  const dates = [];
  const current = startDate.clone();

  while (current.isSameOrBefore(endDate)) {
    dates.push(current.clone());
    current.add(1, 'day');
  }

  // Group events by date
  const eventsByDate = events.reduce((acc, event) => {
    const dateKey = moment(event.start).format('YYYY-MM-DD');
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {});

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <MobileCalendarWrapper>
      <CalendarHeader>
        <MonthNavButton onClick={handlePrevMonth} aria-label="Previous month">
          <FaChevronLeft />
        </MonthNavButton>
        <MonthYear>
          {currentMonth.format('MMMM YYYY')}
        </MonthYear>
        <MonthNavButton onClick={handleNextMonth} aria-label="Next month">
          <FaChevronRight />
        </MonthNavButton>
      </CalendarHeader>

      <WeekDaysHeader>
        {weekDays.map(day => (
          <WeekDay key={day}>{day}</WeekDay>
        ))}
      </WeekDaysHeader>

      <CalendarGrid>
        {dates.map((date, index) => {
          const dateKey = date.format('YYYY-MM-DD');
          const dayEvents = eventsByDate[dateKey] || [];
          const isToday = date.isSame(moment(), 'day');
          const isSelected = date.isSame(moment(selectedDate), 'day');
          const isCurrentMonth = date.isSame(currentMonth, 'month');
          
          let className = '';
          if (isToday) className += ' today';
          if (isSelected) className += ' selected';
          if (!isCurrentMonth) className += ' other-month';
          if (dayEvents.length > 0) className += ' has-events';

          return (
            <DateCell
              key={date.format('YYYY-MM-DD')}
              className={className}
              onClick={() => handleDateClick(date)}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.01 }}
            >
              <DateNumber>{date.format('D')}</DateNumber>
              {dayEvents.length > 0 && (
                <EventIndicators>
                  {dayEvents.slice(0, 3).map((event, eventIndex) => (
                    <EventDot
                      key={eventIndex}
                      color={eventCategories[event.category]?.color}
                    />
                  ))}
                  {dayEvents.length > 3 && (
                    <EventDot color={colors.neutral.gray} />
                  )}
                </EventIndicators>
              )}
            </DateCell>
          );
        })}
      </CalendarGrid>

      {events.length === 0 && (
        <NoEventsMessage>
          <FaCalendarDay />
          <p>No events scheduled</p>
        </NoEventsMessage>
      )}
    </MobileCalendarWrapper>
  );
}

export default MobileCalendar;