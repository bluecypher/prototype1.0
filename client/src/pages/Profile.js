import { alpha, styled } from '@mui/material/styles';

import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Box, Grid, Container, Typography, Card, Avatar, Stack, Button, Link,IconButton } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";

import bxEdit from '@iconify/icons-eva/edit-2-outline';


import Page from '../components/Page';


const axios = require('axios');


export default function Profile() {
    const data = useSelector((state) => state.profileReducer);
    const [servData,setServData] = useState([]);
    const navigate=useNavigate();
    const onEdit = ()=>{
        navigate('/register');
    } 
    useEffect(()=>{
        axios.post('http://localhost:5000/users/getUserServices',{'id':data.id})
        .then((res)=>{
            console.log("result",res);
            setServData(res.data);
        })
        .catch((err)=>{
            console.log("Error",err);
        })
    },[])
    return (
        <Page title="Profile">
            <Container maxWidth="xl">
                <Stack direction="row" justifyContent="space-between">
                
                    <Typography variant="h4">My Profile</Typography>
                
                <IconButton onClick={onEdit} size="large">
            <Icon icon={bxEdit} />
          </IconButton>
                </Stack>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3} align='center'>
                        <Stack spacing={2}>
                            {
                                data.img ?
                                    <Avatar src={data.img} sx={{ width: 150, height: 150, alignSelf: 'center' }} alt="photoURL" />
                                    :
                                    <Avatar sx={{ width: 150, height: 150, alignSelf: 'center' }} alt="photoURL" />
                            }
                            <Typography variant="h6">{data.fname} {data.lname}</Typography>
                        </Stack>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={3}>
                        <Stack spacing={2}>
                        <hr/>
                            <Stack direction="row" justifyContent="space-between" spacing={2}>
                                
                                <Typography variant="h6">Address 1:    </Typography>
                                <Typography variant="subtitle2">{data.add1}  </Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between" spacing={2}>
                                <Typography variant="h6">Address 2:    </Typography>
                                <Typography variant="subtitle2">{data.add2}  </Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between" spacing={2}>
                                <Typography variant="h6">Phone number:    </Typography>
                                <Typography variant="subtitle2">{data.number}  </Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between" spacing={2}>
                                <Typography variant="h6">Email:    </Typography>
                                <Typography variant="subtitle2">{data.email}  </Typography>
                            </Stack>
                            <hr/>
                            <Box>
                    <Typography variant="h6">Our Services</Typography>
                </Box>
                            <Stack direction="row" justifyContent="space-between" spacing={2}>
                               
                                {
                                    servData.map((item)=>(
                                        <Stack  spacing={1}>
                                        <Typography alignSelf='center' variant="subtitle2">{item.serv_name}</Typography>
                                        </Stack>
                                    ))
                                }
                                </Stack>
                                <hr/>
                                <Stack direction="row" justifyContent="space-between" spacing={2}>
                                <Typography variant="h6">Highlights:    </Typography>
                                <Typography variant="subtitle2">{data.hghlts}  </Typography>
                            </Stack>
                            
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
}
