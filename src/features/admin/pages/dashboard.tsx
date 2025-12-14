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
} from '@tabler/icons-react';
import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import type { Vendor } from '@/features/dashboard/types/vendor';
import { getAllClients, updateClientByAdmin } from '@/services/admin-services';

import VendorDetailsDrawer from './VendorDetailsDrawer';

const PAGE_SIZE = 10;

const AdminDashboard: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'registered' | 'active' | 'inactive'
  >('all');
  const [activePage, setActivePage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [sortFilter, setSortFilter] = useState<
    'asc' | 'desc' | 'newest' | 'oldest'
  >('asc');

  useEffect(() => {
    const fetchVendors = async () => {
      setLoading(true);
      try {
        const data = await getAllClients();
        setVendors(data);
      } catch {
        toast.error('Failed to fetch clients');
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  const openDetails = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setDrawerOpen(true);
  };

  const filtered = useMemo(() => {
    return vendors
      .filter((vend) => {
        if (statusFilter !== 'all' && vend.status !== statusFilter)
          return false;
        if (search.trim()) {
          const query = search.toLowerCase();
          return (
            vend.organizationName.toLowerCase().includes(query) ||
            vend.email.toLowerCase().includes(query) ||
            vend.mobile.includes(query)
          );
        }

        return true;
      })
      .sort((a, b) => {
        const nameA = a.organizationName.toLowerCase();
        const nameB = b.organizationName.toLowerCase();

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
  }, [vendors, search, statusFilter, sortFilter]);

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

  const handleUpdateVendor = (updated: Vendor) => {
    setVendors((prev) => prev.map((v) => (v.id === updated.id ? updated : v)));
  };

  const handleStatusChange = async (id: string, status: Vendor['status']) => {
    try {
      setLoading(true);

      const vendor = vendors.find((v) => v.id === id);
      if (!vendor) return;

      const payload = {
        vendorId: id,
        status,
        organizationName: vendor.organizationName,
        logo: vendor.logo,
        mobile: vendor.mobile,
        location: vendor.location,
        gstin: vendor.gstin,
        panCard: vendor.panCard,
        primaryContact: {
          firstName: vendor.primaryContact?.firstName,
          lastName: vendor.primaryContact?.lastName,
        },
        secondaryContact: {
          firstName: vendor.secondaryContact?.firstName,
          lastName: vendor.secondaryContact?.lastName,
        },
      };

      const response = await updateClientByAdmin(payload);

      setVendors((prev) => prev.map((v) => (v.id === id ? response : v)));

      toast.success(response.message || 'Client updated successfully !');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update');
    } finally {
      setLoading(false);
    }
  };

  // MOBILE CARD COMPONENT
  const MobileVendorCard = ({ v }: { v: Vendor }) => (
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
              pageItems.map((v) => <MobileVendorCard key={v.id} v={v} />)
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

        {/* DRAWER */}
        <VendorDetailsDrawer
          opened={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          vendor={selectedVendor}
          onUpdate={handleUpdateVendor}
          onStatusChange={handleStatusChange}
        />
      </Container>
    </Box>
  );
};

export default AdminDashboard;
