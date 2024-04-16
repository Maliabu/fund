import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Container, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';
import useAuth from '../../hooks/useAuth';
import useFundData from '../../hooks/fund';

import {investorUpdateUrl} from "../Url";

export default function UpdateFundModal({ open, onClose }) {
  const { user } = useAuth();
  const { bookData, isLoading, error } = useFundData();
  const Email = user.user.email;
  const [Feez, setfeez] = useState();
  const [classid, setclassid] = useState();
  useEffect(() => {
    if (bookData) {
    
      setfeez(bookData.feez);
      setclassid(JSON.parse(localStorage.getItem('selectedRow')));
    }
  }, [bookData]);
  
  const [formData, setFormData] = useState({
    newAmount: '',
    newInterestRate: '',
    isProcessing: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({ ...formData, isProcessing: true });

    try {
      const response = await axios.post(investorUpdateUrl, {
        classID: classid,
        newAmount: formData.newAmount,
        type: 'post',
        email: Email,
        bought: bookData.funddata.bought,
        rate: formData.newInterestRate,
        newValue: formData.newAmount,
        fees: Feez,
      });
       console.log(response)
      window.location.reload();
      setFormData({
        newAmount: '',
        newInterestRate: '',
        isProcessing: false,
      });
      onClose();
    } catch (error) {
      console.error('Error:', error);
      setFormData({ ...formData, isProcessing: false });
    }
  };

  if (isLoading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="body1" color="error">
          Error: {error.message}
        </Typography>
      </Container>
    );
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Fund</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="New Fund Value"
            name="newAmount"
            value={formData.newAmount}
            onChange={handleChange}
            required
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="New Interest Rate"
            name="newInterestRate"
            value={formData.newInterestRate}
            onChange={handleChange}
            required
            margin="normal"
            variant="outlined"
          />
          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary" disabled={formData.isProcessing}>
              {formData.isProcessing ? 'Processing...' : 'Update'}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
UpdateFundModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
