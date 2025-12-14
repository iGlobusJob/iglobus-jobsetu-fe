import { ActionIcon, rem } from '@mantine/core';
import { IconArrowUp } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) setVisible(true);
      else setVisible(false);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <ActionIcon
      size="xl"
      radius="xl"
      variant="filled"
      color="blue"
      onClick={scrollTop}
      style={{
        position: 'fixed',
        bottom: rem(30),
        right: rem(30),
        boxShadow: '0px 4px 14px rgba(0,0,0,0.25)',
        zIndex: 1000,
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <IconArrowUp size={20} />
    </ActionIcon>
  );
};
