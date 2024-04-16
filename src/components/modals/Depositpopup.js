import PropTypes from 'prop-types';

import React, { useState, useEffect } from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import axios from 'axios';
import { Dialog, DialogContent, Card,Box, CardContent, Typography, Button, Grid, TextField, Stack,Select, MenuItem } from '@mui/material';

import { DetailWidget } from '../../sections/@dashboard/general/app';
import { classAndOptionsUrl, getDepositDetailsUrl, apiPath } from "../Url";
import useAuth from '../../hooks/useAuth';


const DepositPopupModal = ({ open, onClose }) => {
  
  const { user } = useAuth();
  const userEmail = user.user.email;
  const currencyv = user.currency;
  const myName = user.user.first_name;
  const Phone= user.user.phoneno;
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState(1);
   
  const [amountz, setAmount] = useState('');
  const [investmentData, setInvestmentData] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  


  const config = {
    public_key: 'FLWPUBK-b248048d7e363a0497a7bf525c43d822-X',
    tx_ref: Date.now(),
    amount: amountz,
    currency: currencyv,
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: userEmail,
       phone_number: Phone,
      name: myName,
    },
    customizations: {
      title: 'Deposit',
      description: 'Deposit on Cyanase ',
      logo: 'https://developers.cyanase.lol/image/logh.png',
    },
  };
  const handleFlutterPayment = useFlutterwave(config);
  const handleChangeClass = (event) => {
    setSelectedClass(event.target.value);
    setSelectedOption('');
  };

  const handleChangeOption = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleDepositOnline = () => {
    setStep(3);
  };

  const handleDepositOffline = () => {
    setStep(4);
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

const handlePay =() => {
  
          setProcessing(true); 
   
  axios.post(getDepositDetailsUrl, {
  option: selectedOption,
    })
    .then((response) => {
      
            const via = response.data.Data[0];
       const {minimum} = via;
        const fundIdv = via.investment_option_id;
       if(parseInt(amountz, 10) < parseInt(minimum, 10)){
         
         setProcessing(false);
         alert("Amount is below minimum deposit");
         
       }else{
         
                handleFlutterPayment({

            callback: (response) => {
               
                closePaymentModal();
                if(response.status==='successfull' && response.charge_response_code=== "00"){
                    axios({
                        method: 'POST',
                        url: apiPath,
                        headers: { 'content-type': 'application/json' },
                        data: {
                                                fundId : fundIdv,
                          id: user.user.user_id, 
                     amount: amountz, currency: currencyv }
                    })
                        .then(result => {

                            const {message} = result.data;
                            const stateMe = result.data.error
                          

                            if (stateMe === 200) {
                                

                          setProcessing(false);

alert("failed to save")
                            } else if (message === "success") {

                            window.locatiom.reload()        
                            }


                        })
                        .catch(error => alert(error));
                  
                }
            },
            onClose: () => {},
        }); 
       }
      
    })

  
  
}

  useEffect(() => {
    // Fetch investment data from your API or data source
    axios.get(classAndOptionsUrl)
      .then((response) => {

        setInvestmentData(response.data);
      })
      .catch((error) => console.error('Error fetching investment data:', error));
  }, []);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogContent>
     <Typography variant="h5">Deposit money </Typography>
{step === 1 && (
  <>
    
      <CardContent>

        <TextField
          select
          onChange={handleChangeClass}
          value={selectedClass}
          name="class" 
          label="Investment class" 
          sx={{ width: '100%', height: 56 }}
        >
          <MenuItem value="">Select Class</MenuItem>
          {investmentData.map((classItem) => (
            <MenuItem key={classItem.id} value={classItem.name}>{classItem.name}</MenuItem>
          ))}
        </TextField>
      </CardContent>
    
{selectedClass && (
  <>
    <CardContent>
      <p>Choose investment option</p>
      <Select
        labelId="option-label"
        id="option"
        value={selectedOption}
        onChange={handleChangeOption}
        fullWidth
      >
        <MenuItem value="">Select Option</MenuItem>
        {(investmentData.find((classItem) => classItem.name === selectedClass)?.options || []).map((option) => (
          <MenuItem key={option.option_id} value={option.option_id}>{option.name}</MenuItem>
        ))}
      </Select>
    </CardContent>
    <Box mt={2}>
      <Button onClick={handleNext}>Next</Button>
    </Box>
  </>
)}
  </>
)}



        {step === 2 && (
          <Card>
          <Typography variant="body2">Choose deposit method</Typography>
          <CardContent>
      <Grid container spacing={2} mt={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={6} lg={12}>
          <Stack spacing={1}>
            <DetailWidget head="Offline" subhead="Make a deposit using our offline methods" icon={'eva:person-fill'} myClick={handleDepositOffline} />
            <DetailWidget head="Online" subhead="Make a deposit using our online methods" icon={'eva:email-fill'} color="success" myClick={handleDepositOnline} />
          </Stack>
        </Grid>
      </Grid>
    </CardContent>
       <Button onClick={handlePrevious}
      >Previous</Button>
     
          </Card>
        )}

        {step === 3 && (
          <Card>
          
            <CardContent>
            
              <Typography variant="h5">Online Deposit</Typography>

              <TextField
                label="Amount"
                value={amountz}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
                mb={2}
              />
              <br/>
              <Grid container justifyContent="flex-end">
                <Button onClick={handlePrevious}>Previous</Button>
<Button 
    onClick={handlePay}
    disabled={processing} 
>
    {processing ? 'Processing...' : 'Deposit'}
</Button>
              </Grid>
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card>
            <CardContent>
              <Typography color ="#252859" variant="body2">Deposit money to our  bank account and proceed to send us your deposit receipt at deposit@cyanase.com</Typography>
              <br/>  <br/> 
<hr/>
 <Typography variant="body2">Bank Account</Typography>
 <Typography variant="h6">Diamond trust bank</Typography>
  <Typography variant="body2">Bank Account Name</Typography>
 <Typography variant="h6">Cyanase technology and investment LTD</Typography>
 
  <Typography variant="body2">Bank Account number</Typography>
 <Typography variant="h6">0190514001</Typography>
              <Grid container justifyContent="flex-end">
                <Button onClick={handlePrevious}>Previous</Button>
              </Grid>
            </CardContent>
          </Card>
        )}

        {step === 5 && (
          <Card>
            <CardContent>
              <Typography variant="h5">Confirmation</Typography>
              <Grid container justifyContent="flex-end">
                <Button onClick={handlePrevious}>Previous</Button>
                <Button onClick={onClose}>Confirm</Button>
              </Grid>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
};
DepositPopupModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DepositPopupModal;