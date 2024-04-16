// hooks
import { useEffect, useState } from 'react';
import UserData from '../_mock/funddata';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function FundAvatar({ ...other }) {


    const { data: userData} = UserData();
    const userDataInfo = userData;

  const[ Profile, setProfile] = useState()
  
  const[ myname, setName] = useState()
  
  
  useEffect(() => {
      if (userDataInfo) {
        
        const via = userDataInfo.user;
    
    const fullName = via.username ||  '';
     setName(fullName);
        setProfile(userDataInfo.user.profile_picture)
       
      }
    }, [userDataInfo]);
  
  return (
    <Avatar 
    src={`https://fund.cyanase.lol/fund/profile_pic/${Profile}`} 

      alt={Profile}
      color={myname? 'default' : createAvatar(myname).color}
      {...other}
    >
      {createAvatar(userData?.username).name}
    </Avatar>
  );
}
