import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Group,
  Modal,
  Paper,
  Stack,
  Table,
  Text,
  Title,
} from '@mantine/core';
import {
  IconArrowLeft,
  IconBriefcase,
  IconCalendar,
  IconClock,
  IconMapPin,
  IconShare2,
  IconUsers,
} from '@tabler/icons-react';
import { useEffect, useState, type JSX } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ADMIN_PATHS } from '@/routes/config/adminPath';
import { RECRUITER_PATHS } from '@/routes/config/recruiterPath';
import { getJobDetailsAndApplicentDetailsById } from '@/services/recruiter-services';
import { useAuthStore } from '@/store/userDetails';

interface Candidate {
  id: string;
  lastName: string;
  firstName: string;
  mobileNumber: string;
  email: string;
  designation: string;
  experience: string;
  appliedAt: string;
}

interface JobDetailResponse {
  _id: string;
  clientId: string;
  organizationName: string;
  primaryContactFirstName: string;
  primaryContactLastName: string;
  logo: string | null;
  jobTitle: string;
  jobDescription: string;
  postStart: string;
  postEnd: string;
  noOfPositions: number;
  minimumSalary: number;
  maximumSalary: number;
  jobType: string;
  jobLocation: string;
  minimumExperience: number;
  maximumExperience: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  applicants: Candidate[];
}

