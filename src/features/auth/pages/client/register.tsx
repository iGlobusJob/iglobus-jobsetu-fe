import {
  Box,
  Button,
  Card,
  Center,
  Checkbox,
  Container,
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
        <ScrollArea h={320}>
          <Stack gap="sm">
            <Text size="sm">
              These Terms & Conditions govern your access to and use of our
              platform. By registering, you agree to comply with all applicable
              laws, policies, and guidelines.
            </Text>

            <Text size="sm">
              <b>1. Account Responsibility</b>
              <br />
              You are responsible for maintaining the confidentiality of your
              account credentials and all activities conducted through your
              account.
            </Text>

            <Text size="sm">
              <b>2. Information Accuracy</b>
              <br />
              You confirm that all information provided during registration is
              true, accurate, and up to date. Any false information may result
              in account suspension or termination.
            </Text>

            <Text size="sm">
              <b>3. Data Usage</b>
              <br />
              We may collect and process your data in accordance with our
              Privacy Policy for the purpose of providing and improving our
              services.
            </Text>

            <Text size="sm">
              <b>4. Termination</b>
              <br />
              We reserve the right to suspend or terminate accounts that violate
              these terms or engage in unlawful activities.
            </Text>

            <Text size="sm" c="dimmed">
              By clicking “Accept”, you acknowledge that you have read,
              understood, and agreed to these Terms & Conditions.
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
