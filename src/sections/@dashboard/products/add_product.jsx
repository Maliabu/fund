import axios from "axios";
import React, { useState } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import useAuth from '../../../hooks/useAuth';
import { saveUrl } from "../../../components/Url";

const AddProductButton = () => {
  
  const { user } = useAuth();
  const productData = JSON.parse(localStorage.getItem("productData"));
  const [open, setOpen] = useState(false);
  const [investmentClassName, setInvestmentClassName] = useState("");
  const [fundValue, setFundValue] = useState("");
  const [minimumDeposit, setMinimumDeposit] = useState("");
  const [numberOfUnits, setNumberOfUnits] = useState("");
  const [interestRate, setInterestRate] = useState("");
    const [Management, setManagement] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    // Validate input fields
    if (!investmentClassName || !fundValue || !minimumDeposit || !numberOfUnits || !interestRate || !selectedOption) {
      setError(true);
      setErrorMessage("All fields are required");
      return;
    }
    setProcessing(true);

    // Make a POST request using axios
    axios.post(saveUrl, {
      email: user.user.email,
     InvName:investmentClassName,
      fundValue,
      mini:minimumDeposit,
     units: numberOfUnits,
Intrest:interestRate,
fee: Management,
      selectedOptions:selectedOption,
    })
      .then((response) => {
       
        if(response.data.success === true){
          setProcessing(false);
          window.location.reload();
        } else {
          setProcessing(false);
          setError(true);
          setErrorMessage(response.data);
        }
      })
      .catch((errors) => {
        console.errors("Error saving data:", errors);
        setProcessing(false);
      });
  };

  return (
    <div style={{ margin: "20px" }}>
      <Button
        variant="contained"
        onClick={handleOpen}
        color="inherit"
      >
        Add new product
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Product
          </Typography>
          <form>
          <Button
  variant="contained"
  onClick={handleClose}
  onKeyDown={(e) => e.key === 'Enter' && handleClose()}
  color="secondary"
>
  X
</Button>

            <TextField
              label="Investment Class Name"
              value={investmentClassName}
              onChange={(e) => setInvestmentClassName(e.target.value)}
              fullWidth
              margin="normal"
              error={error && !investmentClassName}
              helperText={error && !investmentClassName && "Investment class name is required"}
            />
            <TextField
              label="Value of the Fund"
              value={fundValue}
              type="number"
              onChange={(e) => setFundValue(e.target.value)}
              fullWidth
              margin="normal"
              error={error && !fundValue}
              helperText={error && !fundValue && "Value of the fund is required"}
            />
            <TextField
              label="Minimum Deposit"
              type="number"
              value={minimumDeposit}
              onChange={(e) => setMinimumDeposit(e.target.value)}
              fullWidth
              margin="normal"
              error={error && !minimumDeposit}
              helperText={error && !minimumDeposit && "Minimum deposit is required"}
            />
            <TextField
              label="Number of Units"
              value={numberOfUnits}
              type="number"
              onChange={(e) => setNumberOfUnits(e.target.value)}
              fullWidth
              margin="normal"
              error={error && !numberOfUnits}
              helperText={error && !numberOfUnits && "Number of units is required"}
            />
            <TextField
              label="Interest Rate"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              fullWidth
              margin="normal"
              error={error && !interestRate}
              helperText={error && !interestRate && "Interest rate is required"}
            />
                        <TextField
              label="Management fees in %"
              type="number"
              value={Management}
              onChange={(e) => setManagement(e.target.value)}
              fullWidth
              margin="normal"
              error={error && !Management}
              helperText={error && ! Management && "Fees are required"}
            />
            <TextField
              select
              label="Select Option"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              fullWidth
              margin="normal"
              error={error && !selectedOption}
              helperText={error && !selectedOption && "Select option is required"}
            >
              {/* Options for the select input */}
              {productData && productData.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>

            <Button variant="contained" onClick={handleSave} color="primary" disabled={processing}>
              {processing ? "Processing..." : "Save"}
            </Button>
            {error && (
              <Typography variant="body2" color="error" align="center" style={{ marginTop: "10px" }}>
                {errorMessage}
              </Typography>
            )}
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddProductButton;