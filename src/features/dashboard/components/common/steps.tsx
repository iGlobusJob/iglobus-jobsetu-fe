import { Box, Flex, Text } from '@mantine/core';
import React from 'react';

import { Step1Icon, Step2Icon, Step3Icon } from './steps/stepIcons';

interface StepItem {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const stepsData: StepItem[] = [
  {
    step: 'Step 1',
    title: 'Create Account',
    description:
      'Sign up using your email and complete your profile with your skills, experience, and career preferences. This helps us match you with the right job opportunities.',
    icon: <Step1Icon />,
  },
  {
    step: 'Step 2',
    title: 'Explore Jobs',
    description:
      'Browse thousands of verified job listings across industries, filter by location, salary, or role, and save the ones that fit your goals.',
    icon: <Step2Icon />,
  },
  {
    step: 'Step 3',
    title: 'Apply & get hired',
    description:
      'Submit your application directly through the platform. Track your application status, connect with employers, and get hired faster.',
    icon: <Step3Icon />,
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <Box
      component="section"
      id="how-it-works"
      style={{
        width: '100%',
        maxWidth: '1440px',
        minHeight: '599px',
        margin: '0 auto',
        padding: '24px 0px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '33px',
        boxSizing: 'border-box',
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* Frame 19: Header */}
      <Box
        style={{
          width: '100%',
          maxWidth: '966px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0px 16px',
          gap: '12px',
          boxSizing: 'border-box',
        }}
      >
        <Text
          component="h2"
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            fontSize: '27px',
            lineHeight: '37px',
            color: '#000000',
            textAlign: 'center',
            margin: 0,
            width: '100%',
          }}
        >
          How It Works
        </Text>

        <Text
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '19px',
            lineHeight: '23px',
            color: '#5F5F5F',
            textAlign: 'center',
            margin: 0,
            width: '100%',
            maxWidth: '966px',
            whiteSpace: 'nowrap',
          }}
        >
          Find your next opportunity in just a few simple steps — from creating
          your profile to landing your dream job.
        </Text>
      </Box>

      {/* Frame 26: 3 Step Cards Row */}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="center"
        align="center"
        style={{
          width: '100%',
          maxWidth: '1440px',
          minHeight: '445px',
          padding: '24px 0px',
          boxSizing: 'border-box',
        }}
      >
        {stepsData.map((item, index) => (
          <Box
            key={item.step}
            style={{
              width: '100%',
              maxWidth: '400px',
              height: '397px',
              padding: '24px 32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '24px',
              borderLeft: index > 0 ? '1px solid #3BA3D3' : 'none',
              boxSizing: 'border-box',
              flexShrink: 0,
            }}
          >
            {/* Rectangle 2706 / 2708 / 2709: Cyan Icon Box */}
            <Box
              style={{
                width: '115px',
                height: '115px',
                backgroundColor: '#3BA3D3',
                borderRadius: '25px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxSizing: 'border-box',
              }}
            >
              {item.icon}
            </Box>

            {/* Frame 22 / 20 / 21: Content */}
            <Box
              style={{
                width: '100%',
                maxWidth: '336px',
                height: '210px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '16px',
              }}
            >
              <Text
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: '16px',
                  lineHeight: '20px',
                  color: index === 0 ? '#777E90' : '#777E91',
                  textAlign: 'center',
                  margin: 0,
                  width: '100%',
                }}
              >
                {item.step}
              </Text>

              <Text
                component="h3"
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 600,
                  fontSize: '22px',
                  lineHeight: '24px',
                  color: '#204945',
                  textAlign: 'center',
                  margin: 0,
                  width: '100%',
                }}
              >
                {item.title}
              </Text>

              <Text
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '26px',
                  color: '#778984',
                  textAlign: 'center',
                  margin: 0,
                  width: '100%',
                  maxWidth: '336px',
                }}
              >
                {item.description}
              </Text>
            </Box>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default HowItWorks;
