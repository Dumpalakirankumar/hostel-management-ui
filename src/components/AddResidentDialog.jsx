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
  createResident,
  updateResident,
} from "../services/residentService";

const AddResidentDialog = ({
  open,
  handleClose,
  refreshResidents,
  resident,
}) => {
  const emptyForm = {
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    gender: "",
    aadhaarNumber: "",
    bedId: "",
  };

  const [formData, setFormData] =
    useState(emptyForm);

  useEffect(() => {
    if (resident) {
      setFormData({
        firstName: resident.firstName || "",
        lastName: resident.lastName || "",
        mobileNumber:
          resident.mobileNumber || "",
        email: resident.email || "",
        gender: resident.gender || "",
        aadhaarNumber:
          resident.aadhaarNumber || "",
        bedId: resident.bedId || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [resident, open]);

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
        bedId: Number(formData.bedId),
      };

      if (resident) {
        await updateResident(
          resident.residentId,
          payload
        );

        Swal.fire({
          icon: "success",
          title: "Resident Updated",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await createResident(payload);

        Swal.fire({
          icon: "success",
          title: "Resident Added",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      refreshResidents();
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
        {resident
          ? "Edit Resident"
          : "Add Resident"}
      </DialogTitle>

      <DialogContent>
        <Grid
          container
          spacing={2}
          sx={{ mt: 1 }}
        >
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Mobile Number"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Aadhaar Number"
              name="aadhaarNumber"
              value={formData.aadhaarNumber}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              label="Bed ID"
              name="bedId"
              value={formData.bedId}
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
          {resident ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddResidentDialog;