import {
  ActionIcon,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Pagination,
  Paper,
  RangeSlider,
  Select,
  Text,
  TextInput,
  Title,
  Loader,
  Center,
} from '@mantine/core';
import { IconSearch, IconX, IconAlertCircle } from '@tabler/icons-react';
import { useEffect, useMemo, useState, type JSX } from 'react';

import { JobCard } from '@/common/pages/jobCard';
import type { CandidateJobs } from '@/features/dashboard/types/candidate';
import {
  getAllJobsByCandidate,
  getMyJobs,
} from '@/services/candidate-services';

interface ApiJob {
  id: string;
  jobTitle: string;
  jobDescription: string;
  organizationName: string;
  jobLocation: string;
  minimumSalary: number;
  maximumSalary: number;
  minimumExperience: number;
  maximumExperience: number;
  jobType: string;
  logo: string | null;
}

const mapJob = (job: ApiJob): CandidateJobs => ({
  id: job.id,
  jobTitle: job.jobTitle,
  jobDescription: job.jobDescription,
  organizationName: job.organizationName,
  jobLocation: job.jobLocation,
  salaryRange: `${job.minimumSalary} - ${job.maximumSalary}/m`,
  salaryMin: job.minimumSalary,
  salaryMax: job.maximumSalary,
  experienceLevel: `${job.minimumExperience} - ${job.maximumExperience} years`,
  jobType: job.jobType,
  bookmarked: false,
  category: 'IT',
  logo: job.logo,
});

const ITEMS_PER_PAGE = 6;

