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
  TableContainer,
  TablePagination,
} from "@mui/material";

import {
  getAllHostels,
  searchHostelsByCity,
} from "../services/hostelService";

const Hostels = () => {
  const [hostels, setHostels] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchCity, setSearchCity] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const loadHostels = async () => {
    try {
      const data = await getAllHostels();
      setHostels(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    try {
      if (!searchCity.trim()) {
        loadHostels();
        return;
      }

      const data = await searchHostelsByCity(
        searchCity
      );

      setHostels(data);
      setPage(0);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadHostels();
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
            value={searchCity}
            onChange={(e) =>
              setSearchCity(e.target.value)
            }
            size="small"
          />

          <Button
            variant="outlined"
            onClick={handleSearch}
          >
            Search
          </Button>

          <Button
            variant="contained"
            onClick={() =>
              setOpenDialog(true)
            }
          >
            Add Hostel
          </Button>

          <Button
            variant="text"
            onClick={loadHostels}
          >
            Reset
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>ID</b>
                </TableCell>
                <TableCell>
                  <b>Hostel Name</b>
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
              </TableRow>
            </TableHead>

            <TableBody>
              {hostels.length > 0 ? (
                hostels
                  .slice(
                    page * rowsPerPage,
                    page * rowsPerPage +
                      rowsPerPage
                  )
                  .map((hostel) => (
                    <TableRow
                      key={hostel.hostelId}
                    >
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
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    align="center"
                  >
                    No hostels found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={hostels.length}
            page={page}
            onPageChange={(event, newPage) =>
              setPage(newPage)
            }
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(
                parseInt(
                  event.target.value,
                  10
                )
              );
              setPage(0);
            }}
          />
        </TableContainer>

        <AddHostelDialog
          open={openDialog}
          handleClose={() =>
            setOpenDialog(false)
          }
          refreshHostels={loadHostels}
        />
      </Paper>
    </DashboardLayout>
  );
};

export default Hostels;