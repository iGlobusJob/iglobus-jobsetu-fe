import {
  Box,
  Container,
  Title,
  Text,
  Card,
  Grid,
  Stack,
  useMantineTheme,
} from '@mantine/core';

import { OTPmodal } from '@/features/auth/components/modal/otpModal';
import { useSystemTheme } from '@/hooks/useSystemTheme';

import { FooterSubscribe } from './footer';
import { Header } from './header';

const cardData = [
  {
    title: 'Our Journey',
    text: `Since our inception in 2015, Iglobus has supported organizations across industries by delivering reliable talent for:
        • Technical roles
        • Functional and support roles
        • Service-based and operations-driven positions for IT and Non-IT

      Over the years, we have worked with startups, mid-sized organizations, and enterprise clients, adapting to changing hiring models, market conditions, and workforce expectations.

      JobSetu represents the natural evolution of this journey—transforming years of recruitment expertise into a structured, transparent, and scalable digital platform.`,
  },
  {
    title: 'For Clients',
    text: `JobSetu allows organizations to:
        • Easily share hiring requirements through a centralized platform
        • Define role expectations, skills, experience, and timelines clearly
        • Rely on a dedicated recruitment team to manage sourcing, screening, coordination, and follow-ups

      Clients don’t just post jobs—they gain access to a managed recruitment process powered by experienced professionals who understand both technology and business needs.`,
  },
  {
    title: 'For Candidates',
    text: `JobSetu provides job seekers with:
        • Access to verified job opportunities across IT and Non-IT domains
        • A simple and transparent resume submission process
        • Direct engagement with real recruiters who actively manage their profiles

      Candidates are not lost in automated systems. Every profile is reviewed, evaluated, and aligned with relevant opportunities through a people-first approach.`,
  },
  {
    title: 'Our Vision',
    text: `Our vision is to build a trusted recruitment platform where:
        • Clients experience hiring as a streamlined partnership
        • Candidates find clarity, opportunity, and growth
        • Recruitment teams operate with efficiency, transparency, and purpose

      With strong roots in traditional recruitment practices and a forward-looking platform mindset, Iglobus JobSetu stands at the intersection of experience and innovation.`,
  },
];

export function AboutData() {
  const theme = useMantineTheme();
  const systemTheme = useSystemTheme();
  const isDark = systemTheme === 'dark';

  return (
    <>
      <Header />

      <Box
        py={60}
        style={{
          minHeight: '100vh',
          backgroundColor: isDark ? theme.colors.dark[7] : theme.colors.gray[0],
          color: isDark ? theme.white : theme.black,
        }}
      >
        <Container size="lg">
          <Title
            order={2}
            fw={700}
            mb={40}
            c={isDark ? theme.white : theme.black}
          >
            About Us
          </Title>

          <Grid gutter="xl">
            {cardData.map((item, index) => (
              <Grid.Col key={index} span={{ base: 12, sm: 6, md: 3 }}>
                <Card
                  radius="lg"
                  p="xl"
                  withBorder
                  shadow="sm"
                  style={{
                    height: '100%',
                    borderColor: isDark
                      ? theme.colors.dark[4]
                      : theme.colors.gray[3],
                    backgroundColor: isDark
                      ? theme.colors.dark[6]
                      : theme.white,
                  }}
                >
                  <Stack gap="md">
                    <Title
                      order={4}
                      fw={700}
                      c={isDark ? theme.white : theme.black}
                      style={{
                        letterSpacing: '0.2px',
                      }}
                    >
                      {item.title}
                    </Title>
                    <Box
                      style={{
                        height: 2,
                        width: 40,
                        backgroundColor: theme.colors.blue[6],
                        borderRadius: 2,
                      }}
                    />

                    <Text
                      size="sm"
                      lh={1.8}
                      style={{ whiteSpace: 'pre-line' }}
                      c={isDark ? theme.colors.gray[4] : theme.colors.gray[7]}
                    >
                      {item.text}
                    </Text>
                  </Stack>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Box>
      <OTPmodal />
      <FooterSubscribe />
    </>
  );
}
