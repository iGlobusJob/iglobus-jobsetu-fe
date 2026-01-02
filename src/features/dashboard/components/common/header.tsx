import {
  ActionIcon,
  Anchor,
  Avatar,
  Box,
  Burger,
  Button,
  Collapse,
  Container,
  Divider,
  Drawer,
  Flex,
  Image,
  Menu,
  Paper,
  Stack,
  Text,
  UnstyledButton,
  useComputedColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconChevronDown,
  IconChevronRight,
  IconMail,
  IconX,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useOtpModalStore } from '@/store/otpModalStore';
import { useAuthStore } from '@/store/userDetails';
import { logoutClient } from '@services/client-services';

export function Header() {
  const colorScheme = useComputedColorScheme();
  const [
    mobileMenuOpened,
    { toggle: toggleMobileMenu, close: closeMobileMenu },
  ] = useDisclosure(false);
  const openModal = useOtpModalStore((state) => state.openModal);

  // Mobile submenu states
  const [homeOpen, setHomeOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [candidatesOpen, setCandidatesOpen] = useState(false);
  const [employerOpen, setEmployerOpen] = useState(false);
  //const [jobsOpen, setJobsOpen] = useState(false);

  const isLoggedIn = useAuthStore((s) => s.isLoggedIn());
  const firstName = useAuthStore((s) => s.firstName);
  const lastName = useAuthStore((s) => s.lastName);
  const role = useAuthStore((s) => s.userRole);
  const { token } = useAuthStore();
  const location = useLocation();
  const path = location.pathname;
  const isCandidateUser = isLoggedIn && role === 'candidate';
  const isClientUser = isLoggedIn && role === 'client';
  const isEmployerGuest = !isLoggedIn;
  const showEmployerMenu = isEmployerGuest || isClientUser;
  return (
    <Paper shadow="md">
      {/* Top Bar - Hidden on Mobile */}
      {!['/client/login', '/client/register', '/recruiter'].includes(path) && (
        <Box
          visibleFrom="md"
          style={{
            borderBottom:
              colorScheme === 'dark'
                ? '1px solid #2c2c2c'
                : '1px solid #e9ecef',
          }}
        >
          <Container size="xl" py="xs">
            <Flex justify="space-between" align="center" wrap="wrap" gap="md">
              {/* Left Side - Location & Social */}
              <Flex align="center" justify="center" gap="md" wrap="wrap">
                <Flex gap="sm">
                  <ActionIcon
                    variant="light"
                    radius="xl"
                    size="lg"
                    component="a"
                    href="https://www.linkedin.com/company/iglobus-jobsetu"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    style={{
                      color: '#0A66C2',
                    }}
                  >
                    <IconBrandLinkedin size={18} />
                  </ActionIcon>
                  <ActionIcon
                    variant="light"
                    radius="xl"
                    size="lg"
                    component="a"
                    href="https://www.instagram.com/iglobusjobsetu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    style={{
                      color: '#E1306C',
                    }}
                  >
                    <IconBrandInstagram size={18} />
                  </ActionIcon>
                  <ActionIcon
                    component="a"
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=iglobusjobsetu@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="light"
                    radius="xl"
                    size="lg"
                    aria-label="Email"
                    style={{
                      color: '#495057',
                    }}
                  >
                    <IconMail size={18} />
                  </ActionIcon>
                  <ActionIcon
                    variant="light"
                    radius="xl"
                    size="lg"
                    component="a"
                    href="https://x.com/iglobusjobsetu"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X"
                    style={{
                      color: '#000000',
                    }}
                  >
                    <IconX size={18} stroke={2.8} />
                  </ActionIcon>
                </Flex>
              </Flex>

              {/* Right Side - Sign Up & Language */}
              {!token && (
                <Menu trigger="hover" position="bottom">
                  <Menu.Target>
                    <Button
                      variant="subtle"
                      radius="xl"
                      fw={600}
                      style={{
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.12)',
                        color: colorScheme === 'dark' ? '#fff' : '#333',
                        borderColor: 'blue',
                      }}
                      onClick={() => openModal()}
                    >
                      Join as Candidate
                    </Button>
                  </Menu.Target>
                </Menu>
              )}
            </Flex>
          </Container>
        </Box>
      )}
      {/* Main Navigation */}
      <header>
        <Container py="md" size="xl">
          <Flex justify="space-between" align="center">
            {/* Logo */}
            <Anchor href="/" style={{ textDecoration: 'none' }}>
              <Image
                src={
                  colorScheme === 'dark'
                    ? '/auth/jobsetudark.png'
                    : '/auth/jobsetulight.png'
                }
                alt="JobSetu Logo"
                width={50}
                height={50}
                radius="md"
              />
            </Anchor>

            {/* Desktop Navigation */}
            <Flex gap="xl" align="center" visibleFrom="md">
              {/* Home Dropdown */}
              <Menu trigger="hover" position="bottom">
                <Menu.Target>
                  <UnstyledButton>
                    <Flex align="center" gap={5}>
                      <Text component="a" href="/" fw={500}>
                        Home
                      </Text>
                      <IconChevronDown size={14} />
                    </Flex>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item component="a" href="/aboutus">
                    About Us
                  </Menu.Item>
                  <Menu.Item component="a" href="/services">
                    Services
                  </Menu.Item>
                  {!isLoggedIn && (
                    <>
                      <Menu.Item component="a" href="/recruiter">
                        Recruiter
                      </Menu.Item>
                      <Menu.Item component="a" href="/client/login">
                        Client
                      </Menu.Item>
                      {![
                        '/recruiter',
                        '/client/login',
                        '/client/register',
                      ].includes(path) && (
                        <Menu.Item onClick={() => openModal()}>
                          Candidate
                        </Menu.Item>
                      )}
                    </>
                  )}
                </Menu.Dropdown>
              </Menu>

              {/* Company Dropdown */}
              <Menu trigger="hover" position="bottom">
                <Menu.Target>
                  <UnstyledButton>
                    <Flex align="center" gap={5}>
                      <Text fw={500}>Company</Text>
                      <IconChevronDown size={14} />
                    </Flex>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item component="a" href="/#categories">
                    Job Categories
                  </Menu.Item>
                  <Menu.Item component="a" href="/#testimonials">
                    Testimonials
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>

              {/* Candidates Dropdown */}
              <Menu trigger="hover" position="bottom">
                <Menu.Target>
                  <UnstyledButton>
                    <Flex align="center" gap={5}>
                      <Text fw={500}>Candidates</Text>
                      <IconChevronDown size={14} />
                    </Flex>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  {!isLoggedIn && (
                    <Menu.Item component="a" href="/#browse-jobs">
                      Browse Jobs
                    </Menu.Item>
                  )}
                  {isCandidateUser ? (
                    <Menu.Item component="a" href="/candidate/saved-jobs">
                      Saved Jobs
                    </Menu.Item>
                  ) : (
                    <Menu.Item onClick={() => openModal()}>
                      Saved Jobs
                    </Menu.Item>
                  )}
                  {isCandidateUser ? (
                    <Menu.Item component="a" href="/candidate/profile">
                      Candidate Profile
                    </Menu.Item>
                  ) : (
                    <Menu.Item onClick={() => openModal()}>
                      Candidate Profile
                    </Menu.Item>
                  )}
                  {isCandidateUser ? (
                    <Menu.Item component="a" href="/candidate/profile">
                      Upload Resume
                    </Menu.Item>
                  ) : (
                    <Menu.Item onClick={() => openModal()}>
                      Upload Resume
                    </Menu.Item>
                  )}
                </Menu.Dropdown>
              </Menu>

              {/* Employers Dropdown */}
              {showEmployerMenu && (
                <Menu trigger="hover" position="bottom">
                  <Menu.Target>
                    <UnstyledButton>
                      <Flex align="center" gap={5}>
                        <Text fw={500}>Employers</Text>
                        <IconChevronDown size={14} />
                      </Flex>
                    </UnstyledButton>
                  </Menu.Target>
                  <Menu.Dropdown>
                    {isEmployerGuest && (
                      <>
                        <Menu.Item component="a" href="/client/login">
                          Login
                        </Menu.Item>
                        <Menu.Item component="a" href="/client/register">
                          Register
                        </Menu.Item>
                        <Menu.Item component="a" href="/client/login">
                          Post a Job
                        </Menu.Item>
                        <Menu.Item component="a" href="/client/login">
                          Manage Jobs
                        </Menu.Item>
                        <Menu.Item component="a" href="/client/login">
                          Employer Dashboard
                        </Menu.Item>
                      </>
                    )}
                    {isClientUser && (
                      <>
                        <Menu.Item component="a" href="/client/jobs/new">
                          Post a Job
                        </Menu.Item>
                        <Menu.Item
                          component="a"
                          href="/client/jobs/manage-jobs"
                        >
                          Manage Jobs
                        </Menu.Item>
                        <Menu.Item component="a" href="/client/dashboard">
                          Employer Dashboard
                        </Menu.Item>
                      </>
                    )}
                  </Menu.Dropdown>
                </Menu>
              )}

              {/* Contact Link */}
              <Anchor
                href="/#contact"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Text fw={500}>Contact</Text>
              </Anchor>
            </Flex>

            {/* Right Side - Notifications & User */}

            <Flex align="center" gap="sm">
              {/* Notifications - Desktop Only */}
              {/* {isLoggedIn && (
                <Box visibleFrom="sm">
                  <Menu position="bottom-end" width={320} shadow="md">
                    <Menu.Target>
                      <ActionIcon
                        variant="subtle"
                        color="gray"
                        size="lg"
                        aria-label="Notifications"
                      >
                        <Indicator
                          color="red"
                          label="3"
                          size={18}
                          offset={5}
                          position="top-end"
                          withBorder
                        >
                          <IconBell size={22} />
                        </Indicator>
                      </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown p={0}>
                      <Box p="md">
                        <Text fw={600} size="sm">
                          Notification
                        </Text>
                        <Text size="xs" c="dimmed">
                          You have 4 unread notifications
                        </Text>
                      </Box>
                      <Stack gap={0} mah={300} style={{ overflowY: 'auto' }}>
                        {notifications.map((notif) => (
                          <Box
                            key={notif.id}
                            p="md"
                            style={{
                              borderBottom:
                                colorScheme === 'dark'
                                  ? '1px solid #2c2c2c'
                                  : '1px solid #e9ecef',
                              backgroundColor: notif.active
                                ? colorScheme === 'dark'
                                  ? '#1a2634'
                                  : '#f0f7ff'
                                : 'transparent',
                              cursor: 'pointer',
                            }}
                          >
                            <Flex gap="md">
                              {notif.icon === 'check' ? (
                                <Avatar color="blue" radius="xl">
                                  <IconCheck size={18} />
                                </Avatar>
                              ) : (
                                <Avatar src={notif.avatar} radius="xl" />
                              )}
                              <Box style={{ flex: 1 }}>
                                <Text size="sm" fw={500}>
                                  {notif.title}
                                </Text>
                                <Text size="xs" c="dimmed">
                                  {notif.time}
                                </Text>
                              </Box>
                            </Flex>
                          </Box>
                        ))}
                      </Stack>
                      <Box
                        p="sm"
                        style={{
                          borderTop:
                            colorScheme === 'dark'
                              ? '1px solid #2c2c2c'
                              : '1px solid #e9ecef',
                          textAlign: 'center',
                        }}
                      >
                        <Anchor href="#" size="sm" c="blue">
                          View More{' '}
                          <IconArrowRight
                            size={14}
                            style={{ marginLeft: 4, verticalAlign: 'middle' }}
                          />
                        </Anchor>
                      </Box>
                    </Menu.Dropdown>
                  </Menu>
                </Box>
              )} */}

              {/* User Menu - Desktop */}
              {isLoggedIn && (
                <Box visibleFrom="sm">
                  <Menu position="bottom-end" shadow="md">
                    <Menu.Target>
                      <UnstyledButton>
                        <Flex align="center" gap="xs">
                          <Avatar
                            src="/images/profile.jpg"
                            radius="xl"
                            size="md"
                          />
                          {/* <Text fw={500} size="sm" visibleFrom="md">
                            Hi,{' '}
                            {firstName || lastName
                              ? `${firstName ?? ''} ${lastName ?? ''}`
                              : 'Guest'}
                          </Text> */}
                        </Flex>
                      </UnstyledButton>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item component="a" href="/manage-jobs">
                        Manage Jobs
                      </Menu.Item>
                      <Menu.Item component="a" href="/bookmark-jobs">
                        Bookmarks Jobs
                      </Menu.Item>
                      <Menu.Item component="a" href={`${role}/profile`}>
                        My Profile
                      </Menu.Item>
                      <Menu.Divider />
                      <Menu.Item
                        color="red"
                        onClick={() => {
                          toast.success('Logged out Successfully');
                          logoutClient();
                        }}
                      >
                        Logout
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Box>
              )}
              {/* Mobile Menu Toggle */}
              <Burger
                opened={mobileMenuOpened}
                onClick={toggleMobileMenu}
                hiddenFrom="md"
                aria-label="Toggle navigation"
              />
            </Flex>
          </Flex>
        </Container>
      </header>

      {/* Mobile Drawer Menu */}
      <Drawer
        opened={mobileMenuOpened}
        onClose={closeMobileMenu}
        position="right"
        size="80%"
        title="Menu"
      >
        <Stack gap="sm">
          {/* User Profile Section */}
          <Box
            p="md"
            style={{
              borderRadius: 8,
            }}
          >
            <Flex align="center" gap="md">
              <Avatar src="/images/profile.jpg" radius="xl" size="lg" />

              <Box>
                <Text fw={500} size="md">
                  Hi,{' '}
                  {firstName || lastName
                    ? `${firstName ?? ''} ${lastName ?? ''}`
                    : 'Guest'}
                </Text>
              </Box>
            </Flex>
          </Box>

          <Divider />

          {/* Mobile Version */}
          {/* Home Section */}
          <Box>
            <UnstyledButton
              onClick={() => setHomeOpen(!homeOpen)}
              style={{ width: '100%' }}
            >
              <Flex justify="space-between" align="center" p="xs">
                <Text fw={500}>Home</Text>
                <IconChevronRight
                  size={18}
                  style={{
                    transform: homeOpen ? 'rotate(90deg)' : 'none',
                    transition: 'transform 0.2s',
                  }}
                />
              </Flex>
            </UnstyledButton>
            <Collapse in={homeOpen}>
              <Stack gap={0} pl="lg">
                <Anchor
                  href="/aboutus"
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    padding: '8px 0',
                  }}
                >
                  <Text>About Us</Text>
                </Anchor>
                <Anchor
                  href="/services"
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    padding: '8px 0',
                  }}
                >
                  <Text>Services</Text>
                </Anchor>
                {!isLoggedIn && (
                  <>
                    <Anchor
                      component={Link}
                      to="/recruiter"
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        padding: '8px 0',
                      }}
                    >
                      <Text>Recruiter</Text>
                    </Anchor>
                    <Anchor
                      href="/client/login"
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        padding: '8px 0',
                      }}
                    >
                      <Text>Client</Text>
                    </Anchor>
                    <UnstyledButton
                      onClick={() => {
                        openModal();
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '8px 0',
                      }}
                    >
                      <Text>Candidate</Text>
                    </UnstyledButton>
                  </>
                )}
              </Stack>
            </Collapse>
          </Box>

          <Divider />

          {/* Company Section */}
          <Box>
            <UnstyledButton
              onClick={() => setCompanyOpen(!companyOpen)}
              style={{ width: '100%' }}
            >
              <Flex justify="space-between" align="center" p="xs">
                <Text fw={500}>Company</Text>
                <IconChevronRight
                  size={18}
                  style={{
                    transform: companyOpen ? 'rotate(90deg)' : 'none',
                    transition: 'transform 0.2s',
                  }}
                />
              </Flex>
            </UnstyledButton>
            <Collapse in={companyOpen}>
              <Stack gap={0} pl="lg">
                <Anchor
                  href="/#categories"
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    padding: '8px 0',
                  }}
                >
                  <Text>Job Categories</Text>
                </Anchor>
                <Anchor
                  href="/#testimonials"
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    padding: '8px 0',
                  }}
                >
                  <Text>Testimonials</Text>
                </Anchor>
              </Stack>
            </Collapse>
          </Box>

          <Divider />

          {/* Candidates Section */}
          <Box>
            <UnstyledButton
              onClick={() => setCandidatesOpen(!candidatesOpen)}
              style={{ width: '100%' }}
            >
              <Flex justify="space-between" align="center" p="xs">
                <Text fw={500}>Candidates</Text>
                <IconChevronRight
                  size={18}
                  style={{
                    transform: candidatesOpen ? 'rotate(90deg)' : 'none',
                    transition: 'transform 0.2s',
                  }}
                />
              </Flex>
            </UnstyledButton>
            <Collapse in={candidatesOpen}>
              <Stack gap={0} pl="lg">
                {!isLoggedIn && (
                  <Anchor
                    href="/#browse-jobs"
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      padding: '8px 0',
                    }}
                  >
                    <Text>Browse Jobs</Text>
                  </Anchor>
                )}
                {isCandidateUser ? (
                  <>
                    <Anchor component="a" href="/candidate/saved-jobs">
                      <Text>Saved Jobs</Text>
                    </Anchor>
                    <Anchor component="a" href="/candidate/profile">
                      <Text>Candidate Profile</Text>
                    </Anchor>
                    <Anchor component="a" href="/candidate/profile">
                      <Text>Upload Resume</Text>
                    </Anchor>
                  </>
                ) : (
                  <>
                    <Anchor onClick={() => openModal()}>
                      <Text>Saved Jobs</Text>
                    </Anchor>
                    <Anchor onClick={() => openModal()}>
                      <Text>Candidate Profile</Text>
                    </Anchor>
                    <Anchor onClick={() => openModal()}>
                      <Text>Upload Resume</Text>
                    </Anchor>
                  </>
                )}
              </Stack>
            </Collapse>
          </Box>
          <Divider />
          {showEmployerMenu && (
            <Box>
              <UnstyledButton
                onClick={() => setEmployerOpen(!employerOpen)}
                style={{ width: '100%' }}
              >
                <Flex justify="space-between" align="center" p="xs">
                  <Text fw={500}>Employer</Text>
                  <IconChevronRight
                    size={18}
                    style={{
                      transform: employerOpen ? 'rotate(90deg)' : 'none',
                      transition: 'transform 0.2s',
                    }}
                  />
                </Flex>
              </UnstyledButton>
              <Collapse in={employerOpen}>
                <Stack gap={0} pl="lg">
                  {isEmployerGuest && (
                    <>
                      <Anchor component="a" href="/client/login">
                        <Text>Login</Text>
                      </Anchor>
                      <Anchor component="a" href="/client/register">
                        <Text>Register</Text>
                      </Anchor>
                      <Anchor component="a" href="/client/login">
                        <Text>Post a Job</Text>
                      </Anchor>
                      <Anchor component="a" href="/client/login">
                        <Text>Manage Jobs</Text>
                      </Anchor>
                      <Anchor component="a" href="/client/login">
                        <Text>Employer Dashboard</Text>
                      </Anchor>
                    </>
                  )}
                  {isClientUser && (
                    <>
                      <Anchor component="a" href="/client/jobs/new">
                        <Text>Post a Job</Text>
                      </Anchor>
                      <Anchor component="a" href="/client/jobs/manage-jobs">
                        <Text>Manage Jobs</Text>
                      </Anchor>
                      <Anchor component="a" href="/client/dashboard">
                        <Text>Employer Dashboard</Text>
                      </Anchor>
                    </>
                  )}
                </Stack>
              </Collapse>
            </Box>
          )}

          <Divider />

          {/* Contact Link */}
          <Anchor
            href="/#contact"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Flex align="center" p="sm">
              <Text fw={500}>Contact</Text>
            </Flex>
          </Anchor>

          <Divider />

          {/* Social Links */}
          <Box p="xs">
            <Text size="sm" fw={600} mb="md">
              Connect With Us
            </Text>
            <Flex gap="md">
              <ActionIcon
                variant="light"
                radius="xl"
                size="lg"
                component="a"
                href="https://www.linkedin.com/company/iglobus-jobsetu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{
                  color: '#0A66C2',
                }}
              >
                <IconBrandLinkedin size={18} />
              </ActionIcon>
              <ActionIcon
                variant="light"
                radius="xl"
                size="lg"
                component="a"
                href="https://www.instagram.com/iglobusjobsetu/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{
                  color: '#E1306C',
                }}
              >
                <IconBrandInstagram size={18} />
              </ActionIcon>
              <ActionIcon
                component="a"
                href="https://mail.google.com/mail/?view=cm&fs=1&to=iglobusjobsetu@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                variant="light"
                radius="xl"
                size="lg"
                aria-label="Email"
                style={{
                  color: '#495057',
                }}
              >
                <IconMail size={18} />
              </ActionIcon>
              <ActionIcon
                variant="light"
                radius="xl"
                size="lg"
                component="a"
                href="https://x.com/iglobusjobsetu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                style={{
                  color: '#000000',
                }}
              >
                <IconX size={18} stroke={2.8} />
              </ActionIcon>
            </Flex>
          </Box>

          <Divider />

          {!isLoggedIn ? (
            <>
              {!token && (
                <Menu trigger="hover" position="bottom">
                  <Menu.Target>
                    <Button
                      variant="subtle"
                      radius="xl"
                      fw={600}
                      style={{
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.12)',
                        color: colorScheme === 'dark' ? '#fff' : '#333',
                        borderColor: 'blue',
                      }}
                      onClick={() => openModal()}
                    >
                      Join as Candidate
                    </Button>
                  </Menu.Target>
                </Menu>
              )}
              <Divider />
            </>
          ) : (
            <Stack gap="xs" mt="md">
              <Button
                variant="light"
                component="a"
                href="/manage-jobs"
                fullWidth
              >
                Manage Jobs
              </Button>
              <Button
                variant="light"
                component="a"
                href={`${role}/profile`}
                fullWidth
              >
                My Profile
              </Button>
              <Button
                variant="light"
                color="red"
                fullWidth
                onClick={() => {
                  toast.success('Logged out successfully');
                  logoutClient();
                }}
              >
                Logout
              </Button>
            </Stack>
          )}
        </Stack>
      </Drawer>

      {/* Sign Up Modal */}
    </Paper>
  );
}
