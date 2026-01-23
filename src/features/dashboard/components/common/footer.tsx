import {
  ActionIcon,
  Anchor,
  Box,
  Container,
  Grid,
  Group,
  Image,
  Stack,
  Text,
} from '@mantine/core';
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconChevronRight,
  IconMail,
  IconX,
} from '@tabler/icons-react';

const footerLinks = {
  company: [
    { label: 'About Us', href: '/#about' },
    { label: 'Services', href: '/services' },
  ],
  forJobs: [
    { label: 'Browse Categories', href: '/#categories' },
    { label: 'Browse Jobs', href: '/#browse-jobs' },
  ],
  // support: [{ label: 'Help Center', href: '/contact' }],
};

const socialLinks = [
  {
    icon: IconBrandLinkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/iglobus-jobsetu',
    color: '#0A66C2',
  },
  {
    icon: IconBrandInstagram,
    label: 'Instagram',
    href: 'https://www.instagram.com/iglobusjobsetu/',
    color: '#E1306C',
  },
  {
    icon: IconMail,
    label: 'Email',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=iglobusjobsetu@gmail.com',
    color: '#306dabff',
  },
  {
    icon: IconX,
    label: 'X',
    href: 'https://x.com/iglobusjobsetu',
    color: '#000000',
    stroke: 2.8,
  },
];

export function FooterSubscribe() {
  return (
    <Box>
      {/* FOOTER SECTION */}
      <Box bg="#1f2937" style={{ padding: '80px 0 40px' }}>
        <Container size="lg">
          <Grid gutter="xl">
            {/* Brand Column */}
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
              <Stack gap="md" align="flex-start">
                <Anchor
                  href="/"
                  underline="never"
                  style={{ display: 'inline-block' }}
                >
                  <Image
                    src="/auth/jobsetulogos.png"
                    alt="JobSetu Logo"
                    fit="contain"
                    width={100}
                    height={100}
                    radius={12}
                  />
                </Anchor>

                <Box>
                  <Text size="sm" c="white" mb="sm">
                    Follow Us on:
                  </Text>
                  <Group gap="xs">
                    {socialLinks.map((social) => {
                      const Icon = social.icon;
                      return (
                        <ActionIcon
                          key={social.label}
                          component="a"
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="lg"
                          radius="md"
                          variant="light"
                          aria-label={social.label}
                          styles={{
                            root: {
                              backgroundColor: 'rgba(255, 255, 255, 0.1)',
                              color: social.color,
                              transition: 'all 200ms ease',
                              '&:hover': {
                                backgroundColor: social.color,
                                color: '#ffffff',
                                transform: 'translateY(-2px)',
                              },
                            },
                          }}
                        >
                          <Icon size={20} stroke={social.stroke ?? 2} />
                        </ActionIcon>
                      );
                    })}
                  </Group>
                  <Text size="xs" mt="md" c="rgba(255, 255, 255, 0.6)">
                    © iGlobus JobSetu 2025 - 2026 | All Rights Reserved
                  </Text>
                </Box>
              </Stack>
            </Grid.Col>

            {/* Company Links */}
            <Grid.Col span={{ base: 6, sm: 6, md: 2 }}>
              <Stack gap="md">
                <Text size="sm" fw={500} c="white">
                  Company
                </Text>
                <Stack gap="xs">
                  {footerLinks.company.map((link, index) => (
                    <Anchor
                      key={index}
                      href={link.href}
                      size="sm"
                      c="rgba(255, 255, 255, 0.6)"
                      style={{
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.paddingLeft = '8px';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color =
                          'rgba(255, 255, 255, 0.6)';
                        e.currentTarget.style.paddingLeft = '0';
                      }}
                    >
                      <Group gap={4}>
                        <IconChevronRight size={14} />
                        {link.label}
                      </Group>
                    </Anchor>
                  ))}
                </Stack>
              </Stack>
            </Grid.Col>

            {/* For Jobs Links */}
            <Grid.Col span={{ base: 6, sm: 6, md: 2 }}>
              <Stack gap="md">
                <Text size="sm" fw={500} c="white">
                  For Jobs
                </Text>
                <Stack gap="xs">
                  {footerLinks.forJobs.map((link, index) => (
                    <Anchor
                      key={index}
                      href={link.href}
                      size="sm"
                      c="rgba(255, 255, 255, 0.6)"
                      style={{
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.paddingLeft = '8px';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color =
                          'rgba(255, 255, 255, 0.6)';
                        e.currentTarget.style.paddingLeft = '0';
                      }}
                    >
                      <Group gap={4}>
                        <IconChevronRight size={14} />
                        {link.label}
                      </Group>
                    </Anchor>
                  ))}
                </Stack>
              </Stack>
            </Grid.Col>

            {/* Support Links */}
            {/* <Grid.Col span={{ base: 6, sm: 6, md: 2 }}>
              <Stack gap="md">
                <Text size="sm" fw={500} c="white">
                  Support
                </Text>
                <Stack gap="xs">
                  {footerLinks.support.map((link, index) => (
                    <Anchor
                      key={index}
                      href={link.href}
                      size="sm"
                      c="rgba(255, 255, 255, 0.6)"
                      style={{
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.paddingLeft = '8px';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color =
                          'rgba(255, 255, 255, 0.6)';
                        e.currentTarget.style.paddingLeft = '0';
                      }}
                    >
                      <Group gap={4}>
                        <IconChevronRight size={14} />
                        {link.label}
                      </Group>
                    </Anchor>
                  ))}
                </Stack>
              </Stack>
            </Grid.Col> */}
          </Grid>
        </Container>
      </Box>

      {/* FOOTER ALT - Copyright */}
      <Box bg="#111827" style={{ padding: '25px 0' }}>
        <Container size="lg">
          <Text size="sm" c="rgba(255, 255, 255, 0.6)" ta="center">
            Powered and Managed by SRYTAL Systems India Private Limited |{' '}
            <Text
              component="a"
              href="https://www.srytal.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'rgba(255, 255, 255, 0.6)',
                textDecoration: 'underline',
                display: 'inline-block',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              www.srytal.com
            </Text>
          </Text>
        </Container>
      </Box>
    </Box>
  );
}
