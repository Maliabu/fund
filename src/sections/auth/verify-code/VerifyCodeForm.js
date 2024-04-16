
import axios from 'axios';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Icon from '@mui/material/Icon';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { verifyUpdateUrl, verifyUrl } from '../../../components/Url';


export default function VerifyCodeForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  
  const [Code, setCode] = useState('');
  const [InputCode, setInputCode] = useState('');
  const [emailz, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const MyCode = JSON.parse(localStorage.getItem("Code"));
    setCode(MyCode);
  
  }, []);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
   setEmail(storedEmail);
  
    
  }, []);

  const handleChange = (e) => {
    setInputCode(e.target.value);
  };

  const handleSubmitForm = async () => {
  
    if (parseInt(InputCode, 10) === parseInt(Code, 10)) {
      setIsLoading(true);
      const EMAIL_PATH = verifyUpdateUrl;
      axios({
        method: 'POST',
        url: EMAIL_PATH,
        headers: { 'content-type': 'application/json' },
        data: { email: emailz, type: "fund" }
      })
        .then(result => {
          const state = result.data.message;
          
          if (state === "verified") {
            window.location.href = '/';
          }
        })
        .catch(error => console.log(error));
    } else {
      setErrorMessage("Invalid code");
    }
  }

  const resendCode = () => {
    setIsLoading(true);
    const EMAIL_PATH = verifyUrl;
    axios({
      method: 'POST',
      url: EMAIL_PATH,
      headers: { 'content-type': 'application/json' },
      data: { email:emailz, code: Code }
    })
      .then(results => {
        setErrorMessage(results)
        setErrorMessage("Code sent!");
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error.data);
        setIsLoading(false);
      });
  }

  return (
    <Box sx={{ height: 1 }}>
      
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        
          
          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Didn&apos;t receive code?
            <Link onClick={resendCode} variant="subtitle2" sx={{ ml: 0.5 }}>Resend</Link>
          </Typography>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Stack spacing={3}>
              <TextField 
                {...register('code', { required: 'Verification code is required' })}
                name="code"
                label="Verification code" 
                onChange={handleChange}
                type="tel"
                error={!!errors.code} 
                helperText={errors.code?.message} 
              />
            </Stack>
            {errorMessage && <Typography color="error">{errorMessage}</Typography>}
            <Box height={20} />
            <LoadingButton
    fullWidth
    size="large"
    type="submit"
    variant="contained"
    color="inherit"
    loading={isLoading}
    loadingPosition="start" 
    startIcon={<Icon color="white" name="Loading2" size="20px" />} // Provide the startIcon here
    
>
              {isLoading ? <Icon color="white" name="Loading2" size="20px" /> : "Verify"}
    
</LoadingButton>

          </form>
        
      </Stack>
    </Box>
  );
}