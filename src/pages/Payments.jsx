import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import AddPaymentDialog from "../components/AddPaymentDialog";

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

import { getAllPayments } from "../services/paymentService";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const loadPayments = async () => {
    try {
      const data = await getAllPayments();
      setPayments(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadPayments();
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
          Payment Management
        </Typography>

        <Button
          variant="contained"
          sx={{ mb: 3 }}
          onClick={() => setOpenDialog(true)}
        >
          Add Payment
        </Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>ID</b></TableCell>
                <TableCell><b>Amount</b></TableCell>
                <TableCell><b>Date</b></TableCell>
                <TableCell><b>Mode</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Resident ID</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {payments.length > 0 ? (
                payments.map((payment) => (
                  <TableRow key={payment.paymentId}>
                    <TableCell>{payment.paymentId}</TableCell>
                    <TableCell>{payment.amount}</TableCell>
                    <TableCell>{payment.paymentDate}</TableCell>
                    <TableCell>{payment.paymentMode}</TableCell>
                    <TableCell>{payment.paymentStatus}</TableCell>
                    <TableCell>{payment.residentId}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No Payments Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <AddPaymentDialog
          open={openDialog}
          handleClose={() => setOpenDialog(false)}
          refreshPayments={loadPayments}
        />
      </Paper>
    </DashboardLayout>
  );
};

export default Payments;