import { Box, Center, Container, Image } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';

const initialCompanies = [
  {
    name: 'Starcare',
    logo: '/companies/comp1.jpeg',
  },
  {
    name: 'Care tech',
    logo: '/companies/comp2.jpeg',
  },
  {
    name: 'Reliance Builders',
    logo: '/companies/comp2.webp',
  },
  {
    name: 'The lime',
    logo: '/companies/comp4.jpeg',
  },
  {
    name: 'JR lifts',
    logo: '/companies/comp5.jpeg',
  },
  {
    name: 'Snapmoney',
    logo: '/companies/comp6.jpeg',
  },
  {
    name: 'Spoc Interiors',
    logo: '/companies/comp7.jpeg',
  },
  {
    name: 'Design lattice',
    logo: '/companies/comp8.png',
  },
];

export function LogoShowcase() {
  const [companies] = useState([...initialCompanies, ...initialCompanies]);

  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 480);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let position = 0;

    const speed = 1.0;

    const cardWidth = isMobile ? 150 + 12 + 10 : 180 + 12 + 40;

    const totalWidth = cardWidth * initialCompanies.length;

    const tick = () => {
      if (!isPaused.current) {
        position -= speed;

        if (Math.abs(position) >= totalWidth) {
          position = 0;
        }

        slider.style.transform = `translateX(${position}px)`;
      }

      requestAnimationFrame(tick);
    };

    tick();
  }, [isMobile]);

  return (
    <Box py={50}>
      <style>{`
        @keyframes zoomIn {
          from {
            transform: scale(1);
          }
          to { 
            transform: scale(1.15);
          }
        }

        .logo-card:hover .logo-image {
          cursor: pointer;
          animation: zoomIn 0.3s ease-in-out forwards;
        }
      `}</style>
      <Container size="lg">
        <Center mb={40}>
          <h2 style={{ fontSize: 32, fontWeight: 600 }}>
            Our Trusted Leading Partners
          </h2>
        </Center>

        <Box
          style={{ overflow: 'hidden', width: '100%', position: 'relative' }}
        >
          <Box
            ref={sliderRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? 10 : 40,
              whiteSpace: 'nowrap',
              willChange: 'transform',
              flexWrap: 'nowrap',
            }}
            onMouseEnter={() => (isPaused.current = true)}
            onMouseLeave={() => (isPaused.current = false)}
          >
            {companies.map((company, index) => (
              <Box
                className="logo-card"
                key={company.name + index}
                style={{
                  width: isMobile ? 150 : 180,
                  height: isMobile ? 80 : 90,
                  minHeight: isMobile ? 80 : 90,
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#ffffff',
                  padding: 6,
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                <Image
                  className="logo-image"
                  src={company.logo}
                  alt={company.name}
                  fit="contain"
                  styles={{
                    root: {
                      width: '100%',
                      height: '100%',
                      overflow: 'hidden',
                      maxWidth: isMobile ? '120px' : '160px',
                      maxHeight: isMobile ? '60px' : '70px',
                      objectFit: 'contain',
                      transition: 'transform 0.3s ease-in-out',
                    },
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
