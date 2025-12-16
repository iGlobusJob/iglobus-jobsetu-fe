import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Paper,
  Text,
  Title,
  Tooltip,
  Loader,
  rem,
  Avatar,
} from '@mantine/core';
import { IconChevronRight, IconStar } from '@tabler/icons-react';
import { useState, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import type { CandidateJobs } from '@/features/dashboard/types/candidate';
import { CANDIDATE_PATHS } from '@/routes/config/userPath';
import { saveToJob, unSaveToJob } from '@/services/candidate-services';

interface JobCardProps {
  job: CandidateJobs & { applied?: boolean };
  onBookmark: (id: string) => void;
}

export const JobCard = ({ job, onBookmark }: JobCardProps): JSX.Element => {
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState<boolean>(
    Boolean(job.bookmarked)
  );
  const [isBookmarking, setIsBookmarking] = useState(false);

  const handleBookmarkClick = async (): Promise<void> => {
    const jobId = job.id;
    if (!jobId) return;

    setIsBookmarking(true);
    setBookmarked((prev) => !prev);

    try {
      if (bookmarked) {
        await unSaveToJob({ jobId });
      } else {
        await saveToJob({ jobId });
      }
      onBookmark?.(jobId);
    } catch (error) {
      setBookmarked((prev) => !prev);
      console.error('Failed to bookmark job:', error);
    } finally {
      setIsBookmarking(false);
    }
  };

  return (
    <Paper
      h="100%"
      display="flex"
      style={{
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        transition: 'all 0.3s ease',
      }}
      radius="md"
      shadow="sm"
      withBorder
      p="lg"
    >
      {/* Top-right badges section */}
      <Flex
        gap="xs"
        style={{
          position: 'absolute',
          top: rem(12),
          right: rem(12),
          zIndex: 10,
        }}
        align="center"
      >
        {/* Bookmark Button */}
        <Tooltip
          label={bookmarked ? 'Remove bookmark' : 'Save job'}
          position="bottom"
        >
          <ActionIcon
            variant="light"
            radius="md"
            size="lg"
            onClick={handleBookmarkClick}
            disabled={isBookmarking}
            color={bookmarked ? 'yellow' : 'gray'}
            style={{
              transition: 'all 0.2s ease',
            }}
          >
            {isBookmarking ? (
              <Loader size={16} />
            ) : (
              <IconStar
                size={18}
                fill={bookmarked ? 'currentColor' : 'none'}
                style={{
                  transition: 'all 0.2s ease',
                }}
              />
            )}
          </ActionIcon>
        </Tooltip>
      </Flex>

      {/* Header */}
      <Flex align="flex-start" gap="lg" mb="md" mt={job.applied ? rem(10) : 0}>
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
          {!job.logo && (job.organizationName?.[0]?.toUpperCase() ?? '?')}
        </Avatar>

        <Box style={{ flex: 1 }}>
          <Flex gap={8} align="center">
            <Title order={4} lineClamp={1} size="h5">
              {job.jobTitle}
            </Title>

            {job.applied && (
              <Badge
                size="xs"
                radius="xl"
                color="green"
                variant="light"
                styles={{
                  root: {
                    fontWeight: 600,
                    letterSpacing: '0.4px',
                    textTransform: 'uppercase',
                    flexShrink: 0,
                  },
                }}
              >
                Applied
              </Badge>
            )}
          </Flex>

          <Text size="sm" c="dimmed" lineClamp={1}>
            {job.organizationName}
          </Text>
        </Box>
      </Flex>

      {/* Description */}
      <Text
        size="sm"
        c="dimmed"
        lineClamp={2}
        mb="md"
        dangerouslySetInnerHTML={{ __html: job.jobDescription }}
      />

      {/* Job Details Grid */}
      <Grid gutter="xs" mb="md">
        <Grid.Col span={6}>
          <Text size="xs" fw={500} c="dimmed">
            Salary
          </Text>
          <Text size="sm" fw={600}>
            ₹{job.salaryMin?.toLocaleString('en-IN')} - ₹
            {job.salaryMax?.toLocaleString('en-IN')}
          </Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text size="xs" fw={500} c="dimmed">
            Experience
          </Text>
          <Text size="sm" fw={600}>
            {job.experienceLevel}
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
        <Grid.Col span={6}>
          <Text size="xs" fw={500} c="dimmed">
            Type
          </Text>
          <Badge variant="light" size="sm">
            {job.jobType}
          </Badge>
        </Grid.Col>
      </Grid>

      {/* Footer - push to bottom */}
      <Box style={{ marginTop: 'auto' }}>
        <Button
          fullWidth
          variant="light"
          size="sm"
          rightSection={<IconChevronRight size={14} />}
          onClick={() => navigate(CANDIDATE_PATHS.JOB_DETAILS(job.id))}
          disabled={isBookmarking}
        >
          View Details
        </Button>
      </Box>
    </Paper>
  );
};
