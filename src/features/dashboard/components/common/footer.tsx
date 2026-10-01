import { Anchor, Box, Flex, Image, Stack, Text } from '@mantine/core';
import React, { useState } from 'react';

import { PrivacyPolicyModal } from './footer/PrivacyPolicyModal';

export const FooterSubscribe: React.FC = () => {
  const [privacyOpened, setPrivacyOpened] = useState(false);

  const linkStyle = {
    fontFamily: "'Sora', sans-serif",
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '23px',
    letterSpacing: '0.01em',
    color: '#222222',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
  };

  return (
    <Box
      component="footer"
      style={{
        width: '100%',
        minHeight: '375px',
        background:
          'linear-gradient(180deg, #FFFFFF 36.68%, rgba(59, 163, 211, 0.5) 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxSizing: 'border-box',
      }}
    >
      <PrivacyPolicyModal
        opened={privacyOpened}
        onClose={() => setPrivacyOpened(false)}
      />

      {/* Frame 99: Main Top Row */}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align="flex-start"
        style={{
          width: '100%',
          maxWidth: '1440px',
          padding: '48px 48px 24px 48px',
          gap: '70px',
          boxSizing: 'border-box',
        }}
      >
        {/* Frame 95: Brand Info */}
        <Stack gap="24px" style={{ maxWidth: '453px', width: '100%' }}>
          <Image
            src="/udyog-u-logo.png"
            alt="UdyogSethu"
            style={{ width: '54px', height: '54px', objectFit: 'contain' }}
          />

          <Text
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: '29px',
              letterSpacing: '0.01em',
              color: '#121212',
              margin: 0,
            }}
          >
            UdyogSetu transforms years of recruitment expertise into a
            structured, transparent, and scalable digital hiring platform.
          </Text>
        </Stack>

        {/* Frame 98: Navigation Columns */}
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          gap={{ base: '32px', sm: '64px' }}
          style={{ maxWidth: '704px', width: '100%' }}
        >
          {/* Frame 96: Quick Links */}
          <Stack gap="24px" style={{ minWidth: '149px' }}>
            <Text
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 400,
                fontSize: '22px',
                lineHeight: '34px',
                letterSpacing: '0.01em',
                color: '#3BA3D3',
                margin: 0,
              }}
            >
              Quick Links
            </Text>

            <Stack gap="12px">
              <Anchor href="/#" style={linkStyle}>
                Home
              </Anchor>
              <Anchor href="/#about" style={linkStyle}>
                About Us
              </Anchor>
              <Text
                onClick={() => setPrivacyOpened(true)}
                style={linkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#3BA3D3';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#222222';
                }}
              >
                Privacy Policy
              </Text>
            </Stack>
          </Stack>

          {/* Frame 97: For Jobs */}
          <Stack gap="24px" style={{ minWidth: '149px' }}>
            <Text
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 400,
                fontSize: '22px',
                lineHeight: '34px',
                letterSpacing: '0.01em',
                color: '#3BA3D3',
                margin: 0,
              }}
            >
              For Jobs
            </Text>

            <Stack gap="12px">
              <Anchor href="/#browse-jobs" style={linkStyle}>
                Browse Jobs
              </Anchor>
              <Anchor href="/#categories" style={linkStyle}>
                Browse Categories
              </Anchor>
            </Stack>
          </Stack>
        </Flex>
      </Flex>

      {/* Horizontal Divider Line */}
      <Box
        style={{
          width: '100%',
          maxWidth: '1440px',
          borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        }}
      />

      {/* Frame 100: Copyright Bottom Row */}
      <Flex
        justify="center"
        align="center"
        style={{
          width: '100%',
          maxWidth: '1440px',
          height: '80px',
          padding: '10px',
          boxSizing: 'border-box',
        }}
      >
        <Text
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '29px',
            letterSpacing: '0.01em',
            color: '#0C0C0C',
            textAlign: 'center',
            margin: 0,
          }}
        >
          © Udyogsethu 2026 | All Rights Reserved
        </Text>
      </Flex>
    </Box>
  );
};

export default FooterSubscribe;
