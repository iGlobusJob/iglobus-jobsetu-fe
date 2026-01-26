import {
  Anchor,
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
  Loader,
  Center,
  Grid,
} from '@mantine/core';
import {
  IconArrowRight,
  IconBriefcase,
  IconCheck,
  IconClock,
  IconTarget,
  IconTrendingUp,
  IconUsers,
  IconHelpCircle,
  IconMail,
  IconPhone,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { JobCard } from '@/common/pages/jobCard';
import { JobGrid } from '@/common/pages/jobGrid';
import type { CandidateJobs } from '@/features/dashboard/types/candidate';
import type { ApiJob } from '@/features/dashboard/types/job';
import { CANDIDATE_PATHS } from '@/routes/config/userPath';
import {
  getAllJobsByCandidate,
  getMyJobs,
  saveToJob,
  unSaveToJob,
} from '@/services/candidate-services';
import { useAuthStore } from '@/store/userDetails';

interface JobWithStatus extends CandidateJobs {
  bookmarked: boolean;
  applied: boolean;
}

export default function JobPortalDashboard() {
  const [featuredJobs, setFeaturedJobs] = useState<JobWithStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allJobs, setAllJobs] = useState<CandidateJobs[]>([]);
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Set<string>>(new Set());
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn());
  const userRole = useAuthStore((s) => s.userRole);

  const mapJob = (job: ApiJob): CandidateJobs => ({
    id: job.id,
    jobTitle: job.jobTitle,
    jobDescription: job.jobDescription,
    organizationName: job.organizationName,
    jobLocation: job.jobLocation,
    salaryRange: `₹${job.minimumSalary.toLocaleString()} - ₹${job.maximumSalary.toLocaleString('en-IN')}`,
    salaryMin: job.minimumSalary,
    salaryMax: job.maximumSalary,
    experienceLevel: `${job.minimumExperience} - ${job.maximumExperience} years`,
    jobType: job.jobType,
    status: job.status,
    bookmarked: false,
    category: 'IT',
    logo: job.logo,
  });

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        const [jobs, myJobsResponse] = await Promise.all([
          getAllJobsByCandidate(),
          getMyJobs(),
        ]);

        const mapped = jobs.map(mapJob);
        setAllJobs(mapped);

        const bookmarkedSet = new Set<string>();
        const appliedSet = new Set<string>();

        myJobsResponse?.forEach((item) => {
          const jobId = item.jobId?.id;
          if (!jobId) return;

          if (item.isJobSaved) bookmarkedSet.add(jobId);
          if (item.isJobApplied) appliedSet.add(jobId);
        });

        setBookmarkedJobs(bookmarkedSet);
        setAppliedJobs(appliedSet);

        const featuredWithStatus = mapped.slice(0, 3).map((job) => ({
          ...job,
          bookmarked: bookmarkedSet.has(job.id),
          applied: appliedSet.has(job.id),
        }));
        setFeaturedJobs(featuredWithStatus);
      } catch (err) {
        console.error('Failed to load jobs', err);
        setError('Failed to load jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  const handleBookmark = async (
    jobId: string,
    isBookmarked: boolean
  ): Promise<void> => {
    try {
      if (isBookmarked) {
        await unSaveToJob({ jobId });
        setBookmarkedJobs((prev) => {
          const newSet = new Set(prev);
          newSet.delete(jobId);
          return newSet;
        });
        setFeaturedJobs((prev) =>
          prev.map((job) =>
            job.id === jobId ? { ...job, bookmarked: false } : job
          )
        );
      } else {
        await saveToJob({ jobId });
        setBookmarkedJobs((prev) => new Set(prev).add(jobId));
        setFeaturedJobs((prev) =>
          prev.map((job) =>
            job.id === jobId ? { ...job, bookmarked: true } : job
          )
        );
      }
    } catch (err) {
      console.error('Failed to bookmark job:', err);
    }
  };

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
      value: (() => {
        if (!allJobs || allJobs.length === 0) return '₹0';

        const salaries = allJobs
          .map((j) => {
            const min = j.salaryMin ?? 0;
            const max = j.salaryMax ?? 0;
            return min && max ? (min + max) / 2 : 0;
          })
          .filter((s) => s > 0)
          .sort((a, b) => a - b);

        if (salaries.length === 0) return '₹0';

        const mid = Math.floor(salaries.length / 2);
        const median =
          salaries.length % 2 !== 0
            ? salaries[mid]
            : (salaries[mid - 1] + salaries[mid]) / 2;

        return `₹${Math.round(median).toLocaleString('en-IN')}`;
      })(),
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

  const enrichedFeaturedJobs = featuredJobs.map((job) => ({
    ...job,
    bookmarked: bookmarkedJobs.has(job.id),
    applied: appliedJobs.has(job.id),
  }));

  return (
    <Box>
      {/* Header Section */}
      <Container size="xl" py="xl">
        <Stack gap="lg" mb="md">
          <div>
            <Title order={2} size="h2" fw={600} mb="xs">
              Welcome to JobSetu
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
            <Text size="sm" c="dimmed">
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
                  style={{
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow =
                      '0 8px 16px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow =
                      '0 1px 3px rgba(0,0,0,0.05)';
                  }}
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
                    {stat.label === 'Total Jobs' ? (
                      <IconArrowRight
                        size={20}
                        opacity={0.5}
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate(CANDIDATE_PATHS.JOB_SEARCH)}
                      />
                    ) : (
                      <IconArrowRight size={20} opacity={0.5} />
                    )}
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
            to={CANDIDATE_PATHS.JOB_SEARCH}
            rightSection={<IconArrowRight size={18} />}
            variant="light"
          >
            View All
          </Button>
        </Group>

        {error && (
          <Card
            p="md"
            radius="md"
            mb={40}
            style={{ backgroundColor: '#ffe0e0', borderColor: '#ff6b6b' }}
            withBorder
          >
            <Text c="#cc0000" size="sm">
              {error}
            </Text>
          </Card>
        )}

        {(!isLoggedIn || userRole === 'candidate') &&
          (loading ? (
            <Center py={80}>
              <Loader size="lg" />
            </Center>
          ) : enrichedFeaturedJobs.length > 0 ? (
            <JobGrid>
              {enrichedFeaturedJobs.map((job) => (
                <Grid.Col key={job.id} span={{ base: 12, sm: 6, lg: 4 }}>
                  <JobCard
                    job={job}
                    onBookmark={(jobId) =>
                      handleBookmark(jobId, bookmarkedJobs.has(jobId))
                    }
                  />
                </Grid.Col>
              ))}
            </JobGrid>
          ) : (
            <Card p={60} radius="md" withBorder>
              <Center>
                <Stack gap="md" align="center">
                  <Title order={3} size="h4">
                    No jobs available
                  </Title>
                  <Text c="dimmed">Check back soon for more opportunities</Text>
                </Stack>
              </Center>
            </Card>
          ))}
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
                style={{
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow =
                    '0 8px 16px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow =
                    '0 1px 3px rgba(0,0,0,0.05)';
                }}
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

      <Container size="xl" py="sm">
        <Card radius="lg" p="xl" withBorder>
          <Stack gap="md">
            <Group gap="sm">
              <ThemeIcon size="lg" radius="md" variant="light">
                <IconHelpCircle size={20} />
              </ThemeIcon>
              <Title order={4}>Got stuck? Need help?</Title>
            </Group>
            <Text size="sm" color="dimmed">
              Our support team is here to help you get back on track quickly.
              Reach out to us anytime using the details below.
            </Text>
            <Group gap="xl" mt="sm">
              <Group gap="xs">
                <ThemeIcon size="sm" radius="xl" variant="light" color="blue">
                  <IconMail size={14} />
                </ThemeIcon>
                <Anchor
                  component="a"
                  target="_blank"
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=info@iglobuscc.com"
                >
                  info@iglobuscc.com
                </Anchor>
              </Group>
              <Group gap="xs">
                <ThemeIcon size="sm" radius="xl" variant="light" color="green">
                  <IconPhone size={14} />
                </ThemeIcon>
                <Anchor href="tel:+91 8464848389" size="sm" fw={500}>
                  +91-8464848389
                </Anchor>
              </Group>
            </Group>
          </Stack>
        </Card>
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
              <Button size="md" component={Link} to={CANDIDATE_PATHS.PROFILE}>
                Complete Profile
              </Button>
              <Button
                size="md"
                component={Link}
                to={CANDIDATE_PATHS.JOB_SEARCH}
                variant="light"
              >
                Browse All Jobs
              </Button>
            </Group>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
}
