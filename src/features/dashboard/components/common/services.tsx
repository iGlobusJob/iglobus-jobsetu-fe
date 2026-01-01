import {
  Box,
  Container,
  Title,
  Text,
  Card,
  Grid,
  Stack,
  useMantineTheme,
  Center,
} from '@mantine/core';
import type { MantineTheme } from '@mantine/core';
import {
  IconUsers,
  IconBriefcase,
  IconUserCheck,
  IconBuilding,
  IconChecklist,
} from '@tabler/icons-react';

import { OTPmodal } from '@/features/auth/components/modal/otpModal';
import { useSystemTheme } from '@/hooks/useSystemTheme';

import { FooterSubscribe } from './footer';
import { Header } from './header';

const servicesData = [
  {
    icon: IconUsers,
    title: 'Recruitment & Staffing',
    text: `We source, screen, and deliver high-quality candidates tailored to
your exact needs—across IT, Non-IT, and multi-domain roles.
Every profile goes through deep vetting to ensure skill, attitude,
and cultural alignment.`,
  },
  {
    icon: IconBriefcase,
    title: 'Contract Hiring',
    text: `Agile, on-demand professionals for short-term, mid-term,
or project-based needs.
Perfect when you need flexibility, speed,
and proven talent without long-term commitments.`,
  },
  {
    icon: IconUserCheck,
    title: 'Full-Time Hiring',
    text: `We handpick top-tier, full-time candidates who fit your
technical requirements and your work culture.
No random resumes—only curated talent built for long-term impact.`,
  },
  {
    icon: IconBuilding,
    title: 'Client Project Recruitment',
    text: `Have a project running for your client?
We take complete ownership of the entire hiring cycle,
from sourcing to onboarding, ensuring zero delivery delays.`,
  },
  {
    icon: IconChecklist,
    title: 'Non-IT Hiring',
    text: `We’re not just about tech.
Our team also recruits across Non-IT verticals, including:
• Sales & Marketing
• HR & Admin
• Finance & Accounting
• Operations & Supply Chain
• Customer Support
• Manufacturing & Field Roles
We deliver candidates who match your business speed and reliability.`,
  },
];

function ServiceCard({
  item,
  isDark,
  theme,
}: {
  item: (typeof servicesData)[0];
  isDark: boolean;
  theme: MantineTheme;
}) {
  const Icon = item.icon;

  return (
    <Card
      radius="md"
      p="xl"
      withBorder
      shadow="md"
      style={{
        borderColor: isDark ? theme.colors.dark[4] : theme.colors.gray[3],
        textAlign: 'center',
        height: '100%',
      }}
    >
      <Icon
        size={48}
        color={isDark ? theme.colors.violet[4] : theme.colors.violet[7]}
        style={{ margin: '0 auto' }}
      />

      <Stack gap="sm" mt="md">
        <Title order={4} fw={700}>
          {item.title}
        </Title>

        <Text
          size="sm"
          lh={1.7}
          style={{ whiteSpace: 'pre-line' }}
          c={isDark ? theme.colors.gray[4] : theme.colors.gray[7]}
        >
          {item.text}
        </Text>
      </Stack>
    </Card>
  );
}

export function ServicesData() {
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
            ta="center"
            fw={700}
            mb={40}
            c={isDark ? theme.white : theme.black}
          >
            Our Services
          </Title>
          <Text
            size="sm"
            lh={1.7}
            ta="center"
            mb={40}
            mx="auto"
            maw={720}
            c={isDark ? theme.colors.gray[4] : theme.colors.gray[7]}
          >
            At iGlobus JobSetu, we bridge talent and opportunity with precision,
            speed, and old-school recruitment discipline backed by modern AI
            workflows. Whether you’re scaling fast or hiring for niche skill
            sets, we’ve got you covered end-to-end.
          </Text>

          <Grid gutter="xl">
            {/* TOP 3 */}
            {servicesData.slice(0, 3).map((item, index) => (
              <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4 }}>
                <ServiceCard item={item} isDark={isDark} theme={theme} />
              </Grid.Col>
            ))}

            {/* BOTTOM 2 CENTERED */}
            <Grid.Col span={12}>
              <Center>
                <Grid gutter="xl" style={{ maxWidth: 820 }}>
                  {servicesData.slice(3).map((item, index) => (
                    <Grid.Col key={index} span={{ base: 12, sm: 6 }}>
                      <ServiceCard item={item} isDark={isDark} theme={theme} />
                    </Grid.Col>
                  ))}
                </Grid>
              </Center>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      <OTPmodal />

      <FooterSubscribe />
    </>
  );
}
