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
} from "@mui/material";

import {
  getAllResidents,
} from "../services/residentService";

const Residents = () => {
  const [residents, setResidents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

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
          onClick={() => setOpenDialog(true)}
        >
          Add Resident
        </Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>ID</b>
                </TableCell>

                <TableCell>
                  <b>First Name</b>
                </TableCell>

                <TableCell>
                  <b>Last Name</b>
                </TableCell>

                <TableCell>
                  <b>Mobile</b>
                </TableCell>

                <TableCell>
                  <b>Email</b>
                </TableCell>

                <TableCell>
                  <b>Gender</b>
                </TableCell>

                <TableCell>
                  <b>Aadhaar</b>
                </TableCell>

                <TableCell>
                  <b>Bed ID</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {residents.length > 0 ? (
                residents.map((resident) => (
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
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
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
          refreshResidents={loadResidents}
        />
      </Paper>
    </DashboardLayout>
  );
};

export default Residents;