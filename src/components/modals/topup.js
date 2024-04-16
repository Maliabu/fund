import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import axios from 'axios';
import { Dialog, DialogContent, Card,CardContent, Typography, Button, Grid, TextField, Stack } from '@mui/material';

import { DetailWidget } from '../../sections/@dashboard/general/app';
import { apiPath } from "../Url";
import useAuth from '../../hooks/useAuth';


const TopupModal = ({ open, onClose }) => {
  
  const { user } = useAuth();
  const userEmail = user.user.email;
  const currencyv = user.currency;
  const myName = user.user.first_name;
  const Phone= user.user.phoneno;
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState(1);
   
  const [amountz, setAmount] = useState('');
  


  


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


  const handleDepositOnline = () => {
    setStep(2);
  };

  const handleDepositOffline = () => {
    setStep(3);
  };


  const handlePrevious = (v) => {
    setStep(step - v);
  };

const handlePay =() => {
  
          setProcessing(true); 
          handleFlutterPayment({

            callback: (response) => {
               
                closePaymentModal();
                if(response.status==='successfull' && response.charge_response_code=== "00"){
                    axios({
                        method: 'POST',
                        url: apiPath,
                        headers: { 'content-type': 'application/json' },
                        data: {
                                                email : userEmail,
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

  

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogContent>
     <Typography variant="h5">Deposit money </Typography>


        {step === 1 && (
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
     
          </Card>
        )}

        {step === 2 && (
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
                <Button onClick={()=>handlePrevious(1)}>Previous</Button>
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

        {step === 3 && (
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
                <Button onClick={()=>handlePrevious(2)}>Previous</Button>
              </Grid>
            </CardContent>
          </Card>
        )}

      </DialogContent>
    </Dialog>
  );
};

TopupModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TopupModal;