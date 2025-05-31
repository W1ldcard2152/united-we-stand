import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaHandsHelping, FaUsers } from 'react-icons/fa';
import { colors, typography, spacing, breakpoints, shadows } from '../../constants/theme';
import { Container, Button, Grid } from '../../styles/GlobalStyles';

const CTASectionWrapper = styled.section`
  background: ${colors.gradients.primary};
  color: ${colors.neutral.white};
  padding: ${spacing['4xl']} 0;
  text-align: center;
`;

const CTAButtons = styled(motion.div)`
  display: flex;
  gap: ${spacing.lg};
  justify-content: center;
  margin-bottom: ${spacing['3xl']};
  
  @media (max-width: ${breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

const StatsSection = styled(motion.div)`
  margin-top: ${spacing['3xl']};
`;

const StatsGrid = styled(Grid)`
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${spacing.xl};
  max-width: 800px;
  margin: 0 auto;
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: ${spacing.xl};
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  .icon {
    font-size: ${typography.fontSize['3xl']};
    color: ${colors.primary.green};
    margin-bottom: ${spacing.md};
  }
  
  .number {
    font-size: ${typography.fontSize['3xl']};
    font-weight: ${typography.fontWeight.bold};
    color: ${colors.neutral.white};
    margin-bottom: ${spacing.sm};
  }
  
  .label {
    font-size: ${typography.fontSize.base};
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
  }
`;

function ImpactAndCTASection() {
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

  const statsData = [
    {
      icon: <FaUsers />,
      number: "500+",
      label: "Families Served"
    },
    {
      icon: <FaHandsHelping />,
      number: "50+",
      label: "Community Partners"
    },
    {
      icon: <FaCalendarAlt />,
      number: "Weekly",
      label: "Support Services"
    }
  ];

  return (
    <CTASectionWrapper>
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            variants={itemVariants}
            style={{ 
              color: colors.neutral.white, 
              fontSize: typography.fontSize['3xl'], 
              marginBottom: spacing.lg 
            }}
          >
            Ready to Get Involved?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            style={{ 
              fontSize: typography.fontSize.lg, 
              marginBottom: spacing['2xl'],
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
          >
            Whether you need support or want to help others, there's a place for 
            you in our community. Join us in making Wayne County stronger together.
          </motion.p>

          <CTAButtons variants={itemVariants}>
            <Button 
              as="a" 
              href="/how-we-support" 
              variant="secondary" 
              size="large"
            >
              Get Support
            </Button>
            <Button 
              as="a" 
              href="/partnerships" 
              variant="outline" 
              size="large"
              style={{ 
                borderColor: colors.neutral.white,
                color: colors.neutral.white 
              }}
            >
              Become a Partner
            </Button>
          </CTAButtons>
          
          <StatsSection variants={itemVariants}>
            <StatsGrid>
              {statsData.map((stat, index) => (
                <StatCard
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="icon">{stat.icon}</div>
                  <div className="number">{stat.number}</div>
                  <p className="label">{stat.label}</p>
                </StatCard>
              ))}
            </StatsGrid>
          </StatsSection>
        </motion.div>
      </Container>
    </CTASectionWrapper>
  );
}

export default ImpactAndCTASection;
