import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import AddRoomDialog from "../components/AddRoomDialog";

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
  getAllRooms,
  deleteRoom,
} from "../services/roomService";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRoom, setSelectedRoom] =
    useState(null);

  const loadRooms = async () => {
    try {
      const data = await getAllRooms();
      setRooms(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const handleEdit = (room) => {
    setSelectedRoom(room);
    setOpenDialog(true);
  };

  const handleAdd = () => {
    setSelectedRoom(null);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Room?",
      icon: "warning",
      showCancelButton: true,
    });

    if (result.isConfirmed) {
      await deleteRoom(id);

      Swal.fire({
        icon: "success",
        title: "Deleted",
        timer: 1500,
        showConfirmButton: false,
      });

      loadRooms();
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
          Room Management
        </Typography>

        <Button
          variant="contained"
          sx={{ mb: 3 }}
          onClick={handleAdd}
        >
          Add Room
        </Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Room No</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>Occupied</TableCell>
                <TableCell>Available</TableCell>
                <TableCell>Rent</TableCell>
                <TableCell>Floor</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Hostel</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rooms.map((room) => (
                <TableRow key={room.roomId}>
                  <TableCell>{room.roomNumber}</TableCell>
                  <TableCell>{room.roomType}</TableCell>
                  <TableCell>{room.capacity}</TableCell>
                  <TableCell>{room.occupiedBeds}</TableCell>
                  <TableCell>{room.availableBeds}</TableCell>
                  <TableCell>{room.monthlyRent}</TableCell>
                  <TableCell>{room.floorNumber}</TableCell>
                  <TableCell>{room.status}</TableCell>
                  <TableCell>{room.hostelId}</TableCell>

                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() =>
                        handleEdit(room)
                      }
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() =>
                        handleDelete(room.roomId)
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

        <AddRoomDialog
          open={openDialog}
          handleClose={() =>
            setOpenDialog(false)
          }
          refreshRooms={loadRooms}
          room={selectedRoom}
        />
      </Paper>
    </DashboardLayout>
  );
};

export default Rooms;