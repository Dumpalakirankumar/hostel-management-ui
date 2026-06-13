import { useEffect, useState } from "react";
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

import {
  createPayment,
  updatePayment,
} from "../services/paymentService";

const AddPaymentDialog = ({
  open,
  handleClose,
  refreshPayments,
  payment,
}) => {
  const emptyForm = {
    amount: "",
    paymentMode: "",
    paymentStatus: "",
    residentId: "",
  };

  const [formData, setFormData] =
    useState(emptyForm);

  useEffect(() => {
    if (payment) {
      setFormData({
        amount: payment.amount || "",
        paymentMode:
          payment.paymentMode || "",
        paymentStatus:
          payment.paymentStatus || "",
        residentId:
          payment.residentId || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [payment, open]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(emptyForm);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        amount: Number(formData.amount),
        residentId: Number(
          formData.residentId
        ),
      };

      if (payment) {
        await updatePayment(
          payment.paymentId,
          payload
        );

        Swal.fire({
          icon: "success",
          title: "Payment Updated",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await createPayment(payload);

        Swal.fire({
          icon: "success",
          title: "Payment Added",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      refreshPayments();
      handleClose();
      resetForm();
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Operation Failed",
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
      <DialogTitle>
        {payment
          ? "Edit Payment"
          : "Add Payment"}
      </DialogTitle>

      <DialogContent>
        <Grid
          container
          spacing={2}
          sx={{ mt: 1 }}
        >
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              label="Amount"
              name="amount"
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
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Payment Status"
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              label="Resident ID"
              name="residentId"
              value={formData.residentId}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
            resetForm();
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          {payment ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPaymentDialog;