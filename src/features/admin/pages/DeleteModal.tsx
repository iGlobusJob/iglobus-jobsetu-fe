import { Box, Group, Stack, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconAlertTriangle } from '@tabler/icons-react';

export const openDeleteRecruiterModal = (
  recruiterId: string,
  onConfirm: (id: string) => void
) => {
  modals.openConfirmModal({
    size: 'md',
    centered: true,
    withCloseButton: false,
    styles: {
      content: {
        borderRadius: 16,
      },
    },
    title: (
      <Group gap={8}>
        <IconAlertTriangle size={20} color="red" />
        <Text fw={600}>Delete Recruiter?</Text>
      </Group>
    ),

    children: (
      <Stack gap="sm" pt="sm" pb={24}>
        <Text size="sm" fw={500}>
          You are about to permanently delete this recruiter account.
        </Text>

        <Text size="sm" c="dimmed">
          This action will remove all associated data and cannot be reversed.
        </Text>

        <Box
          mt="sm"
          p="xs"
          style={{
            backgroundColor: '#fff5f5',
            border: '1px solid #ffa8a8',
            borderRadius: 8,
          }}
        >
          <Text size="sm" fw={600} c="red">
            This action is irreversible.
          </Text>
        </Box>
      </Stack>
    ),

    labels: {
      confirm: 'Delete Recruiter',
      cancel: 'Cancel',
    },

    confirmProps: {
      color: 'red',
      radius: 'md',
    },

    cancelProps: {
      variant: 'light',
      radius: 'md',
    },
    onConfirm: () => onConfirm(recruiterId),
  });
};
