import {
  ActionIcon,
  Badge,
  Card,
  Center,
  Container,
  Grid,
  Group,
  Input,
  Loader,
  Pagination,
  Paper,
  Select,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconBriefcase,
  IconCalendar,
  IconChevronRight,
  IconClock,
  IconCurrencyRupee,
  IconMapPin,
  IconPencil,
  IconSearch,
} from '@tabler/icons-react';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import type { Job } from '@/features/dashboard/types/job';
import { CLIENT_PATHS } from '@/routes/config/clientPath';
import { getAllJobs } from '@/services/client-services';

const AllJobsComponent = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJobType, setSelectedJobType] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 10;
  const isMobile = useMediaQuery('(max-width: 768px)');

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedJobType, selectedStatus]);

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await getAllJobs();

        if (response.success && response.data) {
          setJobs(response.data);
          setFilteredJobs(response.data);
        } else {
          toast.error(response.message || 'Failed to fetch jobs');
        }
      } catch (error) {
        const err = error as unknown;
        let message = 'Something went wrong.';

        if (
          typeof err === 'object' &&
          err !== null &&
          'response' in err &&
          typeof (err as { response?: unknown }).response === 'object'
        ) {
          const response = (err as { response: { data?: unknown } }).response;
          if (
            response &&
            typeof response.data === 'object' &&
            response.data !== null &&
            'message' in response.data
          ) {
            message = String(
              (response.data as { message?: string }).message || message
            );
          }
        }

        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.jobLocation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedJobType) {
      filtered = filtered.filter((job) => job.jobType === selectedJobType);
    }

    if (selectedStatus) {
      filtered = filtered.filter((job) => job.status === selectedStatus);
    }

    setFilteredJobs(filtered);
  }, [searchTerm, selectedJobType, selectedStatus, jobs]);

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

  const getJobTypeColor = (jobType: string): string => {
    const map: Record<string, string> = {
      'full-time': 'blue',
      'part-time': 'cyan',
      contract: 'grape',
      freelance: 'orange',
      internship: 'yellow',
    };
    return map[jobType] || 'blue';
  };

  const formatSalary = (salary: number) => `₹${salary.toLocaleString('en-IN')}`;

  const getDaysRemaining = (endDate: string): number => {
    const end = new Date(endDate);
    const today = new Date();
    return Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const onEdit = (id: string) => {
    navigate(CLIENT_PATHS.EDIT_JOB_WITH_ID(id));
  };

  if (loading) {
    return (
      <Container size="xl" py="xl">
        <Center py={100}>
          <Stack align="center">
            <Loader size="lg" />
            <Text c="dimmed">Loading jobs...</Text>
          </Stack>
        </Center>
      </Container>
    );
  }

  return (
    <Container size="xl">
      <Stack mb="md" gap={4}>
        <Title order={isMobile ? 4 : 2} fw={700}>
          Job Listings
        </Title>

        <Text size="sm" color="dimmed">
          Browse all posted jobs, filter by type and status and manage listings
          easily.
        </Text>
      </Stack>
      <Stack>
        {/* Filters */}
        <Paper p="md" radius="md" withBorder>
          <Stack gap="md">
            <Input
              placeholder="Search by job title or location..."
              leftSection={<IconSearch size={18} />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.currentTarget.value)}
              styles={{
                input: { fontSize: '14px' },
              }}
            />

            <Grid gutter="md">
              <Grid.Col span={{ base: 12, xs: 6, sm: 4, md: 3 }}>
                <Select
                  label="Job Type"
                  placeholder="All Types"
                  clearable
                  searchable
                  data={[
                    { value: 'full-time', label: 'Full-Time' },
                    { value: 'part-time', label: 'Part-Time' },
                    { value: 'contract', label: 'Contract' },
                    { value: 'freelance', label: 'Freelance' },
                    { value: 'internship', label: 'Internship' },
                  ]}
                  value={selectedJobType}
                  onChange={setSelectedJobType}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, xs: 6, sm: 4, md: 3 }}>
                <Select
                  label="Status"
                  placeholder="Status"
                  clearable
                  searchable
                  data={[
                    { value: 'active', label: 'Active' },
                    { value: 'drafted', label: 'Drafted' },
                    { value: 'closed', label: 'Closed' },
                  ]}
                  value={selectedStatus}
                  onChange={setSelectedStatus}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 4, md: 3 }}>
                <Stack gap={4}>
                  <Text size="sm" fw={500}>
                    Results
                  </Text>
                  <Badge size="lg" mt={6} variant="light" radius="md">
                    {filteredJobs.length} job
                    {filteredJobs.length !== 1 ? 's' : ''} found
                  </Badge>
                </Stack>
              </Grid.Col>
            </Grid>
          </Stack>
        </Paper>

        {/* Jobs List */}
        {paginatedJobs.length > 0 ? (
          <Stack gap="lg">
            {paginatedJobs.map((job) => {
              const isExpanded = job.id === expandedJob;
              const daysRemaining = getDaysRemaining(job.postEnd);

              return (
                <Card key={job.id} withBorder radius="md" p="lg">
                  <Stack gap="md">
                    {/* Header */}
                    <Group
                      justify="space-between"
                      align="flex-start"
                      wrap="wrap"
                    >
                      <div style={{ flex: 1, minWidth: '200px' }}>
                        <Group justify="space-between" mb="xs">
                          <Title order={4} style={{ fontSize: '18px' }}>
                            {job.jobTitle}
                          </Title>
                          <Badge color={getStatusColor(job.status)}>
                            {job.status}
                          </Badge>
                        </Group>

                        <Group gap="xs" wrap="wrap">
                          <Group gap={6}>
                            <IconMapPin size={16} />
                            <Text size="sm" c="dimmed">
                              {job.jobLocation}
                            </Text>
                          </Group>

                          <Badge
                            size="sm"
                            color={getJobTypeColor(job.jobType)}
                            variant="light"
                          >
                            {job.jobType}
                          </Badge>
                        </Group>
                      </div>

                      <Group gap="sm">
                        <ActionIcon
                          variant="subtle"
                          onClick={() => onEdit(job.id)}
                        >
                          <IconPencil size={18} />
                        </ActionIcon>
                        <ActionIcon
                          onClick={() =>
                            setExpandedJob(isExpanded ? null : job.id)
                          }
                        >
                          <IconChevronRight
                            size={20}
                            style={{
                              transform: isExpanded
                                ? 'rotate(90deg)'
                                : 'rotate(0deg)',
                              transition: '0.2s',
                            }}
                          />
                        </ActionIcon>
                      </Group>
                    </Group>

                    {/* Compact Info */}
                    <Group gap="xl" wrap="wrap">
                      <JobInfo
                        label="Positions"
                        value={job.noOfPositions}
                        icon={<IconBriefcase size={14} />}
                        color="blue"
                      />

                      <JobInfo
                        label="Salary"
                        value={`${formatSalary(job.minimumSalary)} - ${formatSalary(
                          job.maximumSalary
                        )}`}
                        icon={<IconCurrencyRupee size={14} />}
                        color="teal"
                      />

                      <JobInfo
                        label="Experience"
                        value={
                          job.minimumExperience && job.maximumExperience
                            ? `${job.minimumExperience}-${job.maximumExperience} yrs`
                            : 'No experience / Freshers'
                        }
                        icon={<IconClock size={14} />}
                        color="violet"
                      />

                      <JobInfo
                        label="Closing In"
                        value={`${daysRemaining} days`}
                        icon={<IconCalendar size={14} />}
                        color={daysRemaining <= 7 ? 'red' : 'green'}
                      />
                    </Group>

                    {/* Expanded Description */}
                    {isExpanded && (
                      <Paper p="md" radius="md" withBorder>
                        <Stack gap="sm">
                          <div>
                            <Text fw={600} size="sm" mb={4}>
                              Description
                            </Text>
                            <Text size="sm" c="dimmed">
                              {stripHtml(job.jobDescription)}
                            </Text>
                          </div>

                          <Group justify="space-between" wrap="wrap">
                            <Stack gap={0}>
                              <Text size="xs" c="dimmed">
                                Posted:{' '}
                                {new Date(job.updatedAt).toLocaleDateString(
                                  'en-IN'
                                )}
                              </Text>
                              <Text size="xs" c="dimmed">
                                Closing:{' '}
                                {new Date(job.postEnd).toLocaleDateString(
                                  'en-IN'
                                )}
                              </Text>
                            </Stack>
                          </Group>
                        </Stack>
                      </Paper>
                    )}
                  </Stack>
                </Card>
              );
            })}
            {totalPages > 1 && (
              <Center>
                <Pagination
                  value={currentPage}
                  onChange={setCurrentPage}
                  total={totalPages}
                  size="md"
                  radius="md"
                />
              </Center>
            )}
          </Stack>
        ) : (
          <Center py={80}>
            <Stack align="center">
              <ThemeIcon size={80} radius="xl" variant="light" color="gray">
                <IconBriefcase size={40} />
              </ThemeIcon>
              <Title order={4}>No jobs found</Title>
              <Text c="dimmed">Try adjusting your search filters</Text>
            </Stack>
          </Center>
        )}
      </Stack>
    </Container>
  );
};

/* -------------------------------------------------- */
/*                  JobInfo Component                 */
/* -------------------------------------------------- */

interface JobInfoProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  color?: string;
}

const JobInfo = ({ label, value, icon, color }: JobInfoProps) => (
  <Group gap="lg" wrap="wrap">
    <ThemeIcon size="sm" variant="light" color={color}>
      {icon}
    </ThemeIcon>
    <div>
      <Text size="xs" c="dimmed">
        {label}
      </Text>
      <Text size="sm" fw={600}>
        {value}
      </Text>
    </div>
  </Group>
);

export default AllJobsComponent;
