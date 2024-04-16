import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, Card, CardContent, Typography, Button,Box, Grid, TextField, Stack, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';

import { DetailWidget } from '../../sections/@dashboard/general/app';

import { checkWithdrawUrl ,getBankUrl, getBankCodeUrl} from "../Url";
import useAuth from '../../hooks/useAuth';


const WithdrawModal = ({ open, onClose }) => {
  const { user } = useAuth();
  const userEmail = user.user.email;
  const currencyz = user.currency;
  const [banks, setBanks] = useState([]);
  const [branches, setBranches] = useState([]);
   const [noBranchesFound, setNoBranchesFound] = useState(false);
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
 
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState(1);
  const [mobileMoneyNumber, setMobileMoneyNumber] = useState('');
  const [amountz, setAmount] = useState('');
  const [bankDetails, setBankDetails] = useState('');

 const [channel, setChannel] = useState()
  const handleDepositOnline = () => {
    setChannel("bank")
    setStep(2);
  };

  const handleDepositOffline = () => {
    setChannel("mps")
    setStep(3);
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  useEffect(() => {
    // Fetch banks when component mounts
    const fetchBanks = async () => {
      try {
        setLoading(true);
        const response = await axios.post(getBankUrl);
        setBanks(response.data.data);
      } catch (error) {
        console.error('Error fetching banks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanks();
  }, []);
  const handleBankChange = async (selectedBankId) => {
    setSelectedBank(selectedBankId);
    
    try {
      setLoading(true); // Set loading to true before making the request
      const response = await axios.post(getBankCodeUrl, {
        id: selectedBankId
      });
      
      setBranches(response.data.data);
    
      if(response.data.status==="error"){
        setNoBranchesFound(true); 
      }
    } catch (error) {
      console.error('Error fetching branches:', error);
      setNoBranchesFound(true);
    
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };
  
  const handleSubmit = async () => {
    
   setProcessing(true)
      
    // Get selected portfolio details
    const parsedData = JSON.parse(localStorage.getItem('portfolioData'));
     
     
    const selected = JSON.parse(localStorage.getItem('selectedOption'));

    if (parsedData && parsedData.fundusers) {
      alert("yes we are here")
        const selectedPortfolio = parsedData.fundusers.find(portfolio => portfolio.option_id === selected.option);
        
        if (!amountz || Number.isNaN(parseFloat(amountz, 10))) {
    setProcessing(false)
    return;
  }
  
  // Check if the amount is less than or equal to zero
  if (parseFloat(amountz) <= 0) {
    
        setProcessing(false);
    return;
  }
          
            if (parseFloat(amountz, 10) > selectedPortfolio.totalNetworth) {
                alert('Insufficient balance');
                setProcessing(false);
               
            }else{



    try {
        // Send a POST request to the check_withdraw endpoint
        alert("ooh")
        const response = await axios.post(checkWithdrawUrl, {
            account_bank:selectedBank,
            account_branch:selectedBranch,
account_number: channel === 'bank' ? accountNumber : mobileMoneyNumber,
            withdraw_amount:amountz,
            option:selectedPortfolio.option_id,
            withdraw_channel: channel,
            currency: currencyz,
            email: userEmail,
          
        });
        
        console.log(response)
    // window.location.reload();

      
    } catch (error) {
        console.error('Error checking withdrawal:', error);
    } 
            }
    }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogContent>
        <Typography variant="h5">
        Choose Bank </Typography>

        {step === 1 && (
          <Card>
            <Typography variant="body2">Choose withdraw method</Typography>
            <CardContent>
              <Grid container spacing={2} mt={2}>
                <Grid item xs={12} md={6} lg={4}>
                  <Stack spacing={3}>
                    <DetailWidget head="Bank account" subhead="Readily available for larger transactions" icon={'eva:person-fill'} myClick={handleDepositOnline} />
                    <DetailWidget head="Mobile Money" subhead="let us process money to your mobile money number " icon={'eva:email-fill'} color="warning" myClick={handleDepositOffline} />
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

{step === 2 && (
  <Card>
    <Box mb={2}>
    <br/>
      <TextField
        select
        label="Choose bank"
        onChange={(e) => handleBankChange(e.target.value)}
        value={selectedBank}
        sx={{ width: '100%', height: 56 }}
      >
        {loading ? (
          <MenuItem disabled>Loading...</MenuItem>
        ) : (
          banks.map((bank) => (
            <MenuItem key={bank.id} value={bank.id}>{bank.name}</MenuItem>
          ))
        )}
      </TextField>
    </Box>
    <hr />
    <div>
      {noBranchesFound ? (
        <Typography color="error">No branches found for the selected bank.</Typography>
      ) : (
        branches && branches.length > 0 && (
          <>
            <Box mt={2}>
              <TextField
                select
                onChange={(e) => setSelectedBranch(e.target.value)}
                value={selectedBranch}
                label="Select Branch"
                sx={{ width: '100%', height: 56 }}
              >
                {branches.map((branch) => (
                  <MenuItem key={branch.id} value={branch.branch_code}>{branch.branch_name}</MenuItem>
                ))}
              </TextField>
            </Box>
            <Grid container justifyContent="flex-end">
              <Button onClick={handlePrevious}>Previous</Button>
              <Button onClick={handleNext} type="button">Next</Button>
            </Grid>
          </>
        )
      )}
    </div>
  </Card>
)}

{step === 3 && (
  <Card>
    <CardContent>
      <Typography variant="body2">Enter withdraw amount</Typography>

      <TextField
        label="Withdraw amount"
        value={amountz}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        mb={2}
      />
      <Box mb={2}> {/* Add space between inputs */}
        {channel === 'bank' ? (
          <TextField
            label="Enter account number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            fullWidth
          />
        ) : (
          <TextField
            label="Enter mobile money number"
            value={mobileMoneyNumber}
            onChange={(e) => setMobileMoneyNumber(e.target.value)}
            fullWidth
          />
        )}
      </Box>
      <Grid container justifyContent="flex-end">
        <Button onClick={handlePrevious}>Previous</Button>
        
<Button 
    onClick={handleSubmit}
    disabled={processing} 
>
    {processing ? 'Processing...' : 'Withdraw'}
</Button>
      </Grid>
    </CardContent>
  </Card>
)}

        {step === 4 && (
          <Card>
            <CardContent>
              <Typography variant="h5">Offline withdraw</Typography>
              <TextField
                label="Bank Details"
                value={bankDetails}
                onChange={(e) => setBankDetails(e.target.value)}
                fullWidth
                multiline
                rows={4}
                mb={2}
              />
              <Grid container justifyContent="flex-end">
                <Button onClick={handlePrevious}>Previous</Button>
              </Grid>
            </CardContent>
          </Card>
        )}


      </DialogContent>
    </Dialog>
  );
};

WithdrawModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};


export default WithdrawModal;