import {
  Avatar,
  Badge,
  Box,
  Divider,
  Drawer,
  Grid,
  Group,
  LoadingOverlay,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import {
  IconCalendar,
  IconCalendarCheck,
  IconMail,
  IconMapPin,
  IconPhone,
  IconUser,
} from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import type { CandidateProfile } from '@/features/dashboard/types/candidate';
import { getCandidateDetailsById } from '@/services/client-services';

interface Props {
  opened: boolean;
  onClose: () => void;
  candidate: CandidateProfile | null;
}

const formatDate = (date?: string | Date) => {
  if (!date) return '—';
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = d.toLocaleString('en-US', { month: 'short' });
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

const CandidateDetailsDrawer: React.FC<Props> = ({
  opened,
  onClose,
  candidate,
}) => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<CandidateProfile | null>(candidate);

  useEffect(() => {
    const fetchCandidate = async () => {
      if (!candidate?.id) return;
      setLoading(true);

      try {
        const data = await getCandidateDetailsById(candidate.id);
        setDetails(data);
      } catch {
        toast.error('Failed to fetch candidate details');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [candidate?.id]);

  if (!candidate) return null;

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      position="right"
      padding="xl"
      size={600}
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Title order={3} style={{ margin: 0 }}>
            Candidate Overview
          </Title>
        </div>
      }
      styles={{ header: { marginBottom: 20 } }}
    >
      <LoadingOverlay visible={loading} />

      <Stack gap="xl">
        <Group align="center" gap="md">
          <Avatar
            size={80}
            radius="xl"
            color="blue"
            src={details?.profilePicture || null}
          >
            {(candidate.firstName?.[0] || '?').toUpperCase()}
            {(candidate.lastName?.[0] || '').toUpperCase()}
          </Avatar>

          <Stack gap={4}>
            <Group gap={8} align="center">
              <Title order={3} fw={700}>
                {candidate.firstName || '—'} {candidate.lastName || ''}
              </Title>
              {candidate.category && (
                <Badge variant="light" color="blue" radius="sm">
                  {candidate.category}
                </Badge>
              )}
            </Group>

            <Group gap={6}>
              <IconMail size={16} />
              <Text size="sm">{details?.email || '—'}</Text>
            </Group>
          </Stack>
        </Group>

        <Divider />

        <Box>
          <Title order={4} fw={600} mb={15}>
            Personal Information
          </Title>

          <Grid gutter="md">
            <Grid.Col span={6}>
              <TextInput
                label="First Name"
                value={details?.firstName || ''}
                readOnly
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInput
                label="Last Name"
                value={details?.lastName || ''}
                readOnly
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInput
                label="Phone Number"
                leftSection={<IconPhone size={16} />}
                value={details?.mobileNumber || ''}
                readOnly
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInput
                label="Gender"
                leftSection={<IconUser size={16} />}
                value={details?.gender || ''}
                readOnly
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInput
                label="Date of Birth"
                leftSection={<IconCalendar size={16} />}
                value={formatDate(details?.dateOfBirth ?? '')}
                readOnly
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <TextInput
                label="Address"
                leftSection={<IconMapPin size={16} />}
                value={details?.address || ''}
                readOnly
              />
            </Grid.Col>
          </Grid>
        </Box>

        <Group justify="space-between">
          <Group gap={6}>
            <IconCalendarCheck size={16} />
            <Text fw={600}>Joined On</Text>
          </Group>
          <Text>{formatDate(details?.createdAt)}</Text>
        </Group>
        <Divider />
      </Stack>
    </Drawer>
  );
};

export default CandidateDetailsDrawer;
