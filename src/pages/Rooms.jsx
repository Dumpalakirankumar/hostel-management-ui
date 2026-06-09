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
} from "@mui/material";

import { getAllRooms } from "../services/roomService";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

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
          onClick={() => setOpenDialog(true)}
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
                <TableCell>Hostel ID</TableCell>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <AddRoomDialog
          open={openDialog}
          handleClose={() => setOpenDialog(false)}
          refreshRooms={loadRooms}
        />
      </Paper>
    </DashboardLayout>
  );
};

export default Rooms;