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
    logo: '/companies/comp3.jpeg',
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
    logo: '/companies/comp8.jpeg',
  },
];

export function LogoShowcase() {
  const [companies, setCompanies] = useState(initialCompanies);
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

    const tick = () => {
      if (!isPaused.current) {
        position -= 1;
        slider.style.transform = `translateX(${position}px)`;

        const cardWidth = 180;

        if (Math.abs(position) >= cardWidth) {
          setCompanies((prev) => {
            const updated = [...prev];
            const first = updated.shift()!;
            updated.push(first);
            return updated;
          });
          position = 0;
        }
      }

      requestAnimationFrame(tick);
    };

    tick();
  }, []);

  return (
    <Box py={50}>
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
            }}
            onMouseEnter={() => (isPaused.current = true)}
            onMouseLeave={() => (isPaused.current = false)}
          >
            {companies.map((company, index) => (
              <Box
                key={company.name + index}
                style={{
                  width: isMobile ? 160 : 140,
                  height: isMobile ? 70 : 80,
                  borderRadius: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#ffffff',
                }}
              >
                <Image
                  src={company.logo}
                  alt={company.name}
                  h={isMobile ? 90 : 80}
                  fit="contain"
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
