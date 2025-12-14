import {
  Box,
  Card,
  Stack,
  Text,
  Image,
  Group,
  Center,
  Container,
  Title,
  Button,
} from '@mantine/core';
import { IconRocket } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

const testimonials = [
  {
    id: 1,
    company: 'Slack',
    logo: 'https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg',
    content:
      'Clear communication, fast delivery, and a level of professionalism that is rare. They consistently exceeded expectations at every step.',
    name: 'Jeffrey Montgomery',
    position: 'Product Manager',
  },
  {
    id: 2,
    company: 'WordPress',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/98/WordPress_blue_logo.svg',
    content:
      'Very well thought out and articulate communication. Clear milestones, deadlines and fast work. No shortcuts. Always reliable.',
    name: 'Rebecca Swartz',
    position: 'Creative Designer',
  },
  {
    id: 3,
    company: 'Instagram',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png',
    content:
      'High attention to detail and excellent execution. Smooth workflow and total commitment to getting things right.',
    name: 'Charles Dickens',
    position: 'Store Assistant',
  },
  {
    id: 4,
    company: 'Dropbox',
    logo: 'https://cdn.worldvectorlogo.com/logos/dropbox-4.svg',
    content:
      'Exceptional team effort from start to finish. Organized, efficient, and always pleasant to work with. Highly recommended!',
    name: 'Sophia Turner',
    position: 'Operations Lead',
  },
];

export const TestimonialCarousel = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [fade, setFade] = useState(true);

  const nextTestimonial = () => {
    setFade(false);
    setTimeout(() => {
      setActiveTestimonial((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
      setFade(true);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 4000);

    return () => clearInterval(interval);
  }, [activeTestimonial]);

  return (
    <>
      <Box py={20}>
        <Container size="md">
          <Center>
            <Stack gap="lg" align="center" maw={700}>
              <Title order={2} ta="center" size="h1">
                Browse Our{' '}
                <Text component="span" c="yellow.6" fw={700} inherit>
                  5,000+
                </Text>{' '}
                Latest Jobs
              </Title>
              <Button
                component="a"
                href="/client/login"
                size="lg"
                radius="md"
                rightSection={<IconRocket size={18} />}
                style={{
                  background:
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = 'translateY(-2px)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = 'translateY(0)')
                }
              >
                Get Started Now
              </Button>
            </Stack>
          </Center>
        </Container>
      </Box>
      <Center id="testimonials">
        <Stack gap="md" align="center" maw={600}>
          <Title order={2} ta="center">
            Happy Clients
          </Title>
        </Stack>
      </Center>
      <Box pos="relative" maw={900} mx="auto" py={40}>
        <Card
          shadow="md"
          padding="xl"
          radius="lg"
          withBorder
          style={{
            borderColor: '#e3e3e3',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div
            style={{
              opacity: fade ? 1 : 0,
              transition: 'opacity 0.6s ease',
            }}
          >
            <Stack align="center" gap={30}>
              <Image
                src={testimonials[activeTestimonial].logo}
                alt={testimonials[activeTestimonial].company}
                h={55}
                fit="contain"
              />

              <Text
                size="xl"
                ta="center"
                c="dimmed"
                fw={400}
                lh={1.7}
                style={{ maxWidth: 600, fontStyle: 'italic' }}
              >
                "{testimonials[activeTestimonial].content}"
              </Text>

              <Stack gap={2} align="center">
                <Text size="lg" fw={700}>
                  {testimonials[activeTestimonial].name}
                </Text>
                <Text size="sm" c="dimmed">
                  {testimonials[activeTestimonial].position}
                </Text>
              </Stack>
              <Group justify="center" mt={10} gap={8}>
                {testimonials.map((_, index) => (
                  <Box
                    key={index}
                    onClick={() => {
                      setFade(false);
                      setTimeout(() => {
                        setActiveTestimonial(index);
                        setFade(true);
                      }, 200);
                    }}
                    style={{
                      width: activeTestimonial === index ? 22 : 10,
                      height: 10,
                      borderRadius: 50,
                      backgroundColor:
                        activeTestimonial === index ? '#4c6ef5' : '#d0d0d0',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
              </Group>
            </Stack>
          </div>
        </Card>
      </Box>
    </>
  );
};
