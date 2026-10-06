import { Box, SimpleGrid, Text, Title } from '@mantine/core';
import {
  IconBulbFilled,
  IconHeartHandshake,
  IconRosetteDiscountCheckFilled,
  IconUsers,
} from '@tabler/icons-react';

const CORE_VALUES = [
  {
    icon: <IconHeartHandshake size={30} color="#003D8F" />,
    text: 'We build every connection on transparency, reliability, and genuine relationships.',
  },
  {
    icon: <IconUsers size={30} color="#003D8F" />,
    text: 'We put candidates and employers at the center of every hiring experience.',
  },
  {
    icon: <IconRosetteDiscountCheckFilled size={30} color="#003D8F" />,
    text: 'We strive to deliver quality opportunities and recruitment solutions that create real value.',
  },
  {
    icon: <IconBulbFilled size={30} color="#003D8F" />,
    text: 'We use technology and smarter processes to make hiring faster, simpler, and more effective.',
  },
];

export function AboutCoreValues() {
  return (
    <Box style={{ maxWidth: '1312px', margin: '113px auto 0 auto' }}>
      <Title
        order={2}
        ta="center"
        mb={48}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          fontSize: '29px',
          lineHeight: '35px',
          color: '#000000',
        }}
      >
        Our Core Values
      </Title>
      <SimpleGrid
        cols={{ base: 1, md: 2 }}
        spacing={{ base: 36, md: 96 }}
        verticalSpacing={52}
      >
        {CORE_VALUES.map((val, idx) => (
          <Box
            key={idx}
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '190px',
            }}
          >
            <Box
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 56,
                height: 56,
                backgroundColor: '#E4F3FF',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
                boxShadow: '0 4px 12px rgba(0, 61, 143, 0.08)',
              }}
            >
              {val.icon}
            </Box>
            <Box
              style={{
                marginTop: 28,
                minHeight: 162,
                backgroundColor: '#F3F3F3',
                borderRadius: 24,
                clipPath:
                  'polygon(0% 20px, 20px 0%, calc(100% - 50px) 0%, 100% 40px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 50px 100%, 0% calc(100% - 40px))',
                padding: '38px 40px 30px 40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
              }}
            >
              <Text
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: '21px',
                  lineHeight: '32px',
                  color: '#545454',
                  maxWidth: '467px',
                  width: '100%',
                  margin: 0,
                }}
              >
                {val.text}
              </Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
