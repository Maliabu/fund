import jwtDecode from 'jwt-decode';
import { verify, sign } from 'jsonwebtoken';
//
import axios from './axios';

// ----------------------------------------------------------------------

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return { valid: false, reason: 'Token is missing' };
  }

  try {
    // Decode the token to extract expiration time
    const decoded = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;

    // Check if the token is expired
    if (decoded.exp <= currentTime) {
      return { valid: false, reason: 'Token has expired' };
    }

    // Token is valid
    return { valid: true };
  } catch (error) {
    // Token decoding failed
    return { valid: false, reason: 'Token decoding error', error };
  }
};

//  const handleTokenExpired = (exp) => {
//   let expiredTimer;

//   window.clearTimeout(expiredTimer);
//   const currentTime = Date.now();
//   const timeLeft = exp * 1000 - currentTime;
//   console.log(timeLeft);
//   expiredTimer = window.setTimeout(() => {
//     console.log('expired');
//     // You can do what ever you want here, like show a notification
//   }, timeLeft);
// };

// ----------------------------------------------------------------------

const setSession = (accessToken) => {
  if (accessToken) {
    
    try {
  localStorage.setItem('accessToken', accessToken);
 
} catch (error) {
  alert(error);
}
    
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // This function below will handle when token is expired
    // const { exp } = jwtDecode(accessToken);
    // handleTokenExpired(exp);
  } else {
   
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

export { isValidToken, setSession, verify, sign };
