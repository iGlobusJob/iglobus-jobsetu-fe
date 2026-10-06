import { Box, Button, Container, Flex } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';

import { BrochureViewer } from './BrochureViewer';

export const BrochureSection: React.FC = () => {
  return (
    <Box
      component="section"
      id="brochure"
      style={{
        width: '100%',
        backgroundColor: '#F8FAFC',
        padding: '80px 24px',
        boxSizing: 'border-box',
        borderTop: '1px solid #E2E8F0',
        borderBottom: '1px solid #E2E8F0',
      }}
    >
      <Container size="xl" p={0}>
        <BrochureViewer showTitle={true} compact={false} />

        <Flex justify="center" mt={40}>
          <Button
            component={Link}
            to="/brochure"
            size="lg"
            radius="xl"
            color="blue"
            rightSection={<IconArrowRight size={18} />}
            style={{
              backgroundColor: '#175DB1',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              padding: '12px 32px',
              boxShadow: '0 8px 24px rgba(23, 93, 177, 0.25)',
            }}
          >
            Open Full Digital Booklet
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default BrochureSection;
