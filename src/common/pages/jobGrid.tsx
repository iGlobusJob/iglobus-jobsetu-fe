import { Grid } from '@mantine/core';
import type { ReactNode } from 'react';

interface JobGridProps {
  children: ReactNode;
}

export const JobGrid = ({ children }: JobGridProps) => {
  return (
    <Grid gutter="xl" align="stretch">
      {children}
    </Grid>
  );
};
