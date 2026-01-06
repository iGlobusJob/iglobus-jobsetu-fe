import { Group, Stack, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconAlertTriangle } from '@tabler/icons-react';

export const openDeleteRecruiterModal = (
  recruiterId: string,
  onConfirm: (id: string) => void
) => {
  modals.openConfirmModal({
    size: 'md',
    title: (
      <Group gap={8}>
        <IconAlertTriangle size={20} color="red" />
        <Text fw={600}>Delete Recruiter?</Text>
      </Group>
    ),

    children: (
      <Stack gap="md" pb={28}>
        <Text c="dark" size="md" fw={600}>
          Are you sure you want to delete this recruiter?
        </Text>

        <Text fw={600} c="red" size="md">
          This action is irreversible.
        </Text>
      </Stack>
    ),

    labels: { confirm: 'Confirm Delete', cancel: 'Cancel' },
    confirmProps: { color: 'red' },
    centered: true,
    withCloseButton: false,

    onConfirm: () => onConfirm(recruiterId),
  });
};
