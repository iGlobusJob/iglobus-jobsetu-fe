import { zodResolver } from '@hookform/resolvers/zod';
import {
  Avatar,
  Button,
  Card,
  Center,
  Container,
  Divider,
  FileInput,
  Group,
  Loader,
  PasswordInput,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconUpload } from '@tabler/icons-react';
import { useEffect, useState, type JSX } from 'react';
import { Controller, useForm, type FieldPath } from 'react-hook-form';
import { toast } from 'react-toastify';

import {
  getVendorProfile,
  updateClientProfile,
} from '@/services/vendor-services';

import {
  vendorProfileSchema,
  type VendorProfileFormData,
} from '../interface/updateProfileForm';

interface ProfileFieldProps {
  label: string;
  fieldName: FieldPath<VendorProfileFormData>;
  error: string | undefined;
  value: string | undefined;
  disabled: boolean;
  editMode: boolean;
  onChange: (value: string) => void;
  type?: 'text' | 'password' | 'tel';
}

const ProfileField = ({
  label,
  value,
  error,
  disabled,
  editMode,
  onChange,
  type = 'text',
}: ProfileFieldProps): JSX.Element => {
  return (
    <Stack gap={8}>
      <Text size="sm" fw={500} c="dimmed">
        {label}
      </Text>
      {editMode ? (
        <div>
          {type === 'password' ? (
            <PasswordInput
              value={value ?? ''}
              onChange={(e) => onChange(e.currentTarget.value)}
              placeholder={label}
              radius="md"
              disabled={disabled}
              styles={{
                input: {
                  borderColor: error
                    ? 'var(--mantine-color-red-5)'
                    : 'var(--mantine-color-gray-3)',
                },
              }}
            />
          ) : (
            <TextInput
              value={value ?? ''}
              onChange={(e) => onChange(e.currentTarget.value)}
              placeholder={label}
              type={type}
              radius="md"
              disabled={disabled}
              styles={{
                input: {
                  borderColor: error
                    ? 'var(--mantine-color-red-5)'
                    : 'var(--mantine-color-gray-3)',
                },
              }}
            />
          )}
          {error && (
            <Text size="xs" c="red" mt={4}>
              {error}
            </Text>
          )}
        </div>
      ) : (
        <Text fw={600} size="md">
          {value || '-'}
        </Text>
      )}
    </Stack>
  );
};

interface ReadOnlyFieldProps {
  label: string;
  value: string;
}

const ReadOnlyField = ({ label, value }: ReadOnlyFieldProps): JSX.Element => {
  return (
    <Stack gap={8}>
      <Text size="sm" fw={500} c="dimmed">
        {label}
      </Text>
      <Text fw={600} size="md">
        {value || 'N/A'}
      </Text>
    </Stack>
  );
};

