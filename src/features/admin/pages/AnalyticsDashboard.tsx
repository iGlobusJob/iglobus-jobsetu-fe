import {
    Box,
    Card,
    Container,
    Grid,
    Group,
    LoadingOverlay,
    Stack,
    Text,
    Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
    IconBriefcase,
    IconBuilding,
    IconChartBar,
    IconUsers,
} from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {
    getAllCandidatesByAdmin,
    getAllClients,
    getAllJobsByAdmin,
    getAllRecruiters,
} from '@/services/admin-services';

const AnalyticsDashboard: React.FC = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isTablet = useMediaQuery('(max-width: 1024px)');

    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState([
        {
            title: 'Total Clients',
            value: '0',
            icon: <IconBuilding size={32} />,
            color: '#4dabf7',
        },
        {
            title: 'Total Jobs',
            value: '0',
            icon: <IconBriefcase size={32} />,
            color: '#ff9472',
        },
        {
            title: 'Total Candidates',
            value: '0',
            icon: <IconUsers size={32} />,
            color: '#66bb6a',
        },
        {
            title: 'Total Recruiters',
            value: '0',
            icon: <IconUsers size={32} />,
            color: '#ffca5d',
        },
    ]);

    useEffect(() => {
        const fetchAnalytics = async () => {
            setLoading(true);
            try {
                const [clients, candidates, recruiters, jobs] = await Promise.all([
                    getAllClients(),
                    getAllCandidatesByAdmin(),
                    getAllRecruiters(),
                    getAllJobsByAdmin(),
                ]);

                setStats([
                    {
                        title: 'Total Clients',
                        value: clients?.length.toString() || '0',
                        icon: <IconBuilding size={32} />,
                        color: '#4dabf7',
                    },
                    {
                        title: 'Total Jobs',
                        value: jobs?.length.toString() || '0',
                        icon: <IconBriefcase size={32} />,
                        color: '#ff9472',
                    },
                    {
                        title: 'Total Candidates',
                        value: candidates?.length.toString() || '0',
                        icon: <IconUsers size={32} />,
                        color: '#66bb6a',
                    },
                    {
                        title: 'Total Recruiters',
                        value: recruiters?.length.toString() || '0',
                        icon: <IconUsers size={32} />,
                        color: '#ffca5d',
                    },
                ]);
            } catch (error) {
                toast.error('Failed to fetch analytics data');
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

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
                <Stack gap="xl">
                    <Stack gap={4}>
                        <Title order={isMobile ? 4 : 2} fw={700}>
                            Dashboard
                        </Title>
                        <Text size="sm" color="dimmed">
                            Overview of your admin analytics and statistics
                        </Text>
                    </Stack>

                    {/* Statistics Cards */}
                    <Grid gutter="md">
                        {stats.map((stat, index) => (
                            <Grid.Col key={index} span={{ base: 12, xs: 6, sm: 6, md: 3 }}>
                                <Card
                                    shadow="sm"
                                    padding="lg"
                                    radius="md"
                                    withBorder
                                    style={{
                                        height: '100%',
                                        background: `linear-gradient(135deg, ${stat.color}08 0%, ${stat.color}15 100%)`,
                                        borderLeft: `4px solid ${stat.color}`,
                                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                        cursor: 'pointer',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '';
                                    }}
                                >
                                    <Stack gap="sm">
                                        <Group justify="space-between" align="flex-start">
                                            <Box
                                                style={{
                                                    padding: '12px',
                                                    borderRadius: '12px',
                                                    backgroundColor: `${stat.color}20`,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                {React.cloneElement(stat.icon, {
                                                    size: 28,
                                                    color: stat.color,
                                                    strokeWidth: 2,
                                                })}
                                            </Box>
                                        </Group>
                                        <Stack gap={4}>
                                            <Text size="sm" fw={500} c="dimmed" tt="uppercase" lts={0.5}>
                                                {stat.title}
                                            </Text>
                                            <Text size="32px" fw={700} style={{ color: stat.color }}>
                                                {stat.value}
                                            </Text>
                                        </Stack>
                                    </Stack>
                                </Card>
                            </Grid.Col>
                        ))}
                    </Grid>

                    {/* Detailed Analytics Chart */}
                    <Card shadow="sm" padding="xl" radius="md" withBorder>
                        <Stack gap="xl">
                            <Group justify="space-between" align="center">
                                <Group gap="sm">
                                    <IconChartBar size={24} />
                                    <Title order={4}>Distribution Analytics</Title>
                                </Group>
                                <Text size="sm" c="dimmed">
                                    Total: {stats.reduce((acc, s) => acc + parseInt(s.value || '0'), 0)}
                                </Text>
                            </Group>

                            <Box style={{ position: 'relative', minHeight: 400 }}>
                                <LoadingOverlay visible={loading} />
                                {!loading && (
                                    <Stack gap="xl">
                                        {/* Horizontal Bar Chart */}
                                        {stats.map((stat, index) => {
                                            const total = stats.reduce(
                                                (acc, s) => acc + parseInt(s.value || '0'),
                                                0
                                            );
                                            const percentage =
                                                total > 0
                                                    ? ((parseInt(stat.value || '0') / total) * 100).toFixed(
                                                        1
                                                    )
                                                    : '0';

                                            return (
                                                <Box key={index}>
                                                    <Group justify="space-between" mb="xs">
                                                        <Group gap="sm">
                                                            {React.cloneElement(stat.icon, {
                                                                size: 18,
                                                                color: stat.color,
                                                            })}
                                                            <Text size="sm" fw={600}>
                                                                {stat.title}
                                                            </Text>
                                                        </Group>
                                                        <Group gap="lg">
                                                            <Text size="sm" fw={700} c={stat.color}>
                                                                {stat.value}
                                                            </Text>
                                                            <Text
                                                                size="sm"
                                                                fw={600}
                                                                c="dimmed"
                                                                style={{ minWidth: '50px', textAlign: 'right' }}
                                                            >
                                                                {percentage}%
                                                            </Text>
                                                        </Group>
                                                    </Group>
                                                    <Box
                                                        style={{
                                                            width: '100%',
                                                            height: '32px',
                                                            backgroundColor: '#f1f3f5',
                                                            borderRadius: '8px',
                                                            overflow: 'hidden',
                                                            position: 'relative',
                                                        }}
                                                    >
                                                        <Box
                                                            style={{
                                                                width: `${percentage}%`,
                                                                height: '100%',
                                                                background: `linear-gradient(90deg, ${stat.color} 0%, ${stat.color}dd 100%)`,
                                                                borderRadius: '8px',
                                                                transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'flex-end',
                                                                paddingRight: '12px',
                                                                position: 'relative',
                                                                boxShadow: `0 2px 8px ${stat.color}40`,
                                                            }}
                                                        >
                                                            {parseInt(percentage) > 8 && (
                                                                <Text size="xs" fw={700} c="white">
                                                                    {stat.value}
                                                                </Text>
                                                            )}
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            );
                                        })}
                                    </Stack>
                                )}
                            </Box>
                        </Stack>
                    </Card>

                    {/* Additional placeholder cards */}
                    <Grid gutter="md">
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Card shadow="sm" padding="lg" radius="md" withBorder>
                                <Title order={5} mb="md">
                                    Recent Activity
                                </Title>
                                <Box
                                    style={{
                                        minHeight: 200,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#f8f9fa',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <Text color="dimmed">Activity feed coming soon</Text>
                                </Box>
                            </Card>
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Card shadow="sm" padding="lg" radius="md" withBorder>
                                <Title order={5} mb="md">
                                    Quick Actions
                                </Title>
                                <Box
                                    style={{
                                        minHeight: 200,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#f8f9fa',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <Text color="dimmed">Quick actions coming soon</Text>
                                </Box>
                            </Card>
                        </Grid.Col>
                    </Grid>
                </Stack>
            </Container>
        </Box>
    );
};

export default AnalyticsDashboard;
