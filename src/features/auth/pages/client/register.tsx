import {
  Box,
  Button,
  Card,
  Center,
  Checkbox,
  Container,
  Divider,
  FileInput,
  Group,
  Image,
  Modal,
  ScrollArea,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { IconUpload } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import type { ApiError } from '@/common';
import { FooterSubscribe } from '@/features/dashboard/components/common/footer';
import { Header } from '@/features/dashboard/components/common/header';
import { useSystemTheme } from '@/hooks/useSystemTheme';
import { registerClient } from '@/services/client-services';

import { clientRegisterSchema } from '../../../dashboard/forms/register';
import type { ClientRegisterValues } from '../../../dashboard/types/register';
import AppLoader from '../../../dashboard/utlis/loader/loader';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const systemTheme = useSystemTheme();
  const isDark = systemTheme === 'dark';
  const theme = useMantineTheme();
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [termsOpened, setTermsOpened] = useState(false);

  // Responsive breakpoints
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  const form = useForm<
    ClientRegisterValues & { isTermsAndConditionsAgreed: boolean }
  >({
    initialValues: {
      organizationName: '',
      primaryFirstName: '',
      primaryLastName: '',
      email: '',
      password: '',
      mobile: '',
      location: '',
      gstin: '',
      panCard: '',
      category: 'IT',
      logoImage: null,
      isTermsAndConditionsAgreed: false,
    },
    validate: {
      ...zodResolver(clientRegisterSchema),
      isTermsAndConditionsAgreed: (value) =>
        value ? null : 'You must agree to the terms and conditions',
    },
  });

  const handleSubmit = async (values: ClientRegisterValues) => {
    if (!values.isTermsAndConditionsAgreed) {
      toast.error('Accept Terms & Conditions to continue');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        organizationName: values.organizationName,
        primaryContact: {
          firstName: values.primaryFirstName,
          lastName: values.primaryLastName,
        },
        email: values.email,
        password: values.password,
        mobile: values.mobile,
        location: values.location,
        gstin: values.gstin,
        panCard: values.panCard,
        category: values.category,
        logo: values.logoImage,
        isTermsAndConditionsAgreed: values.isTermsAndConditionsAgreed,
      };

      const res = await registerClient(payload);

      if (res.data?.success) {
        toast.success(res.data.message || 'Client registered Successfully !');
        navigate('/client/login');
        return;
      }
      toast.error(res.data?.message || 'Something went wrong.');
    } catch (err: unknown) {
      const error = err as ApiError;
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };

  // Allow only digits & max length
  const handleNumberInput = (value: string, max: number) =>
    value.replace(/\D/g, '').slice(0, max);

  // Allow only uppercase text with max length
  const handleUppercaseInput = (value: string, max: number) =>
    value
      .replace(/[^A-Z0-9]/gi, '')
      .toUpperCase()
      .slice(0, max);

  // Allow only alphabets
  const handleNameInput = (value: string) => value.replace(/[^a-zA-Z]/g, '');

  // Handle logo image change
  const handleLogoChange = (file: File | null) => {
    form.setFieldValue('logoImage', file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setLogoPreview(null);
    }
  };

  return (
    <Box
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      <Modal
        opened={termsOpened}
        onClose={() => setTermsOpened(false)}
        title="Terms & Conditions"
        size="lg"
        radius="md"
      >
        <ScrollArea h={400}>
          <Stack gap="md">
            <Title order={4}>TERMS AND CONDITIONS FOR JOB SETU PLATFORM</Title>

            <Text size="sm" c="dimmed">
              Last Updated: January 03, 2026
            </Text>

            <Text fw={600}>1.1 Definitions</Text>

            <Text size="sm">
              In these Terms and Conditions, unless the context otherwise
              requires:
            </Text>

            <Text size="sm">
              <b>"Account"</b> means the user account created by a User to
              access the Platform.
            </Text>

            <Text size="sm">
              <b>"Candidate"</b> means an individual who registers on the
              Platform seeking employment opportunities.
            </Text>

            <Text size="sm">
              <b>"Company"</b> or <b>"We"</b> or <b>"Us"</b> means iGlobus
              Solutions Private Limited, a company incorporated under the
              Companies Act, 2013, having its registered office at [Complete
              Address], Hyderabad, Telangana - [PIN Code], India, bearing
              Corporate Identity Number (CIN): [Insert CIN Number], Contact
              Email: [email address], Contact Phone: [phone number].
            </Text>

            <Text size="sm">
              <b>"Content"</b> means all text, graphics, images, data, software,
              and other materials available on or through the Platform.
            </Text>

            <Text size="sm">
              <b>"Data Fiduciary"</b> has the meaning assigned under the Digital
              Personal Data Protection Act, 2023.
            </Text>

            <Text size="sm">
              <b>"Data Principal"</b> has the meaning assigned under the Digital
              Personal Data Protection Act, 2023.
            </Text>

            <Text size="sm">
              <b>"Employer" or "Client"</b> means a business entity or
              individual that registers on the Platform to post job vacancies
              and recruit Candidates.
            </Text>

            <Text size="sm">
              <b>"Fees"</b> means the charges payable by Users for access to
              certain services on the Platform as specified in the Pricing
              Schedule.
            </Text>

            <Text size="sm">
              <b>"GST"</b> means Goods and Services Tax levied under applicable
              Indian tax laws.
            </Text>

            <Text size="sm">
              <b>"Internal Recruiter Team" or "Recruiter Team"</b> means the
              Company's team of recruitment professionals who screen and
              facilitate connections between Employers and Candidates.
            </Text>

            <Text size="sm">
              <b>"Personal Data"</b> means data as defined under the Digital
              Personal Data Protection Act, 2023.
            </Text>

            <Text size="sm">
              <b>"Platform" or "Job Setu"</b> means the web application, mobile
              application, and related services operated by the Company
              accessible at [website URL] and related domains.
            </Text>

            <Text size="sm">
              <b>"Privacy Policy"</b> means the Company's privacy policy
              available at [Privacy Policy URL], which forms an integral part of
              these Terms.
            </Text>

            <Text size="sm">
              <b>"Services"</b> means recruitment facilitation, job posting,
              resume hosting, candidate screening, and related services provided
              through the Platform.
            </Text>

            <Text size="sm">
              <b>"Terms"</b> means these Terms and Conditions as amended from
              time to time.
            </Text>

            <Text size="sm">
              <b>"User"</b> means any person or entity that accesses or uses the
              Platform, including both Employers and Candidates.
            </Text>

            <Text size="sm">
              <b>"User Data"</b> means all data, information, and content
              submitted by Users to the Platform.
            </Text>

            <Divider />

            <Text fw={600}>2. ACCEPTANCE AND SCOPE OF AGREEMENT</Text>

            <Text size="sm">
              <b>2.1 Binding agreement:</b>
              <br />
              <br /> By clicking "I Accept," "Sign Up," "Register," or by
              accessing or using the Platform, you acknowledge that you have
              read, understood, and agree to be legally bound by these Terms,
              the Privacy Policy, and all applicable laws and regulations. If
              you do not agree to these Terms, you must immediately cease using
              the Platform.
            </Text>
            <Text size="sm">
              <b>2.2 Eligibility:</b>
            </Text>

            <Text size="sm">
              (a) The Candidates must be at least 18 years of age and legally
              eligible to work in India.
            </Text>

            <Text size="sm">
              (b) Employers must be duly registered business entities or
              authorized representatives with the legal authority to enter into
              binding contracts.
            </Text>

            <Text size="sm">
              (c) By registering, you represent and warrant that you meet all
              eligibility requirements.
            </Text>

            <Text size="sm">
              <b>2.3 Scope of Services:</b>
              <br />
              <br /> Job Setu acts as a digital intermediary/facilitator between
              MSME Employers and Job Seekers. The Company provides a platform
              for job posting, resume hosting, and recruitment coordination. The
              Company does not guarantee employment for Candidates nor the
              suitability of any Candidate for Employers.
            </Text>

            <Text size="sm">
              <b>2.4 Nature of Relationship:</b>
            </Text>

            <Text size="sm">
              (a) The Company acts solely as a facilitator and technology
              service provider.
            </Text>

            <Text size="sm">
              (b) The Company does not Guarantee employment to any Candidate;
              does not Warrant the suitability, qualifications, or conduct of
              any Candidate; does not Guarantee the availability of suitable
              candidates to Employers; Does not act as an employment agent,
              recruiter, or placement agency on behalf of Users. No
              employer-employee, principal-agent, partnership, or joint venture
              relationship exists between the Company and Users.
            </Text>

            <Divider />

            <Text fw={600}>3. USER REGISTRATION AND ACCOUNT MANAGEMENT</Text>

            <Text size="sm">
              <b>3.1 Registration Requirements for Employers:</b>
            </Text>

            <Text size="sm">
              (a) Complete legal business name and registration details;
              <br />
              (b) Valid Goods and Services Tax Identification Number (GSTIN);
              <br />
              (c) Company registration certificate or incorporation documents;
              <br />
              (d) Authorized signatory details with supporting documentation;
              <br />
              (e) Valid business address and contact information;
              <br />
              (f) Industry classification and company size details.
            </Text>

            <Text size="sm">
              <b>Registration requirements for Candidates:</b>
            </Text>

            <Text size="sm">
              (a) Full legal name as per government-issued identification;
              <br />
              (b) Valid email address and mobile number;
              <br />
              (c) Educational qualifications with supporting documents (if
              requested);
              <br />
              (d) Professional experience details;
              <br />
              (e) Current residential address;
              <br />
              (f) Right-to-work status in India.
            </Text>

            <Text size="sm">
              <b>3.2 Accuracy of Information:</b> <br /> <br /> (a) Users
              warrant that all information provided is true, accurate, current,
              and complete. <br />
              (b) Users agree to promptly update their Account information to
              maintain accuracy. <br />
              (c) The Company reserves the right, but assumes no obligation, to
              verify any information provided by Users through Document
              verification, Third-party background checks (with User consent),
              Reference checks, Database cross-referencing etc.
            </Text>

            <Text size="sm">
              <b>3.3 Account Security:</b> <br />
              <br /> (a) Users are solely responsible for maintaining the
              confidentiality of their login credentials (username, password,
              OTP). <br /> (b) Users must immediately notify the Company at
              [security email] of any unauthorized use of their Account or
              security breach. <br /> (c) Users are liable for all activities
              conducted through their Account, whether authorized or
              unauthorized, until the Company receives written notice of a
              security breach and has reasonable time to act. <br /> (d) The
              Company shall not be liable for any loss or damage arising from
              unauthorized Account access due to User negligence.
            </Text>

            <Text size="sm">
              <b>3.4 Prohibited Account Activities:</b> <br /> <br />
              Users shall not Share Account credentials with third parties,
              shall not create multiple Accounts for the same entity or
              individual, shall not use another person's Account without
              authorization, shall not create Accounts using false, misleading,
              or fraudulent information and shall not create Accounts for
              automated or non-human access (bots, scrapers).
            </Text>

            <Divider />

            <Text fw={600}>4. Specific Terms for Employers/Clients</Text>

            <Text size="sm">
              4.1 Employers agree to post only legitimate vacancies. Postings
              for prohibited activities (scams, fee-based hiring, or
              discriminatory practices) are strictly forbidden.
            </Text>

            <Text size="sm">
              4.2 The final decision to hire rests solely with the Employer. The
              Company is not liable for any acts, omissions, or performance of
              the hired Candidate.
            </Text>

            <Text size="sm">
              4.3 Employers shall treat all Candidate profiles shared by the
              Recruiter Team as confidential and shall not bypass the platform
              to contact candidates directly if such an action violates a
              separate service agreement.
            </Text>

            <Divider />

            <Text fw={600}>5. Specific Terms for Candidates/Job Seekers</Text>

            <Text size="sm">
              5.1 Candidates warrant that resumes and experience details are
              truthful. Any misrepresentation may lead to immediate account
              termination.
            </Text>

            <Text size="sm">
              5.2 Application to a role does not guarantee an interview or
              selection.
            </Text>

            <Text size="sm">
              5.3 Candidates expressly consent to their profiles being shared
              with MSME Clients and reviewed by the Internal Recruiter Team.
            </Text>

            <Divider />

            <Text fw={600}>6. Role of Internal Recruiters</Text>

            <Text size="sm">
              The "Internal Recruiter Team" acts as a facilitator for screening
              and shortlisting. Their evaluation is based on the information
              provided by the User and is intended to streamline the process,
              not to provide professional warranties on behalf of the
              Candidates.
            </Text>

            <Divider />

            <Text fw={600}>7. Intellectual Property Rights</Text>

            <Text size="sm">
              All content, software, logos, and workflows (the "Job Setu
              Workflow") are the exclusive intellectual property of iGlobus.
              Users are granted a limited, non-transferable license to use the
              platform for its intended recruitment purposes only.
            </Text>

            <Divider />

            <Text fw={600}>8. Data Privacy and Protection</Text>

            <Text fw={600}>8.1 Personal Data</Text>
            <Text size="sm">
              Use of the platform is governed by our Privacy Policy.
            </Text>

            <Text fw={600}>8.2 Consent</Text>
            <Text size="sm">
              By using Job Setu, Users consent to the collection and processing
              of personal/corporate data as required for the hiring process.
            </Text>

            <Text fw={600}>8.3 Third-Party Disclosure</Text>
            <Text size="sm">
              Data will be shared between Employers and Candidates as part of
              the core functionality.
            </Text>

            <Divider />

            <Text size="sm">
              9. Users shall not Use the platform for any unlawful purpose and
              shall not Attempt to scrape data or bypass the platform’s security
              features. Further, shall not make any Post defamatory, obscene, or
              infringing content.
            </Text>

            <Divider />

            <Text fw={600}>10. Limitation of Liability</Text>

            <Text size="sm">
              To the maximum extent permitted by law, iGlobus shall not be
              liable for any direct, indirect, or consequential damages arising
              from the use of Job Setu, including but not limited to loss of
              data, loss of profits, or disputes between Employers and
              Candidates.
            </Text>

            <Divider />

            <Text fw={600}>11. Termination of Account</Text>

            <Text size="sm">
              The Company reserves the right to suspend or terminate any account
              at its discretion, without notice, for violation of these Terms or
              any conduct deemed detrimental to the platform’s integrity.
            </Text>

            <Divider />

            <Text fw={600}>12. Governing Law and Jurisdiction</Text>

            <Text size="sm">
              These Terms shall be governed by and construed in accordance with
              the laws of India. Any disputes shall be subject to the exclusive
              jurisdiction of the courts in Hyderabad, Telangana State.
            </Text>
          </Stack>
        </ScrollArea>

        <Group justify="space-between" mt="md">
          <Button variant="default" onClick={() => setTermsOpened(false)}>
            Cancel
          </Button>

          <Button
            onClick={() => {
              form.setFieldValue('isTermsAndConditionsAgreed', true);
              setTermsOpened(false);
            }}
          >
            Accept & Continue
          </Button>
        </Group>
      </Modal>
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          transition: 'background-color 0.2s ease',
          padding: isMobile ? '1rem' : '2rem',
        }}
      >
        {loading && <AppLoader />}
        <Container size="lg" px={0} style={{ width: '100%' }}>
          <Card
            radius="lg"
            shadow="xl"
            withBorder
            style={{
              overflow: 'hidden',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              padding: 0,
            }}
          >
            {/* Left Section - Hidden on mobile */}
            {!isMobile && (
              <Box
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: isTablet ? '1.5rem' : '2rem',
                }}
              >
                {/* Sign-up Illustration */}
                <Image
                  src="/auth/sign-up.png"
                  alt="Sign Up Illustration"
                  fit="contain"
                  h={isTablet ? 320 : 480}
                  w="auto"
                  radius="md"
                  style={{
                    transition: 'transform 150ms ease',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = 'scale(1.03)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = 'scale(1)')
                  }
                />
              </Box>
            )}

            {/* Right Section */}
            <Box
              style={{
                flex: 1.1,
                padding: isMobile
                  ? '2rem 1.5rem'
                  : isTablet
                    ? '2rem 1.5rem'
                    : '2rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                transition: 'background-color 0.2s ease',
              }}
            >
              <Stack align="center" mb="lg">
                <Title order={isMobile ? 4 : 3}>Let&apos;s Get Started</Title>
                <Text size={isMobile ? 'sm' : 'md'} ta="center">
                  Quick register
                </Text>
              </Stack>

              <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap={isMobile ? 'sm' : 'md'}>
                  <TextInput
                    label={'Organization Name'}
                    required
                    placeholder="XYZ Technologies Pvt Ltd"
                    size={isMobile ? 'sm' : 'md'}
                    {...form.getInputProps('organizationName')}
                  />

                  <Group grow={!isMobile}>
                    <TextInput
                      label={'First Name'}
                      placeholder="John"
                      required
                      size={isMobile ? 'sm' : 'md'}
                      {...form.getInputProps('primaryFirstName')}
                      onChange={(e) =>
                        form.setFieldValue(
                          'primaryFirstName',
                          handleNameInput(e.target.value)
                        )
                      }
                    />

                    <TextInput
                      label={'Last Name'}
                      placeholder="Doe"
                      required
                      size={isMobile ? 'sm' : 'md'}
                      {...form.getInputProps('primaryLastName')}
                      onChange={(e) =>
                        form.setFieldValue(
                          'primaryLastName',
                          handleNameInput(e.target.value)
                        )
                      }
                    />
                  </Group>

                  <Box>
                    <Group justify="space-between" mb={8}>
                      <Text size={isMobile ? 'sm' : 'md'} fw={500}>
                        Business Category{' '}
                        <span style={{ color: theme.colors.red[6] }}>*</span>
                      </Text>
                    </Group>
                    <SegmentedControl
                      fullWidth
                      size={isMobile ? 'sm' : 'md'}
                      data={[
                        { label: '💻 IT', value: 'IT' },
                        { label: '🏢 Non-IT', value: 'Non-IT' },
                      ]}
                      color="cyan"
                      radius="md"
                      {...form.getInputProps('category')}
                      style={{
                        padding: '4px',
                        backgroundColor: isDark
                          ? theme.colors.dark[6]
                          : theme.colors.gray[1],
                        border: form.errors.category
                          ? `1px solid ${theme.colors.red[6]}`
                          : 'none',
                        borderRadius: '8px',
                      }}
                    />
                    {form.errors.category && (
                      <Text size="xs" c="red" mt={4}>
                        {form.errors.category}
                      </Text>
                    )}
                  </Box>

                  <Group grow={!isMobile}>
                    <TextInput
                      label={'Email'}
                      required
                      placeholder="john.doe@xyz.com"
                      size={isMobile ? 'sm' : 'md'}
                      {...form.getInputProps('email')}
                    />

                    <TextInput
                      label={'Password'}
                      required
                      type="password"
                      placeholder="At least 8 characters"
                      size={isMobile ? 'sm' : 'md'}
                      {...form.getInputProps('password')}
                    />
                  </Group>

                  <Group grow={!isMobile}>
                    <TextInput
                      label={'Mobile'}
                      required
                      placeholder="7845698714"
                      size={isMobile ? 'sm' : 'md'}
                      {...form.getInputProps('mobile')}
                      onChange={(e) =>
                        form.setFieldValue(
                          'mobile',
                          handleNumberInput(e.target.value, 10)
                        )
                      }
                    />
                    <TextInput
                      label="Location"
                      placeholder="Hyderabad"
                      size={isMobile ? 'sm' : 'md'}
                      {...form.getInputProps('location')}
                    />
                  </Group>

                  <Group grow={!isMobile}>
                    <TextInput
                      label={'GSTIN'}
                      required
                      placeholder="22AAAAA0000A1Z5"
                      size={isMobile ? 'sm' : 'md'}
                      {...form.getInputProps('gstin')}
                      onChange={(e) =>
                        form.setFieldValue(
                          'gstin',
                          handleUppercaseInput(e.target.value, 15)
                        )
                      }
                    />

                    <TextInput
                      label={'PAN Card'}
                      required
                      placeholder="ABCDE1234F"
                      size={isMobile ? 'sm' : 'md'}
                      {...form.getInputProps('panCard')}
                      onChange={(e) =>
                        form.setFieldValue(
                          'panCard',
                          handleUppercaseInput(e.target.value, 10)
                        )
                      }
                    />
                  </Group>

                  {/* Logo Image Upload */}
                  <Box>
                    <Group grow={!isMobile}>
                      <Box style={{ flex: 1 }}>
                        <FileInput
                          label="Organization Logo"
                          placeholder="Upload JPG, JPEG, or PNG"
                          leftSection={<IconUpload size={14} />}
                          accept="image/jpeg,image/jpg,image/png"
                          size={isMobile ? 'sm' : 'md'}
                          clearable
                          value={form.values.logoImage}
                          onChange={handleLogoChange}
                          error={form.errors.logoImage}
                        />
                        <Text size="xs" c="dimmed" mt={4}>
                          Optional • Max size: 5MB • Supported: JPG, JPEG, PNG
                        </Text>
                      </Box>

                      {/* Logo Preview */}
                      {logoPreview && (
                        <Center
                          style={{
                            flex: 1,
                            padding: '1rem',
                            border: `2px solid ${theme.colors.gray[2]}`,
                            borderRadius: '0.5rem',
                            height: '120px',
                          }}
                        >
                          <Image
                            src={logoPreview}
                            alt="Logo Preview"
                            fit="contain"
                            h="100%"
                            w="auto"
                          />
                        </Center>
                      )}
                    </Group>
                  </Box>
                  <Box
                    p="md"
                    style={{
                      border: `1px solid ${
                        form.errors.isTermsAndConditionsAgreed
                          ? theme.colors.red[6]
                          : theme.colors.gray[3]
                      }`,
                      borderRadius: theme.radius.md,
                      backgroundColor: isDark
                        ? theme.colors.dark[6]
                        : theme.colors.gray[0],
                    }}
                  >
                    <Checkbox
                      checked={form.values.isTermsAndConditionsAgreed}
                      onChange={(e) => {
                        if (e.currentTarget.checked) {
                          setTermsOpened(true);
                        } else {
                          form.setFieldValue(
                            'isTermsAndConditionsAgreed',
                            false
                          );
                        }
                      }}
                      label={
                        <Text size="sm">
                          I agree to the{' '}
                          <Text
                            span
                            fw={600}
                            c="cyan.6"
                            td="underline"
                            style={{ cursor: 'pointer' }}
                            onClick={(e) => {
                              e.preventDefault();
                              setTermsOpened(true);
                            }}
                          >
                            Terms & Conditions
                          </Text>{' '}
                          and acknowledge that I have read and understood them.
                        </Text>
                      }
                    />

                    {form.errors.isTermsAndConditionsAgreed && (
                      <Text size="xs" c="red" mt={6}>
                        {form.errors.isTermsAndConditionsAgreed}
                      </Text>
                    )}
                  </Box>

                  <Button
                    type="submit"
                    size={isMobile ? 'sm' : 'md'}
                    fullWidth
                    variant="gradient"
                    gradient={{ from: 'blue', to: 'cyan' }}
                    radius="md"
                    mt={isMobile ? 'xs' : 'sm'}
                  >
                    Register
                  </Button>
                </Stack>
              </form>

              <Center mt="lg">
                <Text
                  size="sm"
                  ta="center"
                  c={isDark ? theme.colors.gray[4] : theme.colors.gray[7]}
                >
                  Already have an account ?{' '}
                  <Text
                    component="a"
                    href="/client/login"
                    c="cyan.5"
                    td="underline"
                    fw={700}
                  >
                    Login
                  </Text>
                </Text>
              </Center>
            </Box>
          </Card>
        </Container>
      </Box>
      <FooterSubscribe />
    </Box>
  );
};

export default Register;
