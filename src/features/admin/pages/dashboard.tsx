import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Center,
  Container,
  Group,
  LoadingOverlay,
  Pagination,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconArrowRight,
  IconCalendar,
  IconCalendarCheck,
  IconMail,
  IconPhone,
  IconSearch,
} from '@tabler/icons-react';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import type { Client } from '@/features/dashboard/types/client';
import { ADMIN_PATHS } from '@/routes/config/adminPath';
import { RECRUITER_PATHS } from '@/routes/config/recruiterPath';
import { getAllClients, updateClientByAdmin } from '@/services/admin-services';
import { useAuthStore } from '@/store/userDetails';

const PAGE_SIZE = 10;

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { userRole } = useAuthStore();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'registered' | 'active' | 'inactive'
  >('all');
  const [activePage, setActivePage] = useState(1);
  const [sortFilter, setSortFilter] = useState<
    'none' | 'asc' | 'desc' | 'newest' | 'oldest'
  >('none');

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        const data = await getAllClients();
        setClients(data);
      } catch {
        toast.error('Failed to fetch clients');
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  const openDetails = (client: Client) => {
    if (userRole === 'admin') {
      navigate(ADMIN_PATHS.CLIENT_DETAILS(client.id));
    } else if (userRole === 'recruiter') {
      navigate(RECRUITER_PATHS.CLIENT_DETAILS(client.id));
    }
  };

  const filtered = useMemo(() => {
    let result = clients.filter((vend) => {
      if (statusFilter !== 'all' && vend.status !== statusFilter) return false;
      if (search.trim()) {
        const query = search.toLowerCase();
        return (
          vend.organizationName.toLowerCase().includes(query) ||
          vend.email.toLowerCase().includes(query) ||
          vend.mobile.includes(query)
        );
      }

      return true;
    });

    if (sortFilter === 'asc') {
      result = [...result].sort((a, b) =>
        a.organizationName.localeCompare(b.organizationName)
      );
    }
    if (sortFilter === 'desc') {
      result = [...result].sort((a, b) =>
        b.organizationName.localeCompare(a.organizationName)
      );
    }

    if (sortFilter === 'newest') {
      result = [...result].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    if (sortFilter === 'oldest') {
      result = [...result].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }

    return result;
  }, [clients, search, statusFilter, sortFilter]);

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

  const handleStatusChange = async (id: string, status: Client['status']) => {
    try {
      setLoading(true);

      const client = clients.find((v) => v.id === id);
      if (!client) return;

      const payload = {
        clientId: id,
        status,
        organizationName: client.organizationName,
        logo: client.logo,
        mobile: client.mobile,
        location: client.location,
        gstin: client.gstin,
        panCard: client.panCard,
        primaryContact: {
          firstName: client.primaryContact?.firstName,
          lastName: client.primaryContact?.lastName,
        },
        secondaryContact: {
          firstName: client.secondaryContact?.firstName,
          lastName: client.secondaryContact?.lastName,
        },
      };

      const response = await updateClientByAdmin(payload);

      setClients((prev) => prev.map((v) => (v.id === id ? response : v)));

      toast.success(response.message || 'Client updated successfully !');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update');
    } finally {
      setLoading(false);
    }
  };

  // MOBILE CARD COMPONENT
  const MobileClientCard = ({ v }: { v: Client }) => (
    <Card
      radius="lg"
      withBorder
      shadow="sm"
      mb="md"
      p="md"
      onClick={() => openDetails(v)}
      style={{ cursor: 'pointer' }}
    >
      <Stack gap={10}>
        <Group justify="space-between" align="center">
          <Group>
            <Avatar size={50} radius="xl" src={v.logo || undefined}>
              {(v.organizationName?.[0] || '?').toUpperCase()}
            </Avatar>

            <Stack gap={2}>
              <Text fw={700} size="sm">
                {v.organizationName}
              </Text>
              <Text size="xs" color="dimmed">
                {v.location}
              </Text>
            </Stack>
          </Group>

          <Badge
            color={
              v.status === 'registered'
                ? 'blue'
                : v.status === 'active'
                  ? 'green'
                  : 'red'
            }
          >
            {v.status.toUpperCase()}
          </Badge>
        </Group>

        <Group gap={6}>
          <IconMail size={16} color="#1c7ed6" />
          <Text size="xs">{v.email}</Text>
        </Group>

        <Group gap={6}>
          <IconPhone size={16} color="#e03131" />
          <Text size="xs">{v.mobile}</Text>
        </Group>

        {/* Dates */}
        <Group gap={6}>
          <IconCalendar size={16} color="#5c7cfa" />
          <Text size="xs">
            <strong>Joined On :</strong> {formatDate(v.createdAt)}
          </Text>
        </Group>

        <Group gap={6}>
          <IconCalendarCheck size={16} color="#e8590c" />
          <Text size="xs">
            <strong>Updated At :</strong>{' '}
            {v.updatedAt ? formatDate(v.updatedAt) : '—'}
          </Text>
        </Group>

        <Group gap={6}>
          <IconCalendar size={16} color="#e8590c" />
          <Text size="xs">
            <strong>Category :</strong> <Badge>{v.category || '—'}</Badge>
          </Text>
        </Group>

        {/* BUTTON */}
        {v.status === 'registered' ? (
          <Button
            size="xs"
            variant="light"
            color="green"
            fullWidth
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange(v.id, 'active');
            }}
          >
            Approve
          </Button>
        ) : (
          <Button
            size="xs"
            variant="light"
            fullWidth
            rightSection={<IconArrowRight size={14} />}
            onClick={(e) => {
              e.stopPropagation();
              openDetails(v);
            }}
          >
            Update
          </Button>
        )}
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
        <Stack mb="md" gap={4}>
          <Title order={isMobile ? 4 : 2} fw={700}>
            Client Directory
          </Title>

          <Text size="sm" color="dimmed">
            Manage client registrations, review profiles and control access
            efficiently.
          </Text>
        </Stack>
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
                placeholder="Search by organization, email or phone"
                value={search}
                onChange={(e) => {
                  setSearch(e.currentTarget.value);
                  setActivePage(1);
                }}
                size={isMobile ? 'sm' : 'md'}
                leftSection={<IconSearch size={18} />}
              />
            </Box>
            <Group
              gap="sm"
              style={{
                width: isMobile ? '100%' : 'auto',
                justifyContent: isMobile ? 'center' : 'flex-end',
              }}
            >
              {/* STATUS FILTER */}
              <Select
                data={[
                  { value: 'all', label: 'All' },
                  { value: 'registered', label: 'Registered' },
                  { value: 'active', label: 'Active' },
                  { value: 'inactive', label: 'Inactive' },
                ]}
                value={statusFilter}
                onChange={(val) => {
                  setStatusFilter(
                    (val as 'all' | 'registered' | 'active' | 'inactive') ??
                      'all'
                  );
                  setActivePage(1);
                }}
                placeholder="Status"
                size={isMobile ? 'sm' : 'md'}
                style={{ width: isMobile ? '100%' : 180 }}
              />

              {/* SORT BY (asc & dec) */}
              <Select
                data={[
                  { value: 'none', label: 'Default' },
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
                <Text color="dimmed">No clients found.</Text>
              </Center>
            ) : (
              pageItems.map((v) => <MobileClientCard key={v.id} v={v} />)
            )}
          </Stack>
        ) : (
          <Card radius="lg" shadow="md" withBorder p="lg">
            <LoadingOverlay visible={loading} />

            {pageItems.length === 0 ? (
              <Center py={40}>
                <Text color="dimmed">No clients found.</Text>
              </Center>
            ) : (
              <Stack gap="lg">
                {pageItems.map((v) => (
                  <Card
                    key={v.id}
                    radius="lg"
                    withBorder
                    p="lg"
                    style={{
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = 'scale(1.01)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = 'scale(1)')
                    }
                    onClick={() => openDetails(v)}
                  >
                    <Group
                      wrap="nowrap"
                      align="center"
                      style={{ width: '100%' }}
                    >
                      <Group gap="md" style={{ flex: 1 }}>
                        <Group align="center">
                          <Avatar
                            size={60}
                            radius="xl"
                            src={v.logo || undefined}
                          >
                            {(v.organizationName?.[0] || '?').toUpperCase()}
                          </Avatar>
                        </Group>

                        <Stack gap={6}>
                          <Text fw={700} size="lg">
                            {v.organizationName}
                          </Text>

                          <Group gap={6}>
                            <IconMail size={16} color="#1c7ed6" />
                            <Text size="sm">{v.email}</Text>
                          </Group>

                          <Group gap={6}>
                            <IconPhone size={16} color="#e03131" />
                            <Text size="sm">{v.mobile}</Text>
                          </Group>
                        </Stack>
                      </Group>

                      <Group justify="center" style={{ width: 130 }}>
                        <Badge
                          color={
                            v.status === 'registered'
                              ? 'blue'
                              : v.status === 'active'
                                ? 'green'
                                : 'red'
                          }
                        >
                          {v.status.toUpperCase()}
                        </Badge>
                      </Group>

                      <Group justify="center" style={{ width: 120 }}>
                        <Badge variant="filled">{v.category || '—'}</Badge>
                      </Group>

                      <Stack
                        gap={6}
                        style={{ flex: 1, alignItems: 'flex-end' }}
                      >
                        <Group align="center" gap={6} wrap="nowrap">
                          <IconCalendar size={16} color="#5c7cfa" />
                          <Text fw={600} miw={110} size="sm">
                            Joined On
                          </Text>
                          <Text size="sm">{formatDate(v.createdAt)}</Text>
                        </Group>

                        <Group align="center" gap={6} wrap="nowrap">
                          <IconCalendar size={16} color="#e8590c" />
                          <Text fw={600} miw={110} size="sm">
                            Updated At
                          </Text>
                          <Text size="sm">
                            {v.updatedAt ? formatDate(v.updatedAt) : '—'}
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
      </Container>
    </Box>
  );
};

export default AdminDashboard;
