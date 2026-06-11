import { useState, useEffect } from "react";
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
  createHostel,
  updateHostel,
} from "../services/hostelService";

const AddHostelDialog = ({
  open,
  handleClose,
  refreshHostels,
  hostel,
}) => {
  const emptyForm = {
    hostelName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    contactNumber: "",
    email: "",
  };

  const [formData, setFormData] =
    useState(emptyForm);

  useEffect(() => {
    if (hostel) {
      setFormData({
        hostelName: hostel.hostelName || "",
        address: hostel.address || "",
        city: hostel.city || "",
        state: hostel.state || "",
        pincode: hostel.pincode || "",
        contactNumber:
          hostel.contactNumber || "",
        email: hostel.email || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [hostel, open]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(emptyForm);
  };

  const handleSubmit = async () => {
    try {
      if (
        !formData.hostelName ||
        !formData.address ||
        !formData.city
      ) {
        Swal.fire({
          icon: "warning",
          title: "Validation Error",
          text: "Hostel Name, Address and City are required",
        });
        return;
      }

      if (hostel) {
        await updateHostel(
          hostel.hostelId,
          formData
        );

        Swal.fire({
          icon: "success",
          title: "Updated",
          text: "Hostel Updated Successfully",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await createHostel(formData);

        Swal.fire({
          icon: "success",
          title: "Created",
          text: "Hostel Added Successfully",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      refreshHostels();
      handleClose();
      resetForm();
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Operation Failed",
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
        {hostel
          ? "Edit Hostel"
          : "Add Hostel"}
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
              label="Hostel Name"
              name="hostelName"
              value={
                formData.hostelName
              }
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Pincode"
              name="pincode"
              value={
                formData.pincode
              }
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Contact Number"
              name="contactNumber"
              value={
                formData.contactNumber
              }
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
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
          {hostel ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddHostelDialog;