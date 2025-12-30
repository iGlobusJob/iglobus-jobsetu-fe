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
  Avatar,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconBriefcase,
  IconCalendar,
  IconChevronDown,
  IconClock,
  IconCurrencyRupee,
  IconMapPin,
  IconSearch,
  IconTrendingUp,
} from '@tabler/icons-react';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import type { ApiError } from '@/common';
import type { Job } from '@/features/dashboard/types/job';
import { getAllJobsByAdmin } from '@/services/admin-services';

const AllJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJobType, setSelectedJobType] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
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

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const jobs = await getAllJobsByAdmin();
        setJobs(jobs);
        setFilteredJobs(jobs);
      } catch (error: unknown) {
        const err = error as ApiError;
        toast.error(
          err?.response?.data?.message || err?.data?.message || err?.message
        );
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
    <Container size="xl" py="xl">
      <Stack mb="xl" gap={8}>
        <div>
          <Title order={isMobile ? 3 : 2} fw={700} mb={4}>
            Job Listings
          </Title>
          <Text size="md" c="dimmed">
            Browse all posted jobs, filter by type and status and manage
            listings easily.
          </Text>
        </div>

        <Group justify="space-between" align="center" wrap="wrap">
          <Badge
            size="lg"
            variant="filled"
            color="blue"
            leftSection={<IconTrendingUp size={14} />}
          >
            {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''}{' '}
            found
          </Badge>
        </Group>
      </Stack>

      <Stack gap="lg">
        {/* Filters */}
        <Paper p="md" radius="lg" withBorder>
          <Stack gap="md">
            <Input
              placeholder="Search by job title or location..."
              leftSection={<IconSearch size={18} />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.currentTarget.value)}
              size="md"
              radius="md"
              styles={{
                input: { fontSize: '14px' },
              }}
            />

            <Grid gutter="md">
              <Grid.Col span={{ base: 12, xs: 6, sm: 4 }}>
                <Select
                  label="Job Type"
                  placeholder="All Types"
                  clearable
                  searchable
                  size="md"
                  radius="md"
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

              <Grid.Col span={{ base: 12, xs: 6, sm: 4 }}>
                <Select
                  label="Status"
                  placeholder="Status"
                  clearable
                  searchable
                  size="md"
                  radius="md"
                  data={[
                    { value: 'active', label: 'Active' },
                    { value: 'drafted', label: 'Drafted' },
                    { value: 'closed', label: 'Closed' },
                  ]}
                  value={selectedStatus}
                  onChange={setSelectedStatus}
                />
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
                <Card
                  key={job.id}
                  withBorder
                  radius="lg"
                  p={0}
                  className="job-card"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      '0 8px 24px rgba(0,0,0,0.08)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Stack gap={0}>
                    {/* Header with Image */}
                    <Group
                      gap={isMobile ? 'xs' : 'md'}
                      p={isMobile ? 'sm' : 'md'}
                      wrap="nowrap"
                      align="flex-start"
                    >
                      <Avatar
                        src={job.logo || undefined}
                        size={isMobile ? 48 : 80}
                        radius="lg"
                        style={{
                          background: job.logo
                            ? undefined
                            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        }}
                      >
                        {!job.logo &&
                          (job.organizationName?.[0]?.toUpperCase() ?? '?')}
                      </Avatar>

                      <Stack gap="xs" style={{ flex: 1, minWidth: 0 }}>
                        <Group
                          justify="space-between"
                          align="flex-start"
                          wrap="wrap"
                        >
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <Title
                              order={isMobile ? 5 : 4}
                              size={isMobile ? 'h5' : 'h4'}
                              fw={700}
                              mb={2}
                            >
                              {job.jobTitle}
                            </Title>
                            <Text size="sm" c="dimmed" fw={500} truncate>
                              {job.organizationName}
                            </Text>
                          </div>
                          <Badge
                            color={getStatusColor(job.status)}
                            variant="filled"
                            size="lg"
                            styles={{ root: { textTransform: 'capitalize' } }}
                          >
                            {job.status}
                          </Badge>
                        </Group>

                        <Group gap="xs" wrap="wrap">
                          <Group gap={4}>
                            <IconMapPin size={14} />
                            <Text size="xs" c="dimmed">
                              {job.jobLocation}
                            </Text>
                          </Group>

                          <Badge
                            size="xs"
                            color={getJobTypeColor(job.jobType)}
                            variant="light"
                            styles={{ root: { textTransform: 'capitalize' } }}
                          >
                            {job.jobType}
                          </Badge>
                        </Group>
                      </Stack>

                      <ActionIcon
                        variant="light"
                        onClick={() =>
                          setExpandedJob(isExpanded ? null : job.id)
                        }
                        size="md"
                      >
                        <IconChevronDown
                          size={20}
                          style={{
                            transform: isExpanded
                              ? 'rotate(180deg)'
                              : 'rotate(0deg)',
                            transition: '0.3s ease',
                          }}
                        />
                      </ActionIcon>
                    </Group>

                    {/* Compact Info */}
                    <Group gap="xl" p="md" wrap="wrap">
                      <JobInfo
                        label="Positions"
                        value={job.noOfPositions}
                        icon={<IconBriefcase size={14} />}
                        color="blue"
                      />

                      <JobInfo
                        label="Salary Range"
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
                            : 'Freshers'
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
                      <Stack gap="md" p="md">
                        <div>
                          <Text fw={600} size="sm" mb={8}>
                            Job Description
                          </Text>
                          <Text
                            size="sm"
                            c="dimmed"
                            style={{ lineHeight: 1.6 }}
                          >
                            {stripHtml(job.jobDescription)}
                          </Text>
                        </div>

                        <Group
                          justify="space-between"
                          wrap="wrap"
                          pt="md"
                          style={{ borderTop: '1px solid #e9ecef' }}
                        >
                          <Stack gap={2}>
                            <Text size="xs" c="dimmed">
                              📅 Posted:{' '}
                              <strong>
                                {new Date(job.updatedAt).toLocaleDateString(
                                  'en-IN'
                                )}
                              </strong>
                            </Text>
                            <Text size="xs" c="dimmed">
                              🔔 Closing:{' '}
                              <strong>
                                {new Date(job.postEnd).toLocaleDateString(
                                  'en-IN'
                                )}
                              </strong>
                            </Text>
                          </Stack>
                        </Group>
                      </Stack>
                    )}
                  </Stack>
                </Card>
              );
            })}

            {totalPages > 1 && (
              <Center pt="md">
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
          <Center py={100}>
            <Stack align="center" gap="md">
              <ThemeIcon size={100} radius="xl" variant="light" color="gray">
                <IconBriefcase size={50} />
              </ThemeIcon>
              <div style={{ textAlign: 'center' }}>
                <Title order={3}>No jobs found</Title>
                <Text c="dimmed" size="sm">
                  Try adjusting your search filters to find more opportunities
                </Text>
              </div>
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
  <Group gap="sm" wrap="wrap">
    <ThemeIcon size="md" variant="light" color={color} radius="md">
      {icon}
    </ThemeIcon>
    <div>
      <Text size="xs" c="dimmed" fw={500}>
        {label}
      </Text>
      <Text size="sm" fw={600} style={{ lineHeight: 1.3 }}>
        {value}
      </Text>
    </div>
  </Group>
);

export default AllJobs;
