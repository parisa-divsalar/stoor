import { Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigationItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/users', label: 'Users' },
];

const SideBar = () => {
  const pathname = usePathname();

  return (
    <Stack gap={2} sx={{ width: '100%', padding: '0 16px' }}>
      <Typography variant='h6' fontWeight={700} color='text.primary'>
        Navigation
      </Typography>
      <Stack component='nav' gap={1}>
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
              <Typography
                variant='body1'
                fontWeight={isActive ? 600 : 400}
                color={isActive ? 'primary.main' : 'text.primary'}
                sx={{
                  padding: '10px 12px',
                  borderRadius: 1,
                  backgroundColor: isActive ? 'action.selected' : 'transparent',
                  display: 'block',
                }}
              >
                {item.label}
              </Typography>
            </Link>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default SideBar;
