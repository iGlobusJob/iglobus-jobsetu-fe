import { Box, Image, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';

interface PartnerCompany {
  name: string;
  logo: string;
  width?: number;
}

const partnerCompanies: PartnerCompany[] = [
  { name: 'Cream Stone', logo: '/companies/Cream stone.jpeg', width: 140 },
  { name: 'Fortune Art', logo: '/companies/Fortunearrt.jpeg', width: 200 },
  {
    name: 'Future in Australia',
    logo: '/companies/Future in Austrlia.jpeg',
    width: 260,
  },
  { name: 'iGLOBUS', logo: '/companies/iGLOBUS.jpeg', width: 140 },
  {
    name: 'Interiors & More',
    logo: '/companies/Interiors and more.jpeg',
    width: 160,
  },
  { name: 'Jawan', logo: '/companies/Jawan.jpeg', width: 150 },
  { name: 'Linkjet', logo: '/companies/Linkjet LOGO.jpeg', width: 160 },
  { name: 'Macro Media', logo: '/companies/Macro media.jpeg', width: 140 },
  { name: 'Osair', logo: '/companies/Osair.jpeg', width: 200 },
  { name: 'Scoops', logo: '/companies/Scoops.jpeg', width: 140 },
  { name: 'SIF', logo: '/companies/SIF.jpeg', width: 160 },
  { name: 'SRAK', logo: '/companies/SRAK.jpeg', width: 140 },
  { name: 'Sri Sai', logo: '/companies/Sri sai.png', width: 140 },
  { name: 'TPS Capital', logo: '/companies/TPS Capital.jpeg', width: 140 },
  { name: 'Veer O Metals', logo: '/companies/Veer o metals.jpeg', width: 140 },
  {
    name: 'Vijaya Technologies',
    logo: '/companies/Vijaya Technologies.jpeg',
    width: 170,
  },
  {
    name: 'Shaswa',
    logo: '/companies/shaswa-logo-new-white (3).png',
    width: 220,
  },
  { name: 'BNI', logo: '/companies/BNI Logo.png', width: 140 },
  { name: 'MIRA', logo: '/companies/MIRA Logo 2-01.png', width: 140 },
  { name: 'Corenest', logo: '/companies/corenest.png', width: 140 },
  {
    name: 'Sallaram House',
    logo: '/companies/Sallaram House Logo_page-0001.jpg',
    width: 150,
  },
  {
    name: 'Party Addiction',
    logo: '/companies/Logo - Party Addiction_page-0001.jpg',
    width: 140,
  },
  { name: 'JRVS', logo: '/companies/JRVS Logo_page-0001.jpg', width: 140 },
];

export const LogoShowcase: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fullList = partnerCompanies;

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
            : 120
          : company.width || 160;
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
          .marquee-container:hover .marquee-track {
            animation-play-state: paused;
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
        className="marquee-container"
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
          className="marquee-track"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: 'max-content',
            animation: 'marqueeScroll 55s linear infinite',
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
