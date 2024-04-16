import PropTypes from 'prop-types';
import { useState } from 'react'; // Add useState import
import { Box, Grid, Card, Paper, Typography, CardHeader, CardContent } from '@mui/material';

import { _analyticTraffic } from '../../../../_mock';
import UpdateFundModal from "../../../../components/modals/Updates";
import EmailModal from "../../../../components/modals/Email";

export default function AnalyticsTrafficBySite() {
  const [openModal, setOpenModal] = useState(false); // Define state for modal open/close
  const [selectedValue, setSelectedValue] = useState(null); // Define state for selected value

  const handleOpenModal = (value) => { // Define function to open modal
    setSelectedValue(value);
    setOpenModal(true);
  };

  const handleCloseModal = () => { // Define function to close modal
    setOpenModal(false);
    setSelectedValue(null);
  };

  return (
    <Card>
      <CardHeader title="Fund actions" />
      <CardContent>
        <Grid container spacing={2}>
          {_analyticTraffic.map((site) => (
            <SiteItem key={site.name} site={site} handleOpenModal={handleOpenModal} />
          ))}
        </Grid>
        {openModal && selectedValue === 1 && <EmailModal open={openModal} onClose={handleCloseModal} />}
        {openModal && selectedValue === 2 && <UpdateFundModal open={openModal} onClose={handleCloseModal} />}
      </CardContent>
    </Card>
  );
}

SiteItem.propTypes = {
  site: PropTypes.shape({
    icon: PropTypes.any,
    name: PropTypes.string,
    text: PropTypes.string,
    value: PropTypes.number,
  }),
  handleOpenModal: PropTypes.func.isRequired, // Add handleOpenModal prop type
};

function SiteItem({ site, handleOpenModal }) {
  const { icon, text, name, value } = site;

  return (
    <Grid item xs={6}>
      <Paper
        variant="outlined"
        sx={{
          py: 2.5,
          textAlign: 'center',
          borderColor: "warning",
          bgcolor: "#f0f0f0",
          '&:hover': {
            bgcolor: "#d9d9d9",
          }
        }}
        onClick={() => handleOpenModal(value)}
      >
        <Box sx={{ mb: 0.5 }}>{icon}</Box>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {text}
        </Typography>
      </Paper>
    </Grid>
  );
}