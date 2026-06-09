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

import { createRoom } from "../services/roomService";

const AddRoomDialog = ({
  open,
  handleClose,
  refreshRooms,
}) => {
  const [formData, setFormData] = useState({
    roomNumber: "",
    roomType: "",
    capacity: "",
    monthlyRent: "",
    floorNumber: "",
    status: "",
    hostelId: "",
  });

  const resetForm = () => {
    setFormData({
      roomNumber: "",
      roomType: "",
      capacity: "",
      monthlyRent: "",
      floorNumber: "",
      status: "",
      hostelId: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await createRoom({
        ...formData,
        capacity: Number(formData.capacity),
        monthlyRent: Number(formData.monthlyRent),
        floorNumber: Number(formData.floorNumber),
        hostelId: Number(formData.hostelId),
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Room Added Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      refreshRooms();
      handleClose();
      resetForm();
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to Add Room",
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Add Room</DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Room Number"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Room Type"
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Capacity"
              name="capacity"
              type="number"
              value={formData.capacity}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Monthly Rent"
              name="monthlyRent"
              type="number"
              value={formData.monthlyRent}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Floor Number"
              name="floorNumber"
              type="number"
              value={formData.floorNumber}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Hostel ID"
              name="hostelId"
              type="number"
              value={formData.hostelId}
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

export default AddRoomDialog;