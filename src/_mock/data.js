import { useEffect, useState } from 'react';
import axios from 'axios';
import { userDetailsUrl } from '../components/Url';
import useAuth from '../hooks/useAuth';

const useUserData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const userEmail = user.user.email;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const storedId = localStorage.getItem('userid');
        const response = await axios.post(userDetailsUrl, {
          id: storedId,
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
  }, [data, userEmail]);

  return { data, loading, error };
};

export default useUserData;