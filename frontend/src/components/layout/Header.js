import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFacebook, FaInstagram, FaEnvelope, FaBars, FaTimes, FaBullhorn } from 'react-icons/fa';
import { colors, typography, spacing, shadows, breakpoints, zIndex } from '../../constants/theme';
import { Container, Button, Flex } from '../../styles/GlobalStyles';

const HeaderWrapper = styled.header`
  background: ${colors.primary.beige};
  box-shadow: ${shadows.md};
  position: sticky;
  top: 0;
  z-index: ${zIndex.sticky};
  transition: all 0.3s ease;
`;

const HeaderContent = styled(Container)`
  display: flex;
  align-items: stretch;
  padding: ${spacing.sm} ${spacing.xl};
  max-width: 1400px;
  min-height: 100px;
  gap: ${spacing.md};
  
  @media (max-width: ${breakpoints.md}) {
    padding: ${spacing.xs} ${spacing.lg};
    min-height: 80px;
  }
  
  @media (max-width: ${breakpoints.lg}) {
    flex-direction: column;
    align-items: center;
    gap: ${spacing.sm};
  }
  
  @media (max-width: ${breakpoints.sm}) {
    padding: ${spacing.xs} ${spacing.md};
    min-height: auto;
  }
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-right: ${spacing.md};
  
  @media (max-width: ${breakpoints.lg}) {
    display: none;
  }
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 100%;
  
  @media (max-width: ${breakpoints.lg}) {
    display: none;
  }
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding-bottom: ${spacing.sm};
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  border-top: 1px solid ${colors.primary.darkBeige};
  padding-top: ${spacing.sm};
`;

const MobileSection = styled.div`
  display: none;
  
  @media (max-width: ${breakpoints.lg}) {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: ${spacing.md};
    gap: ${spacing.md};
  }
`;

const MobileLogo = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  cursor: pointer;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.8;
  }
`;

const MobileLogoImage = styled.img`
  height: 100px;
  width: auto;
  object-fit: contain;
`;

const MobileTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const MobileTopRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`;

const MobileNavRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const MobileActionsInline = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  cursor: pointer;
  transition: opacity 0.3s ease;
  height: 100%;
  
  &:hover {
    opacity: 0.8;
  }
  
  @media (max-width: ${breakpoints.lg}) {
    height: auto;
  }
`;

const LogoImage = styled.img`
  height: 100px;
  width: auto;
  object-fit: contain;
  
  @media (max-width: ${breakpoints.md}) {
    height: 80px;
  }
  
  @media (max-width: ${breakpoints.sm}) {
    height: 60px;
  }
`;

const SiteTitle = styled.h1`
  color: ${colors.primary.navy};
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight.bold};
  margin: 0;
  line-height: 1.2;
  text-align: center;
  
  @media (max-width: ${breakpoints.md}) {
    font-size: ${typography.fontSize.xl};
  }
  
  @media (max-width: ${breakpoints.sm}) {
    font-size: ${typography.fontSize.lg};
    line-height: 1.3;
    padding: 0 ${spacing.sm};
  }
  
  @media (max-width: 480px) {
    font-size: ${typography.fontSize.base};
    line-height: 1.4;
  }
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0 25px;
  gap: 0;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  
  @media (max-width: ${breakpoints.xl}) {
    padding: 0 20px;
  }
`;

const NavItem = styled.li`
  position: relative;
