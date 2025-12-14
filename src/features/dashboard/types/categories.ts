import type { Icon, IconProps } from '@tabler/icons-react';

export interface categoryInterface {
  id: number;
  title: string;
  jobs: string;
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
  color: string;
  href: string;
}
