import { Box, Stack, Text, Title } from '@mantine/core';
import React from 'react';

export const AboutUdyog: React.FC = () => {
  return (
    <Box
      component="section"
      id="about"
      style={{
        width: '100%',
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '40px 24px 48px 24px',
        boxSizing: 'border-box',
        backgroundColor: '#FFFFFF',
      }}
    >
      <Stack
        align="center"
        gap="32px"
        style={{ maxWidth: '1339px', margin: '0 auto', width: '100%' }}
      >
        <Title
          order={2}
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            fontSize: '27px',
            lineHeight: '26px',
            letterSpacing: '0%',
            color: '#000000',
            textAlign: 'center',
            margin: 0,
          }}
        >
          About UdyogSethu
        </Title>

        <Text
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontStyle: 'normal',
            fontSize: '23px',
            lineHeight: '37.24px',
            letterSpacing: '0%',
            color: '#3B3B3B',
            textAlign: 'left',
            maxWidth: '1339px',
            width: '100%',
            margin: 0,
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          }}
        >
          UdyogSetu is a staffing and recruitment platform built to simplify
          hiring and connect organizations with the right talent across IT and
          Non-IT domains. Developed to create a seamless, technology-driven
          hiring experience, UdyogSetu brings together recruitment expertise and
          modern hiring solutions to help organizations find, engage, and
          onboard the right candidates. The platform focuses on scalable,
          process-driven recruitment, strong candidate connections, and
          long-term partnerships with organizations.
        </Text>
      </Stack>
    </Box>
  );
};

export default AboutUdyog;
