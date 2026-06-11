import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import AddHostelDialog from "../components/AddHostelDialog";

import {
  Paper,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Box,
  IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Swal from "sweetalert2";

import {
  getAllHostels,
  searchHostelsByCity,
  deleteHostel,
} from "../services/hostelService";

const Hostels = () => {
  const [hostels, setHostels] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchCity, setSearchCity] = useState("");
  const [selectedHostel, setSelectedHostel] = useState(null);

  const loadHostels = async () => {
    try {
      const data = await getAllHostels();
      setHostels(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadHostels();
  }, []);

  const handleSearch = async () => {
    try {
      if (!searchCity.trim()) {
        loadHostels();
        return;
      }

      const data = await searchHostelsByCity(searchCity);
      setHostels(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = () => {
    setSelectedHostel(null);
    setOpenDialog(true);
  };

  const handleEdit = (hostel) => {
    setSelectedHostel(hostel);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Hostel?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      try {
        await deleteHostel(id);

        Swal.fire({
          icon: "success",
          title: "Deleted Successfully",
          timer: 1500,
          showConfirmButton: false,
        });

        loadHostels();
      } catch (error) {
        console.error(error);

        Swal.fire({
          icon: "error",
          title: "Delete Failed",
        });
      }
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
          Hostel Management
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 3,
            flexWrap: "wrap",
          }}
        >
          <TextField
            label="Search By City"
            size="small"
            value={searchCity}
            onChange={(e) =>
              setSearchCity(e.target.value)
            }
          />

          <Button
            variant="outlined"
            onClick={handleSearch}
          >
            Search
          </Button>

          <Button
            variant="contained"
            onClick={handleAdd}
          >
            Add Hostel
          </Button>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>ID</b>
              </TableCell>

              <TableCell>
                <b>Name</b>
              </TableCell>

              <TableCell>
                <b>City</b>
              </TableCell>

              <TableCell>
                <b>State</b>
              </TableCell>

              <TableCell>
                <b>Contact</b>
              </TableCell>

              <TableCell>
                <b>Email</b>
              </TableCell>

              <TableCell align="center">
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {hostels.length > 0 ? (
              hostels.map((hostel) => (
                <TableRow key={hostel.hostelId}>
                  <TableCell>
                    {hostel.hostelId}
                  </TableCell>

                  <TableCell>
                    {hostel.hostelName}
                  </TableCell>

                  <TableCell>
                    {hostel.city}
                  </TableCell>

                  <TableCell>
                    {hostel.state}
                  </TableCell>

                  <TableCell>
                    {hostel.contactNumber}
                  </TableCell>

                  <TableCell>
                    {hostel.email}
                  </TableCell>

                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() =>
                        handleEdit(hostel)
                      }
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() =>
                        handleDelete(
                          hostel.hostelId
                        )
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  align="center"
                >
                  No Hostels Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <AddHostelDialog
          open={openDialog}
          handleClose={() =>
            setOpenDialog(false)
          }
          refreshHostels={loadHostels}
          hostel={selectedHostel}
        />
      </Paper>
    </DashboardLayout>
  );
};

export default Hostels;