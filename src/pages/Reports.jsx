import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

import {
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import { getAllHostels } from "../services/hostelService";
import { getAllRooms } from "../services/roomService";
import { getAllBeds } from "../services/bedService";
import { getAllResidents } from "../services/residentService";
import { getAllPayments } from "../services/paymentService";

const COLORS = [
  "#1976d2",
  "#9c27b0",
];

const Reports = () => {
  const [stats, setStats] = useState({
    hostels: 0,
    rooms: 0,
    beds: 0,
    residents: 0,
    payments: 0,
    totalAmount: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const hostels = await getAllHostels();
      const rooms = await getAllRooms();
      const beds = await getAllBeds();
      const residents = await getAllResidents();
      const payments = await getAllPayments();

      const totalAmount = payments.reduce(
        (sum, payment) =>
          sum + Number(payment.amount || 0),
        0
      );

      setStats({
        hostels: hostels.length,
        rooms: rooms.length,
        beds: beds.length,
        residents: residents.length,
        payments: payments.length,
        totalAmount,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const chartData = [
    {
      name: "Hostels",
      count: stats.hostels,
    },
    {
      name: "Rooms",
      count: stats.rooms,
    },
    {
      name: "Beds",
      count: stats.beds,
    },
    {
      name: "Residents",
      count: stats.residents,
    },
    {
      name: "Payments",
      count: stats.payments,
    },
  ];

  const pieData = [
    {
      name: "Residents",
      value: stats.residents,
    },
    {
      name: "Payments",
      value: stats.payments,
    },
  ];

  return (
    <DashboardLayout>
      <Typography
        variant="h4"
        gutterBottom
        fontWeight="bold"
      >
        Reports Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Total Hostels */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: 3,
            }}
          >
            <Typography variant="h6">
              Total Hostels
            </Typography>

            <Typography
              variant="h4"
              color="primary"
            >
              {stats.hostels}
            </Typography>
          </Paper>
        </Grid>

        {/* Total Rooms */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: 3,
            }}
          >
            <Typography variant="h6">
              Total Rooms
            </Typography>

            <Typography
              variant="h4"
              color="success.main"
            >
              {stats.rooms}
            </Typography>
          </Paper>
        </Grid>

        {/* Total Beds */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: 3,
            }}
          >
            <Typography variant="h6">
              Total Beds
            </Typography>

            <Typography
              variant="h4"
              color="warning.main"
            >
              {stats.beds}
            </Typography>
          </Paper>
        </Grid>

        {/* Total Residents */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: 3,
            }}
          >
            <Typography variant="h6">
              Total Residents
            </Typography>

            <Typography
              variant="h4"
              color="secondary"
            >
              {stats.residents}
            </Typography>
          </Paper>
        </Grid>

        {/* Payment Summary */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 4,
              borderRadius: 3,
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
            >
              Payment Summary
            </Typography>

            <Typography variant="h6">
              Total Payments: {stats.payments}
            </Typography>

            <Typography variant="h6">
              Total Amount: ₹ {stats.totalAmount}
            </Typography>
          </Paper>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              height: 400,
              borderRadius: 3,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
            >
              System Overview
            </Typography>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="count"
                  fill="#1976d2"
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              height: 400,
              borderRadius: 3,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
            >
              Payment Distribution
            </Typography>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index % COLORS.length
                        ]
                      }
                    />
                  ))}
                </Pie>

                <Tooltip />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default Reports;