import {
  Badge,
  Box,
  Button,
  Card,
  Center,
  Container,
  Grid,
  Group,
  Loader,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core';
import {
  IconAlertCircle,
  IconArrowRight,
  IconBriefcase,
  IconClock,
  IconFileCheckFilled,
  IconTrendingUp,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import type { ApiError } from '@/common';
import { CLIENT_PATHS } from '@/routes/config/clientPath';
import { getAllJobs } from '@/services/client-services';

interface DashboardMetrics {
  totalJobsPosted: number;
  totalJobsActive: number;
  recentlyCreatedJobs: RecentJob[];
  closingIn24Hours: ClosingJob[];
}

interface RecentJob {
  id: string;
  jobTitle: string;
  status: 'active' | 'drafted' | 'closed';
  createdAt: string;
}

interface ClosingJob {
  id: string;
  jobTitle: string;
  jobLocation: string;
  closingIn: number;
}

const ClientDashboard = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      try {
        const response = await getAllJobs();

        if (response.success && response.data) {
          const jobs = response.data;

          const activeJobs = jobs.filter((job) => job.status === 'active');

          const closingSoon = jobs.filter((job) => {
            const hoursLeft =
              (new Date(job.postEnd).getTime() - new Date().getTime()) /
              (1000 * 60 * 60);

            return hoursLeft > 0 && hoursLeft <= 24;
          });

          const recent = [...jobs]
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .slice(0, 4);

          setMetrics({
            totalJobsPosted: jobs.length,
            totalJobsActive: activeJobs.length,
            recentlyCreatedJobs: recent.map((job) => ({
              id: job.id,
              jobTitle: job.jobTitle,
              status: job.status as 'active' | 'drafted' | 'closed',
              createdAt: job.createdAt,
            })),

            closingIn24Hours: closingSoon.map((job) => ({
              id: job.id,
              jobTitle: job.jobTitle,
              jobLocation: job.jobLocation,
              closingIn: Math.ceil(
                (new Date(job.postEnd).getTime() - new Date().getTime()) /
                (1000 * 60 * 60)
              ),
            })),
          });
        }
      } catch (error) {
        const err = error as ApiError;
        toast.error(err?.response?.data?.message || err?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <Container size="xl" py="xl">
        <Center py={100}>
          <Stack align="center" gap="md">
            <Loader size="lg" />
            <Text c="dimmed">Loading dashboard...</Text>
          </Stack>
        </Center>
      </Container>
    );
  }

  if (!metrics) {
    return null;
  }

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active':
        return 'green';
      case 'drafted':
        return 'gray';
      case 'closed':
        return 'red';
      default:
        return 'blue';
    }
  };

  const getStatusLabel = (status: string): string => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Header Section */}
        <Box>
          <Text
            size="32px"
            fw={700}
            lh={1.2}
            style={{ letterSpacing: '-0.3px' }}
            mb="xs"
          >
            Welcome to Client Dashboard
          </Text>
          <Text size="md" c="dimmed" fw={400}>
            Manage your jobs and profile from one place.
          </Text>
        </Box>

        {/* Key Metrics Section */}
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {/* Total Jobs Posted */}
          <Card
            withBorder
            padding="lg"
            radius="md"
            className="hover:shadow-md transition-shadow"
          >
            <Group justify="space-between" mb="md">
              <Stack gap={2}>
                <Text size="sm" c="dimmed" fw={500}>
                  Total Jobs Posted
                </Text>
                <Text size="28px" fw={700}>
                  {metrics.totalJobsPosted}
                </Text>
              </Stack>
              <ThemeIcon size="lg" radius="md" variant="light" color="blue">
                <IconBriefcase size={24} />
              </ThemeIcon>
            </Group>
            <Text size="xs" c="dimmed">
              Lifetime postings
            </Text>
          </Card>

          {/* Total Jobs Active */}
          <Card
            withBorder
            padding="lg"
            radius="md"
            className="hover:shadow-md transition-shadow"
          >
            <Group justify="space-between" mb="md">
              <Stack gap={2}>
                <Text size="sm" c="dimmed" fw={500}>
                  Active Jobs
                </Text>
                <Text size="28px" fw={700}>
                  {metrics.totalJobsActive}
                </Text>
              </Stack>
              <ThemeIcon size="lg" radius="md" variant="light" color="green">
                <IconFileCheckFilled size={24} />
              </ThemeIcon>
            </Group>
            <Progress
              value={(metrics.totalJobsActive / metrics.totalJobsPosted) * 100}
              size="sm"
              color="green"
              radius="md"
            />
            <Text size="xs" c="dimmed" mt="xs">
              {Math.round(
                (metrics.totalJobsActive / metrics.totalJobsPosted) * 100
              )}
              % active
            </Text>
          </Card>

          {/* Closing in 24 Hours */}
          <Card
            withBorder
            padding="lg"
            radius="md"
            className="hover:shadow-md transition-shadow"
          >
            <Group justify="space-between" mb="md">
              <Stack gap={2}>
                <Text size="sm" c="dimmed" fw={500}>
                  Closing Soon
                </Text>
                <Text size="28px" fw={700}>
                  {metrics.closingIn24Hours.length}
                </Text>
              </Stack>
              <ThemeIcon size="lg" radius="md" variant="light" color="red">
                <IconAlertCircle size={24} />
              </ThemeIcon>
            </Group>
            <Text size="xs" c="dimmed">
              Within 24 hours
            </Text>
          </Card>
        </SimpleGrid>

        <Grid>
          {/* Recently Created Jobs */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card withBorder padding="lg" radius="md" h="100%">
              <Stack gap="md" h="100%">
                <Group justify="space-between">
                  <Group gap="xs">
                    <ThemeIcon
                      size="lg"
                      radius="md"
                      variant="light"
                      color="blue"
                    >
                      <IconTrendingUp size={24} />
                    </ThemeIcon>
                    <Stack gap={2}>
                      <Text fw={600} size="lg">
                        Recently Created
                      </Text>
                      <Text size="xs" c="dimmed">
                        Your latest posted jobs
                      </Text>
                    </Stack>
                  </Group>
                  <Button
                    variant="subtle"
                    size="sm"
                    rightSection={<IconArrowRight size={16} />}
                    onClick={() => navigate(CLIENT_PATHS.MANAGE_JOBS)}
                  >
                    View All
                  </Button>
                </Group>

                <Stack gap="sm" style={{ flex: 1 }}>
                  {metrics.recentlyCreatedJobs.map((job) => (
                    <Card
                      key={job.id}
                      p="sm"
                      radius="md"
                      withBorder
                      style={{ cursor: 'pointer' }}
                    >
                      <Group justify="space-between" align="flex-start">
                        <Stack gap={4} style={{ flex: 1 }}>
                          <Group gap="sm" align="center">
                            <Text fw={500} size="sm" lineClamp={1}>
                              {job.jobTitle}
                            </Text>
                            <Badge size="xs" color={getStatusColor(job.status)}>
                              {getStatusLabel(job.status)}
                            </Badge>
                          </Group>
                          <Text size="xs" c="dimmed">
                            • Posted {formatDate(job.createdAt)}
                          </Text>
                        </Stack>
                      </Group>
                    </Card>
                  ))}
                </Stack>
              </Stack>
            </Card>
          </Grid.Col>

          {/* Closing in 24 Hours */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card withBorder padding="lg" radius="md" h="100%">
              <Stack gap="md" h="100%">
                <Group justify="space-between">
                  <Group gap="xs">
                    <ThemeIcon
                      size="lg"
                      radius="md"
                      variant="light"
                      color="red"
                    >
                      <IconClock size={24} />
                    </ThemeIcon>
                    <Stack gap={2}>
                      <Text fw={600} size="lg">
                        Closing Soon
                      </Text>
                      <Text size="xs" c="dimmed">
                        Expiring within next 24 hours
                      </Text>
                    </Stack>
                  </Group>
                  <Button
                    variant="subtle"
                    size="sm"
                    rightSection={<IconArrowRight size={16} />}
                    onClick={() => navigate(CLIENT_PATHS.MANAGE_JOBS)}
                  >
                    Extend
                  </Button>
                </Group>

                <Stack gap="sm" style={{ flex: 1 }}>
                  {metrics.closingIn24Hours.length > 0 ? (
                    metrics.closingIn24Hours.map((job) => (
                      <Card
                        key={job.id}
                        p="sm"
                        radius="md"
                        withBorder
                        style={{ cursor: 'pointer' }}
                      >
                        <Stack gap={4}>
                          <Group justify="space-between">
                            <Text fw={500} size="sm" lineClamp={1}>
                              {job.jobTitle}
                            </Text>
                            <Badge size="xs" color="red" variant="dot">
                              {job.closingIn}h left
                            </Badge>
                          </Group>
                          <Text size="xs" c="dimmed">
                            {job.jobLocation}
                          </Text>
                        </Stack>
                      </Card>
                    ))
                  ) : (
                    <Center py="xl">
                      <Text c="dimmed" size="sm">
                        No jobs closing soon
                      </Text>
                    </Center>
                  )}
                </Stack>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>

        {/* Quick Actions */}
        <Card withBorder padding="lg" radius="md">
          <Stack gap="md">
            <Group>
              <ThemeIcon size="lg" radius="md" variant="light" color="blue">
                <IconBriefcase size={24} />
              </ThemeIcon>
              <Stack gap={2}>
                <Text fw={600} size="lg">
                  Quick Actions
                </Text>
                <Text size="sm" c="dimmed">
                  Get started with common tasks
                </Text>
              </Stack>
            </Group>

            <Group grow>
              <Button
                size="md"
                variant="light"
                onClick={() => navigate(CLIENT_PATHS.POST_JOB)}
              >
                + Create New Job
              </Button>
              <Button
                size="md"
                variant="light"
                onClick={() => navigate(CLIENT_PATHS.PROFILE)}
              >
                Edit Profile
              </Button>
            </Group>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
};

export default ClientDashboard;
