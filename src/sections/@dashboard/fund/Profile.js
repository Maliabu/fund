import PropTypes from 'prop-types';
// @mui
import { Grid, Stack } from '@mui/material';

import ProfileAbout from './ProfileAbout';
import ProfileFollowers from './ProfileFollowers';
import ProfileFollowInfo from './ProfileFollowInfo';
import ProfileSocialInfo from './ProfileSocialInfo';

// ----------------------------------------------------------------------

Profile.propTypes = {
  myProfile: PropTypes.object,
  
};

export default function Profile({ myProfile }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ProfileFollowInfo profile={myProfile} />
          <ProfileAbout profile={myProfile} />
          <ProfileSocialInfo profile={myProfile} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
       <ProfileFollowers />
      
          
        </Stack>
      </Grid>
    </Grid>
  );
}
