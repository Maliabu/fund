// @mui
import { Grid, Container, Stack } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from "axios"
// hooks
import useSettings from '../../hooks/useSettings';
import useAuth from '../../hooks/useAuth';
import { depositUrl } from "../../components/Url";
import DepositPopupModal from '../../components/modals/Depositpopup';
// components
import Page from '../../components/Page';
// sections
import {
  BankingWidgetSummary,
  
} from '../../sections/@dashboard/general/banking';
import {
  BookingCustomerReviews,
} from '../../sections/@dashboard/general/booking';
import {
  Withdrawlist,
} from '../../sections/@dashboard/general/app';
// ----------------------------------------------------------------------

export default function GeneralBanking() {
  const { themeStretch } = useSettings();
const { user } = useAuth();
  const userEmail = user.user.email;
const [deposit, setDeposit] = useState("");
const [networth, setNetworth] = useState("");
const [openModal, setOpenModal] = useState(false);

const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(depositUrl, {
          email: userEmail,
        });
        
      const dat = response.data;
      setDeposit(dat.deposit);
      setNetworth(dat.networth);
       
        
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [userEmail]);
  return (
    <Page title="General: Banking">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
              <BankingWidgetSummary
                title="Deposit"
                icon={'eva:diagonal-arrow-left-down-fill'}
                percent={2.6}
                total={deposit}
                chartData={[111, 136, 76, 108, 74, 54, 57, 84]}
                action= "Deposit"
                btnColor ="warning"
                showModal ={handleOpenModal}
              />
              <DepositPopupModal open={openModal} onClose={handleCloseModal} />
              <BankingWidgetSummary
                title="Networth"
                color="warning"
                icon={'eva:diagonal-arrow-right-up-fill'}
                percent={0.5}
                total={networth}
                chartData={[111, 136, 76, 108, 74, 54, 57, 84]}
                action= "Withdraw"
                btnColor ="success"
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={5}>
            <Stack spacing={3}>
              <BookingCustomerReviews />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={18}>
            <Stack spacing={3}>
              <Withdrawlist />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}