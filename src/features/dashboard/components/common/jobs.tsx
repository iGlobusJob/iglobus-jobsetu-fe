import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Group,
  Paper,
  rem,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import {
  IconArrowRight,
  IconChevronRight,
  IconMapPin,
  IconStar,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import { getAllJobs } from '@/services/candidate-services';
import { useOtpModalStore } from '@/store/otpModalStore';
import { useAuthStore } from '@/store/userDetails';

import type { JobCard } from '../../types/job';

const JobCard = ({
  job,
  onBookmark,
}: {
  job: JobCard;
  onBookmark: (jobId: string) => void;
}) => {
  const openModal = useOtpModalStore((state) => state.openModal);
  const { token, userRole } = useAuthStore();
  return (
    <Paper
      onClick={(e) => {
        e.preventDefault();
        if (!token || userRole !== 'candidate') {
          openModal();
          return;
        }
        window.location.href = `/candidate/search`;
      }}
      radius="md"
      style={{
        overflow: 'hidden',
        position: 'relative',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      shadow="sm"
      withBorder
      p="lg"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
      }}
    >
      {/* Bookmark */}
      <ActionIcon
        variant="light"
        radius="md"
        size="lg"
        onClick={() => onBookmark(job.id)}
        style={{
          position: 'absolute',
          top: rem(12),
          right: rem(12),
          zIndex: 10,
          transition: 'all 0.2s ease',
        }}
        color={job.bookmarked ? 'yellow' : 'gray'}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <IconStar size={18} fill={job.bookmarked ? 'currentColor' : 'none'} />
      </ActionIcon>

      {/* Logo + Titles */}
      <Flex align="flex-start" gap="lg" mb="md" style={{ paddingRight: 15 }}>
        <Box
          style={{
            minWidth: 60,
            width: 60,
            height: 60,
            borderRadius: '12px',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            fontWeight: 700,
            color: '#fff',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
            flexShrink: 0,
          }}
        >
          {job.logo ? (
            <img
              src={job.logo}
              alt={job.organizationName || 'Logo'}
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
          <Title order={4} size="h5" fw={600} mb={2} lineClamp={1}>
            {job.jobTitle}
          </Title>
          <Text size="sm" c="dimmed" fw={500} lineClamp={1}>
            {job.organizationName}
          </Text>
        </Box>
      </Flex>

      {/* Location + Type */}
      <Flex align="center" gap="md" mb="md" style={{ flexWrap: 'wrap' }}>
        <Flex align="center" gap={4} style={{ minWidth: 0, flex: '1 1 auto' }}>
          <IconMapPin size={16} stroke={1.5} style={{ color: '#666' }} />
          <Text size="xs" c="dimmed" lineClamp={1}>
            {job.jobLocation}
          </Text>
        </Flex>
        <Badge variant="light" size="sm" color="blue">
          {job.jobType}
        </Badge>
      </Flex>
      {/* Description */}
      <Text
        size="sm"
        c="dimmed"
        lineClamp={2}
        mb="md"
        style={{ minHeight: '2.5rem' }}
        dangerouslySetInnerHTML={{
          __html: job.jobDescription,
        }}
      />

      {/* Footer */}
      <Group
        justify="space-between"
        align="center"
        pt="sm"
        style={{ borderTop: '1px solid #e9ecef' }}
      >
        <Box>
          <Text size="xs" c="dimmed" mb={4}>
            Experience
          </Text>
          <Text size="sm" fw={600}>
            {job.experienceLevel}
          </Text>
        </Box>
        <Box>
          <Text size="xs" c="dimmed" mb={4}>
            Salary
          </Text>
          <Text size="sm" fw={600} c="blue">
            {job.salaryMin} - {job.salaryMax}
          </Text>
        </Box>
        <Button
          variant="light"
          size="xs"
          rightSection={<IconChevronRight size={14} />}
          onClick={(e) => {
            e.preventDefault();
            if (!token || userRole !== 'candidate') {
              openModal();
              return;
            }
            window.location.href = `/candidate/search`;
          }}
        >
          Apply
        </Button>
      </Group>
    </Paper>
  );
};

export const JobListingsSection = () => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [activeTab, setActiveTab] = useState<
    'recent' | 'freelance' | 'partTime' | 'fullTime'
  >('recent');
  const [jobs, setJobs] = useState<JobCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookmarkedJobs, setBookmarkedJobs] = useState(
    new Set<string | number>()
  );

  const handleBookmark = (jobId: string | number) => {
    setBookmarkedJobs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllJobs();
        const jobs = data.map((apiJob) => ({
          id: apiJob.id,
          jobTitle: apiJob.jobTitle,
          organizationName: apiJob.organizationName,
          jobLocation: apiJob.jobLocation,
          jobType: apiJob.jobType,
          jobDescription: apiJob.jobDescription,
          minimumExperience: apiJob.minimumExperience,
          salaryMin: apiJob.minimumSalary,
          salaryMax: apiJob.maximumSalary,
          experienceLevel: `${apiJob.minimumExperience} - ${apiJob.maximumExperience} years`,
          salaryRange: `${apiJob.minimumSalary} - ${apiJob.maximumSalary}`,
          bookmarked: false,
          category: apiJob.jobType || 'general',
          logo: apiJob.logo,
        }));
        setJobs(jobs);
      } catch (error) {
        console.error('Failed to load jobs', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    switch (activeTab) {
      case 'freelance':
        return job.jobType === 'freelance';
      case 'partTime':
        return job.jobType === 'part-time';
      case 'fullTime':
        return job.jobType === 'full-time';
      case 'recent':
      default:
        return true;
    }
  });

  // Merge bookmark state
  const currentJobs = filteredJobs.map((job) => ({
    ...job,
    bookmarked: bookmarkedJobs.has(job.id),
  }));
  const visibleJobs = currentJobs.slice(0, visibleCount);

  return (
    <Box component="section" py={rem(80)}>
      <Container size="xl">
        {/*Section Header */}
        <Box
          mb={rem(40)}
          style={{ textAlign: 'center', maxWidth: rem(700), margin: '0 auto' }}
        >
          <Title
            order={2}
            size="h1"
            mb="md"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            }}
          >
            Recommended Jobs
          </Title>
        </Box>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={(v) => {
            setActiveTab(v as 'recent' | 'freelance' | 'partTime' | 'fullTime');
            setVisibleCount(6);
          }}
          variant="pills"
          radius="md"
          mb="xl"
        >
          <Tabs.List grow style={{ maxWidth: rem(900), margin: '0 auto' }}>
            <Tabs.Tab value="recent">Recent Jobs</Tabs.Tab>
            <Tabs.Tab value="freelance">Freelancer</Tabs.Tab>
            <Tabs.Tab value="partTime">Part Time</Tabs.Tab>
            <Tabs.Tab value="fullTime">Full Time</Tabs.Tab>
          </Tabs.List>
        </Tabs>

        {/* Job Cards */}
        {loading ? (
          <Text ta="center">Loading jobs...</Text>
        ) : currentJobs.length === 0 ? (
          <Text ta="center">No jobs found.</Text>
        ) : (
          <Grid gutter="xl" mb={40}>
            {visibleJobs.map((job) => (
              <Grid.Col key={job.id} span={{ base: 12, sm: 6, lg: 4 }}>
                <JobCard job={job} onBookmark={handleBookmark} />
              </Grid.Col>
            ))}
          </Grid>
        )}

        {/* View More */}
        {visibleCount < currentJobs.length && (
          <Box mt={rem(50)} style={{ textAlign: 'center' }}>
            <Button
              onClick={() => setVisibleCount((prev) => prev + 3)}
              size="lg"
              rightSection={<IconArrowRight size={18} />}
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
            >
              View More
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};
