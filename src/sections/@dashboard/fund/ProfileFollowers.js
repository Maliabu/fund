
import { useState, useEffect } from 'react';
// @mui
import { Box, Grid, Card, Typography } from '@mui/material';
// components
import Iconify from '../../../components/Iconify';
import UserData from '../../../_mock/funddata';

// ----------------------------------------------------------------------



export default function ProfileFollowers() {


  const { data: userData} = UserData();
  const [Activity, setActivity] = useState([]);
  

 const userDataInfo = userData;


 useEffect(() => {
  if (userDataInfo) {
  
    const via = userDataInfo.performance|| []

    setActivity(via);
  
  }
}, [userData, userDataInfo]);




return (
  <Box sx={{ mt: 5 }}>
    <Typography variant="h4" sx={{ mb: 3 }}>
      Funds under managment
    </Typography>

    <Grid container spacing={3}>
      {Activity.map((item, index) => (
        <Grid key={index} item xs={12} md={4}>
          <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
            <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
              <Typography variant="subtitle2" noWrap>
                {item.class}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Iconify icon={'eva:pin-fill'} sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                  {item.options}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Iconify icon={'eva:envelope-fill'} sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                Minimum deposit  {item.minimum}
                </Typography>
              </Box>
            </Box>
          
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

}

// ----------------------------------------------------------------------


