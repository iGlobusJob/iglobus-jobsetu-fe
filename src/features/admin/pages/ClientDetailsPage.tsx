import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Grid,
  Group,
  LoadingOverlay,
  Pagination,
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
  IconClock,
  IconCurrencyRupee,
  IconListDetails,
  IconMapPin,
} from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import type { ApiError } from '@/common';
import { clientDetailsSchema } from '@/features/dashboard/forms/clientdetails';
import type { AdminUpdateClient } from '@/features/dashboard/types/admin';
import type { Client } from '@/features/dashboard/types/client';
import type { Job } from '@/features/dashboard/types/job';
import { useSystemTheme } from '@/hooks/useSystemTheme';
import {
  getAllJobsByClient,
  getClientById,
  updateClientByAdmin,
} from '@/services/admin-services';

interface ClientDetailsPageProps {
  onUpdate?: (updatedClient: Client) => void;
  onStatusChange?: (
    id: string,
    status: 'registered' | 'active' | 'inactive'
  ) => void;
}

const ClientDetailsPage: React.FC<ClientDetailsPageProps> = ({
  onUpdate,
  onStatusChange,
}) => {
  const navigate = useNavigate();
  const { clientId } = useParams<{ clientId: string }>();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [form, setForm] = useState<Client | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>('general');
  const [jobsPage, setJobsPage] = useState(1);
  const JOBS_PER_PAGE = 10;
  const systemTheme = useSystemTheme();
  const isDark = systemTheme === 'dark';

  useEffect(() => {
    if (!clientId) return;

    const fetchClient = async () => {
      setLoading(true);
      try {
        const clientDetails = await getClientById(clientId);
        setForm(clientDetails);
      } catch {
        toast.error('Failed to fetch client details');
        navigate('/admin/clients');
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [clientId, navigate]);

  useEffect(() => {
    if (!clientId) return;

    const fetchJobs = async () => {
      setJobsLoading(true);
      try {
        const jobsList = await getAllJobsByClient(clientId);
        setJobs(jobsList);
        setJobsPage(1);
      } catch {
        toast.error('Failed to fetch client jobs');
      } finally {
        setJobsLoading(false);
      }
    };

    fetchJobs();
  }, [clientId]);

  function updateField<Key extends keyof Client>(key: Key, value: Client[Key]) {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  const updateNested = (
    parent: 'primaryContact' | 'secondaryContact',
    key: 'firstName' | 'lastName',
    value: string
  ) => {
    setForm((prev) =>
      prev
        ? {
            ...prev,
            [parent]: {
              ...prev[parent],
              [key]: value,
            },
          }
        : prev
    );
  };

  const handleSave = async () => {
    if (!form) return;
    const validation = clientDetailsSchema.safeParse(form);

    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    const payload: AdminUpdateClient = {
      clientId: form.id,
      organizationName: form.organizationName,
      logo: form.logo,
      mobile: form.mobile,
      status: form.status,
      location: form.location,
      gstin: form.gstin,
      panCard: form.panCard,
      primaryContact: {
        firstName: form.primaryContact?.firstName,
        lastName: form.primaryContact?.lastName,
      },
      secondaryContact: {
        firstName: form.secondaryContact?.firstName,
        lastName: form.secondaryContact?.lastName,
      },
    };

    try {
      setSaveLoading(true);
      const updated = await updateClientByAdmin(payload);
      setForm(updated);
      onUpdate?.(updated);
      toast.success('Client updated successfully !');
    } catch (error: unknown) {
      const err = error as ApiError;
      toast.error(
        err?.response?.data?.message || err?.data?.message || err?.message
      );
    } finally {
      setSaveLoading(false);
    }
  };

  const approveClient = async () => {
    if (!form) return;
    setActionLoading(true);

    const payload: AdminUpdateClient = {
      clientId: form.id,
      status: 'active',
      organizationName: form.organizationName,
      logo: form.logo,
      mobile: form.mobile,
      location: form.location,
      gstin: form.gstin,
      panCard: form.panCard,
      primaryContact: {
        firstName: form.primaryContact?.firstName,
        lastName: form.primaryContact?.lastName,
      },
      secondaryContact: {
        firstName: form.secondaryContact?.firstName,
        lastName: form.secondaryContact?.lastName,
      },
    };

    try {
      const updated = await updateClientByAdmin(payload);
      setForm(updated);
      onStatusChange?.(form.id, 'active');
      onUpdate?.(updated);
      toast.success('Client approved successfully !');
    } catch (err) {
      toast.error((err as Error).message);
    }

    setActionLoading(false);
  };

  const handleReject = async () => {
    if (!form) return;
    setActionLoading(true);

    const payload: AdminUpdateClient = {
      clientId: form.id,
      status: 'inactive',
      organizationName: form.organizationName,
      logo: form.logo,
      mobile: form.mobile,
      location: form.location,
      gstin: form.gstin,
      panCard: form.panCard,
      primaryContact: {
        firstName: form.primaryContact?.firstName,
        lastName: form.primaryContact?.lastName,
      },
      secondaryContact: {
        firstName: form.secondaryContact?.firstName,
        lastName: form.secondaryContact?.lastName,
      },
    };

    try {
      const updated = await updateClientByAdmin(payload);
      setForm(updated);
      onStatusChange?.(form.id, 'inactive');
      onUpdate?.(updated);
      toast.success('Client status updated !');
    } catch (err) {
      toast.error((err as Error).message);
    }

    setActionLoading(false);
  };

  if (!form) {
    return (
      <Box style={{ minHeight: '100vh' }}>
        <LoadingOverlay visible={loading} />
      </Box>
    );
  }

  const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE);
  const paginatedJobs = jobs.slice(
    (jobsPage - 1) * JOBS_PER_PAGE,
    jobsPage * JOBS_PER_PAGE
  );

  const formatDate = (date: string | Date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = d.toLocaleString('en-US', { month: 'short' });
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <Box style={{ minHeight: '100vh', paddingBottom: '2rem' }}>
      <Container size="xl" py="xl">
        <Group mb="lg">
          <ActionIcon
            variant="light"
            onClick={() => navigate(-1)}
            size="lg"
            radius="md"
          >
            <IconArrowLeft size={20} />
          </ActionIcon>
          <div>
            <Title order={isMobile ? 4 : 2} fw={700}>
              Client Details
            </Title>
            <Text size={isMobile ? 'xs' : 'sm'} c="dimmed">
              Manage client information and posted jobs
            </Text>
          </div>
        </Group>
        <Group
          align="center"
          mb="xl"
          gap="md"
          wrap={isMobile ? 'wrap' : 'nowrap'}
        >
          <Avatar
            size={isMobile ? 60 : 80}
            radius="xl"
            src={form.logo || undefined}
            color="blue"
          >
            {(form.organizationName?.[0] || '?').toUpperCase()}
          </Avatar>
          <Stack gap={7} align="flex-start">
            <Text fw={700} size={isMobile ? 'md' : 'lg'}>
              {form.organizationName}
            </Text>
            <Group gap="xs">
              <Badge variant="filled" size={isMobile ? 'sm' : 'md'}>
                {form.category}
              </Badge>
              <Badge
                variant="light"
                color={
                  form.status === 'active'
                    ? 'green'
                    : form.status === 'registered'
                      ? 'blue'
                      : form.status === 'inactive'
                        ? 'red'
                        : 'gray'
                }
              >
                {form.status.toUpperCase()}
              </Badge>
            </Group>
          </Stack>
        </Group>

        <Divider mb="xl" />
        <Tabs
          defaultValue="general"
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
              value="general"
              leftSection={<IconListDetails size={16} stroke={1.8} />}
            >
              General
            </Tabs.Tab>

            <Tabs.Tab
              value="jobs"
              leftSection={<IconBriefcase size={16} stroke={1.8} />}
            >
              <Group gap={6}>
                Jobs
                <Badge size="sm" variant="filled" radius="xl">
                  {jobs.length}
                </Badge>
              </Group>
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="general" pt="xl">
            <Stack gap="lg">
              <Stack gap="sm">
                <Text fw={600} size="lg">
                  Company Details
                </Text>

                <TextInput
                  label="Organization Name"
                  placeholder="e.g. Acme Corp"
                  size={isMobile ? 'sm' : 'md'}
                  value={form.organizationName}
                  onChange={(e) =>
                    updateField('organizationName', e.target.value)
                  }
                />

                <TextInput
                  label="Email Address"
                  placeholder="contact@company.com"
                  size={isMobile ? 'sm' : 'md'}
                  value={form.email}
                  disabled
                />

                <Grid>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Mobile Number"
                      placeholder="+91 98765 43210"
                      size={isMobile ? 'sm' : 'md'}
                      value={form.mobile}
                      onChange={(e) => updateField('mobile', e.target.value)}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Location"
                      placeholder="e.g. Mumbai"
                      size={isMobile ? 'sm' : 'md'}
                      value={form.location}
                      onChange={(e) => updateField('location', e.target.value)}
                    />
                  </Grid.Col>
                </Grid>

                <Grid>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="GSTIN"
                      placeholder="22AAAAA0000A1Z5"
                      size={isMobile ? 'sm' : 'md'}
                      value={form.gstin || ''}
                      onChange={(e) => updateField('gstin', e.target.value)}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="PAN Number"
                      placeholder="ABCDE1234F"
                      size={isMobile ? 'sm' : 'md'}
                      value={form.panCard || ''}
                      onChange={(e) => updateField('panCard', e.target.value)}
                    />
                  </Grid.Col>
                </Grid>
              </Stack>

              <Divider />
              <Stack gap="sm">
                <Text fw={600} size="lg">
                  Primary Contact
                </Text>
                <Grid>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="First Name"
                      placeholder="John"
                      size={isMobile ? 'sm' : 'md'}
                      value={form.primaryContact?.firstName || ''}
                      onChange={(e) =>
                        updateNested(
                          'primaryContact',
                          'firstName',
                          e.target.value
                        )
                      }
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Last Name"
                      placeholder="Doe"
                      size={isMobile ? 'sm' : 'md'}
                      value={form.primaryContact?.lastName || ''}
                      onChange={(e) =>
                        updateNested(
                          'primaryContact',
                          'lastName',
                          e.target.value
                        )
                      }
                    />
                  </Grid.Col>
                </Grid>
              </Stack>

              <Divider />
              <Stack gap="sm">
                <Text fw={600} size="lg">
                  Secondary Contact
                </Text>
                <Grid>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="First Name"
                      placeholder="Jane"
                      size={isMobile ? 'sm' : 'md'}
                      value={form.secondaryContact?.firstName || ''}
                      onChange={(e) =>
                        updateNested(
                          'secondaryContact',
                          'firstName',
                          e.target.value
                        )
                      }
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Last Name"
                      placeholder="Smith"
                      size={isMobile ? 'sm' : 'md'}
                      value={form.secondaryContact?.lastName || ''}
                      onChange={(e) =>
                        updateNested(
                          'secondaryContact',
                          'lastName',
                          e.target.value
                        )
                      }
                    />
                  </Grid.Col>
                </Grid>
              </Stack>

              <Divider />
              <Stack gap="md">
                {form.status === 'registered' && (
                  <Button
                    color="green"
                    variant="light"
                    size={isMobile ? 'sm' : 'md'}
                    fullWidth={isMobile}
                    onClick={approveClient}
                    loading={actionLoading}
                  >
                    Approve
                  </Button>
                )}
                {form.status === 'active' && (
                  <Button
                    color="red"
                    variant="light"
                    size={isMobile ? 'sm' : 'md'}
                    fullWidth={isMobile}
                    onClick={handleReject}
                    loading={actionLoading}
                  >
                    Inactive
                  </Button>
                )}
                {form.status === 'inactive' && (
                  <Button
                    color="green"
                    variant="light"
                    size={isMobile ? 'sm' : 'md'}
                    fullWidth={isMobile}
                    onClick={approveClient}
                    loading={actionLoading}
                  >
                    Activate
                  </Button>
                )}

                <Button
                  size={isMobile ? 'sm' : 'md'}
                  fullWidth={isMobile}
                  onClick={handleSave}
                  loading={saveLoading}
                >
                  Save Changes
                </Button>
              </Stack>
            </Stack>
          </Tabs.Panel>
          <Tabs.Panel value="jobs" pt="xl">
            <Box pos="relative">
              <LoadingOverlay visible={jobsLoading} />

              {jobs.length === 0 ? (
                <Center py={40}>
                  <Stack align="center">
                    <IconBriefcase size={48} color="#ccc" />
                    <Text c="dimmed">No jobs posted by this client yet.</Text>
                  </Stack>
                </Center>
              ) : (
                <Stack gap="lg">
                  {paginatedJobs.map((job) => (
                    <Box
                      key={job.id || job._id}
                      p="lg"
                      style={{
                        border: '1px solid #ddd',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease',
                      }}
                      onClick={() => navigate(`/admin/all-jobs`)}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = 'scale(1.01)')
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = 'scale(1)')
                      }
                    >
                      <Stack gap="md">
                        <Group justify="space-between" align="flex-start">
                          <Stack gap="xs" style={{ flex: 1 }}>
                            <Text fw={700} size="lg">
                              {job.jobTitle}
                            </Text>
                            <Group gap="sm">
                              <Badge
                                color={
                                  job.status === 'active'
                                    ? 'green'
                                    : job.status === 'drafted'
                                      ? 'yellow'
                                      : 'red'
                                }
                              >
                                {job.status.toUpperCase()}
                              </Badge>
                              <Badge variant="light">{job.jobType}</Badge>
                            </Group>
                          </Stack>
                        </Group>
                        <Grid>
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
                                  {job.minimumExperience} -{' '}
                                  {job.maximumExperience} years
                                </Text>
                              </div>
                            </Group>
                          </Grid.Col>

                          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                            <Group gap="xs">
                              <IconBriefcase size={16} color="#a78bfa" />
                              <div>
                                <Text size="xs" c="dimmed" fw={500}>
                                  Positions
                                </Text>
                                <Text size="sm" fw={600}>
                                  {job.noOfPositions}
                                </Text>
                              </div>
                            </Group>
                          </Grid.Col>
                        </Grid>
                        <Group gap="lg">
                          <Group gap="xs">
                            <IconCalendar size={16} color="#5c7cfa" />
                            <Text size="sm">
                              <strong>Posted:</strong>{' '}
                              {formatDate(job.createdAt)}
                            </Text>
                          </Group>
                          <Group gap="xs">
                            <IconCalendar size={16} color="#ff922b" />
                            <Text size="sm">
                              <strong>Updated:</strong>{' '}
                              {job.updatedAt ? formatDate(job.updatedAt) : '—'}
                            </Text>
                          </Group>
                        </Group>

                        <Box>
                          <Text
                            size="sm"
                            c="dimmed"
                            lineClamp={2}
                            dangerouslySetInnerHTML={{
                              __html: job.jobDescription,
                            }}
                          ></Text>
                        </Box>
                      </Stack>
                    </Box>
                  ))}

                  {totalPages > 1 && (
                    <Group justify="center" mt="xl">
                      <Pagination
                        total={totalPages}
                        value={jobsPage}
                        onChange={setJobsPage}
                        size="sm"
                        radius="md"
                      />
                    </Group>
                  )}
                </Stack>
              )}
            </Box>
          </Tabs.Panel>
        </Tabs>
      </Container>
    </Box>
  );
};

export default ClientDetailsPage;
