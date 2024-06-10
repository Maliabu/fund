// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid } from '@mui/material';
// hooks

import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import {
  Appnumber,
  AppWelcome,
  AppFeatured,
  AppWidgetSummary,
AnalyticsOrderTimeline,
} from '../../sections/@dashboard/general/app';
import {
  EcommerceCurrentBalance,
} from '../../sections/@dashboard/general/e-commerce';
import useAuth from '../../hooks/useAuth';
// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { user } = useAuth();
  const theme = useTheme();
  const { themeStretch } = useSettings();

const userData = user.user;
 
  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <AppWelcome displayName={userData?.username} />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppFeatured />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Active Users"
              percent={2.6}
              total={18765}
              chartColor={theme.palette.primary.main}
              chartData={[5, 18, 12, 51, 68, 11, 39, 37, 27, 20]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Appnumber
              title="Total amount deposited"
              percent={0.2}
              currency= {user.currency}
              total={user.totalDeposit}
              chartColor={theme.palette.chart.blue[0]}
              chartData={[20, 41, 63, 33, 28, 35, 50, 46, 11, 26]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Transfers"
              percent={-0.1}
              total={678}
              chartColor={theme.palette.chart.red[0]}
              chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsOrderTimeline />
          </Grid>

           <Grid item xs={12} md={6} lg={4}>
            <EcommerceCurrentBalance />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
