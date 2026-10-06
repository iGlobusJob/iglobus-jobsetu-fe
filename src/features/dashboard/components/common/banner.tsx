import { Box, Stack, Text, Title } from '@mantine/core';
import React from 'react';

import { HeroSearchBar } from './banner/HeroSearchBar';
import { PartnerLogosBanner } from './banner/PartnerLogosBanner';

export interface BannerSectionProps {
  onSearch?: (searchData: { keyword: string; location: string }) => void;
}

export const BannerSection: React.FC<BannerSectionProps> = ({ onSearch }) => {
  return (
    <Box
      component="section"
      style={{
        width: '100%',
        minHeight: '796px',
        position: 'relative',
        backgroundImage: "url('/hero-bg.jpg')",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        backgroundSize: 'cover',
        padding: '116px 20px 80px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        boxSizing: 'border-box',
      }}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@400;500;600;700&display=swap');
        `}
      </style>

      <Box
        style={{
          textAlign: 'center',
          maxWidth: '1050px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <PartnerLogosBanner />

        <Stack gap="md" align="center">
          <Title
            order={1}
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(1.75rem, 3.4vw, 48px)',
              lineHeight: 1.25,
              color: '#000000',
              textAlign: 'center',
              letterSpacing: '0',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
              }}
            >
              <span>Find</span>
              <span
                style={{
                  backgroundColor: '#3BA3D3',
                  color: '#FFFFFF',
                  fontWeight: 400,
                  padding: '1px 8px',
                  display: 'inline-block',
                  lineHeight: '1.15',
                }}
              >
                Reliable Jobs
              </span>
            </span>
            <span style={{ display: 'block', marginTop: '4px' }}>
              Build Your Future with UdyogSethu.
            </span>
          </Title>

          <Text
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(1rem, 2vw, 20px)',
              lineHeight: '28px',
              color: '#000000',
              textAlign: 'center',
              maxWidth: '861px',
              margin: '8px auto 28px auto',
            }}
          >
            A Job Mela initiative powered by <b>iGLOBUS JobSetu</b>, in
            association with the <b>Government of Telangana and TASK</b>.
          </Text>

          <HeroSearchBar onSearch={onSearch} />
        </Stack>
      </Box>
    </Box>
  );
};

export default BannerSection;
