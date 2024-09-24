import { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Box, Grid, Card, Stack, Typography, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import useAuth from '../../../../hooks/useAuth';
import { fData } from '../../../../utils/formatNumber';
import { FormProvider, RHFTextField, RHFUploadAvatar } from '../../../../components/hook-form';
import { bioUrl, changeDpUrl, companyUrl } from '../../../../components/Url';
import CustomTag from './copy';

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
 const userData = user.user
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingabout, setIsSavingabout] = useState(false);
  const [isSavingcCompany, setIsSavingCompany] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); 
  const [selectedCompanyFile, setSelectedCompanyFile] = useState();
  const [aboutText, setAboutText] = useState(userData?.about || ''); // Initialize about text with user's existing about text

  const UpdateUserSchema = Yup.object().shape({
    displayName: Yup.string().required('Name is required'),
  });

  const defaultValues = {
    displayName: userData?.username || '',
    email: userData?.email || '',
    photoURL: `https://fund.cyanase.app/fund/profile_pic/${  userData?.profile_picture || ''}`,

    // Add other default values as needed
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
  } = methods;

  const handlepic = async () => {
    setIsSaving(true);

    const formData = new FormData(); 
    
    try {
      formData.append('email', defaultValues.email);
      formData.append('file', selectedFile);

      const response = await axios.post(changeDpUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important: set content type as multipart form data
        },
      });
 
      if(response.data.success===true){
        enqueueSnackbar('Profile picture updated successfully!', { variant: 'success' });
        setIsSaving(false);
          
      }else{
        setIsSaving(false)
        enqueueSnackbar('Failed to update profile picture', { variant: 'error' });
      
      }
      
      
    } catch (error) {
      setIsSaving(false);
      console.error('Error updating profile picture:', error);
      enqueueSnackbar('Failed to update profile picture', { variant: 'error' });
    }
  };
  const handleCompany = async () => {
    setIsSavingCompany(true);

    const formData = new FormData(); 
    
    try {
      formData.append('email', defaultValues.email);
      formData.append('file', selectedCompanyFile);

      const response = await axios.post(companyUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important: set content type as multipart form data
        },
      });
 
      if(response.data.success===100){
        enqueueSnackbar('updated successfully!', { variant: 'success' });
        setIsSavingCompany(false);
          
      }else{
        setIsSavingCompany(false)
        enqueueSnackbar('Failed to update ', { variant: 'error' });
      
      }
      
      
    } catch (error) {
      setIsSaving(false);
      console.error('Error updating profile picture:', error);
      enqueueSnackbar('Failed to update profile picture', { variant: 'error' });
    }
  };
  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setValue('photoURL', Object.assign(file, { preview: URL.createObjectURL(file) }));
      setSelectedFile(file)
    }
  };

 
  const handleFileChange = (event) => {
  
    const file = event.target.files[0];
    if (file) {
      setSelectedCompanyFile(file); // Update the selected file state
      setValue('photoURL', Object.assign(file, { preview: URL.createObjectURL(file) }));
    }
  };
  const handleAbout = async () => {
    setIsSavingabout(true); // Set loading state for about section
    try {
      // Validate the about text using Yup schema
      await Yup.object().shape({
        about: Yup.string().required('About is required'), // Add any other validation rules as needed
      }).validate({ about: aboutText });
   
  
     const response = await axios.post(bioUrl, { text: aboutText, Email: defaultValues.email });
     
   if(response.data.success===true){
      enqueueSnackbar('About updated successfully!', { variant: 'success' });
      setIsSavingabout(false); // Reset loading state for about section
    }else {
      setIsSavingabout(false)
    }
    } catch (error) {
      setIsSavingabout(false); // Reset loading state for about section
      console.error('Error updating about section:', error);
      enqueueSnackbar(error.message || 'Failed to update about section', { variant: 'error' });
    }
  };
  
  return (
    <FormProvider methods={methods} >
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
            <RHFUploadAvatar
              name="photoURL"
              accept="image/*"
              maxSize={3145728}
              
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />
            <br />
            <LoadingButton onClick={handlepic} variant="contained" loading={isSaving}>
              {isSaving ? 'Saving...' : 'Save'}
            </LoadingButton>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <label htmlFor="upload-button">
                  <input
                    style={{ display: 'none' }}
                    id="upload-button"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <Button variant="outlined" component="span">
                    Choose company profile File
                  </Button>
                </label>
              </Stack>
              <LoadingButton onClick={handleCompany} variant="contained" loading={isSavingcCompany}>
              {isSavingcCompany ? 'Saving...' : 'Save and upload'}
            </LoadingButton>
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <RHFTextField name="about" multiline rows={4} label="About"  onChange={(e)=>{setAboutText(e.target.value)}}/>
              <LoadingButton onClick={handleAbout} variant="contained" loading={isSavingabout}>
              {isSavingabout ? 'Saving...' : 'Save changes'}
                
              </LoadingButton>
              <br />
            </Stack>
            <CustomTag url={`https://fund.cyanase.app/fundprofile?user=${defaultValues.email}`} />

          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
