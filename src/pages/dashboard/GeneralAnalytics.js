import { useState, useEffect } from 'react';
import { Grid, Container, CircularProgress, Stack, Typography } from '@mui/material';
import useSettings from '../../hooks/useSettings';
import Page from '../../components/Page';
import useFundData from '../../hooks/fund';

import {
  AnalyticsNewsUpdate,
  AnalyticsTrafficBySite,
  AnalyticsWidgetSummary,
} from '../../sections/@dashboard/general/analytics';

import {
  AppWidget
} from '../../sections/@dashboard/general/app';

export default function GeneralAnalytics() {
  const { themeStretch } = useSettings();
  const { bookData, isLoading, error } = useFundData();
  const [numberv, setN] = useState();
  const [fundv, setFundv] = useState(null);

  useEffect(() => {
    if (bookData) {
     
      setFundv(bookData.funddata);
      setN(Number(bookData.fundusers.length)); // Convert to number
    }
  }, [bookData]);

  if (isLoading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="body1" color="error">
          Error: {error.message}
        </Typography>
      </Container>
    );
  }

  if (!fundv) {
    return null; // or any fallback UI if needed
  }

  return (
    <Page title="General: Analytics">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          {fundv.name}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary title="Funds under management" total={Number(fundv.selling)} icon={'ant-design:wallet-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary title="Number of Users" total={numberv} color="info" icon={'eva:person-fill'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Total units"
              total={Number(bookData.FundUnit.units)} // Convert to number
              color="warning"
              icon={'ant-design:windows-filled'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary title="Previous fund worth" total={Number(bookData.previous)} color="error" icon={'ant-design:wallet-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Stack spacing={3}>
              <AppWidget title="Current rate" total={Number(bookData.rate)} icon={'eva:person-fill'} chartData={bookData.rate} />
              <AppWidget title="Previous rate" total={10} icon={'eva:email-fill'} color="success" chartData={7} />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsTrafficBySite />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsNewsUpdate />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