const VendorProfilePage = (): JSX.Element => {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState<VendorProfileFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<VendorProfileFormData>({
    resolver: zodResolver(vendorProfileSchema),
    mode: 'onBlur',
  });

  const categoryValue = watch('category');

  // Fetch vendor profile
  useEffect(() => {
    const fetchVendor = async (): Promise<void> => {
      setLoading(true);
      try {
        const data = await getVendorProfile();
        setProfile(data as VendorProfileFormData);
        reset(data as VendorProfileFormData);
        if (data.logoImage) {
          setLogoPreview(data.logoImage);
        }
      } catch (error) {
        console.error('Failed to fetch vendor profile:', error);
        toast.error('Unable to fetch vendor details');
      } finally {
        setLoading(false);
      }
    };

    void fetchVendor();
  }, [reset]);

  const onSubmit = async (data: VendorProfileFormData): Promise<void> => {
    setSubmitting(true);

    try {
      // Remove email and status from data (uneditable fields)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { email, status, ...updatedData } = data;

      // Create FormData to handle binary file upload
      const formData = new FormData();

      Object.entries(updatedData).forEach(([key, value]) => {
        if (key === 'logo' || key === 'logoImage') {
          return;
        }
        if (value === null || value === undefined) {
          return;
        }
        if (typeof value === 'object') {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      });

      if (logoFile) {
        formData.append('logo', logoFile, logoFile.name);
      }

      // Send typed data with logo file to API
      await updateClientProfile({
        ...updatedData,
        logo: logoFile || undefined,
      } as VendorProfileFormData);

      setProfile(data);
      setEditMode(false);
      setLogoFile(null);
      toast.success('Profile updated successfully !');
    } catch (error) {
      console.error('Failed to update vendor profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = (): void => {
    setEditMode(false);
    setLogoFile(null);
    reset();
    if (profile?.logo) {
      setLogoPreview(profile.logo);
    }
  };

  const handleEditToggle = (): void => {
    if (editMode) {
      void handleSubmit(onSubmit)();
    } else {
      setEditMode(true);
    }
  };

  const handleLogoChange = (file: File | null) => {
    if (file) {
      // Store the binary file
      setLogoFile(file);

      // Create preview using FileReader
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLogoPreview(result);
      };
      reader.readAsDataURL(file);
    } else {
      setLogoFile(null);
      setLogoPreview(null);
    }
  };

  const LogoUploadOverlay = () => {
    return (
      <div
        style={{
          position: 'relative',
          width: 'fit-content',
        }}
      >
        <Avatar
          radius="xl"
          size={80}
          color="blue"
          src={logoPreview || profile?.logo || undefined}
          style={{
            transition: 'filter 0.2s ease',
            filter: editMode ? 'brightness(0.7)' : 'brightness(1)',
          }}
        >
          {(profile?.organizationName?.[0] || '?').toUpperCase()}
        </Avatar>
        {editMode && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '0.625rem',
              cursor: 'pointer',
            }}
          >
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <FileInput
                placeholder=""
                leftSection={<IconUpload size={24} />}
                accept="image/jpeg,image/jpg,image/png"
                clearable
                onChange={handleLogoChange}
                style={{ cursor: 'pointer' }}
                styles={{
                  input: {
                    opacity: 0,
                    cursor: 'pointer',
                    width: '80px',
                    height: '80px',
                  },
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <IconUpload size={24} color="white" />
                <Text size="xs" fw={600} c="white">
                  Change
                </Text>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (loading || !profile) {
    return (
      <Container size="xl" py="xl">
        <Center mih="60vh">
          <Loader size="lg" />
        </Center>
      </Container>
    );
  }

  return (
    <Container size="lg" py={{ base: 'lg', sm: 'xl' }}>
      <Group justify="space-between" align="flex-start" mb="xl" wrap="wrap">
        <Stack mb="md" gap={4}>
          <Title order={isMobile ? 4 : 2} fw={700}>
            Profile Settings
          </Title>

          <Text size="sm" color="dimmed">
            Manage your client information and details
          </Text>
        </Stack>
        <Group gap="sm">
          {editMode && (
            <Button
              variant="default"
              radius="md"
              onClick={handleCancel}
              disabled={submitting}
            >
              Cancel
            </Button>
          )}
          <Button
            variant={editMode ? 'filled' : 'light'}
            radius="md"
            onClick={handleEditToggle}
            loading={submitting}
            disabled={loading}
          >
            {editMode ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </Group>
      </Group>

      <Card withBorder shadow="sm" radius="lg" p={{ base: 'md', sm: 'lg' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap="lg">
            {/* Header Section */}
            <Group align="center" gap="lg" wrap="wrap">
              <LogoUploadOverlay />

              <Stack gap={6} style={{ flex: 1 }}>
                <Group gap="md" align="center" wrap="wrap">
                  <Text fw={700} size="lg">
                    {profile.organizationName}
                  </Text>
                </Group>
                <Text size="sm" c="dimmed">
                  {profile.email}
                </Text>
                <Text size="sm" c="dimmed">
                  {profile.location}
                </Text>
              </Stack>
            </Group>

            <Divider />

            {/* Organization Details Section */}
            <Stack gap="lg">
              <Text fw={600} size="md">
                Organization Details
              </Text>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1.5rem',
                }}
              >
                <Controller
                  name="organizationName"
                  control={control}
                  render={({ field }) => (
                    <ProfileField
                      label="Organization Name"
                      fieldName="organizationName"
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.organizationName?.message}
                      disabled={submitting}
                      editMode={editMode}
                    />
                  )}
                />

                <ReadOnlyField label="Email" value={profile.email || ''} />

                <Controller
                  name="mobile"
                  control={control}
                  render={({ field }) => (
                    <ProfileField
                      label="Mobile Number"
                      fieldName="mobile"
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.mobile?.message}
                      disabled={submitting}
                      editMode={editMode}
                      type="tel"
                    />
                  )}
                />

                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <ProfileField
                      label="Location"
                      fieldName="location"
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.location?.message}
                      disabled={submitting}
                      editMode={editMode}
                    />
                  )}
                />

                <Controller
                  name="gstin"
                  control={control}
                  render={({ field }) => (
                    <ProfileField
                      label="GSTIN"
                      fieldName="gstin"
                      value={field.value || ''}
                      onChange={field.onChange}
                      error={errors.gstin?.message}
                      disabled={submitting}
                      editMode={editMode}
                    />
                  )}
                />

                <Controller
                  name="panCard"
                  control={control}
                  render={({ field }) => (
                    <ProfileField
                      label="PAN Card"
                      fieldName="panCard"
                      value={field.value || ''}
                      onChange={field.onChange}
                      error={errors.panCard?.message}
                      disabled={submitting}
                      editMode={editMode}
                    />
                  )}
                />
              </div>
            </Stack>

            <Divider />

            {/* Category & Logo Section */}
            <Stack gap="lg">
              <Text fw={600} size="md">
                Business Information
              </Text>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1.5rem',
                }}
              >
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Stack gap={8}>
                      <Text size="sm" fw={500} c="dimmed">
                        Business Category
                      </Text>
                      {editMode ? (
                        <div>
                          <Select
                            placeholder="Select category"
                            data={[
                              { value: 'IT', label: '💻 IT' },
                              { value: 'NON_IT', label: '🏢 Non-IT' },
                            ]}
                            value={field.value}
                            onChange={field.onChange}
                            radius="md"
                            disabled
                            styles={{
                              input: {
                                borderColor: errors.category?.message
                                  ? 'var(--mantine-color-red-5)'
                                  : 'var(--mantine-color-gray-3)',
                              },
                            }}
                          />
                          {errors.category?.message && (
                            <Text size="xs" c="red" mt={4}>
                              {errors.category.message}
                            </Text>
                          )}
                        </div>
                      ) : (
                        <Text fw={600} size="md">
                          {categoryValue === 'IT' ? '💻 IT' : '🏢 Non-IT'}
                        </Text>
                      )}
                    </Stack>
                  )}
                />
              </div>
            </Stack>

            <Divider />

            {/* Primary Contact Section */}
            <Stack gap="lg">
              <Text fw={600} size="md">
                Primary Contact
              </Text>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1.5rem',
                }}
              >
                <Controller
                  name="primaryContact.firstName"
                  control={control}
                  render={({ field }) => (
                    <ProfileField
                      label="First Name"
                      fieldName="primaryContact.firstName"
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.primaryContact?.firstName?.message}
                      disabled={submitting}
                      editMode={editMode}
                    />
                  )}
                />

                <Controller
                  name="primaryContact.lastName"
                  control={control}
                  render={({ field }) => (
                    <ProfileField
                      label="Last Name"
                      fieldName="primaryContact.lastName"
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.primaryContact?.lastName?.message}
                      disabled={submitting}
                      editMode={editMode}
                    />
                  )}
                />
              </div>
            </Stack>

            <Divider />

            {/* Secondary Contact Section */}
            <Stack gap="lg">
              <Text fw={600} size="md">
                Secondary Contact
              </Text>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1.5rem',
                }}
              >
                <Controller
                  name="secondaryContact.firstName"
                  control={control}
                  render={({ field }) => (
                    <ProfileField
                      label="First Name"
                      fieldName="secondaryContact.firstName"
                      value={field.value || ''}
                      onChange={field.onChange}
                      error={errors.secondaryContact?.firstName?.message}
                      disabled={submitting}
                      editMode={editMode}
                    />
                  )}
                />

                <Controller
                  name="secondaryContact.lastName"
                  control={control}
                  render={({ field }) => (
                    <ProfileField
                      label="Last Name"
                      fieldName="secondaryContact.lastName"
                      value={field.value || ''}
                      onChange={field.onChange}
                      error={errors.secondaryContact?.lastName?.message}
                      disabled={submitting}
                      editMode={editMode}
                    />
                  )}
                />
              </div>
            </Stack>

            <Divider />

            {/* Password Section */}
            {editMode && (
              <Stack gap="lg">
                <Text fw={600} size="md">
                  Security
                </Text>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1.5rem',
                  }}
                >
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <ProfileField
                        label="New Password"
                        fieldName="password"
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.password?.message}
                        disabled={submitting}
                        editMode={editMode}
                        type="password"
                      />
                    )}
                  />
                </div>
                {editMode && (
                  <Text size="xs" c="dimmed">
                    Min 8 characters, must include uppercase, lowercase, number,
                    and special character
                  </Text>
                )}
              </Stack>
            )}
          </Stack>
        </form>
      </Card>
    </Container>
  );
};

export default VendorProfilePage;
