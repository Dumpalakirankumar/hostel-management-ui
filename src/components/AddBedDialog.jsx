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

import { createBed } from "../services/bedService";

const AddBedDialog = ({
  open,
  handleClose,
  refreshBeds,
}) => {
  const [formData, setFormData] = useState({
    bedNumber: "",
    status: "",
    roomId: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      bedNumber: "",
      status: "",
      roomId: "",
    });
  };

  const handleSubmit = async () => {
    try {
      await createBed({
        ...formData,
        roomId: Number(formData.roomId),
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Bed Added Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      refreshBeds();
      handleClose();
      resetForm();
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to Add Bed",
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
      <DialogTitle>Add Bed</DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Bed Number"
              name="bedNumber"
              value={formData.bedNumber}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              placeholder="AVAILABLE"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Room ID"
              name="roomId"
              type="number"
              value={formData.roomId}
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

export default AddBedDialog;