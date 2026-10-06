import { Box, Flex, Image, Stack, Text } from '@mantine/core';
import { IconStarFilled } from '@tabler/icons-react';
import React from 'react';

export interface TestimonialItem {
  id: number;
  company: string;
  logo: string;
  content: string;
  name: string;
}

interface TestimonialCardProps {
  item: TestimonialItem;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ item }) => {
  return (
    <Box
      style={{
        width: '846px',
        maxWidth: '90vw',
        height: '440px',
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        boxShadow: '0px 0px 20px 5px rgba(60, 189, 150, 0.1)',
        padding: '47px 48px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        flexShrink: 0,
        position: 'relative',
      }}
    >
      {/* 70px x 70px Hollow Double Quote 66 Icon */}
      <svg
        width="70"
        height="70"
        viewBox="0 0 70 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M 5 30 H 27 V 52 H 5 V 30 Z M 9.5 34.5 H 22.5 V 47.5 H 9.5 V 34.5 Z M 5 30 C 5 18 11 12 22 12 V 17.5 C 15 17.5 9.5 21 9.5 30 H 5 Z M 37 30 H 59 V 52 H 37 V 30 Z M 41.5 34.5 H 54.5 V 47.5 H 41.5 V 34.5 Z M 37 30 C 37 18 43 12 54 12 V 17.5 C 47 17.5 41.5 21 41.5 30 H 37 Z"
          fill="#7E8B9B"
        />
      </svg>

      {/* Quote content */}
      <Text
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          fontSize: '18px',
          lineHeight: '27px',
          color: '#777E90',
          textAlign: 'center',
          maxWidth: '711px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        "{item.content}"
      </Text>

      {/* Author Footer */}
      <Flex align="center" justify="center" gap="24px">
        <Box
          style={{
            height: '50px',
            maxWidth: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            src={item.logo}
            alt={item.company}
            fit="contain"
            style={{ maxHeight: '46px', maxWidth: '110px' }}
          />
        </Box>

        <Stack gap="4px" align="flex-start">
          <Text
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              fontSize: '20px',
              lineHeight: '28px',
              color: '#204945',
              margin: 0,
            }}
          >
            {item.name}
          </Text>

          <Flex gap="4px">
            {[...Array(5)].map((_, i) => (
              <IconStarFilled key={i} size={18} color="#FFC859" />
            ))}
          </Flex>
        </Stack>
      </Flex>
    </Box>
  );
};

export default TestimonialCard;
