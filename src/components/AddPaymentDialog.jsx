import { useState } from "react";
import Swal from "sweetalert2";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from "@mui/material";

import { createPayment } from "../services/paymentService";

const AddPaymentDialog = ({
  open,
  handleClose,
  refreshPayments,
}) => {
  const [formData, setFormData] = useState({
    amount: "",
    paymentMode: "",
    paymentStatus: "",
    residentId: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      amount: "",
      paymentMode: "",
      paymentStatus: "",
      residentId: "",
    });
  };

  const handleSubmit = async () => {
    try {
      await createPayment({
        ...formData,
        amount: Number(formData.amount),
        residentId: Number(formData.residentId),
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Payment Added Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      refreshPayments();
      handleClose();
      resetForm();
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to Add Payment",
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Add Payment</DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Payment Mode"
              name="paymentMode"
              value={formData.paymentMode}
              onChange={handleChange}
              placeholder="CASH / UPI / CARD"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Payment Status"
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleChange}
              placeholder="PAID"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Resident ID"
              name="residentId"
              type="number"
              value={formData.residentId}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPaymentDialog;