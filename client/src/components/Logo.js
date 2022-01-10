import PropTypes from 'prop-types';
// material
import { Box, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};


export default function Logo({ sx }) {
  return (
  <Box sx={{...sx}}>
    <Typography fontFamily='"Segoe UI"' variant="h1">Sahayak</Typography>
    </Box>
    );
}