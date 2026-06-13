import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import AddBedDialog from "../components/AddBedDialog";

import {
  Paper,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Swal from "sweetalert2";

import {
  getAllBeds,
  deleteBed,
} from "../services/bedService";

const Beds = () => {
  const [beds, setBeds] = useState([]);
  const [openDialog, setOpenDialog] =
    useState(false);
  const [selectedBed, setSelectedBed] =
    useState(null);

  const loadBeds = async () => {
    try {
      const data = await getAllBeds();
      setBeds(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadBeds();
  }, []);

  const handleAdd = () => {
    setSelectedBed(null);
    setOpenDialog(true);
  };

  const handleEdit = (bed) => {
    setSelectedBed(bed);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Bed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      await deleteBed(id);

      Swal.fire({
        icon: "success",
        title: "Deleted Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      loadBeds();
    }
  };

  return (
    <DashboardLayout>
      <Paper
        sx={{
          p: 4,
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="bold"
        >
          Bed Management
        </Typography>

        <Button
          variant="contained"
          sx={{ mb: 3 }}
          onClick={handleAdd}
        >
          Add Bed
        </Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Bed ID</TableCell>
                <TableCell>Bed Number</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Room ID</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {beds.map((bed) => (
                <TableRow key={bed.bedId}>
                  <TableCell>{bed.bedId}</TableCell>
                  <TableCell>{bed.bedNumber}</TableCell>
                  <TableCell>{bed.status}</TableCell>
                  <TableCell>{bed.roomId}</TableCell>

                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() =>
                        handleEdit(bed)
                      }
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() =>
                        handleDelete(bed.bedId)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <AddBedDialog
          open={openDialog}
          handleClose={() =>
            setOpenDialog(false)
          }
          refreshBeds={loadBeds}
          bed={selectedBed}
        />
      </Paper>
    </DashboardLayout>
  );
};

export default Beds;