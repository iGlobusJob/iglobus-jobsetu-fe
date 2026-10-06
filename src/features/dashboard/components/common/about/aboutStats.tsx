import { Box, Flex, Image, Text, Title } from '@mantine/core';

import {
  BriefcaseCardIcon,
  BuildingCardIcon,
  HandshakeCardIcon,
  RosetteMedalIcon,
} from './aboutIcons';

const STATS = [
  {
    icon: <RosetteMedalIcon />,
    mainValue: '10+',
    subValue: 'Years',
    line1: 'Recruitment &',
    line2: 'Staffing Experience',
  },
  {
    icon: <BriefcaseCardIcon />,
    mainValue: '5K+',
    subValue: null,
    line1: 'Job',
    line2: 'Opportunities',
  },
  {
    icon: <BuildingCardIcon />,
    mainValue: '100+',
    subValue: null,
    line1: 'Businesses',
    line2: 'Served',
  },
  {
    icon: <HandshakeCardIcon />,
    mainValue: '1000+',
    subValue: null,
    line1: 'Professionals',
    line2: 'Reached',
  },
];

export function AboutStats() {
  return (
    <Box style={{ maxWidth: '1419px', margin: '180px auto 0 auto' }}>
      <Title
        order={2}
        ta="center"
        mb={60}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          fontSize: '29px',
          lineHeight: '35px',
          color: '#000000',
        }}
      >
        Growing Beyond Boundaries
      </Title>

      <Box
        style={{
          width: '100%',
          maxWidth: '1419px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <Image
          src="/about/world-map.png"
          alt="Global Reach Map"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            margin: '0 auto',
          }}
        />
      </Box>

      {/* STATS CARDS */}
      <Flex
        direction="row"
        align="center"
        justify="center"
        wrap="wrap"
        gap={{ base: 24, md: 42 }}
        mt={110}
        style={{
          maxWidth: '966px',
          margin: '110px auto 0 auto',
          width: '100%',
        }}
      >
        {STATS.map((stat, idx) => (
          <Box
            key={idx}
            style={{
              position: 'relative',
              width: '210px',
              height: '221px',
              flex: 'none',
              background:
                'linear-gradient(155.7deg, #C7DFFF 15.55%, #FFFFFF 100%)',
              clipPath:
                'polygon(0 0, calc(100% - 55px) 0, 100% 55px, 100% 100%, 55px 100%, 0 calc(100% - 55px))',
              boxSizing: 'border-box',
            }}
          >
            {/* Icon square */}
            <Box
              style={{
                position: 'absolute',
                top: '17px',
                left: '15px',
                width: '48px',
                height: '48px',
                backgroundColor: '#E4F3FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {stat.icon}
            </Box>

            {/* Main value and optional subValue */}
            <Box
              style={{
                position: 'absolute',
                top: '78px',
                left: '15px',
              }}
            >
              <Text
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: '36px',
                  lineHeight: '42px',
                  color: '#000000',
                }}
              >
                {stat.mainValue}
              </Text>
              {stat.subValue && (
                <Text
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '19px',
                    color: '#000000',
                  }}
                >
                  {stat.subValue}
                </Text>
              )}
            </Box>

            {/* Bottom label */}
            <Box
              style={{
                position: 'absolute',
                top: '169px',
                left: '45px',
                width: '156px',
                height: '38px',
                textAlign: 'right',
              }}
            >
              <Text
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '19px',
                  color: '#000000',
                  margin: 0,
                }}
              >
                {stat.line1}
              </Text>
              <Text
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '19px',
                  color: '#000000',
                  margin: 0,
                }}
              >
                {stat.line2}
              </Text>
            </Box>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}
