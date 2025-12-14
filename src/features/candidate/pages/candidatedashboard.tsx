import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import {
  IconArrowRight,
  IconBriefcase,
  IconCheck,
  IconClock,
  IconMapPin,
  IconTarget,
  IconTrendingUp,
  IconUsers,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import type { CandidateJobs } from '@/features/dashboard/types/candidate';
import type { ApiJob } from '@/features/dashboard/types/job';
import { getAllJobs } from '@/services/candidate-services';

export default function JobPortalDashboard() {
  const [featuredJobs, setFeaturedJobs] = useState<CandidateJobs[]>([]);
  const [loading, setLoading] = useState(true);
  const [allJobs, setAllJobs] = useState<CandidateJobs[]>([]);

  const mapJob = (job: ApiJob): CandidateJobs => ({
    id: job.id,
    jobTitle: job.jobTitle,
    jobDescription: job.jobDescription,
    organizationName: job.organizationName,
    jobLocation: job.jobLocation,
    salaryRange: `₹${job.minimumSalary} - ₹${job.maximumSalary}`,
    salaryMin: job.minimumSalary,
    salaryMax: job.maximumSalary,
    experienceLevel: `${job.minimumExperience} - ${job.maximumExperience} years`,
    jobType: job.jobType,
    bookmarked: false,
    category: 'IT',
    logo: job.logo,
  });

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const jobs = await getAllJobs();
        const mapped = jobs.map(mapJob);

        setAllJobs(mapped);
        setFeaturedJobs(mapped.slice(0, 3));
      } catch (err) {
        console.error('Failed to load jobs', err);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  const stats = [
    {
      icon: IconBriefcase,
      label: 'Total Jobs',
      value: allJobs.length,
      color: 'blue',
    },
    {
      icon: IconTrendingUp,
      label: 'Avg. Salary',
      value:
        allJobs.length > 0
          ? '₹' +
            Math.floor(
              allJobs.reduce(
                (acc, j) => acc + (j.salaryMin + j.salaryMax) / 2,
                0
              ) / allJobs.length
            ).toLocaleString()
          : '₹0',
      color: 'teal',
    },
    {
      icon: IconUsers,
      label: 'Recommended for You',
      value: featuredJobs.length,
      color: 'violet',
    },
  ];

  const tips = [
    {
      icon: IconTarget,
      title: 'Optimize Your Profile',
      description: 'A complete profile attracts 5x more job offers',
      color: 'blue',
    },
    {
      icon: IconCheck,
      title: 'Match Your Skills',
      description: 'Update skills to match trending job requirements',
      color: 'teal',
    },
    {
      icon: IconClock,
      title: 'Apply Early',
      description: 'First 24 hours see 70% more interview calls',
      color: 'violet',
    },
  ];

  return (
    <Box>
      {/* Header Section */}
      <Container size="xl" py="xl">
        <Stack gap="lg" mb="md">
          <div>
            <Title order={2} size="h2" fw={600} mb="xs">
              Welcome back to JobSetu
            </Title>

            <Title order={1} size="h1" fw={700} mb="sm">
              Find Your Next{' '}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
              >
                Opportunity
              </Text>
            </Title>
            <Text size="sm" c="dimmed" style={{ whiteSpace: 'nowrap' }}>
              Discover thousands of jobs from top companies. Apply now and get
              hired faster with our AI-powered matching.
            </Text>
          </div>

          {/* Stats Grid */}
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={idx}
                  withBorder
                  p="lg"
                  radius="md"
                  className="transition-all hover:shadow-lg"
                >
                  <Group justify="space-between" mb="md">
                    <ThemeIcon
                      size="lg"
                      variant="light"
                      color={stat.color}
                      radius="md"
                    >
                      <Icon size={24} />
                    </ThemeIcon>
                    <IconArrowRight
                      size={20}
                      opacity={0}
                      className="transition-opacity hover:opacity-100"
                    />
                  </Group>
                  <Text size="sm" c="dimmed" fw={500} mb={4}>
                    {stat.label}
                  </Text>
                  <Text fw={700} size="xl">
                    {stat.value}
                  </Text>
                </Card>
              );
            })}
          </SimpleGrid>
        </Stack>
      </Container>

      {/* Featured Jobs Section */}
      <Container size="xl" py="xs">
        <Group justify="space-between" mb="xl">
          <div>
            <Title order={2} mb="xs">
              Featured Opportunities
            </Title>
            <Text c="dimmed">Handpicked jobs matching your profile</Text>
          </div>
          <Button
            component={Link}
            to="/candidate/search"
            rightSection={<IconArrowRight size={18} />}
            variant="light"
          >
            View All
          </Button>
        </Group>

        {loading ? (
          <Text>Loading jobs...</Text>
        ) : (
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
            {featuredJobs.map((job) => (
              <Card
                key={job.id}
                radius="md"
                withBorder
                shadow="sm"
                p="lg"
                style={{
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow =
                    '0 12px 24px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                }}
              >
                <Group align="flex-start" gap="lg" mb="md">
                  <Box
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: '12px',
                      overflow: 'hidden',
                      background:
                        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 24,
                      fontWeight: 700,
                      color: '#fff',
                      flexShrink: 0,
                    }}
                  >
                    {job.logo ? (
                      <img
                        src={job.logo}
                        alt={job.organizationName}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      (job.organizationName?.[0]?.toUpperCase() ?? '?')
                    )}
                  </Box>

                  <Box style={{ flex: 1, minWidth: 0 }}>
                    <Title order={4} size="h5" fw={600} lineClamp={1}>
                      {job.jobTitle}
                    </Title>
                    <Text size="sm" c="dimmed" fw={500} lineClamp={1}>
                      {job.organizationName}
                    </Text>
                  </Box>
                </Group>
                <Group gap="md" mb="md">
                  <Group gap={4}>
                    <IconMapPin size={16} stroke={1.5} />
                    <Text size="xs" c="dimmed" lineClamp={1}>
                      {job.jobLocation}
                    </Text>
                  </Group>
                  <Badge size="sm" variant="light" color="blue">
                    {job.jobType}
                  </Badge>
                </Group>
                <Text size="sm" c="dimmed" lineClamp={2} mb="md">
                  {job.jobDescription}
                </Text>

                <Group justify="space-between" align="center" mb="md">
                  <Box>
                    <Text size="xs" c="dimmed">
                      Experience
                    </Text>
                    <Text size="sm" fw={600}>
                      {job.experienceLevel}
                    </Text>
                  </Box>
                  <Box>
                    <Text size="xs" c="dimmed">
                      Salary
                    </Text>
                    <Text size="sm" fw={600} c="blue">
                      {job.salaryRange}
                    </Text>
                  </Box>
                </Group>
                <Button
                  variant="light"
                  fullWidth
                  size="sm"
                  rightSection={<IconArrowRight size={14} />}
                >
                  Apply Now
                </Button>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </Container>

      {/* Pro Tips Section */}
      <Container size="xl" py="xl">
        <div>
          <Title order={2} mb="xs">
            Pro Tips to Get Hired
          </Title>
          <Text c="dimmed" mb="lg">
            Increase your chances of landing your dream job
          </Text>
        </div>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
          {tips.map((tip, idx) => {
            const Icon = tip.icon;
            return (
              <Card
                key={idx}
                withBorder
                p="lg"
                radius="md"
                className="hover:shadow-lg"
              >
                <ThemeIcon
                  size="lg"
                  variant="light"
                  color={tip.color}
                  radius="md"
                  mb="md"
                >
                  <Icon size={24} />
                </ThemeIcon>
                <Title order={3} size="h5" mb="xs">
                  {tip.title}
                </Title>
                <Text size="sm" c="dimmed">
                  {tip.description}
                </Text>
              </Card>
            );
          })}
        </SimpleGrid>
      </Container>

      {/* CTA Section */}
      <Container size="xl" py="xl">
        <Card withBorder p="xl" radius="md">
          <Stack gap="lg">
            <div>
              <Title order={2} size="h2" mb="md">
                Ready to accelerate your career?
              </Title>
              <Text size="lg" mb="lg">
                Complete your profile with all details and get matched with the
                best opportunities personalized just for you.
              </Text>
            </div>

            <Group>
              <Button size="md" component="a" href="/candidate/profile">
                Complete Profile
              </Button>
              <Button size="md" component="a" href="/candidate/search">
                Browse All Jobs
              </Button>
            </Group>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
}
