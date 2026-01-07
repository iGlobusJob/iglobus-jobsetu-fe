import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Group,
  Pagination,
  Paper,
  RangeSlider,
  Select,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconAlertCircle,
  IconMapPin,
  IconSearch,
  IconX,
} from '@tabler/icons-react';
import { useEffect, useMemo, useState, type JSX, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import type { CandidateJobs } from '@/features/dashboard/types/candidate';
import { RECRUITER_PATHS } from '@/routes/config/recruiterPath';
import { getAllJobs } from '@/services/candidate-services';

const formatJobType = (type: string): string => {
  if (!type) return 'Unknown';

  return type
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
};

const formatINR = (value: number) => value.toLocaleString('en-IN');

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
  status: string;
  logo: string | null;
}

const mapJob = (job: ApiJob): CandidateJobs => ({
  id: job.id,
  jobTitle: job.jobTitle,
  jobDescription: job.jobDescription,
  organizationName: job.organizationName,
  jobLocation: job.jobLocation,
  salaryRange: `${job.minimumSalary} - ${job.maximumSalary}/yr`,
  salaryMin: job.minimumSalary,
  salaryMax: job.maximumSalary,
  experienceLevel: `${job.minimumExperience} - ${job.maximumExperience} years`,
  jobType: job.jobType,
  bookmarked: false,
  category: 'IT',
  status: job.status,
  logo: job.logo,
});

interface JobCardProps {
  job: CandidateJobs;
  onBookmark: (id: string) => void;
}
const ITEMS_PER_PAGE = 6;

const JobCard = ({ job }: JobCardProps): JSX.Element => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Helpers
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

  const salaryMin = job.salaryMin || 0;
  const salaryMax = job.salaryMax || 0;

  return (
    <Paper
      onClick={() => navigate(RECRUITER_PATHS.JOB_DETAILS(job.id))}
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
      onMouseEnter={(e: MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e: MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
      }}
    >
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

        <Flex
          direction={isMobile ? 'column' : 'row'}
          align={isMobile ? 'flex-start' : 'center'}
          justify="space-around"
          gap={isMobile ? 'xs' : 'xl'}
        >
          <Box style={{ flex: 1, minWidth: 0 }}>
            <Title order={4} size="h5" fw={600} mb={2} lineClamp={1}>
              {job.jobTitle}
            </Title>
            <Text size="sm" c="dimmed" fw={500} lineClamp={1}>
              {job.organizationName || 'Unknown Company'}
            </Text>
          </Box>
          <Badge
            color={getStatusColor(job.status)}
            variant="filled"
            size={isMobile ? 'sm' : 'md'}
            styles={{
              root: {
                textTransform: 'capitalize',
                alignSelf: isMobile ? 'flex-start' : 'center',
              },
            }}
          >
            {job.status}
          </Badge>
        </Flex>
      </Flex>

      <Flex align="center" gap="md" mb="md" style={{ flexWrap: 'wrap' }}>
        <Flex align="center" gap={4} style={{ minWidth: 0, flex: '1 1 auto' }}>
          <IconMapPin
            size={16}
            stroke={1.5}
            style={{ color: '#666', flexShrink: 0 }}
          />
          <Text size="xs" c="dimmed" lineClamp={1}>
            {job.jobLocation}
          </Text>
        </Flex>
        <Badge
          variant="light"
          size="sm"
          color="blue"
          w="fit-content"
          style={{ flexShrink: 0 }}
        >
          {' '}
          {formatJobType(job.jobType)}
        </Badge>
      </Flex>

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
            ₹{salaryMin.toLocaleString('en-IN')} – ₹
            {salaryMax.toLocaleString('en-IN')}
          </Text>
        </Box>
      </Group>
    </Paper>
  );
};

