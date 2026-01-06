import { Group, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconAlertTriangle } from '@tabler/icons-react';

export const openDeleteRecruiterModal = (
  recruiterId: string,
  onConfirm: (id: string) => void
) => {
  modals.openConfirmModal({
    title: (
      <Group gap={8}>
        <IconAlertTriangle size={20} color="red" />
        <Text fw={600}>Delete Recruiter?</Text>
      </Group>
    ),

    children: (
      <Text c="dimmed" size="sm">
        Are you sure you want to delete this recruiter? <br />
        <Text span fw={600} c="red">
          This action is irreversible.
        </Text>
      </Text>
    ),

    labels: { confirm: 'Confirm Delete', cancel: 'Cancel' },
    confirmProps: { color: 'red' },
    centered: true,
    withCloseButton: false,

    onConfirm: () => onConfirm(recruiterId),
  });
};
