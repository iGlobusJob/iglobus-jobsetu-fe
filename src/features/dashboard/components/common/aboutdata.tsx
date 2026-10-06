import { Box, Image, Stack, Text, Title } from '@mantine/core';

import { OTPmodal } from '@/features/auth/components/modal/otpModal';

import { AboutAssociation } from './about/aboutAssociation';
import { AboutCoreValues } from './about/aboutCoreValues';
import { AboutMissionVision } from './about/aboutMissionVision';
import { AboutStats } from './about/aboutStats';
import { AboutTeam } from './about/aboutTeam';
import { FooterSubscribe } from './footer';
import { Header } from './header';

export function AboutData() {
  return (
    <Box
      style={{ backgroundColor: '#FFFFFF', width: '100%', overflowX: 'hidden' }}
    >
      <Header />

      <Box
        component="main"
        style={{
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '140px 24px 60px 24px',
          boxSizing: 'border-box',
        }}
      >
        {/* HERO TITLE & INTRO */}
        <Stack align="center" gap="20px" ta="center" mb={0}>
          <Title
            order={1}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 'clamp(36px, 5vw, 64px)',
              lineHeight: '77px',
              color: '#000000',
            }}
          >
            About Us
          </Title>
          <Text
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(16px, 1.8vw, 20px)',
              lineHeight: '32px',
              color: '#000000',
              maxWidth: '1198px',
            }}
          >
            We make hiring simpler and more transparent through technology and
            trusted recruitment expertise. JobSetu connects professionals with
            the right opportunities while helping businesses find the right
            talent with confidence.
          </Text>
          <Box
            style={{
              width: '100%',
              maxWidth: '1312px',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 12px 36px rgba(0,0,0,0.08)',
              marginTop: '52px',
            }}
          >
            <Image
              src="/about/hero-meeting.jpg"
              alt="About JobSetu"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </Box>
        </Stack>

        {/* MISSION & VISION */}
        <AboutMissionVision />

        {/* CORE VALUES */}
        <AboutCoreValues />

        {/* OUR TEAM */}
        <AboutTeam />

        {/* GROWING BEYOND BOUNDARIES */}
        <AboutStats />

        {/* IN ASSOCIATION WITH */}
        <AboutAssociation />
      </Box>

      <OTPmodal />
      <FooterSubscribe />
    </Box>
  );
}

export default AboutData;
