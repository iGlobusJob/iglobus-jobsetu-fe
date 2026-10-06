import {
  Anchor,
  Box,
  Burger,
  Drawer,
  Flex,
  Image,
  Menu,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { logoutClient } from '@/services/client-services';
import { useOtpModalStore } from '@/store/otpModalStore';
import { useAuthStore } from '@/store/userDetails';

import { navItems } from './header/navData';

export const Header: React.FC = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const openModal = useOtpModalStore((state) => state.openModal);
  const { token, userRole, firstName } = useAuthStore();
  const isLoggedIn = Boolean(token);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAuthAction = () => {
    if (isLoggedIn) {
      if (userRole === 'candidate') navigate('/candidate/dashboard');
      else if (userRole === 'client') navigate('/client/dashboard');
    } else {
      openModal();
    }
  };

  return (
    <Box
      component="header"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        backgroundColor: 'transparent',
        zIndex: 50,
      }}
    >
      <Box
        style={{
          width: '100%',
          maxWidth: '1440px',
          height: '100px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid',
          borderImage:
            'linear-gradient(90deg, rgba(255, 255, 255, 0) 12.02%, #5E5E5E 50%, rgba(255, 255, 255, 0) 87.98%) 1',
          boxSizing: 'border-box',
          backgroundColor: 'transparent',
        }}
      >
        <Anchor
          href="/"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Image
            src="/Udyog%20Sethu%20Logo.png"
            alt="Udyog Sethu"
            style={{
              width: '215px',
              height: '32px',
              objectFit: 'contain',
              display: 'block',
              opacity: 1,
              transform: 'rotate(0deg)',
            }}
          />
        </Anchor>

        {/* Desktop Navigation */}
        <Flex gap={28} align="center" visibleFrom="md">
          {navItems.map((item) =>
            item.items ? (
              <Menu
                key={item.label}
                trigger="hover"
                position="bottom"
                withinPortal
              >
                <Menu.Target>
                  <UnstyledButton
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        fontSize: '18px',
                        lineHeight: '22px',
                        color: item.label === 'Home' ? '#000000' : '#525252',
                      }}
                    >
                      {item.label}
                    </Text>
                    <IconChevronDown size={16} color="#525252" />
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  {item.items.map((subItem) => (
                    <Menu.Item
                      key={subItem.label}
                      component={Link}
                      to={subItem.href}
                    >
                      {subItem.label}
                    </Menu.Item>
                  ))}
                </Menu.Dropdown>
              </Menu>
            ) : item.href?.startsWith('/') ? (
              <Anchor
                key={item.label}
                component={Link}
                to={item.href}
                underline="never"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: '18px',
                  lineHeight: '22px',
                  color:
                    location.pathname === item.href ? '#000000' : '#525252',
                }}
              >
                {item.label}
              </Anchor>
            ) : (
              <Anchor
                key={item.label}
                href={item.href}
                underline="never"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: '18px',
                  lineHeight: '22px',
                  color:
                    location.pathname === item.href ? '#000000' : '#525252',
                }}
              >
                {item.label}
              </Anchor>
            )
          )}
        </Flex>

        {/* Action / Register Button */}
        <Box visibleFrom="md">
          {isLoggedIn ? (
            <Menu position="bottom-end" shadow="md">
              <Menu.Target>
                <UnstyledButton
                  style={{
                    padding: '8px 18px',
                    borderRadius: '32px',
                    border: '1px solid #000000',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  <Text fw={500} size="sm" c="#000000">
                    {firstName || 'My Account'}
                  </Text>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={handleAuthAction}>Dashboard</Menu.Item>
                <Menu.Item color="red" onClick={logoutClient}>
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <UnstyledButton
              onClick={() => openModal()}
              style={{
                boxSizing: 'border-box',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px 16px',
                width: '199px',
                height: '39px',
                borderRadius: '32px',
                border: '1px solid #000000',
                backgroundColor: 'transparent',
                cursor: 'pointer',
              }}
            >
              <Text
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px',
                  color: '#000000',
                  userSelect: 'none',
                }}
              >
                Register as Candidate
              </Text>
            </UnstyledButton>
          )}
        </Box>

        {/* Mobile Burger */}
        <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />

        {/* Mobile Drawer */}
        <Drawer opened={opened} onClose={close} size="xs" title="Menu">
          <Stack gap="md" mt="md">
            {navItems.map((item) => (
              <Anchor
                key={item.label}
                href={item.href || '/'}
                onClick={close}
                underline="never"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: '18px',
                  color: '#333333',
                }}
              >
                {item.label}
              </Anchor>
            ))}
            <Box pt="md">
              <UnstyledButton
                onClick={() => {
                  close();
                  handleAuthAction();
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#3BA3D3',
                  color: '#fff',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontWeight: 500,
                }}
              >
                {isLoggedIn ? 'Dashboard' : 'Register as Candidate'}
              </UnstyledButton>
            </Box>
          </Stack>
        </Drawer>
      </Box>
    </Box>
  );
};

export default Header;
