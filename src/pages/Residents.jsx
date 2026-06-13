import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import AddResidentDialog from "../components/AddResidentDialog";

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
  getAllResidents,
  deleteResident,
} from "../services/residentService";

const Residents = () => {
  const [residents, setResidents] =
    useState([]);

  const [openDialog, setOpenDialog] =
    useState(false);

  const [selectedResident, setSelectedResident] =
    useState(null);

  const loadResidents = async () => {
    try {
      const data = await getAllResidents();
      setResidents(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadResidents();
  }, []);

  const handleAdd = () => {
    setSelectedResident(null);
    setOpenDialog(true);
  };

  const handleEdit = (resident) => {
    setSelectedResident(resident);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Resident?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      await deleteResident(id);

      Swal.fire({
        icon: "success",
        title: "Deleted Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      loadResidents();
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
          Resident Management
        </Typography>

        <Button
          variant="contained"
          sx={{ mb: 3 }}
          onClick={handleAdd}
        >
          Add Resident
        </Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Aadhaar</TableCell>
                <TableCell>Bed ID</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {residents.map((resident) => (
                <TableRow
                  key={resident.residentId}
                >
                  <TableCell>
                    {resident.residentId}
                  </TableCell>

                  <TableCell>
                    {resident.firstName}
                  </TableCell>

                  <TableCell>
                    {resident.lastName}
                  </TableCell>

                  <TableCell>
                    {resident.mobileNumber}
                  </TableCell>

                  <TableCell>
                    {resident.email}
                  </TableCell>

                  <TableCell>
                    {resident.gender}
                  </TableCell>

                  <TableCell>
                    {resident.aadhaarNumber}
                  </TableCell>

                  <TableCell>
                    {resident.bedId}
                  </TableCell>

                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() =>
                        handleEdit(
                          resident
                        )
                      }
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() =>
                        handleDelete(
                          resident.residentId
                        )
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {residents.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    align="center"
                  >
                    No Residents Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <AddResidentDialog
          open={openDialog}
          handleClose={() =>
            setOpenDialog(false)
          }
          refreshResidents={
            loadResidents
          }
          resident={selectedResident}
        />
      </Paper>
    </DashboardLayout>
  );
};

export default Residents;