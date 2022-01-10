// material

import { alpha, styled } from '@mui/material/styles';
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Grid, Container, Typography, Card, Avatar, Stack, Button, Link } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { addProfile } from '../actions/index';

// components
import Page from '../components/Page';

const axios = require('axios');

// import {
//   AppTasks,
//   AppNewUsers,
//   AppBugReports,
//   AppItemOrders,
//   AppNewsUpdate,
//   AppWeeklySales,
//   AppOrderTimeline,
//   AppCurrentVisits,
//   AppWebsiteVisits,
//   AppTrafficBySite,
//   AppCurrentSubject,
//   AppConversionRates
// } from '../components/_dashboard/app';



// import account from '../_mocks_/account';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({


  justifyContent: 'center',
  padding: theme.spacing(4, 4),

}));


const DashboardApp = () => {
  const navigate = useNavigate();
  // const [name, setName] = useState('');
  // const [img, setImg] = useState();
  // const [number, setNumber] = useState('');
  const [cookies, setCookies] = useCookies('');

  const data = useSelector((state) => state.profileReducer);
  // const lname = useSelector((state) => state.profileReducer.lname);
  // const number = useSelector((state) => state.profileReducer.number);
  // const img = useSelector((state) => state.profileReducer.img);
  const dispatch = useDispatch();
  useEffect(() => {
    //  function foo() {
    // setNumber(localStorage.getItem('number'));
    axios.get('http://localhost:5000/users/getData', { params: { 'number': localStorage.getItem('number') } })

      .then((res) => {
        console.log('data', res.data[0]);
        if (Object.keys(cookies).length) {
          // console.log('data', cookies);
          let bufferOriginal = null;
          if (res.data[0].photo) {
            if (res.data[0].photo.data) {
              bufferOriginal = Buffer.from(res.data[0].photo.data);
              // setImg(bufferOriginal.toString('utf8'));
            }
          }
          // console.log('img data', bufferOriginal.toString('utf8'));
          dispatch(addProfile([res.data[0].first_name,
            res.data[0].last_name,
            localStorage.getItem('number'), 
            bufferOriginal ? bufferOriginal.toString('utf8') : null,
            res.data[0].email,
            res.data[0].address1,
            res.data[0].address2,
            res.data[0].city,
            res.data[0].pin,
            res.data[0].state,
            res.data[0].locality_of_work,
            res.data[0].highlights,
            res.data[0].enterprise,
            res.data[0].user_mast_id,
            res.data[0].user_type

          ]));


        }
        else {
          navigate('/sessionExpired')
        }


      })
      .catch((err) => {
        console.log('err', typeof err);
      });


    // foo();
  },[]);
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3} align='center'>
            <RootStyle>
              {
                data.img ?
                  <Avatar src={data.img} sx={{ width: 150, height: 150, alignSelf: 'center' }} alt="photoURL" />
                  :
                  <Avatar sx={{ width: 150, height: 150, alignSelf: 'center' }} alt="photoURL" />
              }
            </RootStyle>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Stack sx={{ justifyContent: 'center', marginTop: 5 }} spacing={2}>
              <Typography variant="h4">{data.fname} {data.lname}</Typography>
              <Typography variant="h4">{data.number}</Typography>

            </Stack>
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <Link component={RouterLink} to="/dashboard/work">
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"

              >
                Proceed
              </Button>
            </Link>
          </Grid>
          {/* 
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
          </Grid>

          

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}


export default DashboardApp;