import PropTypes from 'prop-types';

// @mui
import {styled } from '@mui/material/styles';
import { Box } from '@mui/material';
//
import Logo from './Logo';
import ProgressBar from './ProgressBar';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  right: 0,
  bottom: 0,
  zIndex: 99999,
  width: '100%',
  height: '100%',
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

LoadingScreen.propTypes = {
  isDashboard: PropTypes.bool,
};

export default function LoadingScreen({ isDashboard, ...other }) {
  return (
    <>
      <ProgressBar />

      {!isDashboard && (
        <RootStyle {...other}>

            <Logo disabledLink sx={{ width: 164, height: 164 }} />

          <Box
          
            transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}

          />

          <Box
            

            transition={{
              ease: 'linear',
              duration: 3.2,
              repeat: Infinity,
            }}

          />
        </RootStyle>
      )}
    </>
  );
}
