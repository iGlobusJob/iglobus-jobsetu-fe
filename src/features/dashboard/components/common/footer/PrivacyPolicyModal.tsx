import { Divider, Modal, ScrollArea, Stack, Text, Title } from '@mantine/core';
import React from 'react';

interface PrivacyPolicyModalProps {
  opened: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  opened,
  onClose,
}) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
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
            <b>a. For Employers:</b> Company name, GST details, office address,
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
            <b>b. Verification:</b> To validate the authenticity of MSMEs (via
            GST) and the qualifications of Candidates.
          </Text>
          <Text size="sm">
            <b>c. Communication:</b> To send alerts regarding application
            status, interview schedules, and platform updates.
          </Text>
          <Text size="sm">
            <b>d. Internal Analytics:</b> To improve the "Job Setu" workflow and
            user experience.
          </Text>
          <Divider />

          <Text fw={600}>4. Data Sharing and Disclosure</Text>
          <Text size="sm">
            Job Setu is a collaborative platform, and data sharing is
            fundamental to its operation:
          </Text>
          <Text size="sm">
            <b>a) Between Users:</b> Candidate profiles (including resumes) are
            shared with Employers. Employer requirements are visible to
            Candidates.
          </Text>
          <Text size="sm">
            <b>b) Internal Recruiters:</b> The iGlobus internal team has access
            to all data to perform screening, shortlisting, and coordination.
          </Text>
          <Text size="sm">
            <b>c) Legal Compliance:</b> We may disclose information if required
            by law, subpoena, or government audit.
          </Text>
          <Text size="sm">
            <b>d) No Third-Party Sale:</b> We do not sell, rent, or trade your
            personal data to third-party marketing firms.
          </Text>
          <Divider />

          <Text fw={600}>5. Data Retention</Text>
          <Text size="sm">
            <b>5.1 Active Accounts:</b> We retain your data as long as your
            account is active to provide you with seamless recruitment services.
          </Text>
          <Text size="sm">
            <b>5.2 Deletion:</b> Upon account termination, we may retain certain
            data for a limited period as required by law or for legitimate
            business records (e.g., proof of a hiring transaction).
          </Text>
          <Divider />

          <Text fw={600}>6. Security Measures</Text>
          <Text size="sm">
            We implement industry-standard security protocols, including:
          </Text>
          <Text size="sm">
            <b>6.1 Encryption:</b> Sensitive data such as login credentials and
            documents are encrypted during transit and at rest.
          </Text>
          <Text size="sm">
            <b>6.2 Access Control:</b> Access to the backend database is
            restricted to authorized internal recruiters and technical staff on
            a "need-to-know" basis.
          </Text>
          <Text size="sm">
            <b>6.3 Audit Logs:</b> We maintain logs of system activity to detect
            and prevent unauthorized access.
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
            <b>7.2 Withdrawal of Consent:</b> The right to withdraw consent for
            data processing (which may result in the inability to use the
            platform).
          </Text>
          <Text size="sm">
            <b>7.3 Data Portability:</b> The right to request a copy of the data
            provided to us in a structured format.
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
            email. Continued use of the platform after such changes constitutes
            acceptance of the updated policy.
          </Text>
          <Divider />

          <Text fw={600}>11. Grievance Redressal</Text>
          <Text size="sm">
            If you have any questions, concerns, or grievances regarding your
            privacy or data usage on Job Setu, please contact our Grievance
            Officer.
          </Text>
        </Stack>
      </ScrollArea>
    </Modal>
  );
};

export default PrivacyPolicyModal;
