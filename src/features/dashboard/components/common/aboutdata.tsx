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
import {
  IconUsers,
  IconSchool,
  IconBuildingCommunity,
  IconBuilding,
} from '@tabler/icons-react';

import { useSystemTheme } from '@/hooks/useSystemTheme';

import { FooterSubscribe } from './footer';
import { Header } from './header';

const cardData = [
  {
    icon: IconUsers,
    title: 'Who we are',
    text: `India Academy for Skill and Knowledge TASK
     is a not-for-profit organization created by the 
     Government of India to bring synergy among 
     institutions of Government, Industry & Academia 
     to offer quality human resources and services to 
     the industry. Established in 2004 as IEG/ JKC and 
     renamed as TASK in 2014. TASK believes that responsive, 
     customized, need-based training differentiates between a 
     good workforce and a great one. We are compliant as per 12 A, 
     80G and CSR Form-1 and can work with corporates in implementing
      their CSR vision in skilling for the youth of India.`,
  },
  {
    icon: IconSchool,
    title: 'Value for Students',
    text: `Granting access to modules for enhancing their technology,
     personal and organization skills at highly subsidized rates.`,
  },
  {
    icon: IconBuildingCommunity,
    title: 'Value for Colleges',
    text: `We forge partnerships with colleges to create environs 
    conducive for growth through faculty development, research pilots
     and help colleges provide quality education for the leaders of 
     tomorrow with focused systematic Programme.`,
  },
  {
    icon: IconBuilding,
    title: 'Value for Corporates',
    text: `Our programmes help corporates gain access to a pool 
    of trained graduates for suitable roles. Our students are trained
     extensively in latest technology to help companies find the right candidate.`,
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
                  radius="md"
                  p="xl"
                  withBorder
                  shadow="md"
                  style={{
                    borderColor: isDark
                      ? theme.colors.dark[4]
                      : theme.colors.gray[3],
                    textAlign: 'center',
                  }}
                >
                  <item.icon
                    size={48}
                    color={isDark ? theme.colors.blue[3] : theme.colors.blue[7]}
                    style={{ margin: '0 auto' }}
                  />

                  <Stack gap="sm" mt="md">
                    <Title
                      order={4}
                      fw={700}
                      c={isDark ? theme.white : theme.black}
                    >
                      {item.title}
                    </Title>

                    <Text
                      size="sm"
                      lh={1.6}
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

      <FooterSubscribe />
    </>
  );
}