export const JobListingsSection = (): JSX.Element => {
  const [jobs, setJobs] = useState<CandidateJobs[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Set<string>>(new Set());
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedJobType, setSelectedJobType] = useState<string | null>(null);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([500, 500]);
  const [experienceFilter, setExperienceFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [maxSalary, setMaxSalary] = useState(300000);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        const [jobsData, myJobsResponse] = await Promise.all([
          getAllJobsByCandidate(),
          getMyJobs(),
        ]);

        const mapped = jobsData.map(mapJob);
        setJobs(mapped);

        const max = Math.max(...mapped.map((job) => job.salaryMax || 0));
        setSalaryRange([500, max]);
        setMaxSalary(max);

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
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
        setError('Failed to load jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  const handleBookmark = (id: string): void => {
    setBookmarkedJobs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredJobs = useMemo(() => {
    let list = jobs.map((job) => ({
      ...job,
      bookmarked: bookmarkedJobs.has(job.id),
      applied: appliedJobs.has(job.id),
    }));

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      list = list.filter(
        (job) =>
          job.jobTitle.toLowerCase().includes(query) ||
          job.organizationName.toLowerCase().includes(query) ||
          job.jobLocation.toLowerCase().includes(query)
      );
    }

    if (selectedJobType) {
      list = list.filter((job) => job.jobType === selectedJobType);
    }

    list = list.filter(
      (job) =>
        job.salaryMax >= salaryRange[0] && job.salaryMin <= salaryRange[1]
    );

    if (experienceFilter) {
      list = list.filter((job) => job.experienceLevel === experienceFilter);
    }

    return list;
  }, [
    jobs,
    searchQuery,
    selectedJobType,
    salaryRange,
    experienceFilter,
    bookmarkedJobs,
    appliedJobs,
  ]);

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const isFiltered =
    searchQuery.trim() ||
    selectedJobType ||
    experienceFilter ||
    salaryRange[0] !== 500 ||
    salaryRange[1] !== maxSalary;

  const resetFilters = (): void => {
    setSearchQuery('');
    setSelectedJobType(null);
    setSalaryRange([500, maxSalary]);
    setExperienceFilter('');
    setCurrentPage(1);
  };

  return (
    <Box component="section" py={40}>
      <Container size="xl">
        {/* Header */}
        <Box mb={50}>
          <Title order={2} size="h2" mb="sm">
            Explore Job Opportunities
          </Title>
          <Text size="md" c="dimmed">
            Find your perfect job match from thousands of opportunities
          </Text>
        </Box>

        {/* Search & Filters */}
        <Paper p="xl" radius="md" mb={40} withBorder>
          <TextInput
            placeholder="Search by job title, company, or location..."
            leftSection={<IconSearch size={18} />}
            rightSection={
              searchQuery ? (
                <ActionIcon
                  onClick={() => {
                    setSearchQuery('');
                    setCurrentPage(1);
                  }}
                  size="xs"
                  color="gray"
                  radius="xl"
                  variant="transparent"
                >
                  <IconX size={14} />
                </ActionIcon>
              ) : null
            }
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            mb="lg"
            radius="md"
          />

          <Grid>
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Select
                label="Job Type"
                placeholder="All Types"
                value={selectedJobType}
                onChange={(value) => {
                  setSelectedJobType(value);
                  setCurrentPage(1);
                }}
                data={[
                  { value: 'full-time', label: 'Full-Time' },
                  { value: 'part-time', label: 'Part-Time' },
                  { value: 'contract', label: 'Contract' },
                  { value: 'freelance', label: 'Freelance' },
                  { value: 'internship', label: 'Internship' },
                ]}
                clearable
                searchable
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Select
                label="Experience Level"
                placeholder="All Levels"
                value={experienceFilter}
                onChange={(value) => {
                  setExperienceFilter(value ?? '');
                  setCurrentPage(1);
                }}
                data={[
                  { value: '0 - 1 years', label: 'Entry Level' },
                  { value: '1 - 2 years', label: '1-2 Years' },
                  { value: '2 - 3 years', label: '2-3 Years' },
                  { value: '4+ years', label: '4+ Years' },
                ]}
                clearable
                searchable
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Text size="sm" fw={500} mb={8}>
                Salary Range: ₹{salaryRange[0].toLocaleString()} - ₹
                {salaryRange[1].toLocaleString()}
              </Text>
              <RangeSlider
                value={salaryRange}
                onChange={(value) => {
                  setSalaryRange(value);
                  setCurrentPage(1);
                }}
                min={500}
                max={maxSalary}
                step={5000}
                marks={[
                  { value: 500, label: '₹500' },
                  { value: maxSalary, label: `₹${maxSalary.toLocaleString()}` },
                ]}
              />
            </Grid.Col>
          </Grid>

          {isFiltered && (
            <Button
              size="xs"
              mt="md"
              variant="light"
              onClick={resetFilters}
              leftSection={<IconX size={14} />}
            >
              Reset Filters
            </Button>
          )}
        </Paper>

        {/* Error Message */}
        {error && (
          <Paper
            p="md"
            radius="md"
            mb={40}
            style={{ backgroundColor: '#ffe0e0', borderColor: '#ff6b6b' }}
            withBorder
          >
            <Flex align="center" gap="sm">
              <IconAlertCircle color="#ff6b6b" size={20} />
              <Text c="#cc0000">{error}</Text>
            </Flex>
          </Paper>
        )}

        {/* Results Count */}
        {!loading && filteredJobs.length > 0 && (
          <Flex justify="space-between" align="center" mb="lg">
            <Text size="sm" c="dimmed">
              Showing <strong>{paginatedJobs.length}</strong> of{' '}
              <strong>{filteredJobs.length}</strong> jobs
              {isFiltered && ` (filtered)`}
            </Text>
          </Flex>
        )}

        {/* Jobs Grid */}
        {loading ? (
          <Center py={60}>
            <Loader size="lg" />
          </Center>
        ) : paginatedJobs.length > 0 ? (
          <>
            <Grid mb={40} style={{ minHeight: '600px' }}>
              {paginatedJobs.map((job) => (
                <Grid.Col key={job.id} span={{ base: 12, md: 6, lg: 4 }}>
                  <JobCard job={job} onBookmark={handleBookmark} />
                </Grid.Col>
              ))}
            </Grid>

            {totalPages > 1 && (
              <Flex justify="center" mt={40}>
                <Pagination
                  value={currentPage}
                  onChange={setCurrentPage}
                  total={totalPages}
                  size="md"
                  radius="md"
                  withEdges
                />
              </Flex>
            )}
          </>
        ) : (
          <Paper p={60} radius="md" style={{ textAlign: 'center' }}>
            <Title order={3} size="h4" mb="sm">
              No jobs found
            </Title>
            <Text c="dimmed" mb={20}>
              Try adjusting your filters or search terms
            </Text>
            <Button onClick={resetFilters} variant="light">
              Reset Filters
            </Button>
          </Paper>
        )}
      </Container>
    </Box>
  );
};