`;

const NavLink = styled.a`
  color: ${colors.neutral.black};
  text-decoration: none;
  font-weight: ${typography.fontWeight.normal};
  font-size: ${typography.fontSize.base};
  padding: ${spacing.xs} ${spacing.xs};
  border-radius: ${spacing.sm};
  transition: all 0.3s ease;
  position: relative;
  white-space: nowrap;
  
  &:hover {
    color: ${colors.primary.navy};
    background-color: ${colors.primary.darkBeige};
  }
  
  &.active {
    color: ${colors.primary.navy};
    background-color: ${colors.primary.darkBeige};
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      width: 20px;
      height: 2px;
      background: ${colors.primary.navy};
      border-radius: 1px;
    }
  }
  
  @media (max-width: ${breakpoints.xl}) {
    font-size: ${typography.fontSize.sm};
    padding: ${spacing.xs} 2px;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.lg};
  
  @media (max-width: ${breakpoints.lg}) {
    display: none;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${spacing.md};
  
  @media (max-width: ${breakpoints.sm}) {
    gap: ${spacing.sm};
  }
`;

const SocialLink = styled.a`
  color: ${colors.neutral.gray};
  font-size: ${typography.fontSize.xl};
  transition: all 0.3s ease;
  padding: ${spacing.sm};
  border-radius: 50%;
  
  &:hover {
    color: ${colors.primary.navy};
    background-color: ${colors.primary.darkBeige};
    transform: translateY(-2px);
  }
  
  &.bulletin-button {
    background: linear-gradient(45deg, ${colors.primary.navy}, ${colors.neutral.darkGray});
    color: white;
    font-size: ${typography.fontSize.xs};
    padding: ${spacing.xs} ${spacing.sm};
    border-radius: 20px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-weight: ${typography.fontWeight.semibold};
    box-shadow: ${shadows.sm};
    min-height: 36px;
    
    .bulletin-text {
      display: flex;
      flex-direction: column;
      line-height: 1.1;
      text-align: center;
    }
    
    &:hover {
      background: linear-gradient(45deg, ${colors.neutral.darkGray}, ${colors.primary.navy});
      transform: translateY(-1px);
      color: white;
    }
    
    @media (max-width: ${breakpoints.sm}) {
      font-size: 0.625rem;
      padding: 4px 8px;
      gap: 4px;
      min-height: 32px;
      
      .bulletin-text {
        font-size: 0.625rem;
      }
    }
    
    @media (max-width: 400px) {
      .bulletin-text {
        display: none;
      }
      padding: 6px;
      min-width: 32px;
      justify-content: center;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: ${typography.fontSize.xl};
  color: ${colors.primary.navy};
  cursor: pointer;
  padding: ${spacing.sm};
  border-radius: ${spacing.sm};
  transition: all 0.3s ease;
  background-color: ${colors.primary.darkBeige};
  border: 1px solid ${colors.primary.navy};
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: ${colors.primary.navy};
    color: white;
  }
  
  @media (max-width: ${breakpoints.lg}) {
    display: flex;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${colors.neutral.white};
  z-index: ${zIndex.modal};
  padding: ${spacing.xl};
  overflow-y: auto;
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing['2xl']};
`;

const MobileNavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const MobileNavItem = styled.li`
  margin-bottom: ${spacing.lg};
`;

const MobileNavLink = styled.a`
  color: ${colors.neutral.darkGray};
  text-decoration: none;
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.medium};
  display: block;
  padding: ${spacing.md} 0;
  border-bottom: 1px solid ${colors.neutral.lightGray};
  transition: color 0.3s ease;
  
  &:hover {
    color: ${colors.primary.navy};
  }
`;

const MobileActions = styled.div`
  margin-top: ${spacing['2xl']};
  padding-top: ${spacing.xl};
  border-top: 1px solid ${colors.neutral.lightGray};
`;

const MobileSocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${spacing.xl};
  margin-bottom: ${spacing.xl};
`;

// Icon mapping
const iconMap = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  envelope: FaEnvelope,
  'bulletin-board': FaBullhorn,
};

