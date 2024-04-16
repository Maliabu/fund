import PropTypes from 'prop-types';
import { useState, useEffect} from 'react';
 // Import Link from react-router-dom
import { Card, Stack, Divider, Button } from '@mui/material';
import UserData from '../../../_mock/funddata';

ProfileFollowInfo.propTypes = {
  profile: PropTypes.shape({
    follower: PropTypes.number,
    following: PropTypes.number,
  }),
};

export default function ProfileFollowInfo() {
  const { data: userData } = UserData();
  const userDataInfo = userData;
 const[company, setCompany] = useState();
  useEffect(() => {
    if (userDataInfo) {

      const via = userDataInfo.user;

      setCompany(via.company_profile);
    }
  }, [userData, userDataInfo]);
  
  return (
    <Card sx={{ py: 3 }}>
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
        <Stack width={1} textAlign="center">
          {/* Wrap the entire Button component with Link */}
          <a
    href={`https://fund.cyanase.lol/fund/profile_pic/${company}`} 
          
          
          >
            <Button variant="outlined" color="primary">Company profile</Button>
          </a>
        </Stack>

        <Stack width={1} textAlign="center">
          {/* Wrap the entire Button component with an anchor tag */}
          <a href="https://auth.cyanase.com">
            <Button variant="contained" color="primary">Invest with us</Button>
          </a>
        </Stack>
      </Stack>
    </Card>
  );
}
