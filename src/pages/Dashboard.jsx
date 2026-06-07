import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCard";
import DashboardChart from "../components/DashboardChart";

import {
  Grid,
  Typography,
  Paper,
} from "@mui/material";

const Dashboard = () => {
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
            value="5"
            color="#2563EB"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Rooms"
            value="120"
            color="#16A34A"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Beds"
            value="450"
            color="#EA580C"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Residents"
            value="380"
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

        <DashboardChart />
      </Paper>
    </DashboardLayout>
  );
};

export default Dashboard;