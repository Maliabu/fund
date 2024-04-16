import PropTypes from 'prop-types';

// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, Typography, Box } from '@mui/material';
// utils
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.primary.darker,
}));

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 120,
  height: 120,
  opacity: 0.12,
  position: 'absolute',
  right: theme.spacing(-3),
  color: theme.palette.common.white,
}));

// ----------------------------------------------------------------------

DetailWidget.propTypes = {
 
  color: PropTypes.oneOf(['primary', 'secondary', 'info', 'success', 'warning', 'error']),
  icon: PropTypes.string.isRequired,
  head: PropTypes.string.isRequired,
  subhead: PropTypes.string.isRequired,
  myClick: PropTypes.func,
};

export default function DetailWidget({ head, subhead, icon, color = 'primary', myClick }) {
  const theme = useTheme();


  return (
    <RootStyle
    onClick= {myClick}
      sx={{
        bgcolor: theme.palette[color].darker, width:'100%'
      }}
    >
   
      <Box  sx={{ ml: 3, color: 'common.white' }}>
        <Typography variant="h4"> {head}</Typography>
        <Typography variant="body2" sx={{ opacity: 0.72 }}>
          {subhead}
        </Typography>
      </Box>
      <IconStyle icon={icon} />
    </RootStyle>
  );
}
