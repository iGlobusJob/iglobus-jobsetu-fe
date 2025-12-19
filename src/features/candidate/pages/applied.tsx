import {
  Badge,
  Box,
  Button,
  Center,
  Grid,
  Loader,
  Paper,
  Text,
  Title,
  Flex,
  rem,
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { useEffect, useState, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import { CANDIDATE_PATHS } from '@/routes/config/userPath';
import {
  getMyJobs,
  saveToJob,
  unSaveToJob,
} from '@/services/candidate-services';

export interface JobSummary {
  id: string;
  jobTitle: string;
  organizationName: string;
  jobLocation: string;
  minimumSalary: number;
  maximumSalary: number;
  jobDescription?: string;
  jobType?: string;
  minimumExperience?: number;
  maximumExperience?: number;
  logo?: string | null;
}

export interface CandidateJob {
  id: string;
  candidateId: string;
  jobId: JobSummary;
  isJobSaved: boolean;
  isJobApplied: boolean;
  savedAt: string;
  appliedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface JobCardUIProps {
  job: JobSummary;
  isSaved: boolean;
  isApplied: boolean;
  onSaveToggle: (jobId: string, isSaved: boolean) => Promise<void>;
  isSaving?: boolean;
}

const JobCardUI = ({
  job,
  isApplied,
  isSaving = false,
}: JobCardUIProps): JSX.Element => {
  const navigate = useNavigate();

  const salaryMin = job.minimumSalary || 0;
  const salaryMax = job.maximumSalary || 0;
  const experienceMin = job.minimumExperience || 0;
  const experienceMax = job.maximumExperience || 0;

  return (
    <Paper
      radius="md"
      shadow="sm"
      withBorder
      p="lg"
      style={{
        position: 'relative',
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
      }}
    >
      {/* Top-right Bookmark Button */}
      <Flex
        gap="xs"
        style={{
          position: 'absolute',
          top: rem(12),
          right: rem(12),
          zIndex: 10,
        }}
        align="center"
      ></Flex>

      {/* Header */}
      <Flex align="flex-start" gap="lg" mb="md" mt={isApplied ? rem(20) : 0}>
        <Box
          style={{
            width: 60,
            height: 60,
            borderRadius: 12,
            background: job.logo
              ? `url("${job.logo}")`
              : 'linear-gradient(135deg,#667eea,#764ba2)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 700,
            fontSize: 22,
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          {!job.logo && job.organizationName?.[0]?.toUpperCase()}
        </Box>

        <Box style={{ flex: 1 }}>
          <Title order={4} lineClamp={1} size="h5">
            {job.jobTitle}
          </Title>
          <Text size="sm" c="dimmed" lineClamp={1}>
            {job.organizationName}
          </Text>
        </Box>
      </Flex>

      {/* Description */}
      {job.jobDescription && (
        <Text
          size="sm"
          c="dimmed"
          lineClamp={2}
          mb="md"
          dangerouslySetInnerHTML={{ __html: job.jobDescription }}
        />
      )}

      {/* Job Details Grid */}
      <Grid gutter="xs" mb="md">
        <Grid.Col span={6}>
          <Text size="xs" fw={500} c="dimmed">
            Salary
          </Text>
          <Text size="sm" fw={600}>
            ₹{salaryMin.toLocaleString()} - ₹{salaryMax.toLocaleString()}
          </Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text size="xs" fw={500} c="dimmed">
            Experience
          </Text>
          <Text size="sm" fw={600}>
            {experienceMin} - {experienceMax} years
          </Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text size="xs" fw={500} c="dimmed">
            Location
          </Text>
          <Text size="sm" fw={600} lineClamp={1}>
            {job.jobLocation}
          </Text>
        </Grid.Col>
        {job.jobType && (
          <Grid.Col span={6}>
            <Text size="xs" fw={500} c="dimmed">
              Type
            </Text>
            <Badge variant="light" size="sm">
              {job.jobType}
            </Badge>
          </Grid.Col>
        )}
      </Grid>

      {/* Footer - push to bottom */}
      <Box style={{ marginTop: 'auto' }}>
        <Button
          fullWidth
          variant="light"
          size="sm"
          rightSection={<IconChevronRight size={14} />}
          onClick={() => navigate(CANDIDATE_PATHS.JOB_DETAILS(job.id))}
          disabled={isSaving}
        >
          View Details
        </Button>
      </Box>
    </Paper>
  );
};

const AppliedJobs = (): JSX.Element => {
  const [myJobs, setMyJobs] = useState<CandidateJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingIds, setSavingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getMyJobs();
        setMyJobs(response || []);
      } catch (error) {
        console.error('Failed to fetch my jobs', error);
        setError('Failed to load jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyJobs();
  }, []);

  const handleSaveToggle = async (jobId: string, isSaved: boolean) => {
    setSavingIds((prev) => new Set(prev).add(jobId));

    try {
      if (isSaved) {
        await unSaveToJob({ jobId });
      } else {
        await saveToJob({ jobId });
      }

      setMyJobs((prev) =>
        prev.map((job) =>
          job.jobId.id === jobId ? { ...job, isJobSaved: !isSaved } : job
        )
      );
    } catch (err) {
      console.error('Failed to toggle save:', err);
    } finally {
      setSavingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(jobId);
        return newSet;
      });
    }
  };

  const appliedJobs = myJobs.filter((job) => job.isJobApplied);

  if (error) {
    return (
      <Box>
        <Paper
          p="md"
          radius="md"
          mb={20}
          style={{ backgroundColor: '#ffe0e0', borderColor: '#ff6b6b' }}
          withBorder
        >
          <Text c="#cc0000" size="sm">
            {error}
          </Text>
        </Paper>
      </Box>
    );
  }

  if (loading) {
    return (
      <Center h="60vh">
        <Loader size="lg" />
      </Center>
    );
  }

  if (appliedJobs.length === 0) {
    return (
      <Paper p={60} radius="md" withBorder>
        <Center>
          <Text c="dimmed">No applied jobs yet</Text>
        </Center>
      </Paper>
    );
  }

  return (
    <Box>
      <Box mb="lg">
        <Title order={2} mb="xs">
          Applied Jobs
        </Title>
        <Text c="dimmed" size="sm">
          {appliedJobs.length} applied job{appliedJobs.length !== 1 ? 's' : ''}
        </Text>
      </Box>

      <Grid gutter="lg">
        {appliedJobs.map((item) => (
          <Grid.Col key={item.id} span={{ base: 12, md: 6, lg: 4 }}>
            <JobCardUI
              job={item.jobId}
              isSaved={item.isJobSaved}
              isApplied={item.isJobApplied}
              onSaveToggle={handleSaveToggle}
              isSaving={savingIds.has(item.jobId.id)}
            />
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
};

export default AppliedJobs;
