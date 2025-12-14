import {
  Badge,
  Box,
  Collapse,
  NavLink as MantineNavLink,
  ScrollArea,
  Stack,
} from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { getMenuForRole, type MenuItem } from '@/config/menuConfig/menuConfig';
import { useAuthStore } from '@/store/userDetails';

import classes from './sidebar.module.css';

export const Sidebar = () => {
  const { userRole } = useAuthStore();
  const location = useLocation();
  const menuItems = getMenuForRole(userRole);

  return (
    <Box className={classes.sidebar}>
      <ScrollArea className={classes.scrollArea}>
        <Stack gap="sm" p="md">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              isActive={location.pathname === item.path}
            />
          ))}
        </Stack>
      </ScrollArea>
    </Box>
  );
};

interface SidebarItemProps {
  item: MenuItem;
  isActive: boolean;
  level?: number;
}

const SidebarItem = ({ item, isActive, level = 0 }: SidebarItemProps) => {
  const [opened, setOpened] = useState(false);
  const location = useLocation();
  const hasChildren = item.children && item.children.length > 0;

  const isChildActive = item.children?.some(
    (child) => location.pathname === child.path
  );
  useEffect(() => {
    if (isChildActive) {
      setOpened(true);
    }
  }, [isChildActive]);

  const toggle = () => hasChildren && setOpened((o) => !o);

  const navContent = (
    <MantineNavLink
      component={hasChildren ? 'button' : 'div'}
      label={item.label}
      leftSection={item.icon}
      rightSection={
        <>
          {item.badge && (
            <Badge size="sm" color="red" circle>
              {item.badge}
            </Badge>
          )}
          {hasChildren && (
            <IconChevronDown
              size={16}
              className={`${classes.chevron} ${opened ? classes.rotated : ''}`}
            />
          )}
        </>
      }
      active={isActive || isChildActive}
      onClick={toggle}
      className={classes.navItem}
      style={{ paddingLeft: level * 16 + 20 }}
    />
  );

  // no children → direct NavLink wrapper
  if (!hasChildren) {
    return (
      <NavLink className={classes.linkWrapper} to={item.path}>
        {navContent}
      </NavLink>
    );
  }

  return (
    <>
      {navContent}

      <Collapse in={opened}>
        <Stack gap={4} mt={6}>
          {item.children &&
            item.children.map((child) => (
              <SidebarItem
                key={child.id}
                item={child}
                isActive={location.pathname === child.path}
                level={level + 1}
              />
            ))}
        </Stack>
      </Collapse>
    </>
  );
};
