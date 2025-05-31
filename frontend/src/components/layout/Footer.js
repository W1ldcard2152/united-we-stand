import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaGlobe, FaHeart } from 'react-icons/fa';
import { colors, typography, spacing, breakpoints } from '../../constants/theme';
import { Container, Grid, Flex } from '../../styles/GlobalStyles';

const FooterWrapper = styled.footer`
  background: linear-gradient(135deg, ${colors.primary.navy} 0%, ${colors.neutral.darkGray} 100%);
  color: ${colors.neutral.white};
  padding: ${spacing['3xl']} 0 ${spacing.xl} 0;
  margin-top: auto;
`;

const FooterContent = styled(Container)`
  max-width: 1200px;
`;

const FooterGrid = styled(Grid)`
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${spacing['2xl']};
  margin-bottom: ${spacing['2xl']};
  
  @media (max-width: ${breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${spacing.xl};
  }
`;

const FooterSection = styled(motion.div)`
  h3 {
    color: ${colors.neutral.white};
    font-size: ${typography.fontSize.xl};
    font-weight: ${typography.fontWeight.bold};
    margin-bottom: ${spacing.lg};
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 40px;
      height: 3px;
      background: ${colors.primary.green};
      border-radius: 2px;
    }
  }
`;

const Mission = styled.div`
  h3 {
    font-size: ${typography.fontSize['2xl']};
    margin-bottom: ${spacing.md};
  }
  
  p {
    font-size: ${typography.fontSize.base};
    line-height: ${typography.lineHeight.relaxed};
    color: ${colors.neutral.lightGray};
    margin-bottom: ${spacing.lg};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  color: ${colors.neutral.lightGray};
  font-size: ${typography.fontSize.base};
  
  svg {
    color: ${colors.primary.green};
    font-size: ${typography.fontSize.lg};
    min-width: 20px;
  }
  
  a {
    color: ${colors.neutral.lightGray};
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${colors.primary.green};
    }
  }
`;

const QuickLinks = styled.div`
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    
    li {
      margin-bottom: ${spacing.sm};
      
      a {
        color: ${colors.neutral.lightGray};
        text-decoration: none;
        font-size: ${typography.fontSize.base};
        transition: all 0.3s ease;
        padding: ${spacing.sm} 0;
        display: inline-block;
        
        &:hover {
          color: ${colors.primary.green};
          padding-left: ${spacing.sm};
        }
      }
    }
  }
`;

const OfficeHours = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: ${spacing.lg};
  border-left: 4px solid ${colors.primary.green};
  
  h4 {
    color: ${colors.neutral.white};
    font-size: ${typography.fontSize.lg};
    margin-bottom: ${spacing.md};
  }
  
  p {
    color: ${colors.neutral.lightGray};
    margin: 0;
    line-height: ${typography.lineHeight.relaxed};
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: ${spacing.xl};
  text-align: center;
`;

const Copyright = styled.div`
  color: ${colors.neutral.lightGray};
  font-size: ${typography.fontSize.sm};
  
  .heart {
    color: ${colors.accent.error};
    margin: 0 ${spacing.xs};
  }
`;

const BackToTop = styled.button`
  position: fixed;
  bottom: ${spacing.xl};
  right: ${spacing.xl};
  background: ${colors.primary.green};
  color: ${colors.neutral.white};
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: ${typography.fontSize.lg};
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  z-index: 1000;
  
  &:hover {
    background: ${colors.primary.lightGreen};
    transform: translateY(-2px);
  }
  
  @media (max-width: ${breakpoints.md}) {
    bottom: ${spacing.lg};
    right: ${spacing.lg};
    width: 45px;
    height: 45px;
  }
`;

const quickLinks = [
  { name: 'About Us', path: '/learn-about-uws' },
  { name: 'How We Support', path: '/how-we-support' },
  { name: 'Community Resources', path: '/community-resources' },
  { name: 'Partnerships', path: '/partnerships' },
  { name: 'Wayne County Bulletin', path: '/wayne-county-bulletin-board' },
];

function Footer({ footerContent }) {
  if (!footerContent) {
    return null;
  }

  const { title, tagline, contact_info } = footerContent;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  return (
    <>
      <FooterWrapper>
        <FooterContent>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <FooterGrid>
              <FooterSection variants={itemVariants}>
                <Mission>
                  <h3>{title}</h3>
                  <p>{tagline}</p>
                  <OfficeHours>
                    <h4>Our Mission</h4>
                    <p>
                      Empowering community members through comprehensive support services, 
                      resource connections, and collaborative partnerships that foster growth, 
                      resilience, and lasting positive change.
                    </p>
                  </OfficeHours>
                </Mission>
              </FooterSection>

              <FooterSection variants={itemVariants}>
                <h3>Contact Information</h3>
                <ContactInfo>
                  <ContactItem>
                    <FaGlobe />
                    <a 
                      href={`https://${contact_info.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {contact_info.website}
                    </a>
                  </ContactItem>
                  
                  <ContactItem>
                    <FaPhone />
                    <a href={`tel:${contact_info.phone.replace(/\D/g, '')}`}>
                      {contact_info.phone}
                    </a>
                  </ContactItem>
                  
                  <ContactItem>
                    <FaEnvelope />
                    <a href={`mailto:${contact_info.email}`}>
                      {contact_info.email}
                    </a>
                  </ContactItem>
                  
                  <ContactItem>
                    <FaMapMarkerAlt />
                    <span>{contact_info.address}</span>
                  </ContactItem>
                </ContactInfo>
              </FooterSection>

              <FooterSection variants={itemVariants}>
                <h3>Quick Links</h3>
                <QuickLinks>
                  <ul>
                    {quickLinks.map((link, index) => (
                      <li key={index}>
                        <a href={link.path}>{link.name}</a>
                      </li>
                    ))}
                  </ul>
                </QuickLinks>
              </FooterSection>
            </FooterGrid>

            <FooterBottom>
              <Copyright>
                © {new Date().getFullYear()} United We Stand Community Assistance Center. 
                Made with <FaHeart className="heart" /> for our community.
              </Copyright>
            </FooterBottom>
          </motion.div>
        </FooterContent>
      </FooterWrapper>

      <BackToTop onClick={scrollToTop} aria-label="Back to top">
        ↑
      </BackToTop>
    </>
  );
}

export default Footer;
