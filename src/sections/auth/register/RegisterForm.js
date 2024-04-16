import axios from "axios";
import * as Yup from 'yup';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Stack, IconButton, InputAdornment, Alert,MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { Country } from '../../../components/Country';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { signupUrl, verifyUrl } from '../../../components/Url';
// ----------------------------------------------------------------------

export default function RegisterForm() {


  const isMountedRef = useIsMountedRef();
const [selectedCountry, setSelectedCountry] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    companyName: Yup.string().required('First name required'),
    myCountryCode: Yup.string().required(' counyry is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    completePhoneNumber: Yup.string().required('Phone is required'),
  });

  const defaultValues = {
    companyName: '',
    email: '',
    password: '',
    myCountryCode: '',
    completePhoneNumber:'',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,

    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const handleCountry = (event) => {
  setSelectedCountry(event.target.value);
  // Set the value of 'myCountryCode' in the form data
  methods.setValue('myCountryCode', event.target.value);
};
  
  
  const onSubmit = async (data) => {
  try {
    const response = await axios.post(signupUrl, data);
    
    if (response.data.signup === 'success') {
      const verificationCode = Math.floor(100000 + Math.random() * 900000);
      // Store the verification code in local storage
      localStorage.setItem('Code', verificationCode);
      localStorage.setItem('email',data.email);
      
      await axios.post(verifyUrl, {
        email: data.email,
        code: verificationCode,
      });

      window.location.href = "/auth/verify";
      console.log('User registered and email verified successfully.');
    } else {
      console.error('Signup failed:', response.data.signup);
      setError('Signup failed:', response.data.signup);

     // reset();
      if (isMountedRef.current) {
        setError('afterSubmit', new Error(response.data.signup));
      }
    }
  } catch (error) {
    console.error('Error during signup:', error);
    reset();
    if (isMountedRef.current) {
      setError('afterSubmit', error);
    }
  }
};

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="companyName" label="First name" />
          
        </Stack>

        <RHFTextField name="email" label="Email address" />
        <RHFTextField name="completePhoneNumber" label="Phone number" />
        
        <TextField 
          select
          value={selectedCountry}
          onChange={handleCountry}
          name="myCountryCode" 
          label="Country" 
          error={!!errors.myCountryCode} 
          helperText={errors.myCountryCode?.message}
        >
          {Country.map(country => (
            <MenuItem key={country.countryCode} value={country.country}>{country.country}</MenuItem>
          ))}
        </TextField>
        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}