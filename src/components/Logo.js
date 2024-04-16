import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui

import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {

  
  const logo = (
    <Box sx={{ width: 100, height: 80, ...sx }}>
<img  alt = "boom"src ="/logo/logo.svg"/>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
