import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography } from '@mui/material';

import { LoadingButton } from '@mui/lab';

import Image from './illustration_Electrical.png';
import Page from './components/Page';




const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0)
}));



export default function Landing() {
    const navigate = useNavigate();
    return (
        <Page title="Sahayak" sx={{ backgroundImage:  `linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.7), rgba(255,255,255,0.2)),url(${Image})`, backgroundSize: "cover", my:2}}>

            <Container>
                <ContentStyle sx={{ mt: 1 }}>
                    <Stack spacing={3}>
                        <Link component={RouterLink} to="register">
                            <LoadingButton fullWidth size="large" variant="contained" >Register</LoadingButton>
                        </Link>
                        <Typography sx={{alignSelf:'center'}}>Or</Typography>
                        <Link component={RouterLink} to="login">
                            <LoadingButton fullWidth size="large" variant="contained" >Login</LoadingButton>
                        </Link>
                        {/* <img src="/static/illustrations/illustration_electrical.png" style={{ opacity: 0.2 }} alt="landing" /> */}
                    </Stack>

                </ContentStyle>
            </Container>
        </Page>
    );
}

