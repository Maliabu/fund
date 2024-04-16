import { useEffect, useState } from 'react';
import axios from 'axios';
import { profileUrl } from '../components/Url';


const useUserData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
const myparam = new URLSearchParams(window.location.search);

  const userEmail = myparam.get('user');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post(profileUrl, {

          email: userEmail,
        });
        setData(response.data);
    
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      // Cleanup function if needed
    };
  }, [userEmail]);

  return { data, loading, error };
};

export default useUserData;