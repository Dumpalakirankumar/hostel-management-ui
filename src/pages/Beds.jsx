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
} from "@mui/material";

import { getAllBeds } from "../services/bedService";

const Beds = () => {
  const [beds, setBeds] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

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
          onClick={() => setOpenDialog(true)}
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
              </TableRow>
            </TableHead>

            <TableBody>
              {beds.map((bed) => (
                <TableRow key={bed.bedId}>
                  <TableCell>{bed.bedId}</TableCell>
                  <TableCell>{bed.bedNumber}</TableCell>
                  <TableCell>{bed.status}</TableCell>
                  <TableCell>{bed.roomId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <AddBedDialog
          open={openDialog}
          handleClose={() => setOpenDialog(false)}
          refreshBeds={loadBeds}
        />
      </Paper>
    </DashboardLayout>
  );
};

export default Beds;