import {
  Box,
  Container,
  Grid,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Transition,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useState } from 'react';

const steps = [
  {
    id: 'register',
    number: 1,
    title: 'Create your account',
    description:
      'Sign up using your email and complete your profile with your skills, experience, and career preferences. This helps us match you with the right job opportunities.',
    image: '/process-01.png',
  },
  {
    id: 'find-job',
    number: 2,
    title: 'Search for your dream job',
    description:
      'Browse thousands of verified job listings across industries, filter by location, salary, or role, and save the ones that fit your goals.',
    image: '/process-02.png',
  },
  {
    id: 'apply',
    number: 3,
    title: 'Apply and get hired',
    description:
      'Submit your application directly through the platform. Track your application status, connect with employers, and get hired faster.',
    image: '/process-03.png',
  },
];

export function HowItWorks() {
  const [activeTab, setActiveTab] = useState('register');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  return (
    <Box py={30}>
      <Container size="lg">
        <Grid gutter="xl" align="center">
          {/* Left Side - Stepper-like layout */}
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Title
              order={2}
              size="h2"
              fw={700}
              mb="md"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              }}
            >
              How It Works
            </Title>
            <Text c="dimmed" size="sm" lh={1.6} mb="xl">
              Find your next opportunity in just a few simple steps — from
              creating your profile to landing your dream job.
            </Text>

            <Box style={{ position: 'relative' }}>
              <Stack gap="lg" ml={0}>
                {steps.map((step, index) => (
                  <Group
                    key={step.id}
                    align="flex-start"
                    wrap="nowrap"
                    style={{ position: 'relative' }}
                  >
                    {/* Vertical dotted line */}
                    {index !== steps.length - 1 && (
                      <Box
                        style={{
                          position: 'absolute',
                          left: 22,
                          top: 46,
                          height: 'calc(100% - 10px)',
                          width: 2,
                          borderLeft: '2px dotted #ccc',
                          zIndex: 1,
                        }}
                      />
                    )}

                    {/* Circle Icon */}
                    <ThemeIcon
                      size={38}
                      radius="xl"
                      variant="filled"
                      style={{
                        zIndex: 2,
                        backgroundColor:
                          activeTab === step.id ? '#5b63f6' : '#e9ecef',
                        color: activeTab === step.id ? '#fff' : '#333',
                        border:
                          activeTab === step.id
                            ? '2px solid #5b63f6'
                            : '2px solid #e9ecef',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                      }}
                      onClick={() => setActiveTab(step.id)}
                    >
                      <Text fw={600} size="sm">
                        {step.number}
                      </Text>
                    </ThemeIcon>

                    {/* Step Content */}
                    <Paper
                      withBorder
                      p="md"
                      radius="md"
                      style={{
                        flex: 1,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        borderColor:
                          activeTab === step.id ? '#b3b7ff' : '#e9ecef',
                        boxShadow:
                          activeTab === step.id ? '0 0 0 1px #d5d8ff' : 'none',
                      }}
                      onClick={() => setActiveTab(step.id)}
                    >
                      <Text
                        fw={600}
                        size="lg"
                        mb={4}
                        style={{
                          color: activeTab === step.id ? '#5b63f6' : '',
                        }}
                      >
                        {step.title}
                      </Text>
                      <Text size="sm" c="dimmed" lh={1.6}>
                        {step.description}
                      </Text>
                    </Paper>
                  </Group>
                ))}
              </Stack>
            </Box>
          </Grid.Col>

          {/* Right Side - Image Transition */}
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Box
              pos="relative"
              style={{ minHeight: isMobile ? 240 : isTablet ? 320 : 360 }}
            >
              {steps.map((step) => (
                <Transition
                  key={step.id}
                  mounted={activeTab === step.id}
                  transition="fade"
                  duration={400}
                  timingFunction="ease"
                >
                  {(styles) => (
                    <Box
                      style={{
                        ...styles,
                        position:
                          activeTab === step.id ? 'relative' : 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                      }}
                    >
                      <Paper radius="md" shadow="md" withBorder>
                        <Image
                          src={step.image}
                          alt={step.title}
                          radius="md"
                          fit={isMobile ? 'contain' : 'cover'}
                          style={{
                            width: '100%',
                            height: isMobile ? 200 : isTablet ? 300 : 530,
                            display: 'block',
                          }}
                        />
                      </Paper>
                    </Box>
                  )}
                </Transition>
              ))}
            </Box>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
