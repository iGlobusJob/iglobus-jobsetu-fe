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
      <Container size="lg">
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
              p="xl"
              shadow="sm"
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                border: isDark ? '1px solid #333' : '1px solid #e5e7eb',
              }}
            >
              <Stack gap="md">
                <Title order={2} fw={700} c={isDark ? 'white' : '#0c0c0cff'}>
                  About Us
                </Title>

                <Title order={3} fw={700} style={{ lineHeight: 1.3 }}>
                  Why{' '}
                  <span style={{ color: '#2855b6', fontWeight: 700 }}>
                    35,000+
                  </span>{' '}
                  People Trust Jobcy?
                </Title>

                <Text size="md" c="dimmed" lh={1.7}>
                  Start working with Jobcy that provides everything you need to
                  generate awareness, drive traffic and connect with your
                  audience. This is placeholder text used until real content is
                  added. Our platform connects talented candidates with trusted
                  employers, making the job search process easier, faster and
                  more reliable for everyone
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
