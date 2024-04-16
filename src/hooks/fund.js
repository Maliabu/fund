import { useState, useEffect } from 'react';
import axios from 'axios';
import {fundUpdateUrl} from "../components/Url";

const useFundData = () => {
  
  const selectedRow = JSON.parse(localStorage.getItem('selectedRow'));
  
  const [bookData, setBookData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Assume you have an API endpoint for retrieving book data by posting the selected row
        const response = await axios.post(fundUpdateUrl,
        { 
         classID :selectedRow,
          
          
        });
        setBookData(response.data);
        const fundUsersDataJSON = JSON.stringify(response.data.fundusers);

// Store the data in local storage under the key 'fundUsers'
localStorage.setItem('fundUsers', fundUsersDataJSON);
       
        
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedRow) {
      fetchData();
    }
  }, [selectedRow]);

  return { bookData, isLoading, error };
};

export default useFundData;