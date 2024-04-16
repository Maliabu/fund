
import { useState, useEffect } from 'react';
// @mui
import { Box, Grid, Card, Button, Typography } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';
import UserData from '../../../../_mock/data';

// ----------------------------------------------------------------------



export default function ProfileFollowers() {


  const { data: userData} = UserData();
  const [Activity, setActivity] = useState([]);
  

 const userDataInfo = userData;


 useEffect(() => {
  if (userDataInfo) {
    const via = userDataInfo.activity || []

    setActivity(via);
  
  }
}, [userData, userDataInfo]);


const mergeAndSortTransactions = () => {
  const allTransactions = Activity.reduce((acc, curr) => {
    if (curr.deposit) {
      acc.push({ type: 'deposit', amount: curr.deposit, time: new Date(curr.deposit_time) });
    } else if (curr.withdraw) {
      acc.push({ type: 'withdraw', amount: curr.withdraw, time: new Date(curr.withdraw_time) });
    }
    return acc;
  }, []);

  return allTransactions.sort((a, b) => a.time - b.time);
};

const sortedTransactions = mergeAndSortTransactions();


  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Account Activity
      </Typography>

      <Grid container spacing={3}>
        {sortedTransactions.map((item, index) => (
          <Grid key={index} item xs={12} md={4}>
          {item.type==='deposit'?(
            <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
    
      <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Typography variant="subtitle2" noWrap>
          UGX {item.amount}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Iconify icon={'eva:pin-fill'} sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }} />
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {item.time.toLocaleString()} {/* Format the date into a string */}

          </Typography>
        </Box>
      </Box>
      <Button
        size="small"
        variant='text'
        color= 'primary'
        startIcon={<Iconify icon={'eva:checkmark-fill'} />}
      >
        Deposit
      </Button>
    </Card>
          ):(
            <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
     
      <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Typography variant="subtitle2" noWrap>
         UGX {item.amount}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Iconify icon={'eva:clock-fill'} sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }} />
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {item.time.toLocaleString()} {/* Format the date into a string */}
  
          </Typography>
        </Box>
      </Box>
      <Button
        size="small"
        
        variant='text'
        color= 'warning'
        startIcon={<Iconify icon={'eva:checkmark-fill'} />}
      >
        withdraw
      </Button>
    </Card>
          )}

          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// ----------------------------------------------------------------------


