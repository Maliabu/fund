import * as Yup from 'yup';
import { useCallback, useState } from 'react';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Grid, Card, Stack, Typography } from '@mui/material';
import { RHFEditor, FormProvider, RHFTextField, RHFUploadSingleFile } from '../../../components/hook-form';
import BlogNewPostPreview from './BlogNewPostPreview';
import { updaterEmailUrl } from '../../../components/Url'; // Importing the URL
import useAuth from '../../../hooks/useAuth';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export default function BlogNewPostForm() {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [File, setFile] = useState(false);
  
  const { user } = useAuth();
  const userEmail = user.user.email;
  const classID = JSON.parse(localStorage.getItem('selectedRow'));

 /**  const handleOpenPreview = () => {
    setOpen(true);
  }; */

  const handleClosePreview = () => {
    setOpen(false);
  };

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string().min(10).required('Content is required'),
    attachment: Yup.mixed().required('Attachment is required'),
  });

  const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues: {
      title: '',
      description: '',
      content: '',
      attachment: null,
      tags: ['Logan'],
      publish: true,
      comments: true,
      metaTitle: '',
      metaDescription: '',
      metaKeywords: ['Logan'],
    },
  });

  const { watch, setValue, handleSubmit, formState: { isSubmitting, isValid } } = methods;
  const values = watch();

  const onSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('emailSubject', values.title);
      formData.append('emailBody', values.content);
      formData.append('email', userEmail);
     formData.append('class_id', classID );
      formData.append('attachment', File);

      await axios.post(updaterEmailUrl, formData, { // Using the provided URL
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

  
     // reset();
      handleClosePreview();
      enqueueSnackbar('Post success!');
    } catch (error) {
      console.error('Error:', error);
      enqueueSnackbar('Failed to post!');
    }
  };

  const handleDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file)
    if (file) {
      setValue(
        'attachment',
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    }
  }, [setValue]);

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid>
          <Grid>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField name="title" label="Email subject" />
                <div>
                  <LabelStyle>Email Body</LabelStyle>
                  <RHFEditor name="content" />
                </div>
                <div>
                  <LabelStyle>Attachment</LabelStyle>
                  <RHFUploadSingleFile name="attachment" accept=".pdf" maxSize={3145728} onDrop={handleDrop} />
                </div>
              </Stack>
              <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
             {/**   <Button fullWidth color="inherit" variant="outlined" size="large" onClick={handleOpenPreview}>
                  Preview
                </Button>  * */}
                <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                  Post
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
      <BlogNewPostPreview
        values={values}
        isOpen={open}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onClose={handleClosePreview}
        onSubmit={handleSubmit(onSubmit)}
      />
    </>
  );
}
