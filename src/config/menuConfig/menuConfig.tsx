import {
  IconBookmark,
  IconBriefcase,
  IconBuilding,
  IconFileText,
  IconHome,
  IconSearch,
  IconUser,
  IconUserBitcoin,
  IconUsers,
} from '@tabler/icons-react';

import type { UserRole } from '@/store/userDetails';

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  badge?: number; // Optional notification badge
  children?: MenuItem[]; // For nested menus
}

interface MenuConfig {
  candidate: MenuItem[];
  client: MenuItem[];
  admin: MenuItem[];
  recruiter: MenuItem[];
}

/**
 * Define menu items for each role
 * This is the single source of truth for all navigation
 */
export const MENU_CONFIG: MenuConfig = {
  // ===== CANDIDATE MENU =====
  candidate: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <IconHome size={20} />,
      path: '/candidate/dashboard',
    },
    {
      id: 'search-jobs',
      label: 'Search Jobs',
      icon: <IconSearch size={20} />,
      path: '/candidate/search',
    },
    {
      id: 'saved-jobs',
      label: 'Saved Jobs',
      icon: <IconBookmark size={20} />,
      path: '/candidate/saved-jobs',
    },
    {
      id: 'applications',
      label: 'My Applications',
      icon: <IconFileText size={20} />,
      path: '/candidate/applications',
      // badge: 3, // Example: 3 pending applications
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <IconUser size={20} />,
      path: '/candidate/profile',
    },
  ],

  // ===== CLIENT MENU =====
  client: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <IconHome size={20} />,
      path: '/client/dashboard',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <IconUser size={20} />,
      path: '/client/profile',
    },
    {
      id: 'post-job',
      label: 'Post Job',
      icon: <IconBriefcase size={20} />,
      path: '/client/jobs/new',
    },
    {
      id: 'manage-jobs',
      label: 'Manage Jobs',
      icon: <IconFileText size={20} />,
      path: '/client/jobs/manage-jobs',
    },
    // {
    //   id: 'analytics',
    //   label: 'Analytics',
    //   icon: <IconChartBar size={20} />,
    //   path: '/client/analytics',
    // },
    // {
    //   id: 'messages',
    //   label: 'Messages',
    //   icon: <IconMessage size={20} />,
    //   path: '/client/messages',
    //   badge: 8,
    // },
    // {
    //   id: 'settings',
    //   label: 'Settings',
    //   icon: <IconSettings size={20} />,
    //   path: '/client/settings',
    // },
  ],

  // ===== ADMIN MENU =====
  admin: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <IconHome size={20} />,
      path: '/admin/dashboard',
    },
    {
      id: 'users',
      label: 'User Management',
      icon: <IconUsers size={20} />,
      path: '/admin/users',
      children: [
        // {
        //   id: 'all-users',
        //   label: 'All Users',
        //   icon: <IconUsers size={18} />,
        //   path: '/admin/users',
        // },
        {
          id: 'vendors',
          label: 'Clients',
          icon: <IconBuilding size={18} />,
          path: '/admin/clients',
        },
        {
          id: 'candidates',
          label: 'Candidates',
          icon: <IconUser size={18} />,
          path: '/admin/candidates',
        },
        {
          id: 'recruiters',
          label: 'Recruiters',
          icon: <IconUsers size={18} />,
          path: '/admin/recruiters',
        },
      ],
    },
    {
      id: 'jobs',
      label: 'Job Management',
      icon: <IconBriefcase size={20} />,
      path: '/admin/jobs',
      children: [
        {
          id: 'alljobs',
          label: 'Jobs',
          icon: <IconFileText size={20} />,
          path: '/admin/all-jobs',
        },
      ],
    },
    // {
    //   id: 'reports',
    //   label: 'Reports',
    //   icon: <IconChartBar size={20} />,
    //   path: '/admin/reports',
    // },
    // {
    //   id: 'notifications',
    //   label: 'Notifications',
    //   icon: <IconBell size={20} />,
    //   path: '/admin/notifications',
    //   badge: 15,
    // },
    // {
    //   id: 'settings',
    //   label: 'Settings',
    //   icon: <IconSettings size={20} />,
    //   path: '/admin/settings',
    // },
  ],

  recruiter: [
    {
      id: 'jobs',
      label: 'Jobs',
      icon: <IconBriefcase size={20} />,

      path: '/recruiter/jobs',
    },
    {
      id: 'clients',
      label: 'Clients',
      icon: <IconUserBitcoin size={20} />,
      path: '/recruiter/clients',
    },
    {
      id: 'candidates',
      label: 'Candidates',
      icon: <IconUsers size={20} />,
      path: '/recruiter/candidates',
    },
  ],
};

export const getMenuForRole = (role: UserRole): MenuItem[] => {
  if (!role) return [];
  return MENU_CONFIG[role] || [];
};
