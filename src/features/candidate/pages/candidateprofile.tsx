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
  SegmentedControl,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconFile, IconUpload } from '@tabler/icons-react';
import { useEffect, useState, type JSX } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import type { ApiError } from '@/common';
import {
  getCandidateProfile,
  updateCandidateProfile,
} from '@/services/candidate-services';

// Validation Schema - FIXED: Changed resume validation
const candidateProfileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email('Invalid email address'),
  mobileNumber: z
    .string()
    .regex(/^[0-9]{10}$/, 'Mobile number must be a valid 10-digit number !')
    .or(z.literal(''))
    .optional(),
  gender: z.enum(['Male', 'Female', 'Other']).or(z.literal('')).optional(),
  dateOfBirth: z.string().optional(),
  address: z.string().min(5).optional().or(z.literal('')),
  category: z.enum(['IT', 'Non-IT']),
  // FIXED: File validation - can't use instanceof File in Zod directly
  resume: z
    .union([z.instanceof(File), z.string()])
    .optional()
    .nullable(),
  profileUrl: z.string().url().optional().nullable(),
});

export type CandidateProfileFormData = z.infer<typeof candidateProfileSchema>;

interface ProfileFieldProps {
  label: string;
  error: string | undefined;
  value: string | undefined;
  disabled: boolean;
  editMode: boolean;
  onChange: (value: string) => void;
  type?: 'text' | 'select';
  options?: Array<{ label: string; value: string }>;
}

const ProfileField = ({
  label,
  value,
  error,
  disabled,
  editMode,
  onChange,
  type = 'text',
  options = [],
}: ProfileFieldProps): JSX.Element => {
  return (
    <Stack gap="xs">
      <Text fw={500} size="sm">
        {label}
      </Text>
      {editMode ? (
        <Stack gap={4}>
          {type === 'select' ? (
            <Select
              value={value || ''}
              onChange={(val) => onChange(val || '')}
              placeholder={label}
              data={options}
              radius="md"
              disabled={disabled}
              searchable
              clearable
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
              value={value || ''}
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
          )}
          {error && (
            <Text c="red" size="xs">
              {error}
            </Text>
          )}
        </Stack>
      ) : (
        <Text size="sm">{value || 'N/A'}</Text>
      )}
    </Stack>
  );
};