export const JobListingsSection = (): JSX.Element => {
  const [jobs, setJobs] = useState<CandidateJobs[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedJobType, setSelectedJobType] = useState<string | null>(null);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 0]);
  const [experienceFilter, setExperienceFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [maxSalary, setMaxSalary] = useState(300000);
  const [userFiltered, setUserFiltered] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllJobs();
        const mapped = data.map(mapJob);
        setJobs(mapped);
        const max = Math.max(...mapped.map((job) => job.salaryMax || 0));
        setSalaryRange([0, max]);
        setMaxSalary(max);
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
    console.log(id);
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
    }));

    // Search filter
    if (searchQuery) {
      list = list.filter(
        (job) =>
          job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.organizationName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          job.jobLocation.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Job type filter
    if (selectedJobType) {
      list = list.filter((job) => job.jobType === selectedJobType);
    }

    // Salary filter
    list = list.filter(
      (job) =>
        job.salaryMax >= salaryRange[0] && job.salaryMin <= salaryRange[1]
    );

    // Experience filter
    if (experienceFilter) {
      list = list.filter((job) => {
        const [minExp, maxExp] = job.experienceLevel
          .replace(' years', '')
          .split(' - ')
          .map(Number);

        switch (experienceFilter) {
          case 'ENTRY':
            return minExp === 0 && maxExp <= 1;

          case 'ONE_TWO':
            return minExp === 1 && maxExp <= 2;

          case 'TWO_THREE':
            return minExp === 2 && maxExp <= 3;

          case 'FOUR_PLUS':
            return minExp >= 4;

          default:
            return true;
        }
      });
    }

    return list;
  }, [
    jobs,
    searchQuery,
    selectedJobType,
    salaryRange,
    experienceFilter,
    bookmarkedJobs,
  ]);

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const resetFilters = (): void => {
    setSearchQuery('');
    setSelectedJobType(null);
    setSalaryRange([0, maxSalary]);
    setExperienceFilter('');
    setCurrentPage(1);
    setUserFiltered(false);
  };

  return (
    <Box component="section" py={40}>
      <Container size="xl">
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
                    setUserFiltered(false);
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
              setUserFiltered(true);
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
                  setUserFiltered(true);
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
                  setUserFiltered(true);
                  setCurrentPage(1);
                }}
                data={[
                  { value: 'ENTRY', label: 'Entry Level (0–1)' },
                  { value: 'ONE_TWO', label: '1–2 Years' },
                  { value: 'TWO_THREE', label: '2–3 Years' },
                  { value: 'FOUR_PLUS', label: '4+ Years' },
                ]}
                clearable
                searchable
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Text size="sm" fw={500} mb={8}>
                Salary Range: ₹{formatINR(salaryRange[0])} - ₹
                {formatINR(salaryRange[1])}
              </Text>
              <RangeSlider
                value={salaryRange}
                onChange={(value) => {
                  setSalaryRange(value);
                  setUserFiltered(true);
                  setCurrentPage(1);
                }}
                min={0}
                max={maxSalary}
                step={5000}
                marks={[
                  { value: 0, label: '₹0' },
                  { value: maxSalary, label: `₹${formatINR(maxSalary)}` },
                ]}
              />
            </Grid.Col>
          </Grid>

          {userFiltered && (
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
        <Flex justify="space-between" align="center" mb="lg">
          <Text size="sm" c="dimmed">
            Showing <strong>{paginatedJobs.length}</strong> of{' '}
            <strong>{filteredJobs.length}</strong> jobs
          </Text>
        </Flex>

        {/* Jobs Grid */}
        {loading ? (
          <Text>Loading jobs...</Text>
        ) : paginatedJobs.length ? (
          <>
            <Grid mb={40}>
              {paginatedJobs.map((job) => (
                <Grid.Col key={job.id} span={{ base: 12, md: 6, lg: 4 }}>
                  <JobCard job={job} onBookmark={handleBookmark} />
                </Grid.Col>
              ))}
            </Grid>

            {/* Pagination */}
            {totalPages > 1 && (
              <Flex justify="center" mt={40}>
                <Pagination
                  value={currentPage}
                  onChange={setCurrentPage}
                  total={totalPages}
                  size="md"
                  radius="md"
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
