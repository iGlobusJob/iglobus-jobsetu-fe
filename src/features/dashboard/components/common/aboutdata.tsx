import {
  Box,
  Flex,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import {
  IconBulbFilled,
  IconHeartHandshake,
  IconRosetteDiscountCheckFilled,
  IconUsers,
} from '@tabler/icons-react';

import { OTPmodal } from '@/features/auth/components/modal/otpModal';

import { FooterSubscribe } from './footer';
import { Header } from './header';

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

const TEAM_MEMBERS = [
  {
    name: 'Pavan Chandra Duddilla',
    role: 'Director',
    company: 'iGLOBUS Corporate Consulting',
    image: '/about/team-pavan.png',
  },
  {
    name: 'Uttam Singh',
    role: 'Founder, CEO',
    company: 'Shashwa Dimensions',
    image: '/about/team-uttam.png',
  },
  {
    name: 'Sanjana Shah',
    role: 'Executive Director',
    company: 'BNI',
    image: '/about/team-sanjana.png',
  },
  {
    name: 'Captain Anand',
    role: 'Director',
    company: 'Mira IMS',
    image: '/about/team-anand.png',
  },
];

function RosetteMedalIcon() {
  return (
    <svg
      width="19"
      height="24"
      viewBox="0 0 19 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="9.5" cy="7.5" r="7" fill="#003D8F" />
      <circle cx="9.5" cy="7.5" r="3.2" fill="#E4F3FF" />
      <path d="M5.5 13L3.5 23.5L9.5 20L15.5 23.5L13.5 13" fill="#003D8F" />
    </svg>
  );
}

function BriefcaseCardIcon() {
  return (
    <svg
      width="28"
      height="24"
      viewBox="0 0 28 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 4V3C10 1.89543 10.8954 1 12 1H16C17.1046 1 18 1.89543 18 3V4"
        stroke="#003D8F"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <rect x="2" y="4" width="24" height="18" rx="3" fill="#003D8F" />
      <rect x="2" y="10" width="24" height="2.5" fill="#E4F3FF" />
      <rect x="11.5" y="8.5" width="5" height="5" rx="1" fill="#E4F3FF" />
    </svg>
  );
}

function BuildingCardIcon() {
  return (
    <svg
      width="18"
      height="24"
      viewBox="0 0 18 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="1" width="16" height="22" rx="2" fill="#003D8F" />
      <rect x="4" y="4" width="3" height="3" rx="0.5" fill="#E4F3FF" />
      <rect x="11" y="4" width="3" height="3" rx="0.5" fill="#E4F3FF" />
      <rect x="4" y="9.5" width="3" height="3" rx="0.5" fill="#E4F3FF" />
      <rect x="11" y="9.5" width="3" height="3" rx="0.5" fill="#E4F3FF" />
      <rect x="7" y="16" width="4" height="7" rx="0.5" fill="#E4F3FF" />
    </svg>
  );
}

function HandshakeCardIcon() {
  return (
    <svg
      width="31"
      height="24"
      viewBox="0 0 31 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 8L6 5L8 9L3 12Z" fill="#003D8F" />
      <path d="M30 8L25 5L23 9L28 12Z" fill="#003D8F" />
      <path
        d="M6.5 8.5L13 14C13.8 14.7 15 14.7 15.8 14L20.5 9.5C21.3 8.7 21.3 7.4 20.5 6.6C19.7 5.8 18.4 5.8 17.6 6.6L14.5 9.5"
        stroke="#003D8F"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.5 8.5L18 14C17.2 14.7 16 14.7 15.2 14L10.5 9.5C9.7 8.7 9.7 7.4 10.5 6.6C11.3 5.8 12.6 5.8 13.4 6.6L16.5 9.5"
        stroke="#003D8F"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 14.5L14 16.5C14.8 17.3 16.2 17.3 17 16.5L19 14.5"
        stroke="#003D8F"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M13.5 17L14.7 18.2C15.1 18.6 15.9 18.6 16.3 18.2L17.5 17"
        stroke="#003D8F"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

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

export function AboutData() {
  return (
    <Box
      style={{ backgroundColor: '#FFFFFF', width: '100%', overflowX: 'hidden' }}
    >
      <Header />

      <Box
        component="main"
        style={{
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '130px 24px 60px 24px',
          boxSizing: 'border-box',
        }}
      >
        {/* HERO TITLE & INTRO */}
        <Stack align="center" gap="20px" ta="center" mb={0}>
          <Title
            order={1}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 'clamp(36px, 5vw, 64px)',
              lineHeight: '77px',
              color: '#000000',
            }}
          >
            About Us
          </Title>
          <Text
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(16px, 1.8vw, 20px)',
              lineHeight: '32px',
              color: '#000000',
              maxWidth: '1198px',
            }}
          >
            We make hiring simpler and more transparent through technology and
            trusted recruitment expertise. JobSetu connects professionals with
            the right opportunities while helping businesses find the right
            talent with confidence.
          </Text>
          <Box
            style={{
              width: '100%',
              maxWidth: '1312px',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 12px 36px rgba(0,0,0,0.08)',
              marginTop: '52px',
            }}
          >
            <Image
              src="/about/hero-meeting.jpg"
              alt="About JobSetu"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </Box>
        </Stack>

        {/* MISSION & VISION */}
        <Stack
          gap="42px"
          style={{
            maxWidth: '1312px',
            margin: '52px auto 0 auto',
            position: 'relative',
          }}
        >
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align={{ base: 'flex-start', md: 'center' }}
            justify="space-between"
            gap={40}
          >
            <Box
              style={{ position: 'relative', flexShrink: 0, minWidth: '200px' }}
            >
              <img
                src="/about/mission-accent.png"
                alt=""
                style={{
                  position: 'absolute',
                  left: '-30px',
                  top: '-28px',
                  width: '85px',
                  height: '71px',
                  objectFit: 'contain',
                  zIndex: 0,
                }}
              />
              <Text
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: '27px',
                  lineHeight: '33px',
                  color: '#000000',
                  position: 'relative',
                  zIndex: 1,
                  paddingLeft: '14px',
                }}
              >
                Our Mission
              </Text>
            </Box>
            <Text
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '21px',
                lineHeight: '32px',
                color: '#545454',
                maxWidth: '1088px',
                flex: 1,
              }}
            >
              Make quality employment opportunities easier to discover, manage,
              and match by connecting talent, employers, and recruitment teams
              in one trusted digital workflow.
            </Text>
          </Flex>

          <Flex
            direction={{ base: 'column', md: 'row' }}
            align={{ base: 'flex-start', md: 'center' }}
            justify="space-between"
            gap={40}
          >
            <Text
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '27px',
                lineHeight: '33px',
                color: '#000000',
                flexShrink: 0,
                minWidth: '200px',
                paddingLeft: '14px',
              }}
            >
              Our Vision
            </Text>
            <Flex
              align="center"
              gap={24}
              style={{ flex: 1, maxWidth: '1088px' }}
            >
              <Text
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '21px',
                  lineHeight: '32px',
                  color: '#545454',
                  flex: 1,
                }}
              >
                Our vision is to build a trusted and connected hiring ecosystem
                where every professional can discover meaningful opportunities
                and every business can find the right talent to grow.
              </Text>
              <img
                src="/about/mission-accent.png"
                alt=""
                style={{
                  width: '70px',
                  height: '71px',
                  objectFit: 'contain',
                  transform: 'scaleX(-1)',
                  flexShrink: 0,
                }}
              />
            </Flex>
          </Flex>
        </Stack>

        {/* CORE VALUES */}
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

        {/* OUR TEAM */}
        <Box style={{ maxWidth: '1333px', margin: '88px auto 0 auto' }}>
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
            Our Team
          </Title>
          <SimpleGrid
            cols={{ base: 1, sm: 2 }}
            spacing={{ base: 24, md: 96 }}
            verticalSpacing={24}
          >
            {TEAM_MEMBERS.map((member, idx) => (
              <Box
                key={idx}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
                  border: '1px solid #ECECEC',
                }}
              >
                <Image
                  src={member.image}
                  alt={`${member.name} - ${member.role}, ${member.company}`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    backgroundColor: '#FFFFFF',
                  }}
                />
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* GROWING BEYOND BOUNDARIES */}
        <Box style={{ maxWidth: '1419px', margin: '158px auto 0 auto' }}>
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
            mt={75}
            style={{
              maxWidth: '966px',
              margin: '75px auto 0 auto',
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

        {/* IN ASSOCIATION WITH */}
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
      </Box>

      <OTPmodal />
      <FooterSubscribe />
    </Box>
  );
}

export default AboutData;
