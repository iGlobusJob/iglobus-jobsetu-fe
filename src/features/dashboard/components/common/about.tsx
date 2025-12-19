import {
  Box,
  Container,
  Grid,
  Image,
  Stack,
  Text,
  Title,
  Paper,
  Anchor,
} from '@mantine/core';

import { useSystemTheme } from '@/hooks/useSystemTheme';

const About = () => {
  const systemTheme = useSystemTheme();
  const isDark = systemTheme === 'dark';

  return (
    <Box id="about" py={60} style={{ marginTop: -250 }}>
      <Container size="xl">
        <Grid gutter="xl" align="stretch">
          <Grid.Col span={{ base: 12, md: 6 }} style={{ height: '100%' }}>
            <Image
              src="/about-logo.png"
              alt="About Us"
              radius="sm"
              fit="cover"
              height="370"
              width="100"
              style={{
                objectFit: 'cover',
                borderRadius: '10px',
                filter: isDark ? 'brightness(0.85)' : 'brightness(1)',
              }}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }} style={{ height: '100%' }}>
            <Paper
              radius="lg"
              p="md"
              shadow="sm"
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                border: isDark ? '1px solid #333' : '1px solid #e5e7eb',
              }}
            >
              <Stack gap="lg">
                <Title order={2} fw={700} c={isDark ? 'white' : '#0c0c0cff'}>
                  About Iglobus Jobsetu
                </Title>

                <Text size="md" c="dimmed" lh={1.7}>
                  Iglobus Jobsetu is a staffing and recruitment platform built
                  to simplify hiring and connect organizations with the right
                  talent across IT and Non-IT domains.
                </Text>

                <Text size="md" c="dimmed" lh={1.7}>
                  A product of Iglobus Corporate Consulting, founded in 2015,
                  Jobsetu combines over a decade of recruitment expertise with a
                  technology-driven hiring ecosystem.
                </Text>

                <Text size="md" c="dimmed" lh={1.7}>
                  Led by CEO Pavan Chandra Duddilla, the platform focuses on
                  scalable, process-driven recruitment and long-term
                  partnerships.
                </Text>

                <Anchor
                  href="/aboutus"
                  fw={700}
                  size="md"
                  underline="never"
                  style={{ color: '#5b63f6', marginTop: 5 }}
                >
                  Read More
                </Anchor>
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
