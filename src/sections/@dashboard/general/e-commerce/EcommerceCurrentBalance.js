import React, { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Card, Typography, Stack } from '@mui/material';
// utils
import TopupModal from '../../../../components/modals/topup';
import { fCurrency } from '../../../../utils/formatNumber';
import useAuth from '../../../../hooks/useAuth';
// ----------------------------------------------------------------------

const RowStyle = styled('div')({
  display: 'flex',
  justifyContent: 'space-between'
});

// ----------------------------------------------------------------------

export default function EcommerceCurrentBalance() {
  
const { user } = useAuth();

const [openModal, setOpenModal] = useState(false);

const handleOpenModal = () => {
  setOpenModal(true);
};

const handleCloseModal = () => {
  setOpenModal(false);
};
  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="subtitle2" gutterBottom>
        Amount available for withdraw
      </Typography>
      <TopupModal open={openModal} onClose={handleCloseModal} />

      <Stack spacing={2}>
        <Typography variant="h3"> {user.currency}{fCurrency(user.totalWallet)}</Typography>

        <RowStyle>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Total Amount
          </Typography>
          <Typography variant="subtitle1"> {user.currency} {fCurrency(user.totalWallet)}</Typography>
        </RowStyle>

        <Stack direction="row" spacing={1.5}>
          <Button  onClick={handleOpenModal}fullWidth variant="contained" color="warning">
            Top up
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