const CandidateProfilePage = (): JSX.Element => {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState<CandidateProfileFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);
  const [showPdfViewer, setShowPdfViewer] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CandidateProfileFormData>({
    resolver: zodResolver(candidateProfileSchema),
    mode: 'onBlur',
    defaultValues: {
      category: 'IT',
    },
  });

  const formatDate = (date?: string | null): string => {
    if (!date) return 'N/A';
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = d.toLocaleString('en-US', { month: 'short' });
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const extractFileName = (url: string): string => {
    try {
      const path = new URL(url).pathname;
      const fileName = path.split('/').pop() || 'Resume';
      return decodeURIComponent(fileName);
    } catch {
      return 'Resume';
    }
  };

  // Fetch candidate profile
  useEffect(() => {
    const fetchCandidate = async (): Promise<void> => {
      setLoading(true);
      try {
        const data = await getCandidateProfile();
        const formData: CandidateProfileFormData = {
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          mobileNumber: data.mobileNumber || '',
          gender: data.gender || '',
          dateOfBirth: data.dateOfBirth || '',
          address: data.address || '',
          category: data.category || 'IT',
          resume: data.profileUrl || null,
        };
        setProfile(formData);
        reset(formData);

        // Set resume URL and file name if available
        if (data.profileUrl) {
          setResumeUrl(data.profileUrl);
          setResumeFileName(extractFileName(data.profileUrl));
        }
      } catch (error) {
        console.error('Failed to fetch candidate profile:', error);
        toast.error('Unable to fetch candidate details');
      } finally {
        setLoading(false);
      }
    };
    void fetchCandidate();
  }, [reset]);

  // Handle form submission
  const onSubmit = async (data: CandidateProfileFormData): Promise<void> => {
    setSubmitting(true);
    try {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        mobileNumber: data.mobileNumber,
        address: data.address || '',
        dateOfBirth: data.dateOfBirth || '',
        gender: data.gender || '',
        category: data.category,
        resumeFile:
          data.resume instanceof File ? data.resume : (null as File | null),
        profileUrl: data.profileUrl,
      };
      const updated = await updateCandidateProfile(payload);
      setProfile(updated);

      // Update resume URL if new file was uploaded
      if (updated.profileUrl) {
        setResumeUrl(updated.profileUrl);
        setResumeFileName(extractFileName(updated.profileUrl));
      }

      setEditMode(false);
      toast.success('Profile updated successfully !');
    } catch (error) {
      const err = error as ApiError;
      toast.error(
        err?.response?.data?.message ||
          err?.data?.message ||
          err?.message ||
          'Something went wrong'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = (): void => {
    setEditMode(false);
    reset();
  };

  const handleEditToggle = (): void => {
    if (editMode) {
      void handleSubmit(onSubmit)();
    } else {
      setEditMode(true);
    }
  };

  const handleResumeChange = (
    file: File | null,
    onChange: (value: File | null) => void
  ): void => {
    if (file) {
      setResumeFileName(file.name);
      onChange(file);
    }
  };

  const category = watch('category');

  if (loading || !profile) {
    return (
      <Center mih="100vh">
        <Loader />
      </Center>
    );
  }
  const getFileExtension = (url: string) => {
    const cleanUrl = url.split('?')[0] as string;
    return cleanUrl ? (cleanUrl.split('.').pop() ?? '').toLowerCase() : '';
  };

  const getViewerUrl = (fileUrl: string) => {
    const ext = getFileExtension(fileUrl);

    // PDF works naturally in iframe
    if (ext === 'pdf') return fileUrl;

    // For ALL other docs → use Microsoft Office Viewer
    return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`;
  };

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Card withBorder radius="md" p="xl" shadow="sm">
          <Group justify="space-between" align="center">
            <Stack gap={6}>
              <Title order={2} fw={600}>
                Manage your profile and information
              </Title>
              <Text size="sm" c="dimmed">
                Keep your personal and professional details upto date.
              </Text>
            </Stack>
            <Group>
              {editMode && (
                <Button
                  variant="subtle"
                  onClick={handleCancel}
                  disabled={submitting}
                >
                  Cancel
                </Button>
              )}
              <Button
                loading={submitting}
                onClick={handleEditToggle}
                disabled={loading}
              >
                {editMode ? 'Save Changes' : 'Edit Profile'}
              </Button>
            </Group>
          </Group>

          <Group mt="xl" align="center">
            <Avatar
              size={80}
              radius="xl"
              color="blue"
              name={`${profile.firstName?.[0] ?? '?'}${profile.lastName?.[0] ?? ''}`}
            />
            <Stack gap={3}>
              <Title order={3} fw={500}>
                {profile.firstName} {profile.lastName}
              </Title>
              <Text size="sm" c="dimmed">
                {profile.email}
              </Text>
              <Text size="sm" c="dimmed">
                {profile.mobileNumber}
              </Text>
            </Stack>
          </Group>
        </Card>
        <Card withBorder radius="md" p="xl" shadow="xs">
          <Stack gap="sm">
            <Title order={3} fw={600}>
              Personal Information
            </Title>
          </Stack>

          <Divider my="lg" />

          <Stack gap="xl">
            <Group grow align="flex-start">
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <ProfileField
                    label="First Name"
                    value={field.value}
                    error={errors.firstName?.message}
                    disabled={!editMode}
                    editMode={editMode}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <ProfileField
                    label="Last Name"
                    value={field.value}
                    error={errors.lastName?.message}
                    disabled={!editMode}
                    editMode={editMode}
                    onChange={field.onChange}
                  />
                )}
              />
            </Group>
            <Group grow align="flex-start">
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <ProfileField
                    label="Gender"
                    value={field.value}
                    error={errors.gender?.message}
                    disabled={!editMode}
                    editMode={editMode}
                    onChange={field.onChange}
                    type="select"
                    options={[
                      { label: 'Male', value: 'Male' },
                      { label: 'Female', value: 'Female' },
                      { label: 'Other', value: 'Other' },
                    ]}
                  />
                )}
              />
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <Stack gap="xs" style={{ flex: 1 }}>
                    <Text fw={500} size="sm">
                      Date of Birth
                    </Text>
                    {editMode ? (
                      <Stack gap={4}>
                        <DateInput
                          value={field.value ? new Date(field.value) : null}
                          onChange={(date) => {
                            if (!date) {
                              field.onChange('');
                              return;
                            }
                            const iso = new Date(date)
                              .toISOString()
                              .split('T')[0];
                            field.onChange(iso);
                          }}
                          placeholder="Pick a date"
                          radius="md"
                        />
                        {errors.dateOfBirth?.message && (
                          <Text c="red" size="xs">
                            {errors.dateOfBirth.message}
                          </Text>
                        )}
                      </Stack>
                    ) : (
                      <Text size="sm">{formatDate(field.value)}</Text>
                    )}
                  </Stack>
                )}
              />
            </Group>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <ProfileField
                  label="Address"
                  value={field.value}
                  error={errors.address?.message}
                  disabled={!editMode}
                  editMode={editMode}
                  onChange={field.onChange}
                />
              )}
            />
          </Stack>
        </Card>
        {/* Contact Information Section */}
        <Card withBorder radius="md" p="xl" shadow="xs">
          <Stack gap="sm">
            <Title order={3} fw={600}>
              Contact Information
            </Title>
          </Stack>

          <Divider my="lg" />

          <Group grow align="flex-start">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <ProfileField
                  label="Email"
                  value={field.value}
                  error={errors.email?.message}
                  disabled={true}
                  editMode={false}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              name="mobileNumber"
              control={control}
              render={({ field }) => (
                <ProfileField
                  label="Mobile Number"
                  value={field.value}
                  error={errors.mobileNumber?.message}
                  disabled={!editMode}
                  editMode={editMode}
                  onChange={field.onChange}
                />
              )}
            />
          </Group>
        </Card>
        {/* Job Preference & Resume Section */}
        <Card withBorder radius="md" p="xl" shadow="xs">
          <Stack gap="sm">
            <Title order={3} fw={600}>
              Career Information
            </Title>
          </Stack>

          <Divider my="lg" />

          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Stack gap="xs" style={{ flex: 1 }}>
                <Text fw={500} size="sm">
                  Job Preference
                </Text>
                {editMode ? (
                  <SegmentedControl
                    value={field.value}
                    onChange={field.onChange}
                    data={[
                      { label: '💻 IT', value: 'IT' },
                      { label: '🏢 Non-IT', value: 'Non-IT' },
                    ]}
                    fullWidth
                  />
                ) : (
                  <Text size="sm">
                    {category === 'IT' ? '💻 IT' : '🏢 Non-IT'}
                  </Text>
                )}
              </Stack>
            )}
          />
          <Controller
            name="resume"
            control={control}
            render={({ field }) => (
              <Stack gap="xs">
                <Text fw={500} size="sm">
                  Resume
                </Text>
                {editMode ? (
                  <Stack gap={4}>
                    {/* Show existing resume preview */}
                    {resumeUrl && !field.value && (
                      <Stack gap="sm">
                        <Group gap="sm" justify="space-between">
                          <Group gap="sm">
                            <IconFile
                              size={20}
                              color="var(--mantine-color-blue-6)"
                            />
                            <Stack gap={0}>
                              <Text size="sm" fw={500}>
                                {resumeFileName}
                              </Text>
                              <Text size="xs" c="dimmed">
                                Current Resume
                              </Text>
                            </Stack>
                          </Group>
                          <Button
                            variant="subtle"
                            size="xs"
                            onClick={() => setShowPdfViewer(!showPdfViewer)}
                          >
                            {showPdfViewer ? 'Hide' : 'Show'}
                          </Button>
                        </Group>

                        {showPdfViewer && (
                          <div
                            style={{
                              border: '1px solid var(--mantine-color-gray-3)',
                              borderRadius: 'var(--mantine-radius-md)',
                              overflow: 'hidden',
                            }}
                          >
                            <iframe
                              src={resumeUrl}
                              style={{
                                width: '100%',
                                height: '500px',
                                border: 'none',
                              }}
                              title="Resume Preview"
                            />
                          </div>
                        )}
                      </Stack>
                    )}

                    {/* File input for uploading new resume */}
                    <FileInput
                      {...field}
                      value={field.value instanceof File ? field.value : null}
                      leftSection={<IconUpload size={14} />}
                      placeholder={
                        resumeUrl
                          ? 'Choose new resume file to replace'
                          : 'Choose resume file'
                      }
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      clearable
                      onChange={(file) =>
                        handleResumeChange(file, field.onChange)
                      }
                    />

                    {/* Show newly selected file */}
                    {field.value instanceof File && (
                      <Stack
                        gap="sm"
                        p="md"
                        style={{
                          border: '1px solid var(--mantine-color-blue-3)',
                          borderRadius: 'var(--mantine-radius-md)',
                          backgroundColor: 'var(--mantine-color-blue-0)',
                        }}
                      >
                        <Group gap="sm">
                          <IconFile
                            size={20}
                            color="var(--mantine-color-blue-6)"
                          />
                          <Stack gap={0}>
                            <Text size="sm" fw={500}>
                              {field.value.name}
                            </Text>
                            <Text size="xs" c="dimmed">
                              New Resume (to be uploaded)
                            </Text>
                          </Stack>
                        </Group>
                      </Stack>
                    )}

                    <Text size="xs" c="dimmed">
                      Optional • Max size: 5MB • Supported: PDF, DOC, DOCX
                    </Text>
                    {errors.resume?.message && (
                      <Text c="red" size="xs">
                        {typeof errors.resume.message === 'string'
                          ? errors.resume.message
                          : 'Invalid resume'}
                      </Text>
                    )}
                  </Stack>
                ) : resumeUrl ? (
                  <Stack gap="sm">
                    <Group gap="sm" justify="space-between">
                      <Group gap="xs">
                        <IconFile
                          size={20}
                          color="var(--mantine-color-blue-6)"
                        />
                        <Stack gap={0}>
                          <Text size="sm">✓ {resumeFileName}</Text>
                        </Stack>
                      </Group>
                      <Button
                        variant="subtle"
                        size="xs"
                        onClick={() => setShowPdfViewer(!showPdfViewer)}
                      >
                        {showPdfViewer ? 'Hide' : 'Show'}
                      </Button>
                    </Group>

                    {showPdfViewer && (
                      <div
                        style={{
                          border: '1px solid var(--mantine-color-gray-3)',
                          borderRadius: 'var(--mantine-radius-md)',
                          overflow: 'hidden',
                        }}
                      >
                        <iframe
                          src={getViewerUrl(resumeUrl)}
                          style={{
                            width: '100%',
                            height: '500px',
                            border: 'none',
                          }}
                          title="Resume Preview"
                        />
                      </div>
                    )}
                  </Stack>
                ) : (
                  <Text size="sm" c="dimmed">
                    Not Uploaded
                  </Text>
                )}
              </Stack>
            )}
          />
        </Card>
      </Stack>
    </Container>
  );
};

export default CandidateProfilePage;
