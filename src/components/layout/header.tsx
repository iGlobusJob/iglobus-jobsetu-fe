import {
  Avatar,
  Box,
  Burger,
  Flex,
  Group,
  Menu,
  rem,
  Text,
  UnstyledButton,
} from '@mantine/core';
import {
  IconLogout,
  IconSettings,
  IconUser,
  IconUserPlus,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/store/userDetails';
import { COMPANY_NAME } from '@/utils/constants/const';

interface HeaderProps {
  mobileOpened: boolean;
  desktopOpened: boolean;
  toggleMobile: () => void;
  toggleDesktop: () => void;
}

export const Header = ({
  mobileOpened,
  desktopOpened,
  toggleMobile,
  toggleDesktop,
}: HeaderProps) => {
  const navigate = useNavigate();
  const { email, userRole, firstName, lastName, clearAuth } = useAuthStore();
  const isAdmin = userRole === 'admin';

  const handleLogout = () => {
    clearAuth();
    navigate(`/${userRole}/login`);
  };

  return (
    <Flex
      h={rem(60)}
      px="md"
      justify="space-between"
      align="center"
      style={{
        borderBottom: '1px solid var(--mantine-color-gray-3)',
        backgroundColor: 'var(--mantine-color-body)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      {/* LEFT SECTION */}
      <Group gap="sm">
        {/* Mobile burger */}
        <Burger
          opened={mobileOpened}
          onClick={toggleMobile}
          hiddenFrom="sm"
          size="sm"
        />

        {/* Desktop burger */}
        <Burger
          opened={desktopOpened}
          onClick={toggleDesktop}
          visibleFrom="sm"
          size="sm"
        />

        {/* Company name */}
        <Box
          style={{
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          <Text
            fw={700}
            size="lg"
            visibleFrom="xs"
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '140px',
            }}
          >
            {COMPANY_NAME}
          </Text>

          {/* Smaller text for very small screens */}
          <Text
            fw={700}
            size="md"
            hiddenFrom="xs"
            style={{
              maxWidth: '110px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {COMPANY_NAME}
          </Text>
        </Box>
      </Group>

      {/* RIGHT SECTION */}
      <Menu shadow="md" width={200} position="bottom-end">
        <Menu.Target>
          <UnstyledButton
            style={{
              padding: '6px 10px',
              borderRadius: 8,
              transition: 'background 0.2s ease',
            }}
          >
            <Group gap="xs">
              <Avatar size="sm" radius="xl" />

              {/* Hide email & role on extra small screens */}
              <Box style={{ lineHeight: 1 }} visibleFrom="sm">
                <Text size="xs" fw={600}>
                  {email}
                </Text>
                {userRole === 'admin' ? (
                  <Text size="xs" tt="capitalize">
                    {userRole}
                  </Text>
                ) : (
                  <Text size="xs" tt="capitalize">
                    {firstName} {lastName}
                  </Text>
                )}
              </Box>
            </Group>
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Account</Menu.Label>

          <Menu.Item
            leftSection={<IconUser size={16} />}
            onClick={() => navigate(`/${userRole}/profile`)}
          >
            Profile
          </Menu.Item>

          {userRole !== 'candidate' && (
            <Menu.Item
              leftSection={<IconSettings size={16} />}
              onClick={() => navigate(`/${userRole}/settings`)}
            >
              Settings
            </Menu.Item>
          )}
          {isAdmin && (
            <Menu.Item
              leftSection={<IconUserPlus size={16} />}
              onClick={() => navigate(`/admin/add-admin`)}
            >
              Create New Admin
            </Menu.Item>
          )}

          <Menu.Divider />

          <Menu.Item
            color="red"
            leftSection={<IconLogout size={16} />}
            onClick={handleLogout}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Flex>
  );
};
