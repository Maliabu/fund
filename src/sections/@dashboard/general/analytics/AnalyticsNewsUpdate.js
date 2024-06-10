import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react'; // Import useEffect and useState
// @mui
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// _mock_

// components
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';

export default function AnalyticsNewsUpdate() {
  const [myData, setMyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataFromLocalStorage = JSON.parse(localStorage.getItem('fundUsers'));
        setMyData(dataFromLocalStorage);
        setIsLoading(false); 

      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Set loading status to false in case of error
      }
    };

    fetchData();
  }, []);

  return (
  <Card>
  <CardHeader title="Users in the fund" />

    <Scrollbar>
      <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
        {isLoading && (
          <Typography>Loading...</Typography>
        )}
        {!isLoading && myData.length === 0 && (
          <Typography>No data available</Typography>
        )}
        {!isLoading && myData.length > 0 && (
          myData.map((item, index) => (
            <Stack direction="row" key ={index} alignItems="center" spacing={2}>
      <Image alt={item.title} src={item.image} sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }} />
      <Box sx={{ minWidth: 240 }}>
        <Link component={RouterLink} to="#" color="inherit">
          <Typography variant="subtitle2" noWrap>
            {item.first_name} {item.last_name}
          </Typography>
        </Link>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
        <b> Deposit</b> ({fCurrency(item.totalDeposit)}) , <b>Networth </b> ({fCurrency(item.totalNetworth)})
        </Typography>
      </Box>
      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {fCurrency(item.totalUnits)} units
      </Typography>
    </Stack>
          ))
        )}
      </Stack>
    </Scrollbar>

    <Divider />

    <Box sx={{ p: 2, textAlign: 'right' }}>
      <Button
        to="#"
        size="small"
        color="inherit"
        component={RouterLink}
        endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}
      >
        View all
      </Button>
    </Box>
  </Card>
);
}


