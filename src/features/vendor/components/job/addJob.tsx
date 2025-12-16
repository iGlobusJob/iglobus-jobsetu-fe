import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Card,
  Center,
  Container,
  Grid,
  Group,
  Loader,
  NumberInput,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconBriefcase,
  IconCalendar,
  IconCurrencyDollar,
  IconFileText,
} from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  JobDescriptionEditor,
  type JobDescriptionEditorRef,
} from '@/components/richTextEditor';
import type { JobPostFormData } from '@/features/dashboard/types/job';
import {
  createJob,
  getJobDetailsById,
  updateJobById,
} from '@/services/vendor-services';

import {
  jobPostSchema,
  type JobPostFormSchema,
} from '../../interface/jobPostFormValidation';

const getPlainText = (html: string) => {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, '').trim();
};

const JOB_TYPES = [
  { value: 'full-time', label: 'Full-Time' },
  { value: 'part-time', label: 'Part-Time' },
  { value: 'contract', label: 'Contract' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'internship', label: 'Internship' },
];

const JOB_STATUS = [
  { value: 'drafted', label: 'Draft' },
  { value: 'active', label: 'Published' },
  { value: 'closed', label: 'Closed' },
];

/**
 * Job Post Form Component
 * Used by vendors/employers to create or edit job postings
 * Fetches job details from URL params if editing
 */
