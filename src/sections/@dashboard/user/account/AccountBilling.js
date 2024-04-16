import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import axios from 'axios';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui

import { Stack, Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useAuth from '../../../../hooks/useAuth';
// components
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import { bankUrl } from '../../../../components/Url';
// ----------------------------------------------------------------------

export default function AccountBiling() {
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const { user } = useAuth();
 const userData = user.user
  
    const userEmail = userData?.email || '';
    
    
    const ChangeBankSchema = Yup.object().shape({
      bankname: Yup.string().required('Bank name is required'),
      bankaccname: Yup.string().required('Account name is required'),
      bankbranch: Yup.string().required('Bank branch is required'),
      banknumber: Yup.string().required('Account number is required'),
     
    });
    

  const defaultValues = {
    oldBank: '',
    newBank: '',
    confirmNewBank: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangeBankSchema),
    defaultValues,
  });

  const { reset, handleSubmit, setError } = methods;

  const onSubmit = async (formData) => {
    try {
      setIsSubmittingForm(true);

      // Perform validation and submit only if new Bank and confirm new Bank match
      if (formData.newBank !== formData.confirmNewBank) {
        setError('confirmNewBank', {
          type: 'manual',
          message: 'Banks must match',
        });
        return;
      }

      // Make POST request with the new Bank data
      const response = await axios.post(bankUrl, {
        bankname: formData.bankname,
        bankaccname: formData.bankaccname,
        bankbranch: formData.bankbranch,
        banknumber: formData.banknumber,
        email: userEmail,
      });


      // Reset form and display success message if the request is successful
      if (response.data.status === 100) {
        reset();
        enqueueSnackbar('Bank updated successfully!', { variant: 'success' });
        
      }else{
        enqueueSnackbar(response.data.message, { variant: 'success' });

      }
    } catch (error) {
      console.error('Error updating Bank:', error);
      enqueueSnackbar('Failed to update Bank', { variant: 'error' });
    } finally {
      setIsSubmittingForm(false);
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          <RHFTextField name="bankname" type="text" label="Bank name" />
          <RHFTextField name="bankaccname" type="text" label="Account name" />
          <RHFTextField name="bankbranch" type="text" label="Bank branch" />
          <RHFTextField name="banknumber" type="number" label="Account number" />

          <LoadingButton type="submit" variant="contained" loading={isSubmittingForm}>
            Save Changes
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}
