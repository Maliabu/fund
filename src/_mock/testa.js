import { useState, useEffect } from 'react';
import axios from "axios";
import _mock from './_mock';
import { randomNumberRange, randomInArray } from './funcs';

import useAuth from '../hooks/useAuth';
import { fundUsersUrl} from '../components/Url';
// ----------------------------------------------------------------------

export   const useUserListed = () => {
   const { user } = useAuth();
  const [_userList, setUserList] = useState([]);
  
 const getData = async () => {
    try {


      const response = await axios.post(fundUsersUrl, {
        email: user.user.email,
      });
      // Check if response.data is defined
      const usersData = response.data || [];
      console.log(usersData)
 const newUserList = usersData.map((item , index) => ({
        id: item.users_id,
        avatarUrl: item.profile_picture,
        name: item.first_mame,
        email: item.email,
        phoneNumber: item.phoneno,

        state: 'Virginia',
        city: 'Rancho Cordova',
        zipCode: '85807',
        isVerified: item.id,
        status: randomInArray(['active', 'banned']), // Assuming randomInArray is defined el
      }));
       
      setUserList(newUserList);
   
     
        
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    getData();
    
  }, []); // Empty dependency array to run only once on mount

  return _userList;
};