import {
  Box,
  Button,
  Container,
  Grid,
  rem,
  Tabs,
  Text,
  Title,
  Loader,
  Center,
  Paper,
} from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import { JobCard } from '@/common/pages/jobCard';
import {
  getAllJobs,
  getMyJobs,
  saveToJob,
  unSaveToJob,
} from '@/services/candidate-services';
import { useAuthStore } from '@/store/userDetails';

import type { CandidateJobs } from '../../types/candidate';

export const JobListingsSection = () => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [activeTab, setActiveTab] = useState<
    'recent' | 'freelance' | 'partTime' | 'fullTime'
  >('recent');
  const [jobs, setJobs] = useState<CandidateJobs[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Set<string>>(new Set());
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());
  const token = useAuthStore((s) => s.token);
  const userRole = useAuthStore((s) => s.userRole);
  const isLoggedIn = Boolean(token);
  const isCandidate = isLoggedIn && userRole === 'candidate';
  const showRecommended = !isLoggedIn || isCandidate;

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        const allJobs = await getAllJobs();

        const bookmarkedSet = new Set<string>();
        const appliedSet = new Set<string>();

        if (isCandidate) {
          const myJobsResponse = await getMyJobs();
          myJobsResponse?.forEach((item) => {
            const jobId = item.jobId?.id;
            if (!jobId) return;

            if (item.isJobSaved) bookmarkedSet.add(jobId);
            if (item.isJobApplied) appliedSet.add(jobId);
          });
        }

        setBookmarkedJobs(bookmarkedSet);
        setAppliedJobs(appliedSet);

        const enrichedJobs: CandidateJobs[] = allJobs.map((apiJob) => ({
          id: apiJob.id,
          jobTitle: apiJob.jobTitle,
          organizationName: apiJob.organizationName,
          jobLocation: apiJob.jobLocation,
          jobType: apiJob.jobType,
          jobDescription: apiJob.jobDescription,
          salaryMin: apiJob.minimumSalary,
          salaryMax: apiJob.maximumSalary,
          experienceLevel: `${apiJob.minimumExperience} - ${apiJob.maximumExperience} years`,
          salaryRange: `₹${apiJob.minimumSalary.toLocaleString()} - ₹${apiJob.maximumSalary.toLocaleString()}`,
          bookmarked: bookmarkedSet.has(apiJob.id),
          applied: appliedSet.has(apiJob.id),
          category: apiJob.jobType || 'general',
          logo: apiJob.logo,
        }));

        setJobs(enrichedJobs);
      } catch (error) {
        console.error('Failed to load jobs', error);
        setError('Failed to load jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, [isCandidate]);

  const handleBookmark = async (
    jobId: string,
    isCurrentlyBookmarked: boolean
  ) => {
    try {
      if (isCurrentlyBookmarked) {
        await unSaveToJob({ jobId });
        setBookmarkedJobs((prev) => {
          const newSet = new Set(prev);
          newSet.delete(jobId);
          return newSet;
        });
      } else {
        await saveToJob({ jobId });
        setBookmarkedJobs((prev) => new Set(prev).add(jobId));
      }

      // Update jobs array to reflect the change
      setJobs((prev) =>
        prev.map((job) =>
          job.id === jobId
            ? { ...job, bookmarked: !isCurrentlyBookmarked }
            : job
        )
      );
    } catch (err) {
      console.error('Failed to bookmark job:', err);
    }
  };

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

  // Merge current bookmark state
  const currentJobs = filteredJobs.map((job) => ({
    ...job,
    bookmarked: bookmarkedJobs.has(job.id),
    applied: appliedJobs.has(job.id),
  }));

  const visibleJobs = currentJobs.slice(0, visibleCount);

  return (
    <>
      {showRecommended && (
        <Box component="section" py={rem(80)}>
          <Container size="xl">
            {/* Section Header */}
            <Box
              mb={rem(40)}
              style={{
                textAlign: 'center',
                maxWidth: rem(700),
                margin: '0 auto',
              }}
            >
              <Title
                order={2}
                size="h1"
                mb="md"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
              >
                Recommended Jobs
              </Title>
            </Box>

            {/* Error Message */}
            {error && (
              <Paper
                p="md"
                radius="md"
                mb={40}
                style={{ backgroundColor: '#ffe0e0', borderColor: '#ff6b6b' }}
                withBorder
              >
                <Text c="#cc0000" size="sm">
                  {error}
                </Text>
              </Paper>
            )}

            {/* Tabs */}
            <Tabs
              value={activeTab}
              onChange={(v) => {
                setActiveTab(
                  v as 'recent' | 'freelance' | 'partTime' | 'fullTime'
                );
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
              <Center py={80}>
                <Loader size="lg" />
              </Center>
            ) : currentJobs.length === 0 ? (
              <Paper p={60} radius="md" withBorder>
                <Center>
                  <Text c="dimmed">No jobs found.</Text>
                </Center>
              </Paper>
            ) : (
              <Grid gutter="xl" mb={40}>
                {visibleJobs.map((job) => (
                  <Grid.Col key={job.id} span={{ base: 12, sm: 6, lg: 4 }}>
                    <JobCard
                      job={job}
                      onBookmark={
                        isCandidate
                          ? (jobId) =>
                              handleBookmark(jobId, bookmarkedJobs.has(jobId))
                          : undefined
                      }
                      hideBookmark={!isCandidate}
                    />
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
      )}
    </>
  );
};