export const JobPostForm = () => {
  const { jobId } = useParams();
  const [jobDescription, setJobDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [submitMode, setSubmitMode] = useState<'draft' | 'active'>('draft');
  const [loading, setLoading] = useState(!!jobId);

  const editorRef = useRef<JobDescriptionEditorRef>(null);

  // Form setup
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(jobPostSchema),
    defaultValues: {
      jobTitle: '',
      jobDescription: '',
      postStart: new Date(),
      postEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      noOfPositions: 1,
      minimumSalary: 0,
      maximumSalary: 0,
      jobType: '',
      jobLocation: '',
      minimumExperience: 0,
      maximumExperience: 0,
      status: 'drafted',
    },
  });

  // Fetch job details if editing
  useEffect(() => {
    if (jobId) {
      const fetchJobDetails = async () => {
        try {
          setLoading(true);
          const jobData = await getJobDetailsById(jobId);

          // Populate form with job data
          reset({
            jobTitle: jobData.jobTitle,
            jobDescription: jobData.jobDescription,
            postStart: new Date(jobData.postStart),
            postEnd: new Date(jobData.postEnd),
            noOfPositions: jobData.noOfPositions,
            minimumSalary: jobData.minimumSalary,
            maximumSalary: jobData.maximumSalary,
            jobType: jobData.jobType,
            jobLocation: jobData.jobLocation,
            minimumExperience: jobData.minimumExperience,
            maximumExperience: jobData.maximumExperience,
            status: jobData.status,
          });

          setJobDescription(jobData.jobDescription);
          setLoading(false);
        } catch {
          toast.error('Failed to load job details');
          setLoading(false);
        }
      };

      fetchJobDetails();
    }
  }, [jobId, reset]);

  const watchMinSalary = watch('minimumSalary');
  const watchMaxSalary = watch('maximumSalary');
  const rawStart = watch('postStart');
  const rawEnd = watch('postEnd');
  const watchStartDate = rawStart ? new Date(rawStart) : null;
  const watchEndDate = rawEnd ? new Date(rawEnd) : null;
  const isMobile = useMediaQuery('(max-width: 768px)');

  const onSubmit = async (data: JobPostFormSchema) => {
    try {
      // Override status based on button clicked
      const status = jobId
        ? data.status
        : submitMode === 'draft'
          ? 'drafted'
          : 'active';

      const text = getPlainText(jobDescription);

      if (text.length < 50) {
        toast.error('Job description must be at least 50 characters');
        return;
      }

      if (text.length > 5000) {
        toast.error('Job description cannot exceed 5000 characters');
        return;
      }

      const formData: JobPostFormData = {
        ...data,
        status,
        jobDescription,
        postStart: new Date(data.postStart),
        postEnd: new Date(data.postEnd),
      };

      if (!jobId) {
        // Create new job
        await createJob(formData);
        reset();
        setJobDescription('');
        editorRef.current?.clear();
        toast.success(
          status === 'drafted'
            ? 'Job saved as draft !'
            : 'Job posted successfully !'
        );
      } else {
        // Update existing job
        await updateJobById(jobId, formData);
        toast.success('Job updated successfully !');
      }
    } catch (error) {
      const err = error as unknown;
      let message = 'Something went wrong.';

      if (
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof (err as { response?: unknown }).response === 'object'
      ) {
        const response = (err as { response: { data?: unknown } }).response;
        if (
          response &&
          typeof response.data === 'object' &&
          response.data !== null &&
          'message' in response.data
        ) {
          message = String(
            (response.data as { message?: string }).message || message
          );
        }
      }

      toast.error(message);
    }
  };

  if (loading) {
    return (
      <Center style={{ height: '400px' }}>
        <Loader />
      </Center>
    );
  }

  return (
    <Container size="xl">
      <Stack mb="md" gap={4}>
        <Title order={isMobile ? 4 : 2} fw={700}>
          {jobId ? 'Edit Job Listing' : 'Create a New Job Listing'}
        </Title>

        <Text size="sm" color="dimmed">
          Fill in the details below to {jobId ? 'update your' : 'create a new'}{' '}
          job posting
        </Text>
      </Stack>
      <Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap="lg">
            {/* Job Title Section */}
            <Card withBorder padding="md">
              <Stack gap="md">
                <Group>
                  <IconBriefcase size={20} />
                  <Title order={4}>Job Information</Title>
                </Group>

                <TextInput
                  label="Job Title"
                  placeholder="e.g., Senior React Developer"
                  leftSection={<IconBriefcase size={16} />}
                  {...register('jobTitle')}
                  error={errors.jobTitle?.message}
                  required
                />
              </Stack>
            </Card>

            {/* Job Description Section */}
            <Card withBorder padding="md">
              <Stack gap="md">
                <Group>
                  <IconFileText size={20} />
                  <Title order={4}>Job Description</Title>
                </Group>

                <Stack gap="xs">
                  <Text size="sm" c="dimmed">
                    Provide detailed information about the role,
                    responsibilities, and requirements
                  </Text>

                  <JobDescriptionEditor
                    ref={editorRef}
                    value={jobDescription}
                    onChange={(value) => {
                      setJobDescription(value);
                      setDescriptionError('');
                    }}
                    minHeight={300}
                  />

                  {descriptionError && (
                    <Text size="sm" c="red">
                      {descriptionError}
                    </Text>
                  )}

                  <Group justify="space-between">
                    <Text size="xs" c="dimmed">
                      {getPlainText(jobDescription).length} / 5000 characters
                    </Text>
                  </Group>
                </Stack>
              </Stack>
            </Card>

            {/* Dates Section */}
            <Card withBorder padding="md">
              <Stack gap="md">
                <Group>
                  <IconCalendar size={20} />
                  <Title order={4}>Job Posting Dates</Title>
                </Group>

                <Grid>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Controller
                      name="postStart"
                      control={control}
                      render={({ field }) => (
                        <DateInput
                          label="Start Date"
                          placeholder="Pick start date"
                          leftSection={<IconCalendar size={16} />}
                          {...field}
                          error={errors.postStart?.message}
                          required
                        />
                      )}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Controller
                      name="postEnd"
                      control={control}
                      render={({ field }) => (
                        <DateInput
                          label="End Date"
                          placeholder="Pick end date"
                          leftSection={<IconCalendar size={16} />}
                          {...field}
                          error={errors.postEnd?.message}
                          required
                        />
                      )}
                    />
                  </Grid.Col>
                </Grid>

                {watchStartDate && watchEndDate && (
                  <Paper p="sm" radius="md">
                    <Text size="sm">
                      Job will be active for{' '}
                      <strong>
                        {Math.ceil(
                          (watchEndDate.getTime() - watchStartDate.getTime()) /
                            (1000 * 60 * 60 * 24)
                        )}{' '}
                        days
                      </strong>
                    </Text>
                  </Paper>
                )}
              </Stack>
            </Card>

            {/* Positions & Salary Section */}
            <Card withBorder padding="md">
              <Stack gap="md">
                <Group>
                  <IconCurrencyDollar size={20} />
                  <Title order={4}>Positions & Salary</Title>
                </Group>

                <Grid>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Controller
                      name="minimumSalary"
                      control={control}
                      render={({ field }) => (
                        <NumberInput
                          label="Minimum Salary"
                          placeholder="Enter minimum salary"
                          min={0}
                          {...field}
                          onChange={(val) =>
                            field.onChange(val ? Number(val) : 0)
                          }
                          error={errors.minimumSalary?.message}
                          required
                        />
                      )}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Controller
                      name="maximumSalary"
                      control={control}
                      render={({ field }) => (
                        <NumberInput
                          label="Maximum Salary"
                          placeholder="Enter maximum salary"
                          min={0}
                          {...field}
                          onChange={(val) => field.onChange(Number(val))}
                          error={errors.maximumSalary?.message}
                          required
                        />
                      )}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Controller
                      name="noOfPositions"
                      control={control}
                      render={({ field }) => (
                        <NumberInput
                          label="Number of Positions"
                          placeholder="Enter number of positions"
                          min={1}
                          {...field}
                          onChange={(val) =>
                            field.onChange(val !== '' ? Number(val) : undefined)
                          }
                          error={errors.noOfPositions?.message}
                          required
                        />
                      )}
                    />
                  </Grid.Col>
                </Grid>

                {/* Salary Summary Card */}
                {watchMinSalary > 0 && watchMaxSalary > 0 && (
                  <Paper p="md" radius="md" withBorder>
                    <Group justify="space-between">
                      <div>
                        <Text size="sm" c="dimmed">
                          Salary Range
                        </Text>
                        <Text fw={600}>
                          ₹{watchMinSalary.toLocaleString('en-IN')} - ₹
                          {watchMaxSalary.toLocaleString('en-IN')} per year
                        </Text>
                      </div>
                      <div>
                        <Text size="sm" c="dimmed">
                          Average
                        </Text>
                        <Text fw={600}>
                          ₹
                          {Math.round(
                            (watchMinSalary + watchMaxSalary) / 2
                          ).toLocaleString('en-IN')}
                          /year
                        </Text>
                      </div>
                    </Group>
                  </Paper>
                )}
              </Stack>
            </Card>

            {/* Additional Job Details Section */}
            <Card withBorder padding="md">
              <Stack gap="md">
                <Group>
                  <IconBriefcase size={20} />
                  <Title order={4}>Additional Job Details</Title>
                </Group>

                <Grid>
                  {/* Job Type Dropdown */}
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Controller
                      name="jobType"
                      control={control}
                      render={({ field }) => (
                        <Select
                          label="Job Type"
                          placeholder="Select job type"
                          data={JOB_TYPES}
                          searchable
                          clearable
                          {...field}
                          error={errors.jobType?.message}
                          required
                        />
                      )}
                    />
                  </Grid.Col>

                  {/* Job Location */}
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Job Location"
                      placeholder="e.g., New York, NY"
                      leftSection={<IconBriefcase size={16} />}
                      {...register('jobLocation')}
                      error={errors.jobLocation?.message}
                    />
                  </Grid.Col>

                  {/* Minimum Experience */}
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Controller
                      name="minimumExperience"
                      control={control}
                      render={({ field }) => (
                        <NumberInput
                          label="Minimum Experience (Years)"
                          placeholder="Enter minimum experience"
                          min={0}
                          {...field}
                          onChange={(val) =>
                            field.onChange(val ? Number(val) : 0)
                          }
                          error={errors.minimumExperience?.message}
                        />
                      )}
                    />
                  </Grid.Col>

                  {/* Maximum Experience */}
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Controller
                      name="maximumExperience"
                      control={control}
                      render={({ field }) => (
                        <NumberInput
                          label="Maximum Experience (Years)"
                          placeholder="Enter maximum experience"
                          min={0}
                          {...field}
                          onChange={(val) =>
                            field.onChange(val ? Number(val) : 0)
                          }
                          error={errors.maximumExperience?.message}
                        />
                      )}
                    />
                  </Grid.Col>

                  {/* Status Dropdown */}
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    {jobId && (
                      <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                          <Select
                            label="Status"
                            placeholder="Select status"
                            data={JOB_STATUS}
                            searchable
                            {...field}
                            error={errors.status?.message}
                            required
                          />
                        )}
                      />
                    )}
                  </Grid.Col>
                </Grid>
              </Stack>
            </Card>

            {/* Form Actions */}
            <Group justify="flex-end" gap="md">
              <Button
                variant="default"
                onClick={() => {
                  reset();
                  setJobDescription('');
                }}
                disabled={!isDirty || isSubmitting}
              >
                Clear Form
              </Button>

              {/* Save as Draft */}
              {!jobId && (
                <Button
                  type="submit"
                  loading={isSubmitting && submitMode === 'draft'}
                  onClick={() => setSubmitMode('draft')}
                  disabled={
                    (!isDirty && !jobId) ||
                    (isSubmitting && submitMode !== 'draft')
                  }
                >
                  Draft
                </Button>
              )}

              {/* Publish Job */}
              <Button
                type="submit"
                loading={isSubmitting && submitMode === 'active'}
                onClick={() => setSubmitMode('active')}
                disabled={
                  (!isDirty && !jobId) ||
                  (isSubmitting && submitMode !== 'active')
                }
              >
                {jobId ? 'Update Job' : 'Post Job'}
              </Button>
            </Group>

            {/* Info Card */}
            <Card withBorder padding="md">
              <Stack gap="sm">
                <Group>
                  <Text fw={600}>💡 Tips for a Better Job Posting</Text>
                </Group>
                <Stack gap="xs" pl="md">
                  <Text size="sm">
                    • Write a clear and detailed job description to attract
                    qualified candidates
                  </Text>
                  <Text size="sm">
                    • Be specific about responsibilities and requirements
                  </Text>
                  <Text size="sm">
                    • Set a reasonable salary range to attract the right talent
                  </Text>
                  <Text size="sm">
                    • Choose an appropriate posting duration (typically 30-60
                    days)
                  </Text>
                </Stack>
              </Stack>
            </Card>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
};
