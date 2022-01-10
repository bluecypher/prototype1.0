import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { formatDistance } from 'date-fns';
import { Link as RouterLink } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
// utils
import { mockImgCover } from '../../../utils/mockImages';
//
import Scrollbar from '../../Scrollbar';

// ----------------------------------------------------------------------

const NEWS = [...Array(5)].map((_, index) => {
  const setIndex = index + 1;
  return {
    title: faker.name.title(),
    description: faker.lorem.paragraphs(),
    image: mockImgCover(setIndex),
    postedAt: faker.date.soon()
  };
});

// ----------------------------------------------------------------------

NewsItem.propTypes = {
  news: PropTypes.object.isRequired
};

function NewsItem({ news }) {
  const { image, title, description, postedAt } = news;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={title}
        src={image}
        sx={{ width: 48, height: 48, borderRadius: 1.5 }}
      />
      <Box sx={{ minWidth: 240 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {description}
        </Typography>
      </Box>
      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {formatDistance(postedAt, new Date())}
      </Typography>
    </Stack>
  );
}

export default function AppNewsUpdate() {
  return (
    <Card>
      <CardHeader title="To Contact" />
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
