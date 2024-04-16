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
import { changePwdUrl } from '../../../../components/Url';
// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const { user } = useAuth();
 const userData = user.user
  
    const userEmail = userData?.email || '';
    
    
  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string().min(5, 'Password must be at least 5 characters').required('New Password is required'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });

  const defaultValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const { reset, handleSubmit, setError } = methods;

  const onSubmit = async (formData) => {
    try {
      setIsSubmittingForm(true);

      // Perform validation and submit only if new password and confirm new password match
      if (formData.newPassword !== formData.confirmNewPassword) {
        setError('confirmNewPassword', {
          type: 'manual',
          message: 'Passwords must match',
        });
        return;
      }

      // Make POST request with the new password data
      const response = await axios.post(changePwdUrl, {
        old: formData.oldPassword,
        new: formData.newPassword,
        email: userEmail,
      });

      // Reset form and display success message if the request is successful
      if (response.data.status === 100) {
        reset();
        enqueueSnackbar('Password updated successfully!', { variant: 'success' });
        
      }else{
        enqueueSnackbar(response.data.message, { variant: 'success' });

      }
    } catch (error) {
      console.error('Error updating password:', error);
      enqueueSnackbar('Failed to update password', { variant: 'error' });
    } finally {
      setIsSubmittingForm(false);
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          <RHFTextField name="oldPassword" type="password" label="Old Password" />
          <RHFTextField name="newPassword" type="password" label="New Password" />
          <RHFTextField name="confirmNewPassword" type="password" label="Confirm New Password" />
          <LoadingButton type="submit" variant="contained" loading={isSubmittingForm}>
            Save Changes
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}
