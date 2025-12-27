import { useMediaQuery } from '@mantine/hooks';

const items = [
  {
    label: 'REGISTERED CANDIDATES',
    value: '15409+',
    color: 'text-orange-600',
    icon: '/user/stundenttrain.png',
  },
  {
    label: 'ACTIVE JOB LISTINGS',
    value: '110+',
    color: 'text-sky-500',
    icon: '/user/programoffer.png',
  },
  {
    label: 'HIRING PARTNERS',
    value: '80+',
    color: 'text-green-700',
    icon: '/user/industry.png',
  },
  {
    label: 'JOBS POSTED',
    value: '17891+',
    color: 'text-yellow-600',
    icon: '/user/facultyskill.png',
  },
  {
    label: 'JOB PLACEMENTS',
    value: '36596+',
    color: 'text-blue-600',
    icon: '/user/placementprovide.png',
  },
];

const Icons = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  const itemWidth = isMobile ? 140 : isTablet ? 160 : 260;
  const iconSize = isMobile ? 40 : isTablet ? 50 : 60;
  const labelSize = isMobile ? 11 : 12;

  return (
    <section className="bg-white py-16 mb-20">
      <div className="mx-auto max-w-7xl px-6">
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            cursor: 'pointer',
            flexWrap: 'nowrap',
            width: '100%',
            overflowX: isMobile || isTablet ? 'auto' : 'hidden',
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              style={{
                minWidth: itemWidth,
                flexShrink: 0,
                textAlign: 'center',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <div
                  style={{
                    width: iconSize,
                    height: iconSize,
                    margin: '0 auto',
                  }}
                >
                  <img
                    src={item.icon}
                    alt={item.label}
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                </div>
                <div
                  className={item.color}
                  style={{
                    marginTop: 12,
                    fontSize: labelSize,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                  }}
                >
                  {item.label}
                </div>
                <div style={{ fontWeight: 700 }}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Icons;
