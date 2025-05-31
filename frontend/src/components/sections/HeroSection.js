import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors, typography, spacing, breakpoints, shadows } from '../../constants/theme';
import { Container, Button, Grid } from '../../styles/GlobalStyles';

const HeroWrapper = styled.section`
  background: ${colors.gradients.hero};
  color: ${colors.neutral.white};
  padding: ${spacing['2xl']} 0; /* Reduced from 3xl to make it more compact */
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/images/community-pattern.png') center/cover;
    opacity: 0.1;
    z-index: 1;
  }
`;

const HeroContent = styled(Container)`
  position: relative;
  z-index: 2;
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing['2xl']}; /* Reduced from 3xl */
  align-items: center;
  
  @media (max-width: ${breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${spacing.xl}; /* Reduced from 2xl */
    text-align: center;
  }
`;

const HeroTextContent = styled.div`
  @media (max-width: ${breakpoints.lg}) {
    order: 2;
  }
`;

const HeroVisualContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: ${breakpoints.lg}) {
    order: 1;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: ${typography.fontSize['3xl']}; /* Reduced from 4xl */
  font-weight: ${typography.fontWeight.bold};
  margin-bottom: ${spacing.md}; /* Reduced from lg */
  line-height: ${typography.lineHeight.tight};
  
  @media (max-width: ${breakpoints.md}) {
    font-size: ${typography.fontSize['2xl']};
  }
  
  @media (max-width: ${breakpoints.sm}) {
    font-size: ${typography.fontSize.xl};
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: ${typography.fontSize.base}; /* Reduced from lg */
  margin-bottom: ${spacing.lg}; /* Reduced from xl */
  line-height: ${typography.lineHeight.relaxed};
  opacity: 0.9;
  
  @media (max-width: ${breakpoints.md}) {
    font-size: ${typography.fontSize.sm};
  }
`;

const HeroActions = styled(motion.div)`
  display: flex;
  gap: ${spacing.lg};
  
  @media (max-width: ${breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
  
  @media (max-width: ${breakpoints.lg}) {
    justify-content: center;
  }
`;

const CommunityImage = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: ${spacing.lg}; /* Reduced from xl */
  padding: ${spacing.xl}; /* Reduced from 2xl */
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 350px; /* Reduced from 400px */
  width: 100%;
  
  /* Placeholder for community image - replace with actual image */
  img {
    width: 100%;
    height: auto;
    border-radius: ${spacing.md}; /* Reduced from lg */
  }
`;

const CommunityStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* Changed to 3 columns */
  gap: ${spacing.md}; /* Reduced from lg */
`;

const StatCard = styled.div`
  text-align: center;
  background: rgba(255, 255, 255, 0.15);
  padding: ${spacing.md}; /* Reduced from lg */
  border-radius: ${spacing.sm}; /* Reduced from md */
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  .stat-number {
    font-size: ${typography.fontSize.lg}; /* Reduced from 2xl */
    font-weight: ${typography.fontWeight.bold};
    color: ${colors.primary.green};
    margin-bottom: ${spacing.xs};
    line-height: 1;
  }
  
  .stat-label {
    font-size: ${typography.fontSize.xs}; /* Reduced from sm */
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
  }
`;

/* Removed ScrollIndicator component */

function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  // Removed scroll handler since we're removing the View Events button

  return (
    <HeroWrapper>
      <HeroContent>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <HeroGrid>
            <HeroTextContent>
              <HeroTitle variants={itemVariants}>
                Empowering Our Community Through Unity
              </HeroTitle>
              
              <HeroSubtitle variants={itemVariants}>
                United We Stand Community Assistance Center provides essential resources, 
                support services, and partnership opportunities to strengthen and uplift 
                our Wayne County community.
              </HeroSubtitle>
              
              <HeroActions variants={itemVariants}>
                <Button 
                  variant="secondary" 
                  size="large"
                  as="a"
                  href="/how-we-support"
                >
                  Get Support
                </Button>
                <Button 
                  variant="outline" 
                  size="large"
                  style={{ 
                    borderColor: colors.neutral.white,
                    color: colors.neutral.white 
                  }}
                  as="a"
                  href="/partnerships"
                >
                  Become a Partner
                </Button>
              </HeroActions>
            </HeroTextContent>
            
            <HeroVisualContent>
              <CommunityImage variants={itemVariants}>
                {/* Replace this placeholder with actual community image */}
                <CommunityStats>
                  <StatCard>
                    <div className="stat-number">500+</div>
                    <p className="stat-label">Families</p>
                  </StatCard>
                  <StatCard>
                    <div className="stat-number">50+</div>
                    <p className="stat-label">Partners</p>
                  </StatCard>
                  <StatCard>
                    <div className="stat-number">24/7</div>
                    <p className="stat-label">Support</p>
                  </StatCard>
                </CommunityStats>
                
                {/* If you have an actual community image, use this instead: */}
                {/* 
                <img 
                  src="/images/community-hero.jpg" 
                  alt="United We Stand Community Members"
                />
                */}
              </CommunityImage>
            </HeroVisualContent>
          </HeroGrid>
        </motion.div>
        
      </HeroContent>
    </HeroWrapper>
  );
}

export default HeroSection;
