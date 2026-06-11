import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCard";
import DashboardChart from "../components/DashboardChart";

import {
  Grid,
  Typography,
  Paper,
} from "@mui/material";

import { getAllHostels } from "../services/hostelService";
import { getAllRooms } from "../services/roomService";
import { getAllBeds } from "../services/bedService";
import { getAllResidents } from "../services/residentService";

const Dashboard = () => {
  const [stats, setStats] = useState({
    hostels: 0,
    rooms: 0,
    beds: 0,
    residents: 0,
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

      setStats({
        hostels: hostels.length,
        rooms: rooms.length,
        beds: beds.length,
        residents: residents.length,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          mb: 4,
          fontWeight: "bold",
        }}
      >
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Hostels"
            value={stats.hostels}
            color="#2563EB"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Rooms"
            value={stats.rooms}
            color="#16A34A"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Beds"
            value={stats.beds}
            color="#EA580C"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Residents"
            value={stats.residents}
            color="#7C3AED"
          />
        </Grid>
      </Grid>

      <Paper
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          fontWeight="bold"
        >
          Hostel Analytics
        </Typography>

        <DashboardChart
          hostels={stats.hostels}
          rooms={stats.rooms}
          beds={stats.beds}
          residents={stats.residents}
        />
      </Paper>
    </DashboardLayout>
  );
};

export default Dashboard;