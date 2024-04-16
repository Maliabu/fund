import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

import { Typography, Button, Tooltip } from '@mui/material';
import CopyToClipboard from 'react-copy-to-clipboard';

export default function CustomTag({ url }) {
  const handleCopy = () => {
    // Your copy logic here
  };

  return (
    <CopyToClipboard text={url} onCopy={handleCopy}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
        <Typography>Copy and share your company profile link</Typography>
        <Typography 
          style={{ backgroundColor: '#ffcc80', padding: '10px', borderRadius: '10px' }}
        >
          {url}
        </Typography>
        <Tooltip title="Copy to Clipboard" arrow>
          <Button size="small">Copy</Button>
        </Tooltip>
      </div>
    </CopyToClipboard>
  );
}

// Add PropTypes validation
CustomTag.propTypes = {
  url: PropTypes.string.isRequired, // Validate that 'url' is a required string prop
};
