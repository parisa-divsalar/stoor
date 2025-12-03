import { Stack, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigationItems = [
  { href: '/dashboard', label: 'Dashboard', Icon: DashboardIcon },
  { href: '/users', label: 'Users', Icon: PersonIcon },
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
              <Stack
                direction='row'
                alignItems='center'
                gap={1}
                sx={{
                  padding: '10px 12px',
                  borderRadius: 1,
                  backgroundColor: isActive ? 'action.selected' : 'transparent',
                  color: isActive ? 'primary.main' : 'text.primary',
                }}
              >
                <item.Icon
                  sx={{ color: isActive ? 'primary.main' : 'text.secondary' }}
                  fontSize='small'
                />
                <Typography
                  variant='body1'
                  fontWeight={isActive ? 600 : 400}
                  color='inherit'
                >
                  {item.label}
                </Typography>
              </Stack>
            </Link>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default SideBar;
