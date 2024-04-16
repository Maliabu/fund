import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import BlogNewPostForm from "../../sections/@dashboard/blog/BlogNewPostForm";

export default function EmailModal({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Send Email updates</DialogTitle>
      <DialogContent sx={{ minHeight: '300px' }}>
        <BlogNewPostForm />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

// Prop type validation
EmailModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
