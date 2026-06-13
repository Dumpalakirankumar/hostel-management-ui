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
  createRoom,
  updateRoom,
} from "../services/roomService";

const AddRoomDialog = ({
  open,
  handleClose,
  refreshRooms,
  room,
}) => {
  const emptyForm = {
    roomNumber: "",
    roomType: "",
    capacity: "",
    monthlyRent: "",
    floorNumber: "",
    status: "",
    hostelId: "",
  };

  const [formData, setFormData] =
    useState(emptyForm);

  useEffect(() => {
    if (room) {
      setFormData({
        roomNumber: room.roomNumber || "",
        roomType: room.roomType || "",
        capacity: room.capacity || "",
        monthlyRent: room.monthlyRent || "",
        floorNumber: room.floorNumber || "",
        status: room.status || "",
        hostelId: room.hostelId || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [room, open]);

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
        capacity: Number(formData.capacity),
        monthlyRent: Number(formData.monthlyRent),
        floorNumber: Number(formData.floorNumber),
        hostelId: Number(formData.hostelId),
      };

      if (room) {
        await updateRoom(room.roomId, payload);

        Swal.fire({
          icon: "success",
          title: "Updated Successfully",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await createRoom(payload);

        Swal.fire({
          icon: "success",
          title: "Room Added Successfully",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      refreshRooms();
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
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        {room ? "Edit Room" : "Add Room"}
      </DialogTitle>

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
              type="number"
              label="Capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="Monthly Rent"
              name="monthlyRent"
              value={formData.monthlyRent}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="Floor Number"
              name="floorNumber"
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
              type="number"
              label="Hostel ID"
              name="hostelId"
              value={formData.hostelId}
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
          {room ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRoomDialog;