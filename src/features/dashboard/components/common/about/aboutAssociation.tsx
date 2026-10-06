import { Box, Image, Text } from '@mantine/core';

export function AboutAssociation() {
  return (
    <Box
      py={{ base: 36, md: 44 }}
      px={24}
      style={{
        width: '100%',
        maxWidth: '1312px',
        margin: '142px auto 60px auto',
        backgroundColor: '#F0F8FF',
        borderRadius: 24,
        textAlign: 'center',
      }}
    >
      <Box style={{ maxWidth: '640px', margin: '0 auto' }}>
        <Image
          src="/about/association.png"
          alt="Government of Telangana & TASK"
          style={{
            width: '100%',
            maxHeight: '130px',
            objectFit: 'contain',
            display: 'block',
            margin: '0 auto',
          }}
        />
      </Box>
      <Text
        mt={16}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          fontSize: '18px',
          color: '#003D8F',
        }}
      >
        In association with
      </Text>
    </Box>
  );
}
