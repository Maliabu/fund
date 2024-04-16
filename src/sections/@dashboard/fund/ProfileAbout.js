import PropTypes from 'prop-types';
// @mui
import React, { useState, useEffect } from 'react';
import { Card, Typography, CardHeader, Stack } from '@mui/material';
// components
import UserData from '../../../_mock/funddata';

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

ProfileAbout.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  profile: PropTypes.object,
};

export default function ProfileAbout() {

  
  



  const [about, setAbout] = useState();


  const { data: userData } = UserData();

  const userDataInfo = userData;

  useEffect(() => {

    if (userDataInfo) {
      const via = userDataInfo.user

      setAbout(via.bio);
      

    }
  }, [userDataInfo]);



  return (
    <Card>
      <CardHeader title="About" />

      <Stack spacing={2} sx={{ p: 3 }}>
      <Typography variant="body2">{about}</Typography>

      </Stack>
    </Card>
  );
}
