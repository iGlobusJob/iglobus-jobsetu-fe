import { Box, Flex, Stack, Text } from '@mantine/core';
import React from 'react';

import {
  TestimonialCard,
  type TestimonialItem,
} from './review/TestimonialCard';

const figmaTestimonials: TestimonialItem[] = [
  {
    id: 1,
    company: 'Crisil',
    logo: '/testimonials/crisil_logo.jfif',
    content:
      'The iGlobus JobSetu platform has added real value to our recruitment efforts. From requirement understanding to candidate quality, the process has been efficient and professional. It’s a platform built with recruiters’ realities in mind.',
    name: 'Archana Mahajan',
  },
  {
    id: 2,
    company: 'Starcare',
    logo: '/testimonials/StarCareLogo.png',
    content:
      'For delivery-focused teams like ours, timely hiring is critical. iGlobus JobSetu has consistently supported us with reliable talent and smooth coordination, enabling us to meet project commitments without delays.',
    name: 'Jilani',
  },
  {
    id: 3,
    company: 'Vigilant',
    logo: '/testimonials/Vigilant.webp',
    content:
      'Working with iGlobus JobSetu has been a smooth and professional experience. Their recruitment approach is well-organized, and the candidates shared were well-aligned with our technical and cultural expectations. The team’s responsiveness and follow-through truly stand out.',
    name: 'Arvind',
  },
];

export const TestimonialCarousel: React.FC = () => {
  const fullList = [...figmaTestimonials, ...figmaTestimonials];

  const renderTrack = (trackKey: string) => (
    <Box
      key={trackKey}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '30px',
        paddingRight: '30px',
        flexShrink: 0,
      }}
    >
      {fullList.map((t, idx) => (
        <TestimonialCard key={`${trackKey}-${t.id}-${idx}`} item={t} />
      ))}
    </Box>
  );

  return (
    <Box
      component="section"
      id="testimonials"
      style={{
        width: '100%',
        maxWidth: '1440px',
        minHeight: '660px',
        margin: '0 auto',
        padding: '48px 0px',
        boxSizing: 'border-box',
        backgroundColor: '#ECF6FB',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '48px',
        overflow: 'hidden',
      }}
    >
      <style>
        {`
          @keyframes testimonialLoop {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}
      </style>

      {/* Frame 36: Header */}
      <Flex
        justify="space-between"
        align="center"
        style={{
          width: '100%',
          maxWidth: '1440px',
          padding: '0px 48px',
          boxSizing: 'border-box',
        }}
      >
        <Stack gap="12px">
          <Text
            component="h2"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              fontSize: '27px',
              lineHeight: '34px',
              color: '#204945',
              margin: 0,
            }}
          >
            What our Clients Say
          </Text>
          <Text
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: '27px',
              color: '#777E90',
              margin: 0,
            }}
          >
            Words of Happy Clients
          </Text>
        </Stack>
      </Flex>

      {/* Frame 37: Continuous Marquee Loop Animation */}
      <Box
        style={{
          width: '100%',
          height: '440px',
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
            animation: 'testimonialLoop 45s linear infinite',
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

export default TestimonialCarousel;
