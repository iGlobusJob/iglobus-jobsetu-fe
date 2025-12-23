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
  IconBuildingSkyscraper,
  IconChartBar,
  IconDeviceDesktop,
  IconHeadset,
  IconLayersOff,
  IconPhoto,
  IconSend,
  IconUsers,
} from '@tabler/icons-react';

import type { categoryInterface } from '../../types/categories';

// Job categories data
const categories = [
  {
    id: 1,
    title: 'IT & Software Development',
    jobs: '3,200',
    icon: IconDeviceDesktop,
    color: 'blue',
    href: '/jobs/it-software',
  },
  {
    id: 2,
    title: 'Data, AI & Analytics',
    jobs: '980',
    icon: IconChartBar,
    color: 'violet',
    href: '/jobs/data-ai',
  },
  {
    id: 3,
    title: 'Sales & Business Development',
    jobs: '1,850',
    icon: IconSend,
    color: 'cyan',
    href: '/jobs/sales',
  },
  {
    id: 4,
    title: 'HR & Talent Acquisition',
    jobs: '920',
    icon: IconUsers,
    color: 'teal',
    href: '/jobs/hr',
  },
  {
    id: 5,
    title: 'Business Operations & Admin',
    jobs: '1,300',
    icon: IconBuildingSkyscraper,
    color: 'orange',
    href: '/jobs/business-operations',
  },
  {
    id: 6,
    title: 'Design, UI & Creative',
    jobs: '640',
    icon: IconPhoto,
    color: 'grape',
    href: '/jobs/design',
  },
  {
    id: 7,
    title: 'Customer Support',
    jobs: '1,430',
    icon: IconHeadset,
    color: 'orange',
    href: '/jobs/support-ops',
  },
  {
    id: 8,
    title: 'Freshers & Entry-Level Roles',
    jobs: '2,100',
    icon: IconLayersOff,
    color: 'lime',
    href: '/jobs/freshers',
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
