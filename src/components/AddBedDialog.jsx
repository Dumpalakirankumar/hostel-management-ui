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
  createBed,
  updateBed,
} from "../services/bedService";

const AddBedDialog = ({
  open,
  handleClose,
  refreshBeds,
  bed,
}) => {
  const emptyForm = {
    bedNumber: "",
    status: "",
    roomId: "",
  };

  const [formData, setFormData] =
    useState(emptyForm);

  useEffect(() => {
    if (bed) {
      setFormData({
        bedNumber: bed.bedNumber || "",
        status: bed.status || "",
        roomId: bed.roomId || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [bed, open]);

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
        roomId: Number(formData.roomId),
      };

      if (bed) {
        await updateBed(bed.bedId, payload);

        Swal.fire({
          icon: "success",
          title: "Bed Updated Successfully",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await createBed(payload);

        Swal.fire({
          icon: "success",
          title: "Bed Added Successfully",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      refreshBeds();
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
        {bed ? "Edit Bed" : "Add Bed"}
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
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              label="Room ID"
              name="roomId"
              value={formData.roomId}
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
          {bed ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBedDialog;