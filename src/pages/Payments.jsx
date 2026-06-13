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
  IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Swal from "sweetalert2";

import {
  getAllPayments,
  deletePayment,
} from "../services/paymentService";

const Payments = () => {
  const [payments, setPayments] =
    useState([]);

  const [openDialog, setOpenDialog] =
    useState(false);

  const [selectedPayment, setSelectedPayment] =
    useState(null);

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

  const handleAdd = () => {
    setSelectedPayment(null);
    setOpenDialog(true);
  };

  const handleEdit = (payment) => {
    setSelectedPayment(payment);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Payment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      await deletePayment(id);

      Swal.fire({
        icon: "success",
        title: "Deleted Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      loadPayments();
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
          Payment Management
        </Typography>

        <Button
          variant="contained"
          sx={{ mb: 3 }}
          onClick={handleAdd}
        >
          Add Payment
        </Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Mode</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Resident ID</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {payments.map((payment) => (
                <TableRow
                  key={payment.paymentId}
                >
                  <TableCell>
                    {payment.paymentId}
                  </TableCell>

                  <TableCell>
                    ₹ {payment.amount}
                  </TableCell>

                  <TableCell>
                    {payment.paymentDate}
                  </TableCell>

                  <TableCell>
                    {payment.paymentMode}
                  </TableCell>

                  <TableCell>
                    {payment.paymentStatus}
                  </TableCell>

                  <TableCell>
                    {payment.residentId}
                  </TableCell>

                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() =>
                        handleEdit(payment)
                      }
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() =>
                        handleDelete(
                          payment.paymentId
                        )
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {payments.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    align="center"
                  >
                    No Payments Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <AddPaymentDialog
          open={openDialog}
          handleClose={() =>
            setOpenDialog(false)
          }
          refreshPayments={
            loadPayments
          }
          payment={selectedPayment}
        />
      </Paper>
    </DashboardLayout>
  );
};

export default Payments;