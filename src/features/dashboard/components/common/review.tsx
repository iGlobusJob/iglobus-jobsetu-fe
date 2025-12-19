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
    company: 'Vigilant',
    logo: 'https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg',
    content:
      'Iglobus Jobsetu has been a dependable hiring partner for us. Their ability to understand role requirements and deliver relevant profiles consistently has helped us close positions faster without compromising on quality. The platform brings structure, transparency, and speed to the hiring process.',
    name: 'Sravani',
    position: ' Accounts Manager',
  },
  {
    id: 2,
    company: 'Coforge',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/98/WordPress_blue_logo.svg',
    content:
      'Working with Iglobus Jobsetu has been a smooth and professional experience. Their recruitment approach is well-organized, and the candidates shared were well-aligned with our technical and cultural expectations. The team’s responsiveness and follow-through truly stand out.',
    name: 'Arvind',
    position: 'Manager',
  },
  {
    id: 3,
    company: 'Cosmic',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png',
    content:
      'Iglobus Jobsetu has proven to be a reliable platform for sourcing skilled talent. Their recruiters understand urgency, niche requirements, and quality benchmarks. It has significantly improved our hiring efficiency across multiple roles.',
    name: 'Dilip',
    position: 'Head of Recruitment',
  },
  {
    id: 4,
    company: 'Buchanan',
    logo: 'https://cdn.worldvectorlogo.com/logos/dropbox-4.svg',
    content:
      'What we appreciate most about Iglobus Jobsetu is their clarity and consistency. The platform simplifies coordination and delivers well-screened candidates, making it easier for HR teams to focus on strategic hiring rather than operational follow-ups.',
    name: 'Suman',
    position: 'Head of HR Department',
  },
  {
    id: 5,
    company: 'Innova Solutions',
    logo: 'https://cdn.worldvectorlogo.com/logos/dropbox-4.svg',
    content:
      'Iglobus Jobsetu has supported us with timely and dependable talent delivery. Their understanding of delivery timelines and role-critical skills makes them a valuable hiring partner, especially for fast-moving project requirements.',
    name: 'Syed Sana ',
    position: 'Head of Delivery',
  },
  {
    id: 6,
    company: 'Crisil',
    logo: 'https://cdn.worldvectorlogo.com/logos/dropbox-4.svg',
    content:
      'The Iglobus Jobsetu platform has added real value to our recruitment efforts. From requirement understanding to candidate quality, the process has been efficient and professional. It’s a platform built with recruiters’ realities in mind.',
    name: 'Archana Mahajan ',
    position: 'Recruitment Head',
  },
  {
    id: 7,
    company: 'Athena Global Technologies',
    logo: 'https://cdn.worldvectorlogo.com/logos/dropbox-4.svg',
    content:
      'Iglobus Jobsetu stands out for its structured hiring workflow and quality-driven approach. The candidates presented were relevant, pre-screened, and interview-ready, which helped us reduce hiring cycles significantly.',
    name: 'Madhu ',
    position: 'Head of Recruitment',
  },
  {
    id: 8,
    company: 'Starcare',
    logo: 'https://cdn.worldvectorlogo.com/logos/dropbox-4.svg',
    content:
      'For delivery-focused teams like ours, timely hiring is critical. Iglobus Jobsetu has consistently supported us with reliable talent and smooth coordination, enabling us to meet project commitments without delays.',
    name: 'Jilani ',
    position: 'Delivery Head',
  },
  {
    id: 9,
    company: 'Wall of Work',
    logo: 'https://cdn.worldvectorlogo.com/logos/dropbox-4.svg',
    content:
      'Iglobus Jobsetu has been instrumental in supporting our delivery timelines with reliable and well-matched talent. The platform’s structured process and the team’s understanding of delivery-critical requirements made hiring smoother and more predictable for us.',
    name: 'Rahul ',
    position: 'Delivery Head',
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
