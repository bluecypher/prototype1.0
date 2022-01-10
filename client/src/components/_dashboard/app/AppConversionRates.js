import { merge } from 'lodash';

// material
import { Box, Card, CardHeader, Stack, Typography } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const CHART_DATA = [{ data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380] }];

export default function AppConversionRates() {
  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 }
    },
    xaxis: {
      categories: [
        'Italy',
        'Japan',
        'China',
        'Canada',
        'France',
        'Germany',
        'South Korea',
        'Netherlands',
        'United States',
        'United Kingdom'
      ]
    }
  });

  return (
    <Card>
      <CardHeader title="Today's Calls" />
      <Box sx={{ mx: 3 }} dir="ltr">
        <Stack sx={{alignItems:'center',justifyContent:'center', margin:2, paddingHorizontal:2}} spacing={2}>
          <Stack sx={{alignItems:'center'}} direction='row' spacing={{xs:2,lg:5}}>
            <Typography variant="subtitle2">Name</Typography>
            <Typography variant="subtitle2">Address</Typography>
            <Typography variant="subtitle2">Call Icon</Typography>
          </Stack>
          <Stack direction='row' spacing={{xs:2,lg:5}}>
            <Typography variant="subtitle2">Name</Typography>
            <Typography variant="subtitle2">Address</Typography>
            <Typography variant="subtitle2">Call Icon</Typography>
          </Stack>
          <Stack direction='row' spacing={{xs:2,lg:5}}>
            <Typography variant="subtitle2">Name</Typography>
            <Typography variant="subtitle2">Address</Typography>
            <Typography variant="subtitle2">Call Icon</Typography>
          </Stack>
         
        </Stack>
      </Box>
    </Card>
  );
}
