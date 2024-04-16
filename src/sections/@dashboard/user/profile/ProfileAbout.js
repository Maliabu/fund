import PropTypes from 'prop-types';
import axios from 'axios';
// @mui
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Link, Card, Button, Typography, CardHeader, Stack } from '@mui/material';
// components
import { sendUpdateUrl } from '../../../../components/Url';
import Iconify from '../../../../components/Iconify';
import UserData from '../../../../_mock/data';
import useAuth from '../../../../hooks/useAuth';

// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

ProfileAbout.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  profile: PropTypes.object,
};

export default function ProfileAbout() {

  const { user } = useAuth();
  const userEmail = user.user.email;
  const storedId = localStorage.getItem('userid');

  const [isSending, setIsSending] = useState(false); // State to manage sending status

  const [email, setEmail] = useState();
  const [Phone, setPhone] = useState();

  const [Gender, setGender] = useState();

  const { data: userData } = UserData();

  const userDataInfo = userData;

  useEffect(() => {

    if (userDataInfo) {
      const via = userDataInfo.userInfo

      setPhone(via.phoneno);
      setEmail(via.email);
      setGender(via.gender);

    }
  }, [userDataInfo]);

  const handleSendReport = async () => {
    try {
      setIsSending(true); // Set sending status to true
      // Make a POST request to send the report
      const response = await axios.post(sendUpdateUrl, {
        user_id: storedId, // Assuming `id` is available in `userDataInfo`
        email: userEmail,
      });
      console.log('Report sent successfully:', response);
      // Handle success, such as showing a success message to the user
    } catch (error) {
      console.error('Error sending report:', error);
      // Handle error, such as showing an error message to the user
    } finally {
      setIsSending(false); // Reset sending status to false
    }
  };

  return (
    <Card>
      <CardHeader title="About" />

      <Stack spacing={2} sx={{ p: 3 }}>

        <Stack direction="row">
          <IconStyle icon={'eva:phone-fill'} />
          <Typography variant="body2">

            <Link component="span" variant="subtitle2" color="text.primary">
              {Phone}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={'eva:email-fill'} />
          <Typography variant="body2">{email}</Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={'ic:round-business-center'} />
          <Typography variant="body2">
            {Gender}
          </Typography>
        </Stack>

        <Button variant="contained" disabled={isSending} onClick={handleSendReport}>
          {isSending ? 'Sending...' : 'Send report'} {/* Change button text based on sending status */}
        </Button>

      </Stack>
    </Card>
  );
}
