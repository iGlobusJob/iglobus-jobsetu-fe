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
  IconBrandFacebook,
  IconBrandGoogle,
  IconBrandLinkedin,
  IconChevronRight,
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
  { icon: IconBrandFacebook, label: 'Facebook', href: '#', color: '#1877F2' },
  { icon: IconBrandLinkedin, label: 'LinkedIn', href: '#', color: '#0A66C2' },
  { icon: IconBrandGoogle, label: 'Google', href: '#', color: '#DB4437' },
  { icon: IconX, label: 'Twitter', href: '#', color: '#000000' },
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
                    src="/jobseti-darks.png"
                    alt="JobSetu Logo"
                    fit="contain"
                    width={40}
                    height={40}
                  />
                </Anchor>

                <Box>
                  <Text size="sm" c="white" mb="sm">
                    Follow Us on:
                  </Text>
                  <Group gap="xs">
                    {socialLinks.map((social, index) => (
                      <ActionIcon
                        key={index}
                        component="a"
                        href={social.href}
                        size="lg"
                        radius="md"
                        variant="light"
                        color="gray"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = social.color;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor =
                            'rgba(255, 255, 255, 0.1)';
                        }}
                      >
                        <social.icon size={20} color="white" />
                      </ActionIcon>
                    ))}
                  </Group>
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
            Powered and Managed by SRYTAL Systems India Pvt Ltd –{' '}
            <Text
              component="a"
              href="https://www.srytal.com"
              target="_blank"
              rel="noopener noreferrer"
              c="rgba(255, 255, 255, 0.6)"
              style={{ textDecoration: 'underline' }}
            >
              www.srytal.com
            </Text>
          </Text>
        </Container>
      </Box>
    </Box>
  );
}
