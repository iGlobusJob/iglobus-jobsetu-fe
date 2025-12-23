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
  IconMapPin,
  IconPhone,
  IconSearch,
} from '@tabler/icons-react';
import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import type { CandidateProfile } from '@/features/dashboard/types/candidate';
import { getAllCandidatesByAdmin } from '@/services/admin-services';

import CandidateDetailsDrawer from './CandidateDetails';

const PAGE_SIZE = 10;

const CandidateDashboard: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [candidates, setCandidates] = useState<CandidateProfile[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] =
    useState<CandidateProfile | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAllCandidatesByAdmin();
        setCandidates(data);
      } catch (err) {
        toast.error(
          err instanceof Error
            ? err.message
            : 'Failed to fetch candidate details'
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const openDetails = (candidate: CandidateProfile) => {
    setSelectedCandidate(candidate);
    setDrawerOpen(true);
  };
  const formatDate = (date: string) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = d.toLocaleString('en-US', { month: 'short' });
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return candidates.filter((c) => {
      if (!query) return true;

      return (
        c.firstName.toLowerCase().includes(query) ||
        c.lastName.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query) ||
        c.mobileNumber.includes(query)
      );
    });
  }, [candidates, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = useMemo(() => {
    const start = (activePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, activePage]);

  // MOBILE CARD VIEW
  const MobileCandidateCard = ({ c }: { c: CandidateProfile }) => (
    <Card
      radius="lg"
      withBorder
      shadow="sm"
      mb="md"
      p="md"
      onClick={() => openDetails(c)}
      style={{ cursor: 'pointer' }}
    >
      <Stack gap={10}>
        <Group justify="space-between" align="center">
          <Group>
            <Avatar size={50} radius="xl" src={c.profilePicture || undefined}>
              {(c.firstName?.[0] || '?').toUpperCase()}
              {(c.lastName?.[0] || '').toUpperCase()}
            </Avatar>

            <Stack gap={2}>
              <Group gap={6} wrap="nowrap">
                <Text fw={700} size="sm" tt="capitalize" lineClamp={1}>
                  {c.firstName} {c.lastName}
                </Text>

                {c.category && (
                  <Badge size="xs" variant="light" radius="sm">
                    {c.category}
                  </Badge>
                )}
              </Group>

              <Text size="xs" c="dimmed" lineClamp={1}>
                {c.address}
              </Text>
            </Stack>
          </Group>
        </Group>

        <Group gap={6}>
          <IconMail size={16} color="#1c7ed6" />
          <Text size="xs">{c.email}</Text>
        </Group>

        <Group gap={6}>
          <IconPhone size={16} color="#e03131" />
          <Text size="xs">{c.mobileNumber}</Text>
        </Group>

        <Group gap={6}>
          <IconCalendar size={16} color="#5c7cfa" />
          <Text size="xs">
            <strong>DOB:</strong> {formatDate(c.dateOfBirth)}
          </Text>
        </Group>

        <Group gap={6}>
          <IconCalendarCheck size={16} color="#228be6" />
          <Text size="xs">
            <strong>Joined On:</strong> {formatDate(c.createdAt)}
          </Text>
        </Group>

        <Button
          size="xs"
          variant="light"
          fullWidth
          onClick={(e) => {
            e.stopPropagation();
            openDetails(c);
          }}
        >
          View Details
        </Button>
      </Stack>
    </Card>
  );

  return (
    <Box style={{ minHeight: '100vh', width: '100%', padding: '1rem' }}>
      <Container size="xl" px={0}>
        <Stack mb="md" gap={4}>
          <Title order={isMobile ? 4 : 2} fw={700}>
            Candidate Directory
          </Title>

          <Text size="sm" color="dimmed">
            Explore candidate profiles, verify details and oversee application
            activity.
          </Text>
        </Stack>

        <Card
          radius="lg"
          shadow="md"
          withBorder
          mb="md"
          style={{ padding: 12 }}
        >
          <TextInput
            placeholder="Search by candidate name, email, phone"
            value={search}
            onChange={(e) => {
              setSearch(e.currentTarget.value);
              setActivePage(1);
            }}
            leftSection={<IconSearch size={18} />}
            size="md"
            radius="lg"
            style={{ width: '100%' }}
          />
        </Card>

        {isMobile ? (
          <Stack>
            {pageItems.length === 0 ? (
              <Center py={20}>
                <Text color="dimmed">No candidates found.</Text>
              </Center>
            ) : (
              pageItems.map((c) => <MobileCandidateCard key={c.id} c={c} />)
            )}
          </Stack>
        ) : (
          <Card radius="lg" shadow="md" withBorder p="lg">
            <LoadingOverlay visible={loading} />
            {pageItems.length === 0 ? (
              <Center py={40}>
                <Text color="dimmed">No candidates found.</Text>
              </Center>
            ) : (
              <Stack gap="lg">
                {pageItems.map((c) => (
                  <Card
                    key={c.id}
                    radius="lg"
                    withBorder
                    p="lg"
                    style={{
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.01)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    onClick={() => openDetails(c)}
                  >
                    <Group
                      justify="space-between"
                      align="flex-start"
                      wrap="nowrap"
                    >
                      <Group gap="md" style={{ flex: 1 }}>
                        <Group align="center">
                          <Avatar
                            size={60}
                            radius="xl"
                            src={c.profilePicture || undefined}
                          >
                            {(c.firstName?.[0] || '?').toUpperCase()}
                            {(c.lastName?.[0] || '').toUpperCase()}
                          </Avatar>
                        </Group>

                        <Stack gap={6}>
                          <Group gap="xs" align="center">
                            <Text fw={700} size="lg" tt="capitalize">
                              {c.firstName} {c.lastName}
                            </Text>

                            {c.category && (
                              <Badge variant="light" color="blue" radius="sm">
                                {c.category}
                              </Badge>
                            )}
                          </Group>

                          <Group gap={6}>
                            <IconMail size={16} stroke={1.5} color="#1c7ed6" />
                            <Text size="sm">{c.email}</Text>
                          </Group>
                          <Group gap={6}>
                            <IconPhone size={16} stroke={1.5} color="#e03131" />
                            <Text size="sm">{c.mobileNumber}</Text>
                          </Group>
                        </Stack>
                      </Group>

                      <Stack gap={6} style={{ flex: 1 }}>
                        <Group align="center" gap={6} wrap="nowrap">
                          <IconCalendar
                            size={16}
                            stroke={1.5}
                            color="#5c7cfa"
                          />
                          <Text fw={600} miw={100} size="sm">
                            DOB
                          </Text>
                          <Text size="sm">
                            {c.dateOfBirth ? formatDate(c.dateOfBirth) : '—'}
                          </Text>
                        </Group>

                        <Group align="center" gap={6} wrap="nowrap">
                          <IconMapPin size={16} stroke={1.5} color="#2f9e44" />
                          <Text fw={600} miw={100} size="sm">
                            Address
                          </Text>
                          <Text size="sm">{c.address || '—'}</Text>
                        </Group>

                        <Group align="center" gap={6} wrap="nowrap">
                          <IconCalendarCheck
                            size={16}
                            stroke={1.5}
                            color="#228be6"
                          />
                          <Text fw={600} miw={100} size="sm">
                            Joined On
                          </Text>
                          <Text size="sm">
                            {c.createdAt ? formatDate(c.createdAt) : '—'}
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

        <CandidateDetailsDrawer
          opened={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          candidate={selectedCandidate}
        />
      </Container>
    </Box>
  );
};

export default CandidateDashboard;
