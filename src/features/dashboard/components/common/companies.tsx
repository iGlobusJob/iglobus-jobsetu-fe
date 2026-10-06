import { Box, Image, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';

interface PartnerCompany {
  name: string;
  logo: string;
  width?: number;
}

const partnerCompanies: PartnerCompany[] = [
  { name: 'SnapMoney', logo: '/companies/comp6.jpeg', width: 339 },
  { name: 'Starcare', logo: '/companies/comp1.jpeg', width: 275 },
  { name: 'Care tech', logo: '/companies/comp2.jpeg', width: 329 },
  { name: 'Reliance Builders', logo: '/companies/comp2.webp', width: 222 },
  { name: 'The lime', logo: '/companies/comp4.jpeg', width: 140 },
  { name: 'JR lifts', logo: '/companies/comp5.jpeg', width: 120 },
  { name: 'Spoc Interiors', logo: '/companies/comp7.jpeg', width: 160 },
  { name: 'Design lattice', logo: '/companies/comp8.png', width: 160 },
];

export const LogoShowcase: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fullList = [...partnerCompanies, ...partnerCompanies];

  const renderTrack = (trackKey: string) => (
    <Box
      key={trackKey}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: isMobile ? '28px' : '56px',
        paddingRight: isMobile ? '28px' : '56px',
        flexShrink: 0,
      }}
    >
      {fullList.map((company, index) => {
        const cardW = isMobile
          ? company.width
            ? company.width * 0.6
            : 140
          : company.width || 200;
        return (
          <Box
            key={`${trackKey}-${company.name}-${index}`}
            style={{
              width: `${cardW}px`,
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxSizing: 'border-box',
            }}
          >
            <Image
              src={company.logo}
              alt={company.name}
              fit="contain"
              style={{
                maxHeight: '80px',
                maxWidth: `${cardW}px`,
                height: '80px',
                objectFit: 'contain',
              }}
            />
          </Box>
        );
      })}
    </Box>
  );

  return (
    <Box
      component="section"
      style={{
        width: '100%',
        minHeight: '206px',
        margin: '32px 0',
        padding: '24px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
      }}
    >
      <style>
        {`
          @keyframes marqueeScroll {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}
      </style>

      {/* Title */}
      <Text
        component="h2"
        style={{
          fontFamily: "'Sora', sans-serif",
          fontWeight: 600,
          fontSize: '27px',
          lineHeight: '26px',
          color: '#000000',
          textAlign: 'center',
          margin: 0,
          width: '100%',
          maxWidth: '1440px',
          padding: '0 16px',
        }}
      >
        Our Trusted Leading Partners
      </Text>

      {/* Frame 15: 100% full-width logo loop */}
      <Box
        style={{
          width: '100%',
          height: '100px',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: 'max-content',
            animation: 'marqueeScroll 35s linear infinite',
            willChange: 'transform',
          }}
        >
          {renderTrack('track-1')}
          {renderTrack('track-2')}
        </Box>
      </Box>
    </Box>
  );
};

export default LogoShowcase;
