import axios from "axios";
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, Button, Card, CardHeader, Typography, Stack } from '@mui/material';
import { fCurrency } from '../../../../utils/formatNumber';
import Scrollbar from '../../../../components/Scrollbar';

import { investorUrl, investMoneyUrl } from "../../../../components/Url";
import useAuth from '../../../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function EcommerceLatestProducts() {
  const { user } = useAuth();
  const { email } = user.user; // Using object shorthand syntax
  const [Mdata, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);
  


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(investorUrl, { email }); // Using object shorthand syntax
        setData(response.data.request);
       
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [email]); // Using object shorthand syntax

  const handleInvest = (index, classz, amountx) => {
    
    setClickedIndex(index);
    setIsLoading(true);
    axios.post(investMoneyUrl, { 
      class_id: classz,
      amount: amountx,
    })
      .then(response => {
      
        if (response.data.success === true) {
          window.location.reload();
        }
      })
      .catch(error => {
        console.log(error);
      })
      
  };

  return (
    <Card>
      <CardHeader title="Latest requests (New deposits)" />
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {Mdata.length > 0 ? (
            Mdata.map((product, index) => (
              <Stack key={index} direction="row" spacing={2}>
                <Box sx={{ flexGrow: 1, minWidth: 200 }}>
                  <Link component={RouterLink} to="#" sx={{ color: 'text.primary', typography: 'subtitle2' }}>
                    {product.investment_name}
                  </Link>
                  <Stack direction="row">
                    {product.priceSale > 0 && (
                      <Typography variant="body2" sx={{ color: 'text.secondary', textDecoration: 'line-through' }}>
                        {fCurrency(product.total_deposits)}
                      </Typography>
                    )}
                    &nbsp;
                    <Typography variant="body2" sx={{ color: product.priceSale ? 'error.main' : 'text.secondary' }}>
                      {fCurrency(product.total_deposits)} ({product.deposit_count} people)
                    </Typography>
                  </Stack>
                </Box>
                <Button
                  disabled={isLoading || index === clickedIndex}
                  onClick={() => {
                            
                    handleInvest(index, product.id, product.total_deposits);
                  }}
                >
                  {isLoading && index === clickedIndex ? "Processing..." : "Accept"}
                </Button>
              </Stack>
            ))
          ) : (
            <Typography variant="body2">No data available</Typography>
          )}
        </Stack>
      </Scrollbar>
    </Card>
  );
}