function Header({ headerContent }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (!headerContent) {
    return null;
  }

  const { title, navigation, social_media, donate_button } = headerContent;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <HeaderWrapper>
        <HeaderContent>
          <LogoSection>
            <Logo onClick={() => navigate('/')}>
              <LogoImage 
                src="/logo.png" 
                alt="United We Stand CAC Logo" 
              />
            </Logo>
          </LogoSection>

          <ContentSection>
            <TopRow>
              <SiteTitle>{title}</SiteTitle>
              <HeaderActions>
                <SocialLinks>
                  {social_media.map((item, index) => {
                    const IconComponent = iconMap[item.icon];
                    if (item.type === 'button') {
                      return (
                        <SocialLink
                          key={index}
                          href={item.url}
                          className="bulletin-button"
                          aria-label={item.platform}
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(item.url);
                          }}
                        >
                          <IconComponent />
                          <div className="bulletin-text">
                            <span>Wayne County</span>
                            <span>Bulletin Board</span>
                          </div>
                        </SocialLink>
                      );
                    }
                    return (
                      <SocialLink
                        key={index}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.platform}
                      >
                        <IconComponent />
                      </SocialLink>
                    );
                  })}
                </SocialLinks>
                
                <Button 
                  as="a" 
                  href={donate_button.url}
                  variant="primary"
                  size="normal"
                >
                  {donate_button.text}
                </Button>
              </HeaderActions>
            </TopRow>
            
            <BottomRow>
              <Navigation>
                <NavList>
                  {navigation.map((item, index) => (
                    <NavItem key={index}>
                      <NavLink 
                        href={item.path}
                        className={location.pathname === item.path ? 'active' : ''}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(item.path);
                        }}
                      >
                        {item.name}
                      </NavLink>
                    </NavItem>
                  ))}
                </NavList>
              </Navigation>
            </BottomRow>
          </ContentSection>

          <MobileSection>
            <MobileTopRow>
              <MobileLogo onClick={() => navigate('/')}>
                <MobileLogoImage 
                  src="/logo.png" 
                  alt="United We Stand CAC Logo" 
                />
              </MobileLogo>
              
              <MobileTopRight>
                {social_media.map((item, index) => {
                  const IconComponent = iconMap[item.icon];
                  if (item.type === 'button') {
                    return (
                      <SocialLink
                        key={index}
                        href={item.url}
                        className="bulletin-button"
                        aria-label={item.platform}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(item.url);
                        }}
                      >
                        <IconComponent />
                        <div className="bulletin-text">
                          <span>Wayne County</span>
                          <span>Bulletin Board</span>
                        </div>
                      </SocialLink>
                    );
                  }
                  return null; // Don't show other social icons in top row
                })}
                
                <MobileMenuButton onClick={toggleMobileMenu}>
                  <FaBars />
                </MobileMenuButton>
              </MobileTopRight>
            </MobileTopRow>

            <MobileActionsInline>
              <Button 
                as="a" 
                href={donate_button.url}
                variant="primary"
                size="normal"
              >
                {donate_button.text}
              </Button>
              
              <SocialLinks>
                {social_media.map((item, index) => {
                  const IconComponent = iconMap[item.icon];
                  if (item.type !== 'button') { // Only show regular social icons here
                    return (
                      <SocialLink
                        key={index}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.platform}
                      >
                        <IconComponent />
                      </SocialLink>
                    );
                  }
                  return null;
                })}
              </SocialLinks>
            </MobileActionsInline>
          </MobileSection>
        </HeaderContent>
      </HeaderWrapper>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          >
            <MobileMenuHeader>
              <Logo>
                <LogoImage 
                  src="/logo.png" 
                  alt="United We Stand CAC Logo" 
                />
                <SiteTitle>{title}</SiteTitle>
              </Logo>
              <MobileMenuButton onClick={closeMobileMenu}>
                <FaTimes />
              </MobileMenuButton>
            </MobileMenuHeader>

            <MobileNavList>
              {navigation.map((item, index) => (
                <MobileNavItem key={index}>
                  <MobileNavLink 
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.path);
                      closeMobileMenu();
                    }}
                  >
                    {item.name}
                  </MobileNavLink>
                </MobileNavItem>
              ))}
            </MobileNavList>

            <MobileActions>
              <MobileSocialLinks>
                {social_media.map((item, index) => {
                  const IconComponent = iconMap[item.icon];
                  if (item.type === 'button') {
                    return (
                      <SocialLink
                        key={index}
                        href={item.url}
                        className="bulletin-button"
                        aria-label={item.platform}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(item.url);
                          closeMobileMenu();
                        }}
                      >
                        <IconComponent />
                        <div className="bulletin-text">
                          <span>Wayne County</span>
                          <span>Bulletin Board</span>
                        </div>
                      </SocialLink>
                    );
                  }
                  return (
                    <SocialLink
                      key={index}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.platform}
                    >
                      <IconComponent />
                    </SocialLink>
                  );
                })}
              </MobileSocialLinks>
              
              <Button 
                as="a" 
                href={donate_button.url}
                variant="primary"
                size="large"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {donate_button.text}
              </Button>
            </MobileActions>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
