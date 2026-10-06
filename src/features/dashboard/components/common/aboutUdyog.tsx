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
          UdyogSethu is a Job Mela initiative powered by iGLOBUS JobSetu,
          organized in association with the Government of Telangana and TASK
          (Telangana Academy for Skill and Knowledge). The initiative aims to
          bridge the gap between job seekers and employers by bringing multiple
          career opportunities onto one platform. UdyogSethu connects candidates
          with participating companies across IT and Non-IT sectors, enabling
          direct interaction, interviews, and employment opportunities.
        </Text>
      </Stack>
    </Box>
  );
};

export default AboutUdyog;
