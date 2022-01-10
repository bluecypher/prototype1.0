import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, Typography, Checkbox, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// import { number } from 'prop-types';

const axios = require('axios');
// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  // let services;
  const [services, setServices] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/users/getServices")
      .then((res) => {
        setServices(res.data);
        const tm = new Date(Date.now())
        console.log("datetike:", new Date(Date.now()));
      })
  }, [])
  // const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState(null);
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [selected, setSelected] = useState([]);

  const fileToDataUri = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result)
    };
    reader.readAsDataURL(file);
  })

  const fileChangeHandler = (file) => {
    if (!file) {
      setImage('');
      return;
    }

    fileToDataUri(file)
      .then(dataUri => {
        setImage(dataUri)
      })

    console.log('image:', image);
  }

  const handleCheck = (e,id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
    // console.log('click', newSelected);
  }
  // const onSubmitHandler = () => {
  //   console.log(image);
  // }






  const RegisterSchema = Yup.object().shape({
    fname: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name is required'),

    add: Yup.string().required('Address is required'),

    city: Yup.string().required('City is required'),
    pin: Yup.string().required('PIN is required'),
    state: Yup.string().required('State is required'),


  });

  const formik = useFormik({
    initialValues: {
      fname: '',
      lname: '',
      email: '',
      add: '',
      add2: '',
      locality: '',
      city: '',
      pin: '',
      state: '',
      ent: '',
      service: '',
      hghlts: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      // console.log('imag', formik.values.name);
      const nm = localStorage.getItem('number');
      console.log('number:', nm);
      axios.post('http://localhost:5000/users/updateDetails', {
        'fname': formik.values.fname,
        'lname': formik.values.lname,
        'email': formik.values.email,
        'number': nm,
        'img': image,
        'addr1': formik.values.add,
        'addr2': formik.values.add2,
        'locality': formik.values.locality,
        'city': formik.values.city,
        'pin': formik.values.pin,
        'state': formik.values.state,
        'ent': formik.values.ent,

        'services': selected,
        'hghlts': formik.values.hghlts
      })
        .then((response) => {
          console.log("response:", response)
          if (response.data === "Success") {

            navigate('/dashboard', { replace: true });
          }
        })
        .catch((e) => {
          console.log("Error", e);
        })


    }


  });

  const { touched, errors, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 4 }}>
            <TextField
              fullWidth
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              label="First name"
              {...getFieldProps('fname')}
              error={Boolean(touched.fname && errors.fname)}
              helperText={touched.fname && errors.fname}
            />

            <TextField
              fullWidth
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              label="Last name"
              {...getFieldProps('lname')}
              error={Boolean(touched.lname && errors.lname)}
              helperText={touched.lname && errors.lname}
            />

            


          </Stack>
          <TextField
              fullWidth
              type="text"
              label="Email"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
          <Stack spacing={1}>
            <Stack direction="row" spacing={6}>
              <Typography variant="h6">
                Upload photo
              </Typography>
              {
                image &&
                (<img width="30" height="30" src={image} alt="avatar" />)
              }
            </Stack>
            <input
              accept="image/*"
              type="file"
              onChange={(event) => { fileChangeHandler(event.target.files[0] || null) }}
            />


          </Stack>
          <TextField
            fullWidth
            multiline
            minRows='2'
            type="text"
            label="Address"
            {...getFieldProps('add')}
            error={Boolean(touched.add && errors.add)}
            helperText={touched.add && errors.add}
          />

          <TextField
            fullWidth
            multiline
            type="text"
            label="Address line 2"
            {...getFieldProps('add2')}
            error={Boolean(touched.add2 && errors.add2)}
            helperText={touched.add2 && errors.add2}
          />
          <TextField
            fullWidth
            type="text"
            label="Locality"
            {...getFieldProps('locality')}
            error={Boolean(touched.locality && errors.locality)}
            helperText={touched.locality && errors.locality}
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="City"
              {...getFieldProps('city')}
              error={Boolean(touched.city && errors.city)}
              helperText={touched.city && errors.city}
            />

            <TextField
              fullWidth
              label="PIN"
              inputProps={{maxLength:6}}
              {...getFieldProps('pin')}
              error={Boolean(touched.pin && errors.pin)}
              helperText={touched.pin && errors.pin}
            />
          </Stack>
          <TextField
            fullWidth
            label="State"
            {...getFieldProps('state')}
            error={Boolean(touched.state && errors.state)}
            helperText={touched.state && errors.state}
          />
          <TextField
            fullWidth
            label="Enterprise"
            {...getFieldProps('ent')}
            error={Boolean(touched.ent && errors.ent)}
            helperText={touched.ent && errors.ent}
          />
          {/* <FormControl>
            <InputLabel>Service Provided</InputLabel>

            <Select

              value={selectedService}
              label="Service Provided"
              onChange={(e) => setSelectedService(e.target.value)}
            >
              {services.map( (s,i) => 
              <MenuItem index={i} value={s.serv_id}>{s.serv_name}</MenuItem>
              
              )}
              
            </Select>
          </FormControl> */}
          <Typography variant="h6" >
            Services Provided
          </Typography>
          <Grid container spacing={1}>
          {services.map( (s,i) => {
          const isItemSelected = selected.indexOf(s.serv_id) !== -1
          return(
          <Stack direction="row" >
          <Checkbox
            checked = {isItemSelected}
            onChange={(event) => handleCheck(event,s.serv_id)}
          />
          <Typography alignSelf='center' variant="subtitle2" >
            {s.serv_name}
          </Typography>
          </Stack>
          )
          }
          )}
          </Grid>
          
          {/* <TextField
            fullWidth
            type="text"
            label="Service Provided"
            {...getFieldProps('service')}
            error={Boolean(touched.service && errors.service)}
            helperText={touched.service && errors.service}
          /> */}

          <TextField
            fullWidth
            multiline
            minRows='2'
            type="text"
            label="Highlights"
            {...getFieldProps('hghlts')}
            error={Boolean(touched.hghlts && errors.hghlts)}
            helperText={touched.hghlts && errors.hghlts}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Update
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
