import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from 'react-icons/fa';
import { colors, typography, spacing, breakpoints, shadows, borderRadius } from '../../constants/theme';
import { Container } from '../../styles/GlobalStyles';

const CarouselWrapper = styled.section`
  padding: ${spacing['3xl']} 0; /* Increased from 2xl */
  background: ${colors.neutral.lightGray};
  overflow: hidden;
  position: relative;
`;

const CarouselContainer = styled(Container)`
  max-width: 1400px; /* Increased from 1000px */
`;

const CarouselHeader = styled.div`
  text-align: center;
  margin-bottom: ${spacing.xl};
  
  h3 {
    font-size: ${typography.fontSize['2xl']};
    color: ${colors.primary.navy};
    margin-bottom: ${spacing.sm};
    font-weight: ${typography.fontWeight.bold};
  }
  
  p {
    font-size: ${typography.fontSize.base};
    color: ${colors.neutral.darkGray};
    margin: 0;
  }
`;

const CarouselFrame = styled.div`
  position: relative;
  border-radius: ${borderRadius.xl};
  overflow: hidden;
  box-shadow: ${shadows.xl};
  background: ${colors.neutral.white};
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 700px; /* Increased from 500px */
  overflow: hidden;
  
  @media (max-width: ${breakpoints.lg}) {
    height: 600px; /* Increased from 400px */
  }
  
  @media (max-width: ${breakpoints.md}) {
    height: 500px; /* Increased from 400px */
  }
  
  @media (max-width: ${breakpoints.sm}) {
    height: 400px; /* Increased from 300px */
  }
`;

const CarouselImage = styled(motion.img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  background: ${colors.neutral.white};
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.direction === 'prev' ? 'left: 20px;' : 'right: 20px;'}
  
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: ${typography.fontSize.lg};
  color: ${colors.primary.navy};
  transition: all 0.3s ease;
  z-index: 10;
  
  &:hover {
    background: ${colors.neutral.white};
    transform: translateY(-50%) scale(1.1);
    box-shadow: ${shadows.lg};
  }
  
  &:active {
    transform: translateY(-50%) scale(0.95);
  }
  
  @media (max-width: ${breakpoints.sm}) {
    width: 40px;
    height: 40px;
    font-size: ${typography.fontSize.base};
    ${props => props.direction === 'prev' ? 'left: 10px;' : 'right: 10px;'}
  }
`;

const PlayPauseButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: ${typography.fontSize.base};
  color: ${colors.neutral.white};
  transition: all 0.3s ease;
  z-index: 10;
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }
  
  @media (max-width: ${breakpoints.sm}) {
    bottom: 15px;
    right: 15px;
    width: 35px;
    height: 35px;
    font-size: ${typography.fontSize.sm};
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  z-index: 10;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: ${colors.primary.green};
  border-radius: 0 2px 0 0;
`;

const Indicators = styled.div`
  display: flex;
  justify-content: center;
  gap: ${spacing.sm};
  margin-top: ${spacing.lg};
`;

const Indicator = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid ${colors.neutral.gray};
  background: ${props => props.$active ? colors.primary.blue : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${colors.primary.blue};
    transform: scale(1.2);
  }
`;

const ImageCounter = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  color: ${colors.neutral.white};
  padding: ${spacing.sm} ${spacing.md};
  border-radius: ${borderRadius.full};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  z-index: 10;
  
  @media (max-width: ${breakpoints.sm}) {
    top: 15px;
    left: 15px;
    font-size: ${typography.fontSize.xs};
    padding: ${spacing.xs} ${spacing.sm};
  }
`;

// Clean, web-friendly image paths
const flierImages = [
  './fliers/flier-1.png',
  './fliers/flier-2.png',
  './fliers/flier-3.png',
  './fliers/flier-4.png',
  './fliers/flier-5.png',
  './fliers/flier-6.png',
];

function PhotoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  
  const SLIDE_DURATION = 10000; // 10 seconds

  // Auto-advance carousel
  useEffect(() => {
    if (!isPlaying) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progressPercent = (elapsed % SLIDE_DURATION) / SLIDE_DURATION * 100;
      setProgress(progressPercent);

      if (elapsed % SLIDE_DURATION < 100) { // Small threshold to avoid timing issues
        setCurrentIndex(prev => (prev + 1) % flierImages.length);
      }
    }, 100);

    const slideInterval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % flierImages.length);
      setProgress(0);
    }, SLIDE_DURATION);

    return () => {
      clearInterval(interval);
      clearInterval(slideInterval);
    };
  }, [isPlaying, currentIndex]);

  // Reset progress when manually changing slides
  useEffect(() => {
    setProgress(0);
  }, [currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex(prev => prev === 0 ? flierImages.length - 1 : prev - 1);
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % flierImages.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  const handleImageError = (index) => {
    console.log(`Failed to load image ${index + 1}:`, flierImages[index]);
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  const handleImageLoad = (index) => {
    console.log(`Successfully loaded image ${index + 1}:`, flierImages[index]);
    setImageErrors(prev => ({ ...prev, [index]: false }));
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <CarouselWrapper>
      <CarouselContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <CarouselHeader>
            <h3>Community Updates & Information</h3>
            <p>Stay informed about our latest programs, events, and community news</p>
          </CarouselHeader>

          <CarouselFrame>
            <ImageContainer>
              <AnimatePresence mode="wait" custom={1}>
                <CarouselImage
                  key={currentIndex}
                  src={flierImages[currentIndex]}
                  alt={`Community flier ${currentIndex + 1} of ${flierImages.length}`}
                  custom={1}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.4 }
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                      goToNext();
                    } else if (swipe > swipeConfidenceThreshold) {
                      goToPrevious();
                    }
                  }}
                  onError={() => handleImageError(currentIndex)}
                  onLoad={() => handleImageLoad(currentIndex)}
                />
              </AnimatePresence>

              <ImageCounter>
                {currentIndex + 1} / {flierImages.length}
              </ImageCounter>

              <NavigationButton 
                direction="prev" 
                onClick={goToPrevious}
                aria-label="Previous image"
              >
                <FaChevronLeft />
              </NavigationButton>

              <NavigationButton 
                direction="next" 
                onClick={goToNext}
                aria-label="Next image"
              >
                <FaChevronRight />
              </NavigationButton>

              <PlayPauseButton 
                onClick={togglePlayPause}
                aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </PlayPauseButton>

              {isPlaying && (
                <ProgressBar>
                  <ProgressFill
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1, ease: "linear" }}
                  />
                </ProgressBar>
              )}
            </ImageContainer>

            <Indicators>
              {flierImages.map((_, index) => (
                <Indicator
                  key={index}
                  $active={index === currentIndex}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </Indicators>
          </CarouselFrame>
        </motion.div>
      </CarouselContainer>
    </CarouselWrapper>
  );
}

export default PhotoCarousel;