interface JobDetail {
  _id: string;
  clientId: string;
  organizationName: string;
  primaryContactFirstName: string;
  primaryContactLastName: string;
  logo: string | null;
  jobTitle: string;
  jobDescription: string;
  postStart: string;
  postEnd: string;
  noOfPositions: number;
  minimumSalary: number;
  maximumSalary: number;
  jobType: string;
  jobLocation: string;
  minimumExperience: number;
  maximumExperience: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const formatJobType = (type: string): string => {
  if (!type) return 'Unknown';
  return type
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const JobDetailPage = (): JSX.Element => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const onBack = () => navigate(-1);
  const { userRole } = useAuthStore();

  const [job, setJob] = useState<JobDetail>();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [showApplicantsModal, setShowApplicantsModal] = useState(false);

  const handleShare = (): void => {
    if (navigator.share) {
      navigator.share({
        title: job?.jobTitle,
        text: `Check out this job opportunity: ${job?.jobTitle} at ${job?.organizationName}`,
        url: window.location.href,
      });
    } else {
      toast.info('Share functionality not available on this device');
    }
  };

  const handleCandidateCardClick = (candidateId: string): void => {
    if (userRole === 'admin') {
      navigate(ADMIN_PATHS.CANDIDATE_DETAILS(candidateId));
    } else {
      navigate(RECRUITER_PATHS.CANDIDATE_DETAILS(candidateId));
    }
  };

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await getJobDetailsAndApplicentDetailsById(
          jobId as string
        );
        const jobResponse = response as JobDetailResponse;
        setJob(jobResponse);
        setCandidates(jobResponse.applicants || []);
      } catch (error) {
        console.error('Failed to load job details', error);
        toast.error('Failed to load job details');
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const salaryRange = job
    ? `₹${(job.minimumSalary / 100000).toFixed(1)}L - ₹${(
        job.maximumSalary / 100000
      ).toFixed(1)}L`
    : '';

  const experienceRange = job
    ? `${job.minimumExperience} - ${job.maximumExperience} years`
    : '';

  const daysLeft = job
    ? Math.ceil(
        (new Date(job.postEnd).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  if (!job) {
    return (
      <Container>
        <Text>Loading job details...</Text>
      </Container>
    );
  }

  const rows = candidates.map((candidate) => (
    <Table.Tr
      key={`${candidate.email}-${candidate.appliedAt}`}
      onClick={() => handleCandidateCardClick(candidate.id)}
    >
      <Table.Td>
        <Group gap="sm">
          <Avatar size={32} radius="md" name={candidate.firstName} />
          <Stack gap={0}>
            <Text fw={500} size="sm">
              {candidate.firstName} {candidate.lastName}
            </Text>
            <Text size="xs" c="dimmed">
              {candidate.email}
            </Text>
          </Stack>
        </Group>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{candidate.mobileNumber}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{candidate.designation || '-'}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{candidate.experience || '-'}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{formatDate(candidate.appliedAt)}</Text>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box
      component="section"
      py={{ base: 'md', md: 40 }}
      style={{ minHeight: '100vh' }}
    >
      <Container size="lg">
        {/* Header with Back Button */}
        <Group justify="space-between" align="center" mb={30}>
          <Button
            variant="subtle"
            leftSection={<IconArrowLeft size={18} />}
            onClick={onBack}
            size="sm"
          >
            Back to Jobs
          </Button>
          <Group gap="xs">
            <ActionIcon
              variant="light"
              color="gray"
              size="lg"
              radius="md"
              onClick={handleShare}
              title="Share this job"
            >
              <IconShare2 size={20} />
            </ActionIcon>
          </Group>
        </Group>

        <Grid gutter={{ base: 'md', md: 'lg' }}>
          {/* Main Content */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Paper p={{ base: 'md', md: 'lg' }} radius="lg" withBorder mb="lg">
              {/* Job Header */}
              <Group align="flex-start" gap="lg" mb="lg" wrap="wrap">
                <Avatar
                  src={job.logo || undefined}
                  size={80}
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

                <Stack gap={0} style={{ flex: 1 }}>
                  <Title order={1} size="h2" fw={700} mb={4}>
                    {job.jobTitle}
                  </Title>
                  <Text size="lg" fw={600} mb={8}>
                    {job.organizationName}
                  </Text>
                  <Group gap="xs" wrap="wrap">
                    <Badge variant="light" size="lg" color="blue">
                      {formatJobType(job.jobType)}
                    </Badge>
                    {daysLeft > 0 ? (
                      <Badge variant="light" size="lg" color="green">
                        {daysLeft} days left
                      </Badge>
                    ) : (
                      <Badge variant="light" size="lg" color="red">
                        Closed
                      </Badge>
                    )}
                  </Group>
                </Stack>
              </Group>

              <Divider my="lg" />

              {/* Quick Info */}
              <Grid mb="lg" gutter="md">
                <Grid.Col span={{ base: 6, xs: 6, sm: 3 }}>
                  <Stack gap={4}>
                    <Group gap={4}>
                      <IconMapPin size={18} color="#666" />
                      <Text size="xs" c="dimmed" fw={500}>
                        Location
                      </Text>
                    </Group>
                    <Text size="sm" fw={600}>
                      {job.jobLocation}
                    </Text>
                  </Stack>
                </Grid.Col>

                <Grid.Col span={{ base: 6, xs: 6, sm: 3 }}>
                  <Stack gap={4}>
                    <Group gap={4}>
                      <IconBriefcase size={18} color="#666" />
                      <Text size="xs" c="dimmed" fw={500}>
                        Experience
                      </Text>
                    </Group>
                    <Text size="sm" fw={600}>
                      {experienceRange}
                    </Text>
                  </Stack>
                </Grid.Col>

                <Grid.Col span={{ base: 6, xs: 6, sm: 3 }}>
                  <Stack gap={4}>
                    <Group gap={4}>
                      <IconUsers size={18} color="#666" />
                      <Text size="xs" c="dimmed" fw={500}>
                        Positions
                      </Text>
                    </Group>
                    <Text size="sm" fw={600}>
                      {job.noOfPositions}
                    </Text>
                  </Stack>
                </Grid.Col>

                <Grid.Col span={{ base: 6, xs: 6, sm: 3 }}>
                  <Stack gap={4}>
                    <Group gap={4}>
                      <IconClock size={18} color="#666" />
                      <Text size="xs" c="dimmed" fw={500}>
                        Salary
                      </Text>
                    </Group>
                    <Text size="sm" fw={600} c="blue">
                      {salaryRange}
                    </Text>
                  </Stack>
                </Grid.Col>
              </Grid>

              <Divider my="lg" />

              {/* Job Description */}
              <Stack gap="lg">
                <div>
                  <Title order={3} size="h4" mb="md">
                    About This Job
                  </Title>
                  <Box
                    className="job-description-content"
                    style={{
                      lineHeight: 1.6,
                      fontSize: '14px',
                    }}
                    dangerouslySetInnerHTML={{
                      __html: job.jobDescription,
                    }}
                  />
                </div>

                <Divider />

                {/* Important Dates */}
                <Box>
                  <Title order={3} size="h4" mb="md">
                    Important Dates
                  </Title>
                  <Grid gutter="md">
                    <Grid.Col span={{ base: 6, xs: 6, sm: 6 }}>
                      <Stack gap={4}>
                        <Group gap={4}>
                          <IconCalendar size={18} color="#666" />
                          <Text size="xs" c="dimmed" fw={500}>
                            Posted On
                          </Text>
                        </Group>
                        <Text size="sm" fw={600}>
                          {formatDate(job.postStart)}
                        </Text>
                      </Stack>
                    </Grid.Col>
                    <Grid.Col span={{ base: 6, xs: 6, sm: 6 }}>
                      <Stack gap={4}>
                        <Group gap={4}>
                          <IconCalendar size={18} color="#666" />
                          <Text size="xs" c="dimmed" fw={500}>
                            Deadline
                          </Text>
                        </Group>
                        <Text size="sm" fw={600}>
                          {formatDate(job.postEnd)}
                        </Text>
                      </Stack>
                    </Grid.Col>
                  </Grid>
                </Box>

                <Divider />

                {/* Applicants Summary Section */}
                <Box>
                  <Group justify="space-between" align="center" mb="md">
                    <Group gap="sm">
                      <IconUsers size={24} color="#667eea" />
                      <Title order={3} size="h4">
                        Applicants
                      </Title>
                    </Group>
                    <Badge size="lg" color="blue" variant="light">
                      {candidates.length} applied
                    </Badge>
                  </Group>

                  <Button
                    fullWidth
                    size="md"
                    color="blue"
                    variant="light"
                    onClick={() => setShowApplicantsModal(true)}
                  >
                    View All Applicants
                  </Button>
                </Box>
              </Stack>
            </Paper>
          </Grid.Col>

          {/* Sidebar */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="lg">
              {/* Apply Card */}
              <Paper
                p="lg"
                radius="lg"
                withBorder
                style={{ position: 'sticky', top: 20 }}
              >
                <Stack gap="md">
                  <Box>
                    <Text size="sm" c="dimmed" mb={4}>
                      Salary Range
                    </Text>
                    <Title order={3} size="h3" c="blue" fw={700}>
                      {salaryRange}
                    </Title>
                  </Box>

                  <Box>
                    <Text size="sm" c="dimmed" mb={4}>
                      Per Year
                    </Text>
                    <Text size="xs" c="dimmed">
                      Competitive salary based on experience
                    </Text>
                  </Box>

                  <Divider />

                  <Box>
                    <Text size="sm" c="dimmed" mb={4}>
                      Total Applicants
                    </Text>
                    <Title order={3} size="h3" fw={700}>
                      {candidates.length}
                    </Title>
                  </Box>

                  {daysLeft <= 0 && (
                    <Text size="xs" c="red" style={{ textAlign: 'center' }}>
                      Applications are closed for this position
                    </Text>
                  )}
                </Stack>
              </Paper>

              {/* Company Info Card */}
              <Paper p="lg" radius="lg" withBorder>
                <Title order={4} size="h5" mb="md">
                  About the Company
                </Title>
                <Stack gap="md">
                  <Group gap="md">
                    <Avatar
                      src={job.logo || undefined}
                      size={60}
                      radius="md"
                      style={{
                        background: job.logo
                          ? undefined
                          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      }}
                    >
                      {!job.logo &&
                        (job.organizationName?.[0]?.toUpperCase() ?? '?')}
                    </Avatar>
                    <Stack gap={0}>
                      <Text fw={600} size="sm">
                        {job.organizationName}
                      </Text>
                      <Text size="xs" c="dimmed">
                        Contact: {job.primaryContactFirstName}{' '}
                        {job.primaryContactLastName}
                      </Text>
                    </Stack>
                  </Group>
                </Stack>
              </Paper>

              {/* Requirements Card */}
              <Paper p="lg" radius="lg" withBorder>
                <Title order={4} size="h5" mb="md">
                  What We're Looking For
                </Title>
                <Stack gap="sm">
                  <Group gap="sm">
                    <Badge variant="light" color="cyan" size="sm">
                      Experience
                    </Badge>
                    <Text size="sm">{experienceRange}</Text>
                  </Group>
                  <Group gap="sm">
                    <Badge variant="light" color="cyan" size="sm">
                      Job Type
                    </Badge>
                    <Text size="sm">{formatJobType(job.jobType)}</Text>
                  </Group>
                  <Group gap="sm">
                    <Badge variant="light" color="cyan" size="sm">
                      Location
                    </Badge>
                    <Text size="sm">{job.jobLocation}</Text>
                  </Group>
                  <Group gap="sm">
                    <Badge variant="light" color="cyan" size="sm">
                      Positions
                    </Badge>
                    <Text size="sm">{job.noOfPositions}</Text>
                  </Group>
                </Stack>
              </Paper>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>

      {/* Applicants Modal */}
      <Modal
        opened={showApplicantsModal}
        onClose={() => setShowApplicantsModal(false)}
        title={
          <Group gap="sm">
            <IconUsers size={24} color="#667eea" />
            <Title order={3} size="h4">
              Job Applicants
            </Title>
            <Badge size="lg" color="blue" variant="light" ml="auto">
              {candidates.length} Total
            </Badge>
          </Group>
        }
        size="xl"
        centered
      >
        {candidates.length > 0 ? (
          <Box style={{ overflowX: 'auto' }}>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Name & Email</Table.Th>
                  <Table.Th>Phone</Table.Th>
                  <Table.Th>Designation</Table.Th>
                  <Table.Th>Experience</Table.Th>
                  <Table.Th>Applied On</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Box>
        ) : (
          <Box
            p="xl"
            style={{
              textAlign: 'center',
              borderRadius: '8px',
            }}
          >
            <IconUsers size={48} style={{ marginBottom: '16px' }} />
            <Text c="dimmed" size="md">
              No applicants yet for this position
            </Text>
          </Box>
        )}
      </Modal>
    </Box>
  );
};

export default JobDetailPage;
