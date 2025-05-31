import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import HeroSection from '../components/sections/HeroSection';
import CalendarSection from '../components/calendar/CalendarSection';
import PhotoCarousel from '../components/sections/PhotoCarousel';
import ImpactAndCTASection from '../components/sections/ImpactAndCTASection'; // New import
import { colors, spacing, typography, breakpoints } from '../constants/theme';
import { Container, Section, Grid, Card, Button } from '../styles/GlobalStyles';

const ContentSection = styled(Section)`
  background: ${colors.neutral.white};
`;

const AboutSection = styled(Section)`
  background: ${colors.neutral.lightGray};
`;

const ServicesGrid = styled(Grid)`
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${spacing.xl};
`;

const ServiceCard = styled(Card)`
  text-align: center;
  
  .icon {
    font-size: ${typography.fontSize['4xl']};
    color: ${colors.primary.blue};
    margin-bottom: ${spacing.lg};
  }
  
  h3 {
    color: ${colors.primary.navy};
    font-size: ${typography.fontSize.xl};
    margin-bottom: ${spacing.md};
  }
  
  p {
    color: ${colors.neutral.darkGray};
    line-height: ${typography.lineHeight.relaxed};
    margin-bottom: ${spacing.lg};
  }
`;

const CTASection = styled(Section)`
  background: ${colors.gradients.primary};
  color: ${colors.neutral.white};
  text-align: center;
  
  h2 {
    color: ${colors.neutral.white};
    font-size: ${typography.fontSize['3xl']};
    margin-bottom: ${spacing.lg};
  }
  
  p {
    font-size: ${typography.fontSize.lg};
    margin-bottom: ${spacing['2xl']};
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const WeeklyScheduleSection = styled(Section)`
  background: ${colors.neutral.white};
  text-align: center;
`;

const ScheduleImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-top: ${spacing.xl};
`;

const SocialCallout = styled.div`
  background: ${colors.primary.blue};
  color: ${colors.neutral.white};
  padding: ${spacing.xl};
  border-radius: 12px;
  text-align: center;
  margin-top: ${spacing.xl};
  
  h3 {
    color: ${colors.neutral.white};
    margin-bottom: ${spacing.md};
  }
  
  p {
    font-size: ${typography.fontSize.lg};
    margin: 0;
  }
`;

function HomePage({ content }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const services = [
    {
      icon: "🤝",
      title: "Community Support",
      description: "Connecting community members with essential resources, services, and support networks to meet immediate and long-term needs."
    },
    {
      icon: "📚",
      title: "Educational Programs",
      description: "Workshops, training sessions, and educational opportunities to help community members develop new skills and advance their goals."
    },
    {
      icon: "🏘️",
      title: "Resource Distribution",
      description: "Regular distribution of food, clothing, household items, and other essential resources to families and individuals in need."
    },
    {
      icon: "🤲",
      title: "Volunteer Opportunities",
      description: "Meaningful ways for community members to get involved, give back, and make a positive impact in their neighborhoods."
    }
  ];

  return (
    <>
      <HeroSection />
      <CalendarSection />
      <PhotoCarousel />
      <ImpactAndCTASection />
    </>
  );
}

export default HomePage;
