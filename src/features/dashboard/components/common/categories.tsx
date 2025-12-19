import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  rem,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import {
  IconArrowRight,
  IconBriefcase,
  IconBuildingSkyscraper,
  IconDeviceDesktop,
  IconLayersOff,
  IconPhoto,
  IconSend,
  IconStethoscope,
  IconUsers,
} from '@tabler/icons-react';

import type { categoryInterface } from '../../types/categories';

// Job categories data
const categories = [
  {
    id: 1,
    title: 'IT & Software',
    jobs: '2024',
    icon: IconLayersOff,
    color: 'blue',
    href: '/job-categories',
  },
  {
    id: 2,
    title: 'Technology',
    jobs: '1250',
    icon: IconDeviceDesktop,
    color: 'cyan',
    href: '/job-categories',
  },
  {
    id: 3,
    title: 'Government',
    jobs: '802',
    icon: IconBriefcase,
    color: 'indigo',
    href: '/job-categories',
  },
  {
    id: 4,
    title: 'Accounting / Finance',
    jobs: '577',
    icon: IconStethoscope,
    color: 'violet',
    href: '/job-categories',
  },
  {
    id: 5,
    title: 'Construction / Facilities',
    jobs: '285',
    icon: IconBuildingSkyscraper,
    color: 'orange',
    href: '/job-categories',
  },
  {
    id: 6,
    title: 'Tele-communications',
    jobs: '495',
    icon: IconSend,
    color: 'pink',
    href: '/job-categories',
  },
  {
    id: 7,
    title: 'Design & Multimedia',
    jobs: '1045',
    icon: IconPhoto,
    color: 'grape',
    href: '/job-categories',
  },
  {
    id: 8,
    title: 'Human Resource',
    jobs: '1516',
    icon: IconUsers,
    color: 'teal',
    href: '/job-categories',
  },
];

const CategoryCard = ({ category }: { category: categoryInterface }) => {
  const Icon = category.icon;

  return (
    <Paper
      p="xl"
      radius="md"
      withBorder
      style={{
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <Stack align="center" gap="lg">
        {/* Icon */}
        <Box
          style={{
            width: rem(80),
            height: rem(80),
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
          }}
        >
          <Icon size={40} stroke={1.5} color="#066fd1" />
        </Box>

        {/* Content */}
        <Box style={{ textAlign: 'center' }}>
          <Title
            order={5}
            size="h5"
            mb="xs"
            style={{
              transition: 'color 0.3s ease',
            }}
          >
            {category.title}
          </Title>
          <Text size="sm" c="dimmed">
            {category.jobs} Jobs
          </Text>
        </Box>
      </Stack>
    </Paper>
  );
};

export const Categories = () => {
  return (
    <Box component="section" id="categories" mt="xl">
      <Container size="xl">
        {/* Section Header */}
        <Box
          mb={rem(60)}
          style={{ textAlign: 'center', maxWidth: rem(700), margin: '0 auto' }}
        >
          <Title
            order={2}
            size="h2"
            mb="md"
            component="section"
            id="categories"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            }}
          >
            Browse Jobs Categories
          </Title>
        </Box>

        {/* Categories Grid */}
        <Grid gutter={{ base: 'md', md: 'lg' }}>
          {categories.map((category) => (
            <Grid.Col
              key={category.id}
              span={{ base: 12, xs: 6, md: 4, lg: 3 }}
            >
              <CategoryCard category={category} />
            </Grid.Col>
          ))}
        </Grid>

        {/* Browse All Button */}
        <Box mt={rem(60)} style={{ textAlign: 'center' }}>
          <Button
            component="a"
            href="/job-categories"
            size="lg"
            rightSection={<IconArrowRight size={18} />}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
            style={{
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            Browse All Categories
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
