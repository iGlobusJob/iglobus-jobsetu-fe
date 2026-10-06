import { Box, Stack, Text, Title } from '@mantine/core';
import React from 'react';

import { TelanganaMap } from '@/components/common/map';

export const TelanganaNetworkSection: React.FC = () => {
  return (
    <Box
      component="section"
      id="telangana-network"
      style={{
        width: '100%',
        maxWidth: '1440px',
        margin: '60px auto 40px auto',
        padding: '0 24px',
        boxSizing: 'border-box',
      }}
    >
      <Stack align="center" gap="12px" mb="32px" ta="center">
        <Title
          order={2}
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            fontSize: '28px',
            lineHeight: '34px',
            color: '#000000',
          }}
        >
          Explore Opportunities Across Telangana Districts
        </Title>
        <Text
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '16px',
            color: '#64748b',
            maxWidth: '740px',
          }}
        >
          Click or hover over any of the 33 Telangana districts to discover
          local job openings and hiring companies.
        </Text>
      </Stack>

      <TelanganaMap height="580px" />
    </Box>
  );
};
