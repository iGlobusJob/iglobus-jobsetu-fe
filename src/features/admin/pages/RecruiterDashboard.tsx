import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Card,
  Center,
  Container,
  Group,
  LoadingOverlay,
  Modal,
  Pagination,
  PasswordInput,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconCalendar,
  IconCalendarCheck,
  IconMail,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react';
import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import type { ApiError } from '@/common';
import { openDeleteRecruiterModal } from '@/features/admin/pages/DeleteModal';
import type { CreateRecruiterInput } from '@/features/dashboard/types/admin';
import type { Recruiter } from '@/features/dashboard/types/recruiter';
import { createRecruiter, getAllRecruiters } from '@/services/admin-services';
import { deleterecruiter } from '@/services/recruiter-services';
const PAGE_SIZE = 10;

const RecruiterDashboard: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [sortFilter, setSortFilter] = useState<
    'asc' | 'desc' | 'newest' | 'oldest'
  >('asc');

  // Modal state
  const [modalOpened, setModalOpened] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<CreateRecruiterInput>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateRecruiterInput, string>>
  >({});

  useEffect(() => {
    const fetchRecruiters = async () => {
      setLoading(true);
      try {
        const data = await getAllRecruiters();
        setRecruiters(data);
      } catch {
        toast.error('Failed to fetch recruiters');
      } finally {
        setLoading(false);
      }
    };
    fetchRecruiters();
  }, []);

  const handleChange = (field: keyof CreateRecruiterInput, value: string) => {
    setForm({ ...form, [field]: value });
    // Clear error for this field
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CreateRecruiterInput, string>> = {};
    const nameRegex = /^[A-Za-z\s]+$/;

    if (!form.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (form.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    } else if (!nameRegex.test(form.firstName.trim())) {
      newErrors.firstName = 'First name must contain only letters';
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (form.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    } else if (!nameRegex.test(form.lastName.trim())) {
      newErrors.lastName = 'Last name must contain only letters';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    try {
      const response = await createRecruiter(form);

      toast.success(response?.message || 'Recruiter created successfully!');

      // Add the new recruiter to the list
      const newRecruiters = await getAllRecruiters();
      setRecruiters(newRecruiters);

      // Reset form and close modal
      setForm({ firstName: '', lastName: '', email: '', password: '' });
      setErrors({});
      setModalOpened(false);
    } catch (error) {
      const err = error as ApiError;
      toast.error(err?.response?.data?.message || err?.message);
      // Keep modal open on error
    } finally {
      setSubmitting(false);
    }
  };

  const handleModalClose = () => {
    if (!submitting) {
      setModalOpened(false);
      setForm({ firstName: '', lastName: '', email: '', password: '' });
      setErrors({});
    }
  };

  const filtered = useMemo(() => {
    return recruiters
      .filter((recruiter) => {
        if (search.trim()) {
          const query = search.toLowerCase();
          return (
            recruiter.firstName.toLowerCase().includes(query) ||
            recruiter.lastName.toLowerCase().includes(query) ||
            recruiter.email.toLowerCase().includes(query)
          );
        }

        return true;
      })
      .sort((a, b) => {
        const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
        const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();

        if (sortFilter === 'asc') {
          return nameA.localeCompare(nameB);
        }
        if (sortFilter === 'desc') {
          return nameB.localeCompare(nameA);
        }

        if (sortFilter === 'newest') {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }

        if (sortFilter === 'oldest') {
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        }

        return 0;
      });
  }, [recruiters, search, sortFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = useMemo(() => {
    const start = (activePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, activePage]);

  const formatDate = (date: string | Date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = d.toLocaleString('en-US', { month: 'short' });
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };
  interface DeleteRecruiterButtonProps {
    recruiterId: string;
    onDeleted?: (id: string) => void;
    style?: React.CSSProperties;
    size?: 'sm' | 'md' | 'lg';
  }

  const DeleteRecruiterButton: React.FC<DeleteRecruiterButtonProps> = ({
    recruiterId,
    onDeleted,
    style,
    size = 'sm',
  }) => {
    const handleDelete = () => {
      openDeleteRecruiterModal(recruiterId, async (id) => {
        try {
          await deleterecruiter(id);
          if (onDeleted) onDeleted(id);
          toast.success('Recruiter deleted successfully!');
        } catch {
          toast.error('Failed to delete recruiter.');
        }
      });
    };
    return (
      <ActionIcon
        color="red"
        variant="subtle"
        size={size}
        style={{ position: 'absolute', top: 10, right: 10, ...style }}
        onClick={handleDelete}
      >
        <IconTrash size={20} />
      </ActionIcon>
    );
  };

  // MOBILE CARD COMPONENT
  const MobileRecruiterCard = ({ recruiter }: { recruiter: Recruiter }) => (
    <Card radius="lg" withBorder shadow="sm" mb="md" p="md">
      <Stack gap={10}>
        <Group justify="space-between" align="center">
          <Group>
            <DeleteRecruiterButton
              recruiterId={recruiter.id}
              onDeleted={(id) =>
                setRecruiters((prev) => prev.filter((r) => r.id !== id))
              }
            />

            <Avatar size={50} radius="xl">
              {(recruiter.firstName?.[0] || '?').toUpperCase()}
            </Avatar>

            <Stack gap={2}>
              <Text fw={700} size="sm">
                {recruiter.firstName} {recruiter.lastName}
              </Text>
              <Text size="xs" color="dimmed">
                {recruiter.email}
              </Text>
            </Stack>
          </Group>
        </Group>

        <Group gap={6}>
          <IconMail size={16} color="#1c7ed6" />
          <Text size="xs">{recruiter.email}</Text>
        </Group>

        {/* Dates */}
        <Group gap={6}>
          <IconCalendar size={16} color="#5c7cfa" />
          <Text size="xs">
            <strong>Joined On :</strong> {formatDate(recruiter.createdAt)}
          </Text>
        </Group>

        <Group gap={6}>
          <IconCalendarCheck size={16} color="#e8590c" />
          <Text size="xs">
            <strong>Updated At :</strong>{' '}
            {recruiter.updatedAt ? formatDate(recruiter.updatedAt) : '—'}
          </Text>
        </Group>
      </Stack>
    </Card>
  );

  return (
    <Box
      style={{
        minHeight: '100vh',
        width: '100%',
        padding: isMobile ? '1rem' : isTablet ? '1.5rem' : '1rem',
        transition: 'background-color 0.15s ease',
      }}
    >
      <Container size="xl" px={0}>
        <Group justify="space-between" mb="md" align="flex-start">
          <Stack gap={4}>
            <Title order={isMobile ? 4 : 2} fw={700}>
              Recruiter Directory
            </Title>

            <Text size="sm" color="dimmed">
              Manage recruiters and view their profiles efficiently.
            </Text>
          </Stack>

          <Button
            leftSection={<IconPlus size={18} />}
            onClick={() => setModalOpened(true)}
            size={isMobile ? 'sm' : 'md'}
          >
            Add Recruiter
          </Button>
        </Group>

        {/* FILTERS */}
        <Card
          radius="lg"
          shadow="md"
          withBorder
          mb="md"
          style={{ padding: isMobile ? 10 : 12 }}
        >
          <Group
            gap="md"
            wrap="wrap"
            align="center"
            justify={isMobile ? 'center' : 'space-between'}
          >
            <Box
              style={{
                flex: isMobile ? '1 1 100%' : '1',
                minWidth: isMobile ? '100%' : 220,
              }}
            >
              <TextInput
                placeholder="Search by name or email"
                value={search}
                onChange={(e) => {
                  setSearch(e.currentTarget.value);
                  setActivePage(1);
                }}
                size={isMobile ? 'sm' : 'md'}
                leftSection={null}
              />
            </Box>
            <Group
              gap="sm"
              style={{
                width: isMobile ? '100%' : 'auto',
                justifyContent: isMobile ? 'center' : 'flex-end',
              }}
            >
              {/* SORT BY (asc & dec) */}
              <Select
                data={[
                  { value: 'asc', label: 'Name (A → Z)' },
                  { value: 'desc', label: 'Name (Z → A)' },
                  { value: 'newest', label: 'Newest → Oldest' },
                  { value: 'oldest', label: 'Oldest → Newest' },
                ]}
                value={sortFilter}
                onChange={(val) => {
                  if (val) {
                    setSortFilter(val as 'asc' | 'desc' | 'newest' | 'oldest');
                  }
                }}
                placeholder="Sort"
                size={isMobile ? 'sm' : 'md'}
                style={{ width: isMobile ? '100%' : 180 }}
              />
            </Group>
          </Group>
        </Card>

        {isMobile ? (
          <Stack>
            {pageItems.length === 0 ? (
              <Center py={20}>
                <Text color="dimmed">No recruiters found.</Text>
              </Center>
            ) : (
              pageItems.map((recruiter) => (
                <MobileRecruiterCard key={recruiter.id} recruiter={recruiter} />
              ))
            )}
          </Stack>
        ) : (
          <Card radius="lg" shadow="md" withBorder p="lg">
            <LoadingOverlay visible={loading} />

            {pageItems.length === 0 ? (
              <Center py={40}>
                <Text color="dimmed">No recruiters found.</Text>
              </Center>
            ) : (
              <Stack gap="lg">
                {pageItems.map((recruiter) => (
                  <Card
                    key={recruiter.id}
                    radius="lg"
                    withBorder
                    p="lg"
                    style={{
                      transition: 'transform 0.2s ease',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = 'scale(1.01)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = 'scale(1)')
                    }
                  >
                    <DeleteRecruiterButton
                      recruiterId={recruiter.id}
                      onDeleted={(id) =>
                        setRecruiters((prev) => prev.filter((r) => r.id !== id))
                      }
                    />
                    <Group
                      wrap="nowrap"
                      align="center"
                      style={{ width: '100%' }}
                    >
                      <Group gap="md" style={{ flex: 1 }}>
                        <Group align="center">
                          <Avatar size={60} radius="xl">
                            {(recruiter.firstName?.[0] || '?').toUpperCase()}
                          </Avatar>
                        </Group>

                        <Stack gap={6}>
                          <Text fw={700} size="lg">
                            {recruiter.firstName} {recruiter.lastName}
                          </Text>

                          <Group gap={6}>
                            <IconMail size={16} color="#1c7ed6" />
                            <Text size="sm">{recruiter.email}</Text>
                          </Group>
                        </Stack>
                      </Group>

                      <Stack
                        gap={6}
                        style={{
                          flex: 1,
                          alignItems: 'flex-end',
                          marginRight: 40,
                        }}
                      >
                        <Group align="center" gap={6} wrap="nowrap">
                          <IconCalendar size={16} color="#5c7cfa" />
                          <Text fw={600} miw={110} size="sm">
                            Joined On
                          </Text>
                          <Text size="sm">
                            {formatDate(recruiter.createdAt)}
                          </Text>
                        </Group>

                        <Group align="center" gap={6} wrap="nowrap">
                          <IconCalendar size={16} color="#e8590c" />
                          <Text fw={600} miw={110} size="sm">
                            Updated At
                          </Text>
                          <Text size="sm">
                            {recruiter.updatedAt
                              ? formatDate(recruiter.updatedAt)
                              : '—'}
                          </Text>
                        </Group>
                      </Stack>
                    </Group>
                  </Card>
                ))}
              </Stack>
            )}
          </Card>
        )}
        <Group
          justify="space-between"
          mt="md"
          align="center"
          style={{ minHeight: 40 }}
        >
          <Text size="sm" color="dimmed">
            Showing {pageItems.length} of {filtered.length} results
          </Text>

          <Pagination
            total={totalPages}
            value={activePage}
            onChange={(p) => setActivePage(p)}
            size="sm"
            radius="md"
          />
        </Group>

        {/* ADD RECRUITER MODAL */}
        <Modal
          opened={modalOpened}
          onClose={handleModalClose}
          title={
            <Group gap="sm">
              <Box
                visibleFrom="sm"
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  backgroundColor: '#4dabf7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconPlus size={20} color="white" strokeWidth={2.5} />
              </Box>
              <Stack gap={2}>
                <Title order={3} fw={700}>
                  Add New Recruiter
                </Title>
                <Text size="sm" c="dimmed">
                  Fill in the details to create a new recruiter account
                </Text>
              </Stack>
            </Group>
          }
          size="lg"
          centered
          radius="md"
          padding="xl"
          styles={{
            header: {
              paddingBottom: '20px',
              borderBottom: '1px solid #e9ecef',
            },
            body: {
              paddingTop: '24px',
            },
          }}
        >
          <Stack gap="lg">
            <Box>
              <Text
                size="sm"
                fw={600}
                mb="md"
                c="dimmed"
                tt="uppercase"
                lts={0.5}
              >
                Personal Information
              </Text>
              <Group grow gap="md" align="flex-start">
                <TextInput
                  label="First Name"
                  placeholder="Enter first name"
                  value={form.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  error={errors.firstName}
                  required
                  disabled={submitting}
                  size="md"
                  styles={{
                    label: { fontWeight: 500, marginBottom: '8px' },
                    input: {
                      borderRadius: '8px',
                      '&:focus': {
                        borderColor: '#4dabf7',
                      },
                    },
                  }}
                />

                <TextInput
                  label="Last Name"
                  placeholder="Enter last name"
                  value={form.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  error={errors.lastName}
                  required
                  disabled={submitting}
                  size="md"
                  styles={{
                    label: { fontWeight: 500, marginBottom: '8px' },
                    input: {
                      borderRadius: '8px',
                      '&:focus': {
                        borderColor: '#4dabf7',
                      },
                    },
                  }}
                />
              </Group>
            </Box>

            <Box>
              <Text
                size="sm"
                fw={600}
                mb="md"
                c="dimmed"
                tt="uppercase"
                lts={0.5}
              >
                Account Details
              </Text>
              <Stack gap="md">
                <TextInput
                  label="Email Address"
                  placeholder="recruiter@example.com"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  type="email"
                  error={errors.email}
                  required
                  disabled={submitting}
                  size="md"
                  leftSection={<IconMail size={18} />}
                  styles={{
                    label: { fontWeight: 500, marginBottom: '8px' },
                    input: {
                      borderRadius: '8px',
                      '&:focus': {
                        borderColor: '#4dabf7',
                      },
                    },
                  }}
                />

                <PasswordInput
                  label="Password"
                  placeholder="Minimum 8 characters"
                  value={form.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  error={errors.password}
                  required
                  disabled={submitting}
                  size="md"
                  description="Must be at least 8 characters long"
                  styles={{
                    label: { fontWeight: 500, marginBottom: '8px' },
                    input: {
                      borderRadius: '8px',
                      '&:focus': {
                        borderColor: '#4dabf7',
                      },
                    },
                    description: {
                      fontSize: '13px',
                      marginTop: '4px',
                    },
                  }}
                />
              </Stack>
            </Box>

            <Group
              justify="flex-end"
              mt="xl"
              pt="lg"
              wrap="nowrap"
              style={{ borderTop: '1px solid #e9ecef' }}
            >
              <Button
                variant="light"
                color="gray"
                onClick={handleModalClose}
                disabled={submitting}
                size="sm"
                radius="md"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                loading={submitting}
                leftSection={<IconPlus size={18} />}
                size="md"
                radius="md"
                style={{
                  background:
                    'linear-gradient(135deg, #4dabf7 0%, #339af0 100%)',
                }}
              >
                Create Recruiter
              </Button>
            </Group>
          </Stack>
        </Modal>
      </Container>
    </Box>
  );
};

export default RecruiterDashboard;
