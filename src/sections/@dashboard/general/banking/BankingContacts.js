// @mui
import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Stack,
  Button,
  Tooltip,
  Typography,
  CardHeader,
  IconButton,
} from '@mui/material';
// _mock_


import UserData from '../../../../_mock/data';

// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

export default function BankingContacts() {
  const [summary, setSummary] = useState([]);
  const [Numbers, setNumber] = useState([]);

  const { data: userData} = UserData();

const userDataInfo = userData



  useEffect(() => {
    if (userDataInfo) {
      const via = userDataInfo.sumary || [];
      setNumber(via.length || '0');

      setSummary(via);
    
    }
  }, [userData, userDataInfo]);
  
  return (
    <Card>
      <CardHeader
        title="Investor summary"
        subheader={`Made ${Numbers} investment(s)`}
        action={
          <Tooltip title="Add Contact">
            <IconButton color="primary" size="large">
              <Iconify icon={'eva:plus-fill'} width={20} height={20} />
            </IconButton>
          </Tooltip>
        }
      />

      <Stack spacing={3} sx={{ p: 3 }}>
        {summary.map((contact, index) => (
          <Stack direction="row" alignItems="center" key={index}>
            
            <Box sx={{ flexGrow: 1, ml: 2, minWidth: 100 }}>
              <Typography variant="subtitle2" sx={{ mb: 0.5 }} noWrap>
                {contact.investmentoption}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {contact.total_investment}
              </Typography>
            </Box>

            <Tooltip title="Quick Transfer">
              <IconButton size="small">
                <Iconify icon={'eva:flash-fill'} width={22} height={22} />
              </IconButton>
            </Tooltip>
          </Stack>
        ))}

        <Button variant="outlined" size="large" color="inherit">
          View All
        </Button>
      </Stack>
    </Card>
  );
}
