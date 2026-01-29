import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Group,
  LoadingOverlay,
  Stack,
  Tabs,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconArrowLeft,
  IconBriefcase,
  IconCalendar,
  IconCalendarCheck,
  IconClock,
  IconCurrencyRupee,
  IconIdBadge,
  IconMail,
  IconMapPin,
  IconPhone,
  IconUser,
} from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import type { CandidateJobApplication } from '@/features/dashboard/types/admin-candidate-job';
import type { CandidateProfile } from '@/features/dashboard/types/candidate';
import { useSystemTheme } from '@/hooks/useSystemTheme';
import { ADMIN_PATHS } from '@/routes/config/adminPath';
import { RECRUITER_PATHS } from '@/routes/config/recruiterPath';
import {
  getCandidatesDetailsById,
  getcandidatejobs,
} from '@/services/recruiter-services';
import { useAuthStore } from '@/store/userDetails';

const formatDate = (date?: string | Date) => {
  if (!date) return '—';
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = d.toLocaleString('en-US', { month: 'short' });
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

const getFileExtension = (url: string) => {
  const cleanUrl = url.split('?')[0] as string;
  return cleanUrl ? (cleanUrl.split('.').pop() ?? '').toLowerCase() : '';
};

const getViewerUrl = (fileUrl: string) => {
  const ext = getFileExtension(fileUrl);
  if (ext === 'pdf') return fileUrl;
  return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`;
};

const CandidateDetailPage: React.FC = () => {
  const { candidateId } = useParams<{ candidateId: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [appliedJobsLoading, setAppliedJobsLoading] = useState(false);
  const [details, setDetails] = useState<CandidateProfile | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<CandidateJobApplication[]>([]);
  const [appliedJobsFetched, setAppliedJobsFetched] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>('overview');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const systemTheme = useSystemTheme();
  const isDark = systemTheme === 'dark';

  useEffect(() => {
    const fetchCandidate = async () => {
      if (!candidateId) return;
      setLoading(true);
      setAppliedJobs([]);
      setAppliedJobsFetched(false);

      try {
        const data = await getCandidatesDetailsById(candidateId);
        console.log('getCandidatesDetailsById data is:', data);
        setDetails(data);
        console.log('Going to fetch Jobs details applied by candidate !!');
        await fetchAppliedJobsData(candidateId);
      } catch {
        toast.error('Failed to fetch candidate details');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [candidateId]);

  const fetchAppliedJobsData = async (id: string) => {
    try {
      const data = await getcandidatejobs(id);
      console.log('fetchAppliedJobsData is:', data);
      const appliedOnly = data.filter(
        (job) => job.isJobApplied && job.appliedAt
      );
      console.log('appliedOnly is:', appliedOnly);
      setAppliedJobs(appliedOnly);
      setAppliedJobsFetched(true);
    } catch {
      console.error('Failed to fetch applied jobs');
    }
  };

  const fetchAppliedJobs = async () => {
    if (!candidateId) return;
    setAppliedJobsLoading(true);

    try {
      const data = await getcandidatejobs(candidateId);
      // Filter to show only applied jobs (not saved jobs)
      const appliedOnly = data.filter(
        (job) => job.isJobApplied && job.appliedAt
      );
      setAppliedJobs(appliedOnly);
      setAppliedJobsFetched(true);
    } catch {
      toast.error('Failed to fetch applied jobs');
    } finally {
      setAppliedJobsLoading(false);
    }
  };

  const handleAppliedJobsTab = () => {
    if (!appliedJobsFetched || appliedJobs.length === 0) {
      fetchAppliedJobs();
    }
  };

  if (!details) {
    return (
      <Container>
        <LoadingOverlay visible={loading} />
        <Text>Loading candidate details...</Text>
      </Container>
    );
  }

  const resumeUrl = details?.profileUrl;

  // Enhanced job card component for better UI
  const JobCard: React.FC<{ application: CandidateJobApplication }> = ({
    application,
  }) => {
    console.log('--------> Application is:', application);
    const job = application.jobId;
    console.log('------------> Job is:', job);
    const company = job.clientId;
    console.log('-----------> company is:', company);
    const { userRole } = useAuthStore();
    const handleJobCardClick = (jobId: string) => {
      console.log(jobId);
      if (userRole === 'admin') {
        navigate(ADMIN_PATHS.JOB_DETAILS(jobId));
      } else if (userRole === 'recruiter') {
        navigate(RECRUITER_PATHS.JOB_DETAILS(jobId));
      }
    };

    return (
      <Box
        style={{
          borderRadius: '12px',
          border: `1px solid ${isDark ? '#696969' : '#ddd'}`,
          padding: '20px',
          marginBottom: '16px',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}
        onClick={() => handleJobCardClick(job.id)}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
          e.currentTarget.style.borderColor = isDark ? '#696969' : '#ddd';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
          e.currentTarget.style.borderColor = isDark ? '#808080' : '#e9ecef';
        }}
      >
        {/* Header with logo, title, and status */}
        <Group
          justify={isMobile ? 'flex-start' : 'space-between'}
          align="flex-start"
          mb="lg"
          px="sm"
        >
          <Group align="center" gap="lg">
            {/* Company Logo */}
            <Box
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '10px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: 24,
                fontWeight: 700,
                color: '#fff',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
            >
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={company.organizationName}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <Text size="lg" fw={600} c="white">
                  {company.organizationName?.charAt(0) || '?'}
                </Text>
              )}
            </Box>

            {/* Job Title and Company Info */}
            <Stack gap={4} style={{ flex: 1 }}>
              <Title order={4} size="h5" fw={600}>
                {job.jobTitle}
              </Title>
              <Text size="sm" c="dimmed">
                {company.organizationName}
              </Text>
            </Stack>
          </Group>

          {/* Status Badge */}
          <Box pr="xl">
            <Badge
              variant="light"
              color={job.status === 'active' ? 'green' : 'orange'}
              size="lg"
              radius="md"
              mt={isMobile ? 'sm' : 0}
              style={{ textTransform: 'capitalize' }}
            >
              {job.status}
            </Badge>
          </Box>
        </Group>

        {/* Job Details Grid */}
        <Grid gutter="md" mb="xs">
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Group gap="xs">
              <IconMapPin size={16} color="#5c7cfa" />
              <div>
                <Text size="xs" c="dimmed" fw={500}>
                  Location
                </Text>
                <Text size="sm" fw={600}>
                  {job.jobLocation}
                </Text>
              </div>
            </Group>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Box>
              <Text size="xs" fw={500} c="dimmed" mb={4}>
                Employment Type
              </Text>
              <Badge size="sm" fw={500} style={{ textTransform: 'capitalize' }}>
                {job.jobType}
              </Badge>
            </Box>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Group gap="xs">
              <IconCurrencyRupee size={16} color="#51cf66" />
              <div>
                <Text size="xs" c="dimmed" fw={500}>
                  Salary
                </Text>
                <Text size="sm" fw={600}>
                  ₹{job.minimumSalary?.toLocaleString()} - ₹
                  {job.maximumSalary?.toLocaleString()}
                </Text>
              </div>
            </Group>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Group gap="xs">
              <IconClock size={16} color="#ff922b" />
              <div>
                <Text size="xs" c="dimmed" fw={500}>
                  Experience
                </Text>
                <Text size="sm" fw={600}>
                  {job.minimumExperience} - {job.maximumExperience} years
                </Text>
              </div>
            </Group>
          </Grid.Col>
        </Grid>

        {/* Job Description */}
        <Box
          mb="md"
          style={{
            padding: '10px',
            borderRadius: '8px',
          }}
        >
          <Text fw={600} size="sm" mb={1}>
            Job Description
          </Text>
          <Text
            size="sm"
            c="dimmed"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
            dangerouslySetInnerHTML={{ __html: job.jobDescription }}
          />
        </Box>

        {/* Footer with dates */}
        <Group
          justify={isMobile ? 'flex-start' : 'space-between'}
          align="center"
          px="md"
          py={7}
        >
          <Group gap="xl">
            <Box>
              <Text size="xs" fw={600} c="dimmed" mb={2}>
                Applied On
              </Text>
              <Group gap={4}>
                <IconCalendarCheck size={16} color="#1c7ed6" />
                <Text size="sm" fw={500}>
                  {formatDate(application.appliedAt ?? undefined)}
                </Text>
              </Group>
            </Box>

            <Box>
              <Text size="xs" fw={600} c="dimmed" mb={2}>
                Post Deadline
              </Text>
              <Group gap={4}>
                <IconCalendar size={16} color="#e03131" />
                <Text size="sm" fw={500}>
                  {formatDate(job.postEnd)}
                </Text>
              </Group>
            </Box>

            <Box>
              <Text size="xs" fw={600} c="dimmed" mb={2}>
                Positions
              </Text>
              <Text size="sm" fw={500}>
                {job.noOfPositions} open
              </Text>
            </Box>
          </Group>

          <Box mr="md">
            <Badge
              color="blue"
              variant="light"
              size="md"
              radius="md"
              style={{ marginLeft: isMobile ? 0 : 'auto' }}
            >
              ✓ Applied
            </Badge>
          </Box>
        </Group>
      </Box>
    );
  };

  return (
    <Box style={{ minHeight: '100vh', paddingBottom: '2rem' }}>
      <Container size="lg" py="xl">
        {/* Back Button */}
        <Button
          variant="subtle"
          leftSection={<IconArrowLeft size={18} />}
          onClick={() => navigate(-1)}
          size="sm"
          mb="lg"
        >
          Back to Candidates
        </Button>

        {/* Header */}
        <Group
          align="flex-start"
          gap="lg"
          mb="xl"
          wrap="wrap"
          justify="flex-start"
        >
          <Avatar
            size={isMobile ? 80 : 90}
            radius="xl"
            color="blue"
            src={details?.profilePicture || null}
          >
            {(details.firstName?.[0] || '?').toUpperCase()}
            {(details.lastName?.[0] || '').toUpperCase()}
          </Avatar>

          <Stack
            gap={8}
            style={{
              flex: 1,
              textAlign: 'left',
              alignItems: 'flex-start',
            }}
          >
            <Group gap={12} wrap="wrap" justify="flex-start">
              <Title order={1} size={isMobile ? 'h3' : 'h2'} fw={700}>
                {details.firstName || '—'} {details.lastName || ''}
              </Title>
              {details.category && (
                <Badge variant="light" color="blue" radius="sm" size="lg">
                  {details.category}
                </Badge>
              )}
            </Group>
            <Stack gap={6}>
              <Group gap={6} justify="flex-start">
                <IconMail size={18} color="#1c7ed6" />
                <Text size="sm">{details?.email || '—'}</Text>
              </Group>
              <Group gap={6} justify="flex-start">
                <IconPhone size={18} color="#e03131" />
                <Text size="sm">{details?.mobileNumber || '—'}</Text>
              </Group>
            </Stack>
          </Stack>
        </Group>

        <Divider mb="xl" />

        {/* Tabs */}
        <Tabs
          defaultValue="overview"
          variant="pills"
          radius="xl"
          value={activeTab}
          onChange={setActiveTab}
          styles={(theme) => ({
            list: {
              gap: '6px',
              padding: '5px',
              borderRadius: '999px',
              backgroundColor: isDark
                ? theme.colors.dark[6]
                : theme.colors.gray[1],
              border: `1px solid ${
                isDark ? theme.colors.dark[4] : theme.colors.gray[3]
              }`,
              display: 'inline-flex',
            },

            tab: {
              fontWeight: 600,
              fontSize: isMobile ? '13px' : '14px',
              padding: isMobile ? '8px 14px' : '10px 22px',
              borderRadius: '999px',
              color: isDark ? theme.colors.dark[0] : theme.colors.gray[7],
              transition: 'all 0.2s ease',

              '&:hover': {
                backgroundColor: isDark
                  ? theme.colors.dark[5]
                  : theme.colors.gray[2],
              },

              '&[data-active]': {
                backgroundColor: isDark ? theme.colors.dark[9] : 'white',
                color: isDark ? 'white' : theme.colors.dark[9],
                boxShadow: theme.shadows.sm,
              },
            },
          })}
        >
          <Tabs.List>
            <Tabs.Tab
              value="overview"
              leftSection={<IconUser size={16} stroke={1.8} />}
            >
              Overview
            </Tabs.Tab>

            <Tabs.Tab
              value="appliedJobs"
              leftSection={<IconBriefcase size={16} stroke={1.8} />}
              onClick={handleAppliedJobsTab}
            >
              <Group gap={6}>
                Applied Jobs
                <Badge size="sm" variant="filled" radius="xl">
                  {appliedJobs.length}
                </Badge>
              </Group>
            </Tabs.Tab>
          </Tabs.List>

          {/* Overview Tab */}
          <Tabs.Panel value="overview" pt="xl">
            <Stack gap="lg">
              {/* Personal Information */}
              <Box>
                <Title order={3} size="h4" fw={600} mb="lg">
                  Personal Information
                </Title>

                <Grid gutter="md" mb="lg">
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="First Name"
                      value={details?.firstName || ''}
                      readOnly
                      radius="md"
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Last Name"
                      value={details?.lastName || ''}
                      readOnly
                      radius="md"
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Phone Number"
                      leftSection={<IconPhone size={16} />}
                      value={details?.mobileNumber || ''}
                      readOnly
                      radius="md"
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Gender"
                      leftSection={<IconUser size={16} />}
                      value={details?.gender || '—'}
                      readOnly
                      radius="md"
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Date of Birth"
                      leftSection={<IconCalendar size={16} />}
                      value={formatDate(details?.dateOfBirth ?? '')}
                      readOnly
                      radius="md"
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Joined On"
                      leftSection={<IconCalendarCheck size={16} />}
                      value={formatDate(details?.createdAt)}
                      readOnly
                      radius="md"
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12 }}>
                    <TextInput
                      label="Address"
                      leftSection={<IconMapPin size={16} />}
                      value={details?.address || '—'}
                      readOnly
                      radius="md"
                    />
                  </Grid.Col>
                </Grid>

                <Divider my="lg" />
              </Box>

              {/* Professional Information */}
              <Box>
                <Title order={3} size="h4" fw={600} mb="lg">
                  Professional Information
                </Title>

                <Grid gutter="md" mb="lg">
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Designation"
                      leftSection={<IconIdBadge size={16} />}
                      value={details?.designation || '—'}
                      readOnly
                      radius="md"
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Experience"
                      leftSection={<IconBriefcase size={16} />}
                      value={details?.experience || '—'}
                      readOnly
                      radius="md"
                    />
                  </Grid.Col>
                </Grid>

                <Divider my="lg" />
              </Box>

              {/* Resume */}
              {resumeUrl && (
                <Box>
                  <Title order={3} size="h4" fw={600} mb="lg">
                    Resume
                  </Title>
                  <iframe
                    src={getViewerUrl(resumeUrl)}
                    style={{
                      width: '100%',
                      height: '600px',
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                    }}
                    title="Resume Preview"
                  />
                </Box>
              )}
            </Stack>
          </Tabs.Panel>

          {/* Applied Jobs Tab */}
          <Tabs.Panel value="appliedJobs" pt="xl">
            <LoadingOverlay visible={appliedJobsLoading} />

            {appliedJobs.length === 0 ? (
              <Box
                py="xl"
                px="lg"
                style={{
                  textAlign: 'center',
                  border: '1px solid #dee2e6',
                  borderRadius: '8px',
                }}
              >
                <IconBriefcase size={48} style={{ marginBottom: '16px' }} />
                <Text c="dimmed" size="md">
                  No jobs applied yet
                </Text>
              </Box>
            ) : (
              <Box>
                <Group justify="space-between" align="center" mb="lg">
                  <Text size="lg" fw={600}>
                    Total Applied: {appliedJobs.length}
                  </Text>
                </Group>

                {appliedJobs.map((application) => (
                  <JobCard key={application.id} application={application} />
                ))}
              </Box>
            )}
          </Tabs.Panel>
        </Tabs>
      </Container>
    </Box>
  );
};

export default CandidateDetailPage;
