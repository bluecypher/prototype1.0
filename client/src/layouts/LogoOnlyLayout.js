import { Link as RouterLink, Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Link, Stack, Typography } from '@mui/material';
// components
import Logo from '../components/Logo';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0)
  }
}));

// ----------------------------------------------------------------------

export default function LogoOnlyLayout() {
  return (
    
      <HeaderStyle>
        <Stack direction='row' sx={{justifyContent:'center'}}>
        <Link underline="none" to="/dashboard" component={RouterLink}>
          <Logo />
          {/* <Typography>Hi</Typography> */}
        </Link>
        </Stack>
        <Outlet />
      </HeaderStyle>
      
    
  );
}
