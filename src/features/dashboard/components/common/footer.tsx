import {
  ActionIcon,
  Anchor,
  Box,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  Modal,
  ScrollArea,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconChevronRight,
  IconMail,
  IconX,
} from '@tabler/icons-react';
import { useState } from 'react';

const footerLinks = {
  company: [
    { label: 'About Us', href: '/#about' },
    { label: 'Services', href: '/services' },
    { label: 'Privacy Policy', href: '#privacy-policy' },
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
  const [privacyOpened, setPrivacyOpened] = useState(false);
  return (
    <Box>
      <Modal
        opened={privacyOpened}
        onClose={() => setPrivacyOpened(false)}
        title="Privacy Policy"
        size="lg"
        radius="md"
      >
        <ScrollArea h={420} offsetScrollbars>
          <Stack gap="md">
            <Title order={5}>PRIVACY POLICY FOR JOB SETU</Title>

            <Text size="sm" c="dimmed">
              Effective Date: January 03, 2026
            </Text>

            <Divider />

            <Text fw={600}>1. Introduction</Text>
            <Text size="sm">
              iGlobus ("Company," "we," "us," or "our") operates the Job Setu
              platform. This Privacy Policy explains how we collect, use,
              disclose, and safeguard user information when you use our web
              application. We are committed to protecting the privacy of our
              Employers, Candidates, and partners.
            </Text>

            <Divider />

            <Text fw={600}>2. Information We Collect</Text>
            <Text size="sm">
              We collect information that identifies, relates to, or could
              reasonably be linked to a specific user ("Personal Data").
            </Text>

            <Text size="sm">
              <b>a. For Employers:</b>Company name, GST details, office address,
              contact person details, and job requirement specifications.
            </Text>

            <Text size="sm">
              <b>b. For Candidates:</b> Full name, contact information,
              educational background, work experience, skill sets, and uploaded
              resumes/identity documents.
            </Text>

            <Text size="sm">
              <b>c. Technical Data:</b> IP addresses, browser types, and usage
              patterns collected via cookies to improve platform performance.
            </Text>

            <Divider />

            <Text fw={600}>3. Purpose of Data Processing</Text>
            <Text size="sm">
              Your data is processed for the following legitimate business
              purposes:
            </Text>

            <Text size="sm">
              <b>a. Facilitation of Recruitment:</b> To match Candidate profiles
              with Employer requirements.
            </Text>

            <Text size="sm">
              <b>b. Verification:</b>To validate the authenticity of MSMEs (via
              GST) and the qualifications of Candidates.
            </Text>

            <Text size="sm">
              <b>c. Communication:</b>To send alerts regarding application
              status, interview schedules, and platform updates.
            </Text>

            <Text size="sm">
              <b>d. Internal Analytics:</b> To improve the "Job Setu" workflow
              and user experience.
            </Text>

            <Divider />

            <Text fw={600}>4. Data Sharing and Disclosure</Text>

            <Text size="sm">
              Job Setu is a collaborative platform, and data sharing is
              fundamental to its operation:
            </Text>

            <Text size="sm">
              <b>a) Between Users:</b> Candidate profiles (including resumes)
              are shared with Employers. Employer requirements are visible to
              Candidates.
            </Text>

            <Text size="sm">
              <b>b) Internal Recruiters:</b> The iGlobus internal team has
              access to all data to perform screening, shortlisting, and
              coordination.
            </Text>

            <Text size="sm">
              <b>c) Legal Compliance:</b> We may disclose information if
              required by law, subpoena, or government audit.
            </Text>

            <Text size="sm">
              <b>d) No Third-Party Sale:</b> We do not sell, rent, or trade your
              personal data to third-party marketing firms.
            </Text>

            <Divider />

            <Text fw={600}>5. Data Retention</Text>

            <Text size="sm">
              <b>5.1 Active Accounts:</b> We retain your data as long as your
              account is active to provide you with seamless recruitment
              services.
            </Text>

            <Text size="sm">
              <b>5.2 Deletion:</b> Upon account termination, we may retain
              certain data for a limited period as required by law or for
              legitimate business records (e.g., proof of a hiring transaction).
            </Text>

            <Divider />

            <Text fw={600}>6. Security Measures</Text>

            <Text size="sm">
              We implement industry-standard security protocols, including:
            </Text>

            <Text size="sm">
              <b>6.1 Encryption:</b> Sensitive data such as login credentials
              and documents are encrypted during transit and at rest.
            </Text>

            <Text size="sm">
              <b>6.2 Access Control:</b> Access to the backend database is
              restricted to authorized internal recruiters and technical staff
              on a "need-to-know" basis.
            </Text>

            <Text size="sm">
              <b>6.3 Audit Logs:</b>We maintain logs of system activity to
              detect and prevent unauthorized access.
            </Text>

            <Divider />

            <Text fw={600}>7. User Rights</Text>

            <Text size="sm">
              Users of Job Setu have the following rights regarding their data:
            </Text>

            <Text size="sm">
              <b>7.1 Access & Correction:</b> The right to review and update
              personal or company information through the dashboard.
            </Text>

            <Text size="sm">
              <b>7.2 Withdrawal of Consent:</b>The right to withdraw consent for
              data processing (which may result in the inability to use the
              platform).
            </Text>

            <Text size="sm">
              <b>7.3 Data Portability:</b> The right to request a copy of the
              data provided to us in a structured format.
            </Text>

            <Divider />

            <Text fw={600}>8. Use of Cookies</Text>
            <Text size="sm">
              Job Setu uses cookies to maintain session integrity and remember
              user preferences. You can manage cookie settings through your
              browser, though disabling them may affect the platform's
              functionality.
            </Text>

            <Divider />

            <Text fw={600}>9. Third-Party Links</Text>
            <Text size="sm">
              Our platform may contain links to external websites (e.g., an
              Employer’s corporate site). We are not responsible for the privacy
              practices or content of such third-party sites.
            </Text>

            <Divider />

            <Text fw={600}>10. Changes to This Policy</Text>
            <Text size="sm">
              We reserve the right to update this Privacy Policy at any time.
              Significant changes will be notified via the platform dashboard or
              email. Continued use of the platform after such changes
              constitutes acceptance of the updated policy.
            </Text>

            <Divider />

            <Text fw={600}>11. Grievance Redressal</Text>

            <Text size="sm">
              If you have any questions, concerns, or grievances regarding your
              privacy or data usage on Job Setu, please contact our Grievance
              Officer at:
            </Text>

            <Text size="sm">
              • Email: <br />• Address:{' '}
            </Text>
          </Stack>
        </ScrollArea>
      </Modal>

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
                      onClick={(e) => {
                        if (link.label === 'Privacy Policy') {
                          e.preventDefault();
                          setPrivacyOpened(true);
                        }
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
