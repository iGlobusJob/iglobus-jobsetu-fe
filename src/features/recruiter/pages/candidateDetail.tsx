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
import {
  IconArrowLeft,
  IconBriefcase,
  IconCalendar,
  IconCalendarCheck,
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
import {
  getCandidatesDetailsById,
  getcandidatejobs,
} from '@/services/recruiter-services';

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

  useEffect(() => {
    const fetchCandidate = async () => {
      if (!candidateId) return;
      setLoading(true);

      try {
        const data = await getCandidatesDetailsById(candidateId);
        setDetails(data);
      } catch {
        toast.error('Failed to fetch candidate details');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [candidateId]);

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
    } catch {
      toast.error('Failed to fetch applied jobs');
    } finally {
      setAppliedJobsLoading(false);
    }
  };

  const handleAppliedJobsTab = () => {
    if (appliedJobs.length === 0) {
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
    const job = application.jobId;
    const company = job.clientId;

    return (
      <Box
        style={{
          borderRadius: '12px',
          border: '1px solid #e9ecef',
          padding: '20px',
          marginBottom: '16px',
          transition: 'all 0.3s ease',

          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
          e.currentTarget.style.borderColor = '#d0ebff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
          e.currentTarget.style.borderColor = '#e9ecef';
        }}
      >
        {/* Header with logo, title, and status */}
        <Group justify="space-between" align="flex-start" mb="lg">
          <Group align="center" gap="lg">
            {/* Company Logo */}
            <Box
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '8px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={company.organizationName}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    padding: '6px',
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <Text size="lg" fw={600} c="dimmed">
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
          <Badge
            variant="light"
            color={job.status === 'active' ? 'green' : 'orange'}
            size="lg"
            radius="md"
            style={{ textTransform: 'capitalize' }}
          >
            {job.status}
          </Badge>
        </Group>

        {/* Job Details Grid */}
        <Grid gutter="md" mb="lg">
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Box>
              <Text size="xs" fw={600} c="dimmed" mb={4}>
                LOCATION
              </Text>
              <Group gap={6}>
                <IconMapPin size={16} color="#1c7ed6" />
                <Text size="sm" fw={500}>
                  {job.jobLocation}
                </Text>
              </Group>
            </Box>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Box>
              <Text size="xs" fw={600} c="dimmed" mb={4}>
                EMPLOYMENT TYPE
              </Text>
              <Text size="sm" fw={500} style={{ textTransform: 'capitalize' }}>
                {job.jobType}
              </Text>
            </Box>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Box>
              <Text size="xs" fw={600} c="dimmed" mb={4}>
                SALARY RANGE
              </Text>
              <Text size="sm" fw={500}>
                ₹{(job.minimumSalary / 100000).toFixed(1)}L - ₹
                {(job.maximumSalary / 100000).toFixed(1)}L
              </Text>
            </Box>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Box>
              <Text size="xs" fw={600} c="dimmed" mb={4}>
                EXPERIENCE
              </Text>
              <Text size="sm" fw={500}>
                {job.minimumExperience}-{job.maximumExperience} yrs
              </Text>
            </Box>
          </Grid.Col>
        </Grid>

        {/* Job Description */}
        <Box
          mb="lg"
          style={{
            padding: '12px',
            borderRadius: '8px',
          }}
        >
          <Text size="xs" fw={600} c="dimmed" mb={6}>
            JOB DESCRIPTION
          </Text>
          <Text
            size="sm"
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
        <Group justify="space-between" align="center">
          <Group gap="lg">
            <Box>
              <Text size="xs" fw={600} c="dimmed" mb={2}>
                APPLIED ON
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
                POST DEADLINE
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
                POSITIONS
              </Text>
              <Text size="sm" fw={500}>
                {job.noOfPositions} open
              </Text>
            </Box>
          </Group>

          <Badge color="blue" variant="light" size="md" radius="md">
            ✓ Applied
          </Badge>
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
        <Group align="flex-start" gap="lg" mb="xl" wrap="wrap">
          <Avatar
            size={100}
            radius="xl"
            color="blue"
            src={details?.profilePicture || null}
          >
            {(details.firstName?.[0] || '?').toUpperCase()}
            {(details.lastName?.[0] || '').toUpperCase()}
          </Avatar>

          <Stack gap={8} style={{ flex: 1 }}>
            <Group gap={12} align="center" wrap="wrap">
              <Title order={1} size="h2" fw={700}>
                {details.firstName || '—'} {details.lastName || ''}
              </Title>
              {details.category && (
                <Badge variant="light" color="blue" radius="sm" size="lg">
                  {details.category}
                </Badge>
              )}
            </Group>
            <Group gap={8} wrap="wrap">
              <Group gap={6}>
                <IconMail size={18} color="#1c7ed6" />
                <Text size="sm">{details?.email || '—'}</Text>
              </Group>
              <Group gap={6}>
                <IconPhone size={18} color="#e03131" />
                <Text size="sm">{details?.mobileNumber || '—'}</Text>
              </Group>
            </Group>
          </Stack>
        </Group>

        <Divider mb="xl" />

        {/* Tabs */}
        <Tabs defaultValue="overview">
          <Tabs.List>
            <Tabs.Tab value="overview">Overview</Tabs.Tab>
            <Tabs.Tab value="appliedJobs" onClick={handleAppliedJobsTab}>
              Applied Jobs
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
