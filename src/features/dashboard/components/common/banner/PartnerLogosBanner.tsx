import { Box, Flex, Image, Stack, Text } from '@mantine/core';
import React from 'react';

interface PartnerItem {
  id: string;
  label: string;
  logos: Array<{
    src: string;
    alt: string;
    maxHeight: number;
    maxWidth?: number;
  }>;
}

const partners: PartnerItem[] = [
  {
    id: 'iglobus',
    label: 'Hiring Partner',
    logos: [
      {
        src: '/IGlobus_Logo1.png',
        alt: 'iGLOBUS Hiring Partner',
        maxHeight: 84,
        maxWidth: 115,
      },
    ],
  },
  {
    id: 'shaswa',
    label: 'Digital Marketing Partner',
    logos: [
      {
        src: '/shaswa-logo-black.png',
        alt: 'Shaswa Dimension Digital Marketing Partner',
        maxHeight: 54,
        maxWidth: 165,
      },
    ],
  },
  {
    id: 'mira',
    label: 'Event Partner',
    logos: [
      {
        src: '/WhatsApp_Image_2025-03-01_at_9_06_54_PM-removebg-preview.avif',
        alt: 'mira Event Partner',
        maxHeight: 54,
        maxWidth: 105,
      },
    ],
  },
  {
    id: 'bni',
    label: 'Strategy Partner',
    logos: [
      {
        src: '/BNI_logo.png',
        alt: 'BNI Strategy Partner',
        maxHeight: 40,
        maxWidth: 100,
      },
    ],
  },
  {
    id: 'association',
    label: 'In association with',
    logos: [
      {
        src: '/ts-logo.69c80eff.png',
        alt: 'Government of Telangana',
        maxHeight: 52,
        maxWidth: 52,
      },
      {
        src: '/logo.cf112990.png',
        alt: 'TASK - Telangana Academy for Skill and Knowledge',
        maxHeight: 52,
        maxWidth: 85,
      },
    ],
  },
];

export const PartnerLogosBanner: React.FC = () => {
  return (
    <Box
      className="partner-logos-container"
      style={{
        width: '100%',
        maxWidth: '1000px',
        backgroundColor: '#F1F7FD',
        border: '1px solid #D6E4F6',
        borderRadius: '24px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
        padding: '18px 30px 20px 30px',
        margin: '0 auto 28px auto',
        boxSizing: 'border-box',
      }}
    >
      <Flex
        wrap="wrap"
        align="flex-end"
        justify="space-between"
        gap={{ base: 'md', sm: 'xl' }}
        style={{
          width: '100%',
        }}
      >
        {partners.map((partner) => (
          <Stack
            key={partner.id}
            align="center"
            justify="flex-end"
            gap={8}
            style={{
              flex: '1 1 auto',
              minWidth: '130px',
              transition: 'transform 0.2s ease',
            }}
          >
            <Flex
              align="center"
              justify="center"
              gap={10}
              style={{
                height: '56px',
                width: '100%',
              }}
            >
              {partner.logos.map((logo, idx) => (
                <Image
                  key={idx}
                  src={logo.src}
                  alt={logo.alt}
                  fit="contain"
                  style={{
                    maxHeight: `${logo.maxHeight}px`,
                    maxWidth: logo.maxWidth ? `${logo.maxWidth}px` : undefined,
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              ))}
            </Flex>
            <Text
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                fontWeight: 700,
                color: '#111827',
                textAlign: 'center',
                lineHeight: 1.25,
                whiteSpace: 'nowrap',
              }}
            >
              {partner.label}
            </Text>
          </Stack>
        ))}
      </Flex>
    </Box>
  );
};
